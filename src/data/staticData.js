export const sucursales = [
  { id: 1, nombre: "Sucursal Norte" },
  { id: 2, nombre: "Sucursal Centro" },
  { id: 3, nombre: "Sucursal Sur" },
];

export const productos = [
  { id: 1, nombre: "Camiseta Azul", categoria: "Ropa", stockActual: 8, sucursalId: 1 },
  { id: 2, nombre: "Jeans Negro", categoria: "Ropa", stockActual: 22, sucursalId: 2 },
  { id: 3, nombre: "Zapatos Blancos", categoria: "Calzado", stockActual: 12, sucursalId: 3 },
  { id: 4, nombre: "Chaqueta Cuero", categoria: "Ropa", stockActual: 4, sucursalId: 2 },
  { id: 5, nombre: "Gorra Roja", categoria: "Accesorios", stockActual: 18, sucursalId: 1 },
];

export const ventas = [
  { id: 1, cliente: "Juan Pérez", sucursalId: 1, total: 120000, fechaVenta: "2025-11-04T10:30:00", estado: "Completada" },
  { id: 2, cliente: "Laura Gómez", sucursalId: 2, total: 89000, fechaVenta: "2025-11-04T12:15:00", estado: "Pendiente" },
  { id: 3, cliente: "Carlos Ruiz", sucursalId: 1, total: 210000, fechaVenta: "2025-11-03T15:45:00", estado: "Completada" },
  { id: 4, cliente: "Marta Díaz", sucursalId: 3, total: 67000, fechaVenta: "2025-11-02T09:20:00", estado: "Cancelada" },
  { id: 5, cliente: "José Ramírez", sucursalId: 2, total: 135000, fechaVenta: "2025-11-01T11:10:00", estado: "Completada" },
];

export const getTotalVentasByPeriod = (periodo) => {
  if (periodo === "hoy") return 120000;
  if (periodo === "mes") return 780000;
  if (periodo === "total") return ventas.reduce((acc, v) => acc + v.total, 0);
  return 0;
};

export const getVentasCount = () => ventas.length;

export const getPromedioVenta = () => {
  const total = ventas.reduce((acc, v) => acc + v.total, 0);
  return total / ventas.length;
};
