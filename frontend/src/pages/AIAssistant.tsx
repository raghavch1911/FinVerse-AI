import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

import chatService from "../services/chatService";

import type { ChatMessage } from "../types/chat";

import ChatBubble from "../components/chat/ChatBubble";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatService.sendMessage(text);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Sorry, something went wrong while contacting FinVerse AI.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">

      {/* Header */}

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-cyan-500/20 p-3">
            <Sparkles
              className="text-cyan-400"
              size={26}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              FinVerse AI Assistant
            </h1>

            <p className="text-zinc-400">
              Ask anything about your finances,
              budgets, investments, or uploaded documents.
            </p>
          </div>

        </div>

      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">

        {messages.length === 0 && !loading && (

          <div className="flex h-full flex-col items-center justify-center text-center">

            <Sparkles
              size={60}
              className="mb-5 text-cyan-400"
            />

            <h2 className="mb-3 text-2xl font-bold text-white">
              Welcome to FinVerse AI
            </h2>

            <p className="max-w-xl text-zinc-400">
              Ask questions about your spending,
              budgets, investments, financial
              insights, or uploaded documents.
            </p>

          </div>

        )}

        <div className="space-y-5">

          {messages.map((message) => (

            <ChatBubble
              key={message.id}
              message={message}
            />

          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* Input */}

      <div className="mt-5">

        <ChatInput
          loading={loading}
          onSend={sendMessage}
        />

      </div>

    </div>
  );
}