import React from "react";

export default function FormNewEmpleado({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo desenfocado */}
     <div
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
     />


      {/* Modal */}
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md z-10">
        <h2 className="text-lg font-semibold mb-1">Añadir Nuevo Empleado</h2>
        <p className="text-sm text-gray-500 mb-4">
          Completa los datos del empleado. Guarda cuando termines.
        </p>

        {/* Formulario */}
        <form className="space-y-3">
          <div>
            <label className="text-sm font-medium">Nombre Completo</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="empleado@empresa.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Puesto</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Ej. Sales Manager"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Departamento</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              placeholder="Ej. Marketing"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Fecha de Ingreso</label>
            <input
              type="date"
              className="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Estado</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-lg">
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
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
            Añadir Empleado
          </button>
        </div>
      </div>
    </div>
  );
}
