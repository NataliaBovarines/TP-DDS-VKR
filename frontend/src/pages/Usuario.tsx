
import React, { useState } from 'react';
import { UserCircle, Key, LogOut, Mail, ChevronRight, Save, ShieldCheck } from 'lucide-react';
import AuthService from '../services/authService.js';

const Usuario: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-32 h-32 bg-indigo-600 text-white rounded-[40px] mx-auto flex items-center justify-center shadow-2xl shadow-indigo-200">
          <UserCircle className="w-20 h-20" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Administrador VKR</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2">
            <Mail className="w-4 h-4" /> admin@vikiara.com
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Dueño del Negocio</span>
          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Sesión Activa</span>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50/50 border-b font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] px-8 text-center">Seguridad de Cuenta</div>
        <div className="divide-y divide-slate-100">
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="w-full p-8 flex items-center justify-between hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-white group-hover:text-indigo-600 shadow-sm transition-all"><Key className="w-6 h-6" /></div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Cambiar Contraseña</p>
                <p className="text-xs font-medium text-slate-400 mt-1">Actualiza tu clave de acceso de forma segura</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </button>
          
          <button onClick={() => AuthService.logout()} className="w-full p-10 flex items-center justify-center gap-3 text-rose-600 font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-50 transition-all">
            <LogOut className="w-5 h-5" /> Cerrar Sesión Segura
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl p-12 space-y-10 animate-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Actualizar Clave</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asegúrate de usar una clave robusta</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Clave Actual</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-[24px] p-5 font-bold focus:ring-4 focus:ring-indigo-500/10" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Clave</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-[24px] p-5 font-bold focus:ring-4 focus:ring-indigo-500/10" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar Nueva Clave</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-[24px] p-5 font-bold focus:ring-4 focus:ring-indigo-500/10" />
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-5 font-black text-[10px] uppercase text-slate-400 tracking-widest">Cancelar</button>
              <button onClick={() => setShowPasswordModal(false)} className="flex-[2] py-5 bg-indigo-600 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                <Save className="w-4 h-4" /> Confirmar Cambio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuario;
