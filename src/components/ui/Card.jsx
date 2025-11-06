// src/components/ui/card.jsx
export function Card({ className = "", children }) {
  return <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>{children}</div>;
}

export function CardHeader({ className = "", children }) {
  return <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h2 className={`font-semibold text-gray-800 ${className}`}>{children}</h2>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
