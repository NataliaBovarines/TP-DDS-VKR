
import React, { useState } from 'react';
import { Cliente, ClienteEstado } from '../types.ts';
import { UserPlus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Save, UserCheck, UserX, Wallet, CreditCard } from 'lucide-react';

const MOCK_CLIENTS: Cliente[] = [
  { id: 'c1', nombre: 'Juan Perez', dni: '12345678', email: 'juan@mail.com', telefono: '11223344', estado: ClienteEstado.CONFIABLE, limiteCredito: 50000, deudaActual: 1500 },
  { id: 'c3', nombre: 'Roberto Gomez', dni: '44556677', email: 'roberto@mail.com', telefono: '11889900', estado: ClienteEstado.NO_CONFIABLE, limiteCredito: 0, deudaActual: 0 },
];

const Clientes: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'ADD' | 'EDIT' | 'DELETE' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Clientes</h2>
          <p className="text-slate-500 font-medium mt-1">Cartera de clientes y perfiles crediticios</p>
        </div>
        <button 
          onClick={() => setActiveModal('ADD')} 
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar matching Empleados style */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar por nombre, DNI o teléfono..." 
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CLIENTS.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || c.dni.includes(searchTerm)).map(cliente => (
          <div key={cliente.id} className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white font-bold text-2xl shadow-lg
                ${cliente.estado === ClienteEstado.CONFIABLE ? 'bg-indigo-600 shadow-indigo-100' : 'bg-slate-400 shadow-slate-100'}
              `}>
                {cliente.nombre.charAt(0)}
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
                ${cliente.estado === ClienteEstado.CONFIABLE ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}
              `}>
                {cliente.estado === ClienteEstado.CONFIABLE ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                {cliente.estado}
              </span>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{cliente.nombre}</h4>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                DNI: {cliente.dni} • TEL: {cliente.telefono}
              </p>
            </div>
            
            <div className="flex-1 border-t border-slate-50 pt-6 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-3 h-3 text-indigo-500" /> Perfil de Crédito
              </p>
              
              <div className="bg-slate-50 p-5 rounded-[24px] space-y-3 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Capacidad de Crédito</span>
                  <span className="font-bold text-slate-800 text-sm">${cliente.limiteCredito}</span>
                </div>
                <div className="h-px bg-slate-200/50"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Deuda Actual</span>
                  <span className={`font-bold text-sm ${cliente.deudaActual > 0 ? 'text-rose-600' : 'text-slate-800'}`}>${cliente.deudaActual}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button onClick={() => setActiveModal('EDIT')} className="py-4 bg-white border border-slate-200 rounded-[20px] text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button onClick={() => setActiveModal('DELETE')} className="py-4 bg-rose-50 text-rose-600 rounded-[20px] text-[11px] font-bold uppercase tracking-wider hover:bg-rose-100 transition-all flex items-center justify-center gap-2 border border-rose-100">
                <Trash2 className="w-4 h-4" /> Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination matching Empleados style */}
      <div className="bg-white px-8 py-4 border border-slate-200 rounded-3xl flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider shadow-sm">
        <span>Página 1 de 1</span>
        <div className="flex gap-2">
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all"><ChevronLeft className="w-5 h-5" /></button>
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      {activeModal && activeModal !== 'DELETE' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">{activeModal === 'ADD' ? 'NUEVO CLIENTE' : 'EDITAR CLIENTE'}</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Nombre Completo</label>
                <input placeholder="Ej: Juan Pérez" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase">DNI</label>
                  <input placeholder="12.345.678" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Teléfono</label>
                  <input placeholder="+54 9 11..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Límite de Crédito</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 pl-10 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-5 font-bold text-sm text-slate-400 hover:text-slate-600">Cerrar</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-5 bg-indigo-600 text-white rounded-[24px] font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"><Save className="w-4 h-4" /> Guardar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
