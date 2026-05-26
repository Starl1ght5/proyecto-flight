import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Sender = "user" | "bot";

interface Message {
  id: number;
  text: string;
  sender: Sender;
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

export default function Chatbox(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Bienvenido a Royal Airlines! ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (): Promise<void> => {
    const messageText = input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}chat?message=${encodeURIComponent(messageText)}`
      );
      const data = await res.text();

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data, sender: "bot", time: getTime() },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Error conectando con el servidor. Por favor intenta de nuevo.",
          sender: "bot",
          time: getTime(),
        },
      ]);
    }
  };

  return (
    <>
      {/* ── ESTILOS ── */}
      <style>{`
        .ra-fab {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          font-size: 20px;
          transition: transform 0.15s;
        }
        .ra-fab:hover { transform: scale(1.06); }
        .ra-fab:active { transform: scale(0.95); }

        .ra-window {
          width: 340px;
          height: 520px;
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.1);
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Geist', 'SF Pro Text', system-ui, sans-serif;
        }

        .ra-header {
          padding: 14px 16px;
          border-bottom: 0.5px solid rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
        }
        .ra-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0f172a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }
        .ra-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }
        .ra-status {
          font-size: 11.5px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0;
        }
        .ra-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }
        .ra-close-btn {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 4px;
          border-radius: 6px;
          font-size: 17px;
          line-height: 1;
          transition: background 0.1s, color 0.1s;
        }
        .ra-close-btn:hover { background: #f1f5f9; color: #0f172a; }

        .ra-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8fafc;
          scrollbar-width: none;
        }
        .ra-messages::-webkit-scrollbar { display: none; }

        .ra-row {
          display: flex;
          gap: 7px;
          align-items: flex-end;
        }
        .ra-row.user { flex-direction: row-reverse; }

        .ra-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0f172a;
          color: #fff;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ra-icon.user {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.12);
          color: #0f172a;
        }

        .ra-bubble {
          max-width: 73%;
          min-width: 48px;
          padding: 9px 12px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.55;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: pre-wrap;
        }
        .ra-bubble.bot {
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.08);
          color: #1e293b;
          border-bottom-left-radius: 4px;
        }
        .ra-bubble.user {
          background: #0f172a;
          color: #e2e8f0;
          border-bottom-right-radius: 4px;
        }

        .ra-time {
          font-size: 10.5px;
          color: #94a3b8;
          margin-top: 3px;
          padding: 0 2px;
        }
        .ra-row.user .ra-time { text-align: right; }

        .ra-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 10px 12px;
        }
        .ra-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #94a3b8;
          animation: raBlink 1.2s infinite;
        }
        .ra-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ra-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes raBlink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }


        .ra-inputbar {
          padding: 10px 12px;
          border-top: 0.5px solid rgba(0,0,0,0.08);
          background: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ra-input {
          flex: 1;
          background: #f8fafc;
          border: 0.5px solid rgba(0,0,0,0.1);
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 13px;
          color: #1e293b;
          outline: none;
          font-family: inherit;
          transition: border-color 0.15s;
        }
        .ra-input::placeholder { color: #94a3b8; }
        .ra-input:focus { border-color: rgba(0,0,0,0.25); }

        .ra-send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0f172a;
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 14px;
          transition: transform 0.12s, background 0.12s;
        }
        .ra-send:hover { background: #1e293b; transform: scale(1.05); }
        .ra-send:active { transform: scale(0.93); }
        .ra-send:disabled { opacity: 0.45; cursor: default; }
      `}</style>

      {/* ── CONTENEDOR FLOTANTE ── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>

        {/* CHATBOX */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="ra-window"
            >
              {/* HEADER */}
              <div className="ra-header">
                <div className="ra-avatar">✈</div>
                <div>
                  <p className="ra-name">Royal Assistant</p>
                  <p className="ra-status">
                    <span className="ra-dot" /> En línea ahora
                  </p>
                </div>
                <button className="ra-close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar">✕</button>
              </div>

              {/* MENSAJES */}
              <div className="ra-messages">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`ra-row${msg.sender === "user" ? " user" : ""}`}
                  >
                    <div className={`ra-icon${msg.sender === "user" ? " user" : ""}`}>
                      {msg.sender === "user" ? "U" : "✈"}
                    </div>
                    <div style={{ minWidth: 0, maxWidth: "73%" }}>
                      <div className={`ra-bubble ${msg.sender}`} style={{ maxWidth: "100%" }}>{msg.text}</div>
                      <div className="ra-time">{msg.time}</div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ra-row"
                  >
                    <div className="ra-icon">✈</div>
                    <div className="ra-bubble bot" style={{ padding: "6px 12px" }}>
                      <div className="ra-typing">
                        <span /><span /><span />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>


              {/* INPUT */}
              <div className="ra-inputbar">
                <input
                  className="ra-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Escribe un mensaje..."
                />
                <button
                  className="ra-send"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  aria-label="Enviar"
                >
                  ➤
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <button
          className="ra-fab"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? "✕" : "✈"}
        </button>
      </div>
    </>
  );
}