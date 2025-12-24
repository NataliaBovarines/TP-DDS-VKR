
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingBag, Users, AlertTriangle, Package } from 'lucide-react';
import { Producto } from '../types.ts';

const MOCK_PRODUCTS: Producto[] = [
  { 
    id: '1', nombre: 'Remera Basic Blanca', categoria: 'Remeras', subcategoria: 'Básicos', proveedor: 'Textil Sur', descripcion: 'Remera de algodón premium', precioBase: 1500,
    variantes: [{ id: 'v1', sku: 'REM-B', color: 'Blanco', talle: 'M', stockDisponible: 3, stockReservado: 2, stockMinimo: 5 }]
  },
  { 
    id: '2', nombre: 'Jeans Blue Denim', categoria: 'Pantalones', subcategoria: 'Denim', proveedor: 'Denim Corp', descripcion: 'Jeans calce perfecto', precioBase: 4500,
    variantes: [{ id: 'v2', sku: 'JEAN-D', color: 'Azul', talle: '42', stockDisponible: 2, stockReservado: 0, stockMinimo: 10 }]
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dataVentas = [
    { name: 'Lun', ventas: 4000 },
    { name: 'Mar', ventas: 3000 },
    { name: 'Mie', ventas: 2000 },
    { name: 'Jue', ventas: 2780 },
    { name: 'Vie', ventas: 1890 },
    { name: 'Sab', ventas: 2390 },
    { name: 'Dom', ventas: 3490 },
  ];

  const criticalProducts = MOCK_PRODUCTS.filter(p => 
    p.variantes.some(v => v.stockDisponible <= v.stockMinimo)
  );

  return (
    <div className="space-y-8 animate-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ventas del Mes" value="$125,400" icon={TrendingUp} color="bg-emerald-500" />
        <StatCard title="Reservas Activas" value="12" icon={ShoppingBag} color="bg-indigo-500" />
        <StatCard title="Clientes Confiables" value="145" icon={Users} color="bg-amber-500" />
        <StatCard title="Stock Crítico" value={criticalProducts.length.toString()} icon={AlertTriangle} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-8 text-slate-800 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Rendimiento Comercial
          </h3>
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataVentas}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                />
                <Area type="monotone" dataKey="ventas" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-8 text-slate-800 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Alertas de Stock
          </h3>
          <div className="space-y-3">
            {criticalProducts.map(p => p.variantes.filter(v => v.stockDisponible <= v.stockMinimo).map(v => (
              <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl border border-slate-100 text-slate-400 shadow-sm">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-base leading-tight">{p.nombre}</p>
                    <p className="text-sm text-slate-400 font-medium mt-0.5">{v.sku} • {v.color}/{v.talle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-rose-600 leading-none">{v.stockDisponible}</p>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">Disp.</p>
                </div>
              </div>
            )))}
            <button 
              onClick={() => navigate('/productos')}
              className="w-full mt-4 py-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100 active:scale-[0.98] uppercase tracking-wider"
            >
              Ver Inventario Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 hover:border-indigo-300 transition-all cursor-default">
    <div className={`${color} p-3 rounded-xl text-white shadow-lg shadow-slate-100`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);

export default Dashboard;
