
import React, { useState } from 'react';
import { 
  Settings, Save, Building2, AlertTriangle, Plus, Trash2, Shield, Layers, Tag, Palette, Ruler, Truck, ChevronRight,
  CheckSquare, Square, CalendarDays, Bell, MessageCircle, Mail
} from 'lucide-react';
import { Permission, CatalogoItem } from '../types.ts';

const Configuracion: React.FC = () => {
  const [activeCatalog, setActiveCatalog] = useState<'GENERAL' | 'CATALOGOS'>('GENERAL');
  const [selectedSubCatalog, setSelectedSubCatalog] = useState<'ROLES' | 'CATEGORIAS' | 'SUBCATEGORIAS' | 'COLORES' | 'TALLES' | 'PROVEEDORES'>('CATEGORIAS');
  const [showAddModal, setShowAddModal] = useState(false);

  // States for general settings
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsApp, setNotifWhatsApp] = useState(false);

  // Permissions state per Role (Demonstrative)
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, boolean>>>({
    '1': { [Permission.VENTAS]: true, [Permission.PRODUCTOS]: true, [Permission.CLIENTES]: true, [Permission.RESERVAS]: true, [Permission.STOCKS]: true }, // Senior
    '2': { [Permission.VENTAS]: true, [Permission.CLIENTES]: true, [Permission.RESERVAS]: true }, // Junior
  });

  const togglePermission = (roleId: string, perm: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [perm]: !prev[roleId]?.[perm]
      }
    }));
  };

  const catalogs: Record<string, CatalogoItem[]> = {
    CATEGORIAS: [{ id: '1', nombre: 'Remeras' }, { id: '2', nombre: 'Pantalones' }, { id: '3', nombre: 'Accesorios' }],
    COLORES: [{ id: '1', nombre: 'Negro' }, { id: '2', nombre: 'Blanco' }, { id: '3', nombre: 'Azul Marino' }],
    TALLES: [{ id: '1', nombre: 'S' }, { id: '2', nombre: 'M' }, { id: '3', nombre: 'L' }, { id: '4', nombre: 'XL' }],
    PROVEEDORES: [{ id: '1', nombre: 'Textil Sur S.A.' }, { id: '2', nombre: 'Importadora Denim' }],
    ROLES: [{ id: '1', nombre: 'Vendedor Senior' }, { id: '2', nombre: 'Supervisor de Caja' }],
    SUBCATEGORIAS: [{ id: '1', nombre: 'Manga Corta' }, { id: '2', nombre: 'Slim Fit' }]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Configuración</h2>
          <p className="text-slate-500 font-medium mt-1">Personaliza el motor de negocio y maestros</p>
        </div>
        <div className="bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm flex items-center">
          <button 
            onClick={() => setActiveCatalog('GENERAL')} 
            className={`px-8 py-3 rounded-[18px] text-sm font-bold tracking-tight transition-all ${activeCatalog === 'GENERAL' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Ajustes Generales
          </button>
          <button 
            onClick={() => setActiveCatalog('CATALOGOS')} 
            className={`px-8 py-3 rounded-[18px] text-sm font-bold tracking-tight transition-all ${activeCatalog === 'CATALOGOS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Catálogos Maestros
          </button>
        </div>
      </div>

      {activeCatalog === 'GENERAL' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-600" /> Datos del Negocio
              </h4>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Razón Social</label>
                  <input type="text" defaultValue="VIKIARA INDUMENTARIA" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Eslogan</label>
                  <input type="text" defaultValue="Gestión Inteligente de Tienda" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Gestión de Inventario
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Alerta Stock</label>
                  <input type="number" defaultValue={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-slate-900 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Días Cancelación</label>
                  <input type="number" defaultValue={30} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-slate-900 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-indigo-600" /> Políticas de Crédito
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Seña Mínima (%)</label>
                  <input type="number" defaultValue={25} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-indigo-600 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Validez (Días)</label>
                  <input type="number" defaultValue={90} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-indigo-600 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-600" /> Canales de Notificación
              </h4>
              <div className="space-y-5">
                <div 
                  onClick={() => setNotifEmail(!notifEmail)}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer group hover:bg-white hover:border-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-all ${notifEmail ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 tracking-tight">Email Marketing</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">Avisos de stock y promociones</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all relative ${notifEmail ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifEmail ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </div>

                <div 
                  onClick={() => setNotifWhatsApp(!notifWhatsApp)}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer group hover:bg-white hover:border-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-all ${notifWhatsApp ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400'}`}>
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 tracking-tight">WhatsApp API</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">Notificaciones de reserva</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all relative ${notifWhatsApp ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifWhatsApp ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-bold text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95">
              <Save className="w-5 h-5" /> 
              Guardar Motor de Negocio
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4">
          <div className="lg:col-span-3 space-y-3">
            {[
              { id: 'CATEGORIAS', icon: Layers, label: 'Categorías' },
              { id: 'SUBCATEGORIAS', icon: Tag, label: 'Subcategorías' },
              { id: 'COLORES', icon: Palette, label: 'Colores' },
              { id: 'TALLES', icon: Ruler, label: 'Talles' },
              { id: 'PROVEEDORES', icon: Truck, label: 'Proveedores' },
              { id: 'ROLES', icon: Shield, label: 'Roles' },
            ].map((sub) => (
              <button 
                key={sub.id} 
                onClick={() => setSelectedSubCatalog(sub.id as any)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-[24px] text-sm font-bold tracking-tight transition-all
                  ${selectedSubCatalog === sub.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-300 hover:text-slate-600'}
                `}
              >
                <div className="flex items-center gap-4">
                  <sub.icon className="w-4 h-4" />
                  {sub.label}
                </div>
                {selectedSubCatalog === sub.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>

          <div className="lg:col-span-9 bg-white p-8 lg:p-12 rounded-[40px] border border-slate-200 shadow-sm flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-1">Maestro de Datos</h4>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedSubCatalog}</h3>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-[18px] font-bold text-sm tracking-tight flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                <Plus className="w-4 h-4" /> Nuevo Registro
              </button>
            </div>

            <div className="flex-1 space-y-3">
              {(catalogs[selectedSubCatalog] || []).map(item => (
                <div key={item.id} className="group flex flex-col p-6 bg-slate-50 rounded-[30px] border border-transparent hover:border-indigo-100 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-800 text-lg leading-none tracking-tight">{item.nombre}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-white text-slate-300 hover:text-rose-600 rounded-xl transition-all border border-slate-100 shadow-sm"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>

                  {selectedSubCatalog === 'ROLES' && (
                    <div className="bg-white/60 p-6 rounded-2xl border border-slate-100 mt-2">
                      <h5 className="text-xs font-bold text-slate-400 tracking-tight mb-4">Configuración de Permisos</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.values(Permission).filter(p => p !== Permission.ALL).map((perm) => (
                          <div 
                            key={perm} 
                            onClick={() => togglePermission(item.id, perm)}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div className={`transition-all transform active:scale-90 ${rolePermissions[item.id]?.[perm] ? 'text-indigo-600' : 'text-slate-200'}`}>
                              {rolePermissions[item.id]?.[perm] ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                            </div>
                            <span className={`text-xs font-bold tracking-tight ${rolePermissions[item.id]?.[perm] ? 'text-slate-900' : 'text-slate-400'}`}>
                              {perm}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl p-12 space-y-10 animate-in zoom-in duration-300">
            <div className="text-center">
              <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-2">Acción de Catálogo</h4>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Agregar Item</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-700 tracking-tight mb-2 block ml-1">Nombre del Registro</label>
                <input type="text" placeholder="Ej: Nueva Colección..." className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-5 font-bold text-sm text-slate-400 tracking-tight">Cancelar</button>
              <button onClick={() => setShowAddModal(false)} className="flex-[2] py-5 bg-indigo-600 text-white rounded-[24px] font-bold text-sm tracking-tight shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">Confirmar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuracion;
