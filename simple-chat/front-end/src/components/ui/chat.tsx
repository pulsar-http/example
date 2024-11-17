import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Message, Send } from "@mynaui/icons-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

type Props = {
  username?: string;
};

export function Chat({ username }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const connection = useRef<WebSocket | null>(null);
  const ws = connection.current;

  const [messageHistory, setMessageHistory] = useState<
    {
      username: string;
      message: string;
    }[]
  >([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:3000/ws?username=" + username);

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const data = event.data.split(": ");

      if (data.length === 2) {
        setMessageHistory((prev) => [
          ...prev,
          {
            username: data[0],
            message: data[1],
          },
        ]);
        return;
      } else {
        setMessageHistory((prev) => [
          ...prev,
          {
            username: "system",
            message: data[0],
          },
        ]);
      }
    });

    connection.current = socket;

    return () => connection.current?.close();
  }, []);

  const handleClickSendMessage = () => {
    ws?.send(inputRef.current?.value || "");
    inputRef.current!.value = "";
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <Card className="mx-auto min-w-[50%] min-h-[90%] max-h-[90%] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Message className="mr-2" /> Pulsar Chat {ws ? "(ready)" : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <div className="flex flex-col gap-4">
          {messageHistory.map(
            ({ username: messageUsername, message }, index) => {
              if (messageUsername === "system") {
                return (
                  <p key={index} className="text-xs text-slate-500">
                    {message}
                  </p>
                );
              }
              if (messageUsername === username) {
                return (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-end"
                  >
                    <div className="flex flex-col">
                      <div className="bg-slate-800 p-2 rounded-lg">
                        <p className="text-sm">{message}</p>
                      </div>
                      <p className="text-xs text-slate-500">You</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <div className="bg-slate-800 p-2 rounded-lg">
                        <p className="text-sm">{message}</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {messageUsername}
                      </p>
                    </div>
                  </div>
                );
              }
            },
          )}
        </div>
        <div ref={scrollRef}></div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-4 items-center">
          <Input
            ref={inputRef}
            className="flex-1"
            placeholder="Enter a message"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleClickSendMessage();
              }
            }}
          />
          <Button
            className="bg-slate-700 text-slate-200"
            onClick={handleClickSendMessage}
          >
            <Send />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
