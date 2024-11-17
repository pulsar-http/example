import { Chat } from "@/components/ui/chat.tsx";
import { useState } from "react";
import { AskUsername } from "@/components/ui/ask-username.tsx";

function App() {
  const [username, setUsername] = useState<string>();

  if (!username) {
    return (
      <div className="flex h-screen w-full items-center justify-center px-4">
        <AskUsername setUsername={setUsername} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Chat username={username} />
    </div>
  );
}

export default App;
