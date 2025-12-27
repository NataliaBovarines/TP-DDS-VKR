import React, { useEffect, useState } from 'react';
import { Empleado } from '../types.ts';
import {
  Mail,
  Trash2,
  Save,
  Search,
  MapPin,
  Phone,
  Edit,
  UserPlus,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import EmpleadoService from '../services/empleadoService.js';
import RolService from '../services/rolService.js';
import UsuarioService from '../services/usuarioService.js';

const Empleados: React.FC = () => {
  // Estados
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Modales
  const [activeModal, setActiveModal] = useState<'ADD' | 'EDIT' | 'DELETE' | null>(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<any | null>(null);

  // Formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rolId, setRolId] = useState<number | ''>('');

  const fetchEmpleados = async (page = 0) => {
    setLoading(true);
    try {
      const data = await EmpleadoService.getEmpleados({ pagina: page });
      setEmpleados(data.content || []);
      setTotalPaginas(data.totalPages || 1);
      setPaginaActual(data.number || 0);
    } catch (error) {
      console.error("Error cargando empleados:", error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await RolService.getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error cargando roles:", error);
    }
  };

  useEffect(() => {
    fetchEmpleados(paginaActual);
    fetchRoles();
  }, [paginaActual]);

  // Gestión de modales
  const abrirCrear = () => {
    setEmpleadoSeleccionado(null);
    setNombre(''); setApellido(''); setDni(''); setDireccion(''); setMail(''); setTelefono(''); setRolId('');
    setActiveModal('ADD');
  };

  const abrirEditar = (emp: any) => {
    setEmpleadoSeleccionado(emp);
    setNombre(emp.nombre || '');
    setApellido(emp.apellido || '');
    setDni(emp.dni || '');
    setDireccion(emp.direccion || '');
    setMail(emp.mail ?? emp.usuario?.email ?? '');
    setTelefono(emp.telefono || '');
    setRolId(emp.usuario?.rol?.id ?? '');
    setActiveModal('EDIT');
  };

  const abrirEliminar = (emp: Empleado) => {
    setEmpleadoSeleccionado(emp);
    setActiveModal('DELETE');
  };

  const guardarCambios = async () => {
    try {
      if (activeModal === 'ADD') {
        await EmpleadoService.crearEmpleado({ nombre, apellido, dni, direccion, mail, telefono, rolId });
      } else if (activeModal === 'EDIT' && empleadoSeleccionado) {
        await EmpleadoService.actualizarEmpleado(empleadoSeleccionado.id, { direccion, mail, telefono });
        if (empleadoSeleccionado.usuario?.id && rolId) {
          await UsuarioService.actualizarRolUsuario(empleadoSeleccionado.usuario.id, { rolId: Number(rolId) });
        }
      }
      setActiveModal(null);
      fetchEmpleados(paginaActual);
    } catch (error) {
      alert("Error al procesar la solicitud");
    }
  };

  const confirmarEliminar = async () => {
    if (!empleadoSeleccionado) return;
    await EmpleadoService.eliminarEmpleado(empleadoSeleccionado.id);
    setActiveModal(null);
    fetchEmpleados(paginaActual);
  };

  return (
    <div className="space-y-6 animate-in p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Personal</h2>
          <p className="text-slate-500 font-medium text-sm">Administración de colaboradores y accesos</p>
        </div>
        <button
          onClick={abrirCrear}
          className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <UserPlus className="w-5 h-5" /> Nuevo Colaborador
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-indigo-500/10 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CONTENEDOR DE CARDS / LOADER */}
      <div className="min-h-[450px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-[40px] z-10 transition-all">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-3" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Cargando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empleados
              .filter((e: any) => {
                const fullString = `${e.nombre} ${e.apellido} ${e.mail ?? ''}`.toLowerCase();
                return fullString.includes(searchTerm.toLowerCase());
              })
              .map((e: any) => (
                <div key={e.id} className="bg-white rounded-[35px] border border-slate-200 shadow-sm p-7 flex flex-col hover:border-indigo-200 transition-all group">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-600 transition-colors">
                      {e.nombre.charAt(0)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-600 border border-indigo-100">
                      {e.usuario?.rol?.nombre ?? 'SIN ROL'}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-800">{e.nombre} {e.apellido}</h4>
                  <p className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-tighter">DNI: {e.dni}</p>

                  <div className="space-y-2.5 mb-6 border-t border-slate-50 pt-4 text-slate-500">
                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-500" /><span className="text-[11px] font-semibold truncate">{e.mail ?? 'Sin mail'}</span></div>
                    <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-500" /><span className="text-[11px] font-semibold">{e.telefono ?? 'Sin teléfono'}</span></div>
                    <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-500" /><span className="text-[11px] font-semibold truncate">{e.direccion ?? 'Sin dirección'}</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button onClick={() => abrirEditar(e)} className="py-3 border border-slate-200 rounded-2xl text-[10px] font-bold uppercase flex justify-center items-center gap-2 hover:bg-slate-50 transition-colors"><Edit className="w-3.5 h-3.5" /> Editar</button>
                    <button onClick={() => abrirEliminar(e)} className="py-3 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-bold uppercase flex justify-center items-center gap-2 hover:bg-rose-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /> Eliminar</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* FOOTER DE PAGINACIÓN REFINADO (MÁS FINO) */}
      <div className="bg-white py-3.5 px-8 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center mt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          Página {paginaActual + 1} <span className="mx-1 text-slate-300">|</span> de {totalPaginas}
        </p>
        <div className="flex items-center gap-3">
          <button
            disabled={paginaActual === 0 || loading}
            onClick={() => setPaginaActual(prev => prev - 1)}
            className="p-1.5 border border-slate-100 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button
            disabled={paginaActual + 1 >= totalPaginas || loading}
            onClick={() => setPaginaActual(prev => prev + 1)}
            className="p-1.5 border border-slate-100 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* MODAL CREAR/EDITAR */}
      {(activeModal === 'ADD' || activeModal === 'EDIT') && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tight">
                {activeModal === 'ADD' ? <UserPlus className="text-indigo-600" /> : <Edit className="text-indigo-600" />}
                {activeModal === 'ADD' ? 'Registrar Colaborador' : 'Editar Colaborador'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">Nombre Completo</label>
                <div className="grid grid-cols-2 gap-4">
                  <input disabled={activeModal === 'EDIT'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20 disabled:opacity-60" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  <input disabled={activeModal === 'EDIT'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20 disabled:opacity-60" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">DNI</label>
                <input disabled={activeModal === 'EDIT'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20 disabled:opacity-60" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">Rol</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20" value={rolId} onChange={(e) => setRolId(Number(e.target.value))}>
                  <option value="">Seleccionar...</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">Email</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">Teléfono</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 ml-1">Dirección</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-indigo-500/20" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <button onClick={() => setActiveModal(null)} className="py-4 border border-slate-200 rounded-2xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50">Cancelar</button>
              <button onClick={guardarCambios} className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-sm flex justify-center items-center gap-2 shadow-xl shadow-indigo-100"><Save className="w-4 h-4" /> Registrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ELIMINAR */}
      {activeModal === 'DELETE' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-[40px] w-full max-w-md shadow-2xl text-center">
            <h3 className="text-xl font-bold text-rose-600 mb-2 uppercase tracking-tight">¿Eliminar registro?</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Esta acción dará de baja a <b>{empleadoSeleccionado?.nombre} {empleadoSeleccionado?.apellido}</b>.</p>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveModal(null)} className="py-4 border border-slate-200 rounded-2xl text-slate-400 font-bold text-xs uppercase hover:bg-slate-50">Volver</button>
              <button onClick={confirmarEliminar} className="bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-rose-100">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;