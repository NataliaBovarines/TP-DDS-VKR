
import React, { useState } from 'react';
import { Empleado, UserRole, Permission } from '../types.ts';
import { Users, Shield, Mail, UserCheck, Trash2, Edit, ChevronLeft, ChevronRight, Save, Search } from 'lucide-react';

const MOCK_EMPLEADOS: Empleado[] = [
  { id: '1', nombre: 'Admin Vikiara', email: 'admin@vikiara.com', rol: UserRole.OWNER, permisos: [Permission.ALL] },
  { id: '2', nombre: 'Carlos Vendedor', email: 'carlos@vikiara.com', rol: UserRole.EMPLOYEE, permisos: [Permission.VENTAS, Permission.CLIENTES] },
  { id: '3', nombre: 'Elena Lopez', email: 'elena@vikiara.com', rol: UserRole.EMPLOYEE, permisos: [Permission.PRODUCTOS, Permission.STOCKS] },
];

const Empleados: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'ADD' | 'EDIT_ROLE' | 'DELETE' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Personal</h2>
          <p className="text-slate-500 font-medium mt-1">Control de acceso dinámico y roles operativos</p>
        </div>
        <button onClick={() => setActiveModal('ADD')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95">
          <Users className="w-5 h-5" /> Nuevo Colaborador
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar colaborador por nombre o email..." 
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_EMPLEADOS.filter(e => e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || e.email.toLowerCase().includes(searchTerm.toLowerCase())).map(emp => (
          <div key={emp.id} className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white font-bold text-2xl shadow-lg
                ${emp.rol === UserRole.OWNER ? 'bg-indigo-600 shadow-indigo-100' : 'bg-slate-800 shadow-slate-100'}
              `}>
                {emp.nombre.charAt(0)}
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                ${emp.rol === UserRole.OWNER ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-700'}
              `}>
                {emp.rol}
              </span>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{emp.nombre}</h4>
              <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {emp.email}
              </p>
            </div>
            
            <div className="flex-1 border-t border-slate-50 pt-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-3 h-3 text-indigo-500" /> Privilegios de Acceso
              </p>
              <div className="flex flex-wrap gap-2">
                {emp.permisos.map(p => (
                  <span key={p} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl border border-slate-100 uppercase tracking-wide">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <button onClick={() => setActiveModal('EDIT_ROLE')} className="py-4 bg-white border border-slate-200 rounded-[20px] text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm">
                <UserCheck className="w-4 h-4" /> Editar Rol
              </button>
              <button onClick={() => setActiveModal('DELETE')} className="py-4 bg-rose-50 text-rose-600 rounded-[20px] text-[11px] font-bold uppercase tracking-wider hover:bg-rose-100 transition-all flex items-center justify-center gap-2 border border-rose-100">
                <Trash2 className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="bg-white px-8 py-4 border border-slate-200 rounded-3xl flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider shadow-sm">
        <span>Página 1 de 1</span>
        <div className="flex gap-2">
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all"><ChevronLeft className="w-5 h-5" /></button>
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in duration-200">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">{activeModal.replace('_', ' ')} COLABORADOR</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Nombre Completo</label>
                <input placeholder="Ej: Juan Pérez" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Email de Trabajo</label>
                <input placeholder="juan@vikiara.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Rol Operativo</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none">
                  <option>Seleccionar Rol...</option>
                  <option>{UserRole.EMPLOYEE}</option>
                  <option>{UserRole.OWNER}</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-5 font-bold text-sm text-slate-400 hover:text-slate-600">Cerrar</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-5 bg-indigo-600 text-white rounded-[24px] font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"><Save className="w-4 h-4" /> Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
