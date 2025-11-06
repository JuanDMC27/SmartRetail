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
 * Variantes visuales predefinidas para el componente Button.
 */
const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-900',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  ghost: 'hover:bg-gray-100 text-gray-800',
  link: 'text-blue-600 underline-offset-4 hover:underline',
}

/**
 * Tamaños disponibles para el componente Button.
 */
const sizes = {
  default: 'h-9 px-4 py-2 text-sm',
  sm: 'h-8 px-3 py-1.5 text-sm',
  lg: 'h-10 px-6 py-2 text-base',
  icon: 'w-9 h-9 flex items-center justify-center',
}

/**
 * Componente de botón reutilizable con soporte para variantes, tamaños y elementos personalizados.
 *
 * @param {object} props - Propiedades del componente.
 * @param {'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'} [props.variant='default'] - Variante visual del botón.
 * @param {'default' | 'sm' | 'lg' | 'icon'} [props.size='default'] - Tamaño del botón.
 * @param {React.ElementType} [props.as='button'] - Tipo de elemento a renderizar (por ejemplo, 'button', 'a', 'div').
 * @param {string} [props.className] - Clases adicionales de Tailwind o CSS.
 * @param {boolean} [props.disabled] - Si está deshabilitado.
 * @param {React.ReactNode} [props.children] - Contenido interno del botón.
 * @returns {JSX.Element} Botón estilizado y accesible.
 */
export function Button({
  variant = 'default',
  size = 'default',
  as: Comp = 'button',
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  )
}
