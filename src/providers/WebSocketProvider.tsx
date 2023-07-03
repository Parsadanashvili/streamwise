"use client";

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import WebSocket from "isomorphic-ws";
import ReconnectingWebSocket from "reconnecting-websocket";
import Cookies from "js-cookie";

const wsUrl = process.env.WS_BASE_URL ?? "ws://localhost:5656";
const connectionTimeout = 15000;

type Method = string;

interface WsConnection {
  close: () => void;
  send: (method: Method, data: unknown) => void;
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
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!conn && !isConnecting.current) {
      isConnecting.current = true;

      const accessToken = Cookies.get("accessToken");

      const socket = new ReconnectingWebSocket(wsUrl, [], {
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
        socket.close();
      });

      socket.addEventListener("message", (event) => {
        const response = JSON.parse(event.data);

        if (response.message === "loggedIn") {
          const connection: WsConnection = {
            close: () => socket.close(),
            send,
          };

          setConn(connection);
        }
      });

      socket.addEventListener("open", () => {
        isConnecting.current = false;

        send("auth.token", {
          accessToken,
        });
      });
    }
  }, [conn]);

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
