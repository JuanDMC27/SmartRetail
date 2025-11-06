"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Send, Bot, User, ChevronRight } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * @typedef {"user" | "assistant"} MessageRole
 * @typedef {{ id: number, role: MessageRole, content: string, timestamp: Date }} Message
 * @typedef {{ isCollapsed: boolean, onToggle: () => void }} AISidebarProps
 */

/**
 * Componente de chat de asistente IA para análisis básico de ventas.
 * @param {AISidebarProps} props
 * @returns {JSX.Element}
 */
export function AISidebar() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente de análisis. Puedo ayudarte con datos de ventas, inventario o sucursales. ¿Qué deseas saber?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Genera una respuesta simple del asistente según la consulta.
   * @param {string} text
   * @returns {Promise<string>}
   */
  const generateResponse = async (text) => {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      const data = await response.json();
      return data.reply || "No he podido obtener una respuesta.";
    } catch (error) {
      console.error("Error generando respuesta:", error);
      return "Lo siento, tuve un problema para conectarme al servidor. Por favor, intenta de nuevo más tarde.";
    }
  };

  /**
   * Maneja el envío de un mensaje por el usuario.
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]); // Add user message immediately
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    const res = await generateResponse(currentInput);

    const assistantMsg = { id: messages.length + 2, role: "assistant", content: res, timestamp: new Date() };
    setMessages((prev) => [...prev, assistantMsg]); // Add assistant message
    setIsTyping(false);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={cn(
        "h-screen bg-gray-900 text-white border-l border-gray-700 shadow-2xl flex flex-col transition-all duration-300",
        isCollapsed ? "w-0 border-none" : "w-96"
      )}
    > 
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-3 top-6 z-10 h-7 w-7 rounded-full bg-gray-700 border border-gray-600 shadow-md flex items-center justify-center hover:bg-gray-600 transition"
      >
        <ChevronRight className={cn("h-4 w-4 text-white transition-transform", isCollapsed && "rotate-180")} />
      </button>

      {!isCollapsed && (
        <>
          {/* Encabezado */}
          <div className="bg-primary p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Asistente IA</h2>
              <p className="text-white/80 text-xs">Disponible</p>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800/50 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-2xl text-sm",
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-700 text-white"
                  )}
                >
                  <p>{m.content}</p>
                  <p className={cn("text-xs mt-1", m.role === "user" ? "text-white/70" : "text-gray-500")}>
                    {formatTime(m.timestamp)}
                  </p>
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border rounded-2xl p-2 flex gap-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-150" />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Campo de entrada */}
          <div className="border-t border-gray-700 p-3 bg-gray-900">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                disabled={isTyping}
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="bg-primary hover:bg-primary/90 text-white p-2 rounded-md disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
