import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

import type { ChatMessage } from "../../types/chat";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({
  message,
}: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 shadow-lg flex gap-3 ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-zinc-900 border border-zinc-800 text-zinc-100"
        }`}
      >
        <div className="mt-1">
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} className="text-cyan-400" />
          )}
        </div>

        <p className="whitespace-pre-wrap leading-7">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}