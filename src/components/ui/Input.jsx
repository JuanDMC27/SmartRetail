import React from 'react'

/**
 * Une múltiples clases en una sola cadena, ignorando valores falsos o indefinidos.
 * @param {...string} classes - Lista de clases CSS.
 * @returns {string} Clases concatenadas.
 */
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Campo de entrada genérico y accesible con soporte para Tailwind CSS y temas claros/oscuro.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} [props.type='text'] - Tipo de input (por ejemplo: 'text', 'email', 'password', 'file').
 * @param {string} [props.className] - Clases adicionales personalizadas.
 * @param {boolean} [props.disabled] - Si el campo está deshabilitado.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [props] - Atributos nativos del input.
 * @returns {JSX.Element} Campo de entrada estilizado.
 */
export function Input({
  type = 'text',
  className,
  disabled,
  ...props
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      className={cn(
        'w-full min-w-0 h-9 px-3 py-1 text-base md:text-sm rounded-md border bg-transparent shadow-sm outline-none transition-all',
        'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
        'file:bg-transparent file:border-0 file:text-sm file:font-medium file:text-gray-700 file:dark:text-gray-200',
        'selection:bg-blue-600 selection:text-white',
        className
      )}
      {...props}
    />
  )
}
