import { useState, useEffect } from "react";
import ProductoService from "../services/productoService.js";
import CategoriaService from "../services/categoriaService.js";
import ProveedorService from "../services/proveedorService.js";

export default function FormNewProducto({ onClose, onSuccess }) {
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    subcategoriaId: "",
    proveedorId: "",
    precio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, provs] = await Promise.all([
          CategoriaService.getCategorias(),
          ProveedorService.getProveedores(),
        ]);
        setCategorias(cats);
        setProveedores(provs);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim() || null,
      subcategoriaId: Number(form.subcategoriaId),
      proveedorId: form.proveedorId ? Number(form.proveedorId) : null,
      precio: parseInt(form.precio),
    };

    try {
      await ProductoService.crearProducto(payload);
      onSuccess(); 
      onClose();
    } catch (error) {
      console.error("Error backend:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-lg z-10">
        <h2 className="text-xl font-bold text-gray-800">Agregar Nuevo Producto</h2>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Nombre */}
          <div>
            <label className="label">Nombre del Producto *</label>
            <input
              name="nombre"
              required
              maxLength={100}
              value={form.nombre}
              onChange={handleChange}
              className="input-base input-normal"
              placeholder="Ej. Remera Oversize"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="label">Descripción</label>
            <textarea
              name="descripcion"
              maxLength={500}
              value={form.descripcion}
              onChange={handleChange}
              className="input-base input-normal h-24"
              placeholder="Detalles del producto..."
            />
          </div>

          {/* Subcategoría */}
          <div>
            <label className="label">Subcategoría *</label>
            <select
              name="subcategoriaId"
              required
              value={form.subcategoriaId}
              onChange={handleChange}
              className="input-base input-normal"
            >
              <option value="">Seleccione una subcategoría</option>
              {categorias.map((cat) => (
                <optgroup key={cat.id} label={cat.descripcion}>
                  {cat.subcategorias?.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.descripcion}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Precio */}
            <div>
              <label className="label">Precio ($) *</label>
              <input
                name="precio"
                type="number"
                min="0"
                required
                value={form.precio}
                onChange={handleChange}
                className="input-base input-normal"
                placeholder="0"
              />
            </div>

            {/* Proveedor */}
            <div>
              <label className="label">Proveedor</label>
              <select
                name="proveedorId"
                value={form.proveedorId}
                onChange={handleChange}
                className="input-base input-normal"
              >
                <option value="">Sin proveedor</option>
                {proveedores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.descripcion}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-outline w-auto px-6"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-auto px-6"
            >
              {loading ? "Enviando..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
