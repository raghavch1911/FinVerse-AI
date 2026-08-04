import { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const send = () => {
    const value = message.trim();

    if (!value || loading) return;

    onSend(value);
    setMessage("");
  };

  return (
    <div className="flex gap-3">
      <textarea
        rows={2}
        value={message}
        placeholder="Ask anything about your finances..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.shiftKey
          ) {
            e.preventDefault();
            send();
          }
        }}
        className="flex-1 resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white outline-none focus:border-cyan-500"
      />

      <button
        onClick={send}
        disabled={loading}
        className="rounded-xl bg-cyan-500 px-5 text-black font-semibold transition hover:bg-cyan-400 disabled:opacity-50"
      >
        <SendHorizonal size={20} />
      </button>
    </div>
  );
}