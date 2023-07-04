"use client";

import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import WebSocket from "isomorphic-ws";
import ReconnectingWebSocket from "reconnecting-websocket";
import Cookies from "js-cookie";

const wsBaseUrl = process.env.WS_BASE_URL;
const connectionTimeout = 15000;

type Method = string;
type WsEvent = string;

export type ListenerHandler<Data = unknown> = (data: Data) => void;
export type Listener<Data = unknown> = {
  event: WsEvent;
  handler: ListenerHandler<Data>;
};

interface WsConnection {
  close: () => void;
  send: (method: Method, data: unknown) => void;
  addListener: <Data = unknown>(
    event: WsEvent,
    handler: ListenerHandler<Data>
  ) => () => void;
}

type V = WsConnection | null;

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketContext = createContext<{
  connection: V;
}>({
  connection: null,
});

export const WebSocketProvider: FC<WebSocketProviderProps> = ({ children }) => {
  const [conn, setConn] = useState<V>(null);
  const listeners = useRef<Listener[]>([]);
  const isConnecting = useRef(false);

  const handleListeners = useCallback(
    (e: WsEvent, data: unknown) => {
      listeners.current.forEach((listener) => {
        if (listener.event === e) {
          listener.handler(data);
        }
      });
    },
    [listeners]
  );

  useEffect(() => {
    if (!conn && !isConnecting.current) {
      if (!wsBaseUrl) {
        throw new Error("Websocket Base URL is not defined");
      }

      isConnecting.current = true;

      const accessToken = Cookies.get("accessToken");

      const socket = new ReconnectingWebSocket(wsBaseUrl, [], {
        connectionTimeout,
        WebSocket,
      });

      const send = (method: Method, data: unknown) => {
        if (socket.readyState !== socket.OPEN) {
          return;
        }

        const raw = `{"method":"${method}","message":${JSON.stringify(data)}}`;

        socket.send(raw);
      };

      socket.addEventListener("close", (error) => {
        socket.reconnect();
      });

      socket.addEventListener("message", (event) => {
        const response = JSON.parse(event.data);

        if (response.message === "loggedIn") {
          const connection: WsConnection = {
            close: () => socket.close(),
            send,
            addListener: (event, handler) => {
              const listener = {
                event,
                handler,
              } as Listener<unknown>;

              listeners.current.push(listener);

              return () =>
                listeners.current.splice(
                  listeners.current.indexOf(listener),
                  1
                );
            },
          };

          setConn(connection);
        } else {
          handleListeners(response.event, response.data);
        }
      });

      socket.addEventListener("open", () => {
        isConnecting.current = false;

        send("auth.token", {
          accessToken,
        });
      });
    }
  }, [conn, handleListeners]);

  return (
    <WebSocketContext.Provider
      value={{
        connection: conn,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (context === undefined) {
    throw new Error("useWebSocket must be used within an WebSocketContext");
  }

  return context;
};
