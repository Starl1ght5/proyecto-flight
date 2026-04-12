import { useState } from "react";
import { motion } from "motion/react";
import { IoAirplane, IoClose } from "react-icons/io5";

console.log(
  "URL:",
  `${import.meta.env.VITE_BACKEND_URL}chat?message=hola`
);

type Sender = "user" | "bot";

interface Message {
  id: number;
  text: string;
  sender: Sender;
}



export default function Chatbox(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡ Te damos la bienvenida a Royal Airlines! Donde tus vuelos son unicos y nuestro servicio es excepcional. ¿En qué puedo ayudarte?", sender: "bot" }
  ]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async (): Promise<void> => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now(),
    text: input,
    sender: "user"
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}chat?message=${encodeURIComponent(userMessage.text)}`
    );

    const data = await res.text();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: data,
        sender: "bot"
      }
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: "Error conectando con el servidor",
        sender: "bot"
      }
    ]);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* BOTÓN */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-full shadow-lg transition"
      >
        {isOpen ? <IoClose size={24} /> : <IoAirplane size={22} />}
      </button>

      {/* CHAT */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-80 h-96 bg-white shadow-xl rounded-2xl mt-4 flex flex-col"
        >
          {/* HEADER */}
          <div className="p-3 border-b font-semibold">
            Atención al Cliente✈️🤖
          </div>

          {/* MENSAJES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && sendMessage()
              }
              className="flex-1 border rounded-lg px-2"
              placeholder="Escribe un mensaje..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg transition"
            >
              Enviar
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );

  
}