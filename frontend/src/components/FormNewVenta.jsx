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
        </div>
              </div>

   );
}   