import { useState } from "react";
import ProductoService from "../services/productoService.js";

export default function FormNewProducto({ onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stockActual: "",
    categoria: "",
    subcategoria: "",
    talle: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // const handleSubmit = async () => {
  //   try {
  //     await ProductoService.crearProducto({
  //       nombre: form.nombre,
  //       descripcion: form.descripcion,
  //       precio: Number(form.precio),
  //       // adaptá esto a tu DTO real
  //     });

  //     onSuccess(); // recargar productos
  //     onClose();   // cerrar modal
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error al crear el producto");
  //   }
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-white/20 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg z-10">
        <h2 className="text-lg font-semibold">Agregar Nuevo Producto</h2>
        <p className="text-sm text-gray-500 mb-4">
          Completá la información del producto para agregarlo al inventario.
        </p>

        <form className="grid grid-cols-1 gap-3">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium">Nombre del Producto</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-sm font-medium">Descripción</label>
            <input
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Precio y Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Precio ($)</label>
              <input
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Stock Disponible</label>
              <input
                name="stockActual"
                value={form.stockActual}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="text-sm font-medium">Categoría</label>
            <select className="mt-1 w-full px-3 py-2 border rounded-lg">
              <option>Seleccionar categoría</option>
              <option>Camisas</option>
              <option>Pantalones</option>
              <option>Vestidos</option>
              <option>Accesorios</option>
            </select>
          </div>

          {/* Subcategoría */}
          <div>
            <label className="text-sm font-medium">Subcategoría</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-lg"
              placeholder="Ej. Manga larga, Casual, Deportivo"
            />
          </div>

          {/* Variantes opcionales */}
          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Talle (opcional)"
            />
            <input
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Color (opcional)"
            />
          </div>
        </form>

        {/* Botones */}
        <div className="flex justify-end mt-5 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
            Agregar Producto
          </button>
        </div>
      </div>
    </div>
  );
}
