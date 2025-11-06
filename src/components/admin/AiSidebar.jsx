import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Send, Bot, User, ChevronRight } from "lucide-react";
import { ventas, productos, sucursales, detalleVentas } from "../../data/dataVentas"
import { cn } from "../utils"

/**
 * @typedef {"user" | "assistant"} MessageRole
 */

/**
 * @typedef {Object} Message
 * @property {number} id - Identificador único del mensaje.
 * @property {MessageRole} role - Rol del emisor ("user" o "assistant").
 * @property {string} content - Contenido del mensaje.
 * @property {Date} timestamp - Marca de tiempo del mensaje.
 */

/**
 * @typedef {Object} AISidebarProps
 * @property {boolean} isCollapsed - Indica si el panel lateral está colapsado.
 * @property {() => void} onToggle - Función para alternar la visibilidad del panel.
 */

/**
 * Componente de asistente IA lateral.
 * Proporciona interacción tipo chat para análisis de ventas, productos y sucursales.
 *
 * @param {AISidebarProps} props - Propiedades del componente.
 * @returns {JSX.Element} Panel interactivo del asistente de IA.
 */
export function AISidebar({ isCollapsed, onToggle }) {
  /** @type {[Message[], React.Dispatch<React.SetStateAction<Message[]>>]} */
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente de análisis de ventas. Puedo ayudarte a analizar datos, identificar tendencias y proporcionar recomendaciones estratégicas. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  /** Desplaza el chat automáticamente hacia el último mensaje. */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Genera una respuesta automática basada en el mensaje del usuario.
   * Simula un asistente experto en análisis de datos de ventas.
   *
   * @param {string} userMessage - Texto ingresado por el usuario.
   * @returns {string} Respuesta generada.
   */
  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    const formatCurrency = (value) =>
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(value);

    // --- Análisis de ventas ---
    if (lowerMessage.includes("venta")) {
      const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
      if (lowerMessage.includes("total") || lowerMessage.includes("cuánto")) {
        return `El total de ventas registradas es de ${formatCurrency(totalVentas)} con ${ventas.length} transacciones. El promedio por venta es de ${formatCurrency(totalVentas / ventas.length)}.`;
      }
      if (lowerMessage.includes("mejor") || lowerMessage.includes("más")) {
        const ventasPorSucursal = sucursales.map((suc) => {
          const ventasSuc = ventas.filter((v) => v.sucursalId === suc.id);
          return { nombre: suc.nombre, total: ventasSuc.reduce((sum, v) => sum + v.total, 0) };
        });
        const mejor = ventasPorSucursal.reduce((a, b) => (b.total > a.total ? b : a));
        return `La sucursal con mejor desempeño es ${mejor.nombre} con ventas totales de ${formatCurrency(mejor.total)}.`;
      }
      return `Tenemos ${ventas.length} ventas registradas por un total de ${formatCurrency(totalVentas)}. ¿Deseas ver un desglose por sucursal o producto?`;
    }

    // --- Inventario / productos ---
    if (lowerMessage.includes("producto") || lowerMessage.includes("inventario") || lowerMessage.includes("stock")) {
      const productosBajoStock = productos.filter((p) => p.stockActual < 15);

      if (lowerMessage.includes("bajo") || lowerMessage.includes("poco")) {
        return `Hay ${productosBajoStock.length} productos con stock bajo. Ejemplos: ${productosBajoStock
          .slice(0, 3)
          .map((p) => `${p.nombre} (${p.stockActual} unidades)`)
          .join(", ")}.`;
      }

      if (lowerMessage.includes("más vendido") || lowerMessage.includes("popular")) {
        const productosVendidos = new Map();
        detalleVentas.forEach((detalle) => {
          productosVendidos.set(detalle.productoId, (productosVendidos.get(detalle.productoId) || 0) + detalle.cantidad);
        });
        const masVendido = Array.from(productosVendidos.entries())
          .map(([id, cant]) => ({ producto: productos.find((p) => p.id === id), cantidad: cant }))
          .sort((a, b) => b.cantidad - a.cantidad)[0];
        return `El producto más vendido es "${masVendido.producto?.nombre}" con ${masVendido.cantidad} unidades.`;
      }

      return `El inventario actual tiene ${productos.length} productos. ${productosBajoStock.length} están por debajo del stock mínimo.`;
    }

    // --- Análisis por sucursal ---
    if (lowerMessage.includes("sucursal") || lowerMessage.includes("tienda")) {
      const ventasPorSucursal = sucursales.map((suc) => {
        const ventasSuc = ventas.filter((v) => v.sucursalId === suc.id);
        return {
          nombre: suc.nombre,
          ciudad: suc.ciudad,
          ventas: ventasSuc.length,
          total: ventasSuc.reduce((sum, v) => sum + v.total, 0),
        };
      });

      return `Análisis de sucursales:\n\n${ventasPorSucursal
        .map((s) => `• ${s.nombre} (${s.ciudad}): ${s.ventas} ventas, ${formatCurrency(s.total)}`)
        .join("\n")}`;
    }

    // --- Recomendaciones generales ---
    if (lowerMessage.includes("recomendación") || lowerMessage.includes("consejo")) {
      return `Recomendaciones clave:\n1. Aumentar inventario de productos con alta rotación.\n2. Implementar promociones cruzadas.\n3. Capacitar a equipos de alto desempeño.\n4. Establecer alertas de stock crítico.`;
    }

    // --- Tendencias ---
    if (lowerMessage.includes("tendencia") || lowerMessage.includes("patrón")) {
      return `Tendencias detectadas:\n• Crecimiento del 12% mensual.\n• Alta demanda en ropa casual.\n• Mayor actividad los fines de semana.`;
    }

    return `Puedo ayudarte con:\n- Ventas totales y por sucursal\n- Stock de productos\n- Recomendaciones y tendencias\n\n¿Qué te gustaría analizar?`;
  };

  /**
   * Maneja el envío del mensaje del usuario y genera respuesta automática.
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: messages.length + 1, role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage = { id: messages.length + 2, role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const formatTime = (date) => date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

  const suggestedQuestions = [
    "¿Cuál es el total de ventas?",
    "¿Qué productos tienen stock bajo?",
    "¿Cuál es la mejor sucursal?",
    "Dame recomendaciones",
  ];

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-screen bg-card border-l border-border shadow-2xl flex flex-col z-40 transition-all duration-300",
        isCollapsed ? "w-0 border-l-0" : "w-96"
      )}
    >
      {/* Botón para expandir/colapsar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -left-3 top-6 z-10 h-6 w-6 rounded-full bg-card border border-border shadow-md hover:bg-accent"
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
              <p className="text-white/80 text-xs">Siempre disponible</p>
            </div>
          </div>

          {/* Chat principal */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border border-border shadow-sm text-gray-800"
                  )}
                >
                  <p className="whitespace-pre-line">{m.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      m.role === "user" ? "text-white/70" : "text-gray-500"
                    )}
                  >
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
              <div className="flex gap-2 justify-start">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-border shadow-sm rounded-2xl p-3 flex gap-1">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas sugeridas */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Preguntas sugeridas:</p>
              <div className="flex flex-col gap-2">
                {suggestedQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(q)}
                    className="text-xs justify-start h-auto py-2 bg-white hover:bg-accent hover:text-white"
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Campo de entrada */}
          <div className="border-t p-4 bg-card">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 bg-white"
                disabled={isTyping}
              />
              <Button type="submit" disabled={isTyping || !input.trim()} className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
