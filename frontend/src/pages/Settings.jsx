export default function Settings() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Configuración del Sistema</h2>
      <p className="text-sm text-gray-500 mb-4">
        Ajustá la información general de tu tienda y la cuenta de usuario.
      </p>

      <div className="bg-white rounded-xl shadow p-4 max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre de la tienda</label>
          <input
            type="text"
            placeholder="Mi Tienda"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <input
            type="file"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
