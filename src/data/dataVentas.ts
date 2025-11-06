/**
 * @fileoverview
 * Datos estáticos y funciones auxiliares del sistema de ventas SmartRetail.
 * Incluye entidades, relaciones y utilidades para filtrar, calcular y consultar información
 * sobre usuarios, productos, sucursales y ventas.
 */

/**
 * Representa un usuario del sistema.
 */
export interface Usuario {
  id: number
  username: string
  email: string
  rol: "Administrador" | "Empleado"
  activo: boolean
  fechaCreacion: string
}

/**
 * Representa una sucursal o tienda física.
 */
export interface Sucursal {
  id: number
  nombre: string
  ciudad: string
  direccion: string
  telefono: string
}

/**
 * Representa un producto disponible en el inventario.
 */
export interface Producto {
  id: number
  nombre: string
  categoria: string
  genero: "Hombre" | "Mujer" | "Niño" | "Niña"
  talla: string
  precio: number
  stockActual: number
  sucursalId: number
}

/**
 * Representa una venta registrada en el sistema.
 */
export interface Venta {
  id: number
  sucursalId: number
  usuarioId: number
  fechaVenta: string
  total: number
  metodoPago: string
  cliente: string
  estado: "Completada" | "Pendiente" | "Cancelada"
}

/**
 * Representa un detalle de venta individual, es decir, un producto dentro de una venta.
 */
export interface DetalleVenta {
  id: number
  ventaId: number
  productoId: number
  cantidad: number
  precioUnitario: number
  subtotal: number
}

/**
 * Conjunto estático de usuarios del sistema.
 */
export const usuarios: Usuario[] = [
  { id: 1, username: "admin", email: "admin@smartretail.com", rol: "Administrador", activo: true, fechaCreacion: "2024-01-15" },
  { id: 2, username: "juan.perez", email: "juan.perez@smartretail.com", rol: "Empleado", activo: true, fechaCreacion: "2024-02-20" },
  { id: 3, username: "maria.garcia", email: "maria.garcia@smartretail.com", rol: "Empleado", activo: true, fechaCreacion: "2024-03-10" },
  { id: 4, username: "carlos.lopez", email: "carlos.lopez@smartretail.com", rol: "Empleado", activo: false, fechaCreacion: "2024-01-05" },
]

/**
 * Conjunto estático de sucursales disponibles.
 */
export const sucursales: Sucursal[] = [
  { id: 1, nombre: "Sucursal Norte", ciudad: "Bogotá", direccion: "Calle 100 #12-34", telefono: "6011234567" },
  { id: 2, nombre: "Sucursal Sur", ciudad: "Medellín", direccion: "Cra 45 #20-55", telefono: "6047654321" },
  { id: 3, nombre: "Sucursal Centro", ciudad: "Cali", direccion: "Av. 6 #15-20", telefono: "6023456789" },
]

/**
 * Conjunto estático de productos en inventario.
 */
export const productos: Producto[] = [
  { id: 1, nombre: "Camiseta Blanca", categoria: "TSHIRT", genero: "Hombre", talla: "M", precio: 35000, stockActual: 40, sucursalId: 1 },
  { id: 2, nombre: "Jean Clásico", categoria: "JEANS TERMINADOS", genero: "Mujer", talla: "L", precio: 89000, stockActual: 20, sucursalId: 1 },
  { id: 3, nombre: "Pijama Algodón", categoria: "PIJAMAS", genero: "Niña", talla: "10", precio: 55000, stockActual: 15, sucursalId: 2 },
  { id: 4, nombre: "Buzo Deportivo", categoria: "BUZO", genero: "Hombre", talla: "L", precio: 65000, stockActual: 10, sucursalId: 1 },
  { id: 5, nombre: "Vestido Floral", categoria: "VESTIDOS", genero: "Mujer", talla: "S", precio: 78000, stockActual: 12, sucursalId: 2 },
  { id: 6, nombre: "Camisa Formal", categoria: "CAMISAS", genero: "Hombre", talla: "M", precio: 95000, stockActual: 25, sucursalId: 1 },
  { id: 7, nombre: "Pantalón Deportivo", categoria: "PANTALONES", genero: "Hombre", talla: "L", precio: 72000, stockActual: 18, sucursalId: 3 },
  { id: 8, nombre: "Blusa Casual", categoria: "BLUSAS", genero: "Mujer", talla: "M", precio: 48000, stockActual: 30, sucursalId: 2 },
  { id: 9, nombre: "Short Verano", categoria: "SHORTS", genero: "Niño", talla: "8", precio: 32000, stockActual: 22, sucursalId: 3 },
  { id: 10, nombre: "Chaqueta Invierno", categoria: "CHAQUETAS", genero: "Mujer", talla: "L", precio: 125000, stockActual: 8, sucursalId: 1 },
]

/**
 * Conjunto estático de ventas registradas.
 */
export const ventas: Venta[] = [
  { id: 1, sucursalId: 1, usuarioId: 2, fechaVenta: "2024-11-01T10:30:00", total: 235000, metodoPago: "Tarjeta", cliente: "María García", estado: "Completada" },
  { id: 2, sucursalId: 2, usuarioId: 3, fechaVenta: "2024-11-01T14:20:00", total: 211000, metodoPago: "Efectivo", cliente: "Carlos López", estado: "Completada" },
  { id: 3, sucursalId: 1, usuarioId: 2, fechaVenta: "2024-11-02T09:15:00", total: 89000, metodoPago: "Tarjeta", cliente: "Ana Rodríguez", estado: "Completada" },
  { id: 4, sucursalId: 3, usuarioId: 2, fechaVenta: "2024-11-02T16:45:00", total: 144000, metodoPago: "Transferencia", cliente: "Pedro Martínez", estado: "Completada" },
  { id: 5, sucursalId: 1, usuarioId: 2, fechaVenta: "2024-11-03T11:00:00", total: 160000, metodoPago: "Tarjeta", cliente: "Laura Sánchez", estado: "Completada" },
  { id: 6, sucursalId: 2, usuarioId: 3, fechaVenta: "2024-11-03T15:30:00", total: 78000, metodoPago: "Efectivo", cliente: "Jorge Ramírez", estado: "Completada" },
  { id: 7, sucursalId: 1, usuarioId: 2, fechaVenta: "2024-11-04T10:00:00", total: 95000, metodoPago: "Tarjeta", cliente: "Sofía Torres", estado: "Completada" },
  { id: 8, sucursalId: 3, usuarioId: 2, fechaVenta: "2024-11-04T13:20:00", total: 104000, metodoPago: "Efectivo", cliente: "Diego Morales", estado: "Pendiente" },
  { id: 9, sucursalId: 2, usuarioId: 3, fechaVenta: "2024-11-05T09:45:00", total: 203000, metodoPago: "Tarjeta", cliente: "Valentina Cruz", estado: "Completada" },
  { id: 10, sucursalId: 1, usuarioId: 2, fechaVenta: "2024-11-05T14:10:00", total: 137000, metodoPago: "Transferencia", cliente: "Andrés Vargas", estado: "Completada" },
]

/**
 * Conjunto estático de detalles de ventas.
 */
export const detalleVentas: DetalleVenta[] = [
  { id: 1, ventaId: 1, productoId: 1, cantidad: 3, precioUnitario: 35000, subtotal: 105000 },
  { id: 2, ventaId: 1, productoId: 4, cantidad: 2, precioUnitario: 65000, subtotal: 130000 },
  { id: 3, ventaId: 2, productoId: 3, cantidad: 1, precioUnitario: 55000, subtotal: 55000 },
  { id: 4, ventaId: 2, productoId: 5, cantidad: 2, precioUnitario: 78000, subtotal: 156000 },
  { id: 5, ventaId: 3, productoId: 2, cantidad: 1, precioUnitario: 89000, subtotal: 89000 },
  { id: 6, ventaId: 4, productoId: 7, cantidad: 2, precioUnitario: 72000, subtotal: 144000 },
  { id: 7, ventaId: 5, productoId: 6, cantidad: 1, precioUnitario: 95000, subtotal: 95000 },
  { id: 8, ventaId: 5, productoId: 4, cantidad: 1, precioUnitario: 65000, subtotal: 65000 },
  { id: 9, ventaId: 6, productoId: 5, cantidad: 1, precioUnitario: 78000, subtotal: 78000 },
  { id: 10, ventaId: 7, productoId: 6, cantidad: 1, precioUnitario: 95000, subtotal: 95000 },
  { id: 11, ventaId: 8, productoId: 9, cantidad: 2, precioUnitario: 32000, subtotal: 64000 },
  { id: 12, ventaId: 8, productoId: 7, cantidad: 1, precioUnitario: 72000, subtotal: 72000 },
  { id: 13, ventaId: 9, productoId: 10, cantidad: 1, precioUnitario: 125000, subtotal: 125000 },
  { id: 14, ventaId: 9, productoId: 5, cantidad: 1, precioUnitario: 78000, subtotal: 78000 },
  { id: 15, ventaId: 10, productoId: 2, cantidad: 1, precioUnitario: 89000, subtotal: 89000 },
  { id: 16, ventaId: 10, productoId: 8, cantidad: 1, precioUnitario: 48000, subtotal: 48000 },
]

/**
 * Obtiene las ventas dentro de un rango de fechas específico.
 * @param {Date} startDate - Fecha de inicio.
 * @param {Date} endDate - Fecha de fin.
 * @returns {Venta[]} Lista de ventas en el rango especificado.
 */
export function getVentasByDateRange(startDate: Date, endDate: Date): Venta[] {
  return ventas.filter((venta) => {
    const fecha = new Date(venta.fechaVenta)
    return fecha >= startDate && fecha <= endDate
  })
}

/**
 * Obtiene todas las ventas realizadas por un usuario específico.
 * @param {number} usuarioId - ID del usuario.
 * @returns {Venta[]} Ventas asociadas al usuario.
 */
export function getVentasByUsuario(usuarioId: number): Venta[] {
  return ventas.filter((venta) => venta.usuarioId === usuarioId)
}

/**
 * Devuelve todos los productos pertenecientes a una sucursal.
 * @param {number} sucursalId - ID de la sucursal.
 * @returns {Producto[]} Lista de productos disponibles en la sucursal.
 */
export function getProductosBySucursal(sucursalId: number): Producto[] {
  return productos.filter((producto) => producto.sucursalId === sucursalId)
}

/**
 * Devuelve los detalles de una venta específica.
 * @param {number} ventaId - ID de la venta.
 * @returns {DetalleVenta[]} Detalles asociados a la venta.
 */
export function getDetallesByVenta(ventaId: number): DetalleVenta[] {
  return detalleVentas.filter((detalle) => detalle.ventaId === ventaId)
}

/**
 * Calcula el total monetario de ventas en un período determinado.
 * @param {"hoy" | "mes" | "total"} period - Período de cálculo.
 * @returns {number} Total de ventas en el período.
 */
export function getTotalVentasByPeriod(period: "hoy" | "mes" | "total"): number {
  const now = new Date()
  let filtered = ventas

  if (period === "hoy") {
    filtered = ventas.filter((v) => new Date(v.fechaVenta).toDateString() === now.toDateString())
  } else if (period === "mes") {
    filtered = ventas.filter((v) => {
      const fecha = new Date(v.fechaVenta)
      return fecha.getMonth() === now.getMonth() && fecha.getFullYear() === now.getFullYear()
    })
  }

  return filtered.reduce((sum, venta) => sum + venta.total, 0)
}

/**
 * Cuenta la cantidad de ventas realizadas en un período determinado.
 * @param {"hoy" | "mes" | "total"} period - Período a consultar.
 * @returns {number} Número total de ventas en el período.
 */
export function getVentasCount(period: "hoy" | "mes" | "total"): number {
  const now = new Date()
  let filtered = ventas

  if (period === "hoy") {
    filtered = ventas.filter((v) => new Date(v.fechaVenta).toDateString() === now.toDateString())
  } else if (period === "mes") {
    filtered = ventas.filter((v) => {
      const fecha = new Date(v.fechaVenta)
      return fecha.getMonth() === now.getMonth() && fecha.getFullYear() === now.getFullYear()
    })
  }

  return filtered.length
}

/**
 * Calcula el promedio monetario de todas las ventas registradas.
 * @returns {number} Valor promedio de las ventas.
 */
export function getPromedioVenta(): number {
  if (ventas.length === 0) return 0
  const total = ventas.reduce((sum, venta) => sum + venta.total, 0)
  return total / ventas.length
}
