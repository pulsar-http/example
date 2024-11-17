import * as React from "react";
import { Message, Save } from "@mynaui/icons-react";

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type Props = {
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export function AskUsername({ setUsername }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setUsername(inputRef.current?.value || "");
  };

  return (
    <Card className="mx-auto flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Message className="mr-2" /> Pulsar Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        Please enter your username
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-4 items-center">
          <Input
            ref={inputRef}
            className="flex-1"
            placeholder="Username"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
          <Button onClick={handleSave}>
            <Save />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
