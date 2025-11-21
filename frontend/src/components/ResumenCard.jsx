export default function ResumenCard({ title, value, color, icon }) {
  return (
    <div
      className={`flex flex-col justify-center border rounded-lg p-4 shadow-sm hover:shadow-md transition ${color} bg-opacity-30`}
    >
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
