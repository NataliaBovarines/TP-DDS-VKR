import {
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Plus,
} from "lucide-react";

/**
 * Estilo base para iconos interactivos
 */
const base =
  "cursor-pointer transition text-gray-500 hover:text-gray-900";

/**
 * Ícono editar (lápiz)
 */
export const IconEdit = ({ size = 16, className = "", ...props }) => (
  <Pencil
    size={size}
    className={`${base} ${className}`}
    {...props}
  />
);

/**
 * Ícono eliminar
 */
export const IconDelete = ({ size = 16, className = "", ...props }) => (
  <Trash2
    size={size}
    className={`cursor-pointer text-danger hover:opacity-80 transition ${className}`}
    {...props}
  />
);

/**
 * Ícono cerrar (X)
 */
export const IconClose = ({ size = 20, className = "", ...props }) => (
  <X
    size={size}
    className={`${base} ${className}`}
    {...props}
  />
);

/**
 * Ícono advertencia (stock bajo)
 */


export const IconWarning = ({ size = 16, className = "" }) => (
  <AlertTriangle
    size={size}
    color="#f3023e"   
    className={className}
  />
);



/**
 * Ícono agregar (+)
 */
export const IconAdd = ({ size = 18, className = "", ...props }) => (
  <Plus
    size={size}
    className={`${base} ${className}`}
    {...props}
  />
);
