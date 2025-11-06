/**
 * @file cn.js
 * @description Utilidad para combinar clases de Tailwind CSS de forma segura y eficiente.
 * Usa `clsx` para manejar condicionales y `tailwind-merge` para resolver conflictos.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina dinámicamente múltiples clases CSS asegurando compatibilidad con Tailwind.
 *
 * @param {...(string | boolean | undefined | null | Record<string, boolean>)} inputs
 *  Lista de clases, condicionales o expresiones.
 *
 * @returns {string} Cadena final de clases unificada y optimizada.
 *
 * @example
 * cn('px-4', isActive && 'bg-blue-500', 'text-white')
 * // → "px-4 bg-blue-500 text-white"
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
