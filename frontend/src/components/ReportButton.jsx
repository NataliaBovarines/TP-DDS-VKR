import { Link } from "react-router-dom";

export default function ReportButton() {
  return (
    <Link
      to="/reports"
      className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition"
    >
      📊 Generar Reportes
    </Link>
  );
}
