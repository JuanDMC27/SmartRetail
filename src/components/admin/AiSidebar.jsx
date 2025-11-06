"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Send, Bot, User, ChevronRight } from "lucide-react";
import { ventas, productos, sucursales } from "../../data/dataVentas";
import { cn } from "../utils";

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
export function AISidebar({ isCollapsed, onToggle }) {
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
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Genera una respuesta simple del asistente según la consulta.
   * @param {string} text
   * @returns {string}
   */
  const generateResponse = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("venta")) {
      const total = ventas.reduce((s, v) => s + v.total, 0);
      return `Actualmente hay ${ventas.length} ventas registradas con un total de ${total.toLocaleString("es-CO")} COP.`;
    }

    if (msg.includes("producto")) {
      const bajos = productos.filter((p) => p.stockActual < 15);
      return `Hay ${bajos.length} productos con stock bajo.`;
    }

    if (msg.includes("sucursal")) {
      const mejor = sucursales[Math.floor(Math.random() * sucursales.length)];
      return `La mejor sucursal es ${mejor.nombre} ubicada en ${mejor.ciudad}.`;
    }

    if (msg.includes("recomendación")) {
      return "Te recomiendo revisar el inventario semanalmente y promover los productos más vendidos.";
    }

    return "Puedo ayudarte con ventas, productos o sucursales. ¿Sobre qué quieres saber más?";
  };

  /**
   * Maneja el envío de un mensaje por el usuario.
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const res = generateResponse(input);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "assistant", content: res, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={cn(
        "h-screen bg-card border-l shadow-2xl flex flex-col transition-all duration-300",
        isCollapsed ? "w-0 border-none" : "w-96"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -left-3 top-6 h-6 w-6 rounded-full bg-card border shadow-md"
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform", !isCollapsed && "rotate-180")} />
      </Button>

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
          <div className="flex-1 overflow-y-auto p-4 bg-muted/30 space-y-3">
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
                      : "bg-white border border-border text-gray-800"
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
          <div className="border-t p-3 bg-card">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" disabled={!input.trim() || isTyping} className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
