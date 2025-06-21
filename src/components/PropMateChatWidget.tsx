// src/components/PropMateChatWidget.tsx
import React, { useState, useRef, useEffect } from "react";
import PropMateVoice from "./PropMateVoice";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const PropMateChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hi! I'm PropMate AI. How can I help you with your property journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speak, setSpeak] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speak the latest AI message
  useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.sender === "ai" && last.text && !loading) {
      setSpeak(true);
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user" as const, text: input }
    ]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/prop-mate-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (res.body) {
        const reader = res.body.getReader();
        let aiMsg = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiMsg += new TextDecoder().decode(value);
          setMessages((msgs) => [
            ...msgs.slice(0, -1),
            { sender: "ai" as const, text: aiMsg }
          ]);
        }
        setMessages((msgs) => [...msgs, { sender: "ai" as const, text: aiMsg }]);
      }
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai" as const, text: "Sorry, something went wrong. Please try again." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open PropMate AI Chat"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-w-full bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="p-4 border-b font-bold bg-blue-600 text-white rounded-t-lg">
            PropMate AI
            <button className="float-right text-white" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 350 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      {/* Voice output for latest AI message */}
      {speak && (
        <PropMateVoice
          text={messages[messages.length - 1]?.text || ""}
          speak={speak}
          onEnd={() => setSpeak(false)}
        />
      )}
    </div>
  );
};

export default PropMateChatWidget;