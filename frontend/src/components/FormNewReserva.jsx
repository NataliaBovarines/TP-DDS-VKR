// src/components/FormNewReserva.jsx
import { useState } from "react";

export default function FormNewReserva({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-1">Crear Nueva Reserva</h2>
        <p className="text-sm text-gray-500 mb-4">
          Registrá los datos del cliente y la reserva.
        </p>

        <form className="space-y-4">

          {/* Nombre */}
          <div>
            <label className="text-sm font-medium">Nombre del Cliente</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
              placeholder="Nombre completo"
            />
          </div>

          {/* Tel + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                placeholder="+52 123 456 7890"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                placeholder="cliente@email.com"
              />
            </div>
          </div>

          {/* Fecha */}
          <div>
            <label className="text-sm font-medium">Fecha de Reserva</label>
            <input
              type="date"
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm font-medium">Estado</label>
            <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm">
              <option>Pendiente</option>
              <option>Confirmada</option>
              <option>Completada</option>
            </select>
          </div>

          {/* Notas */}
          <div>
            <label className="text-sm font-medium">Notas Adicionales</label>
            <textarea
              className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
              rows={3}
              placeholder="Detalles de la reserva, productos reservados, etc."
            ></textarea>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600"
            >
              Cancelar
            </button>

            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Crear Reserva
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
