"use client";

import CircleButton from "@/components/CircleButton";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Message from "./Message";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { WatchContext } from "./WatchProvider";
import { useWebSocket } from "@/providers/WebSocketProvider";

const Chat = () => {
  const { room, messages } = useContext(WatchContext);
  const { connection } = useWebSocket();

  const chatRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 200) return;

    setMessage(e.target.value);
  };

  const onSendMessage = useCallback(() => {
    if (!connection) return;

    setMessage("");

    connection.send("watchRoom.message", {
      room_id: room.id,
      content: message,
    });
  }, [room.id, message, connection]);

  useEffect(() => {
    if (!chatRef.current) return;

    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="fixed right-0 max-w-[518px] w-full h-full max-h-[calc(100vh-90px)] border-l border-[rgba(255,255,255,0.05)] bg-black-300 flex flex-col overflow-hidden">
      <div className="overflow-y-scroll chat-scrollbar h-full" ref={chatRef}>
        <div className="flex-1 flex flex-col gap-4 p-6">
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
      </div>

      <div className="relative h-[150px] border-t border-[rgba(255,255,255,0.05)] p-6 text-white">
        <textarea
          className="outline-none border-none bg-transparent resize-none w-full m-0 placeholder:text-white-200"
          rows={2}
          placeholder="დაიწყე წერა ჩატში..."
          value={message}
          onChange={handleChangeTextarea}
        ></textarea>
        <div className="absolute bottom-6 right-6 flex gap-5 items-center">
          <div className="text-sm leading-[18px] font-light text-white-200">
            {message.length}/200
          </div>

          <CircleButton
            onClick={onSendMessage}
            icon={PaperAirplaneIcon}
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
