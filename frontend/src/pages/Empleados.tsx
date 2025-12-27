import React, { useEffect, useState } from 'react';
import { Empleado } from '../types.ts';
import {
  Users,
  Shield,
  Mail,
  UserCheck,
  Trash2,
  Save,
  Search,
} from 'lucide-react';

import EmpleadoService from '../services/empleadoService.js';
import RolService from '../services/rolService.js';
import UsuarioService from '../services/usuarioService.js';

const Empleados: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [activeModal, setActiveModal] =
    useState<'ADD' | 'EDIT_ROLE' | 'DELETE' | null>(null);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<any | null>(null);

  // ===== form crear =====
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rolId, setRolId] = useState<number | ''>('');

  // ===== editar rol =====
  const [nuevoRolId, setNuevoRolId] = useState<number | ''>('');

  // =======================
  // CARGAR DATOS
  // =======================
  const fetchEmpleados = async () => {
    const data = await EmpleadoService.getEmpleados();
    setEmpleados(data.content ?? data);
  };

  const fetchRoles = async () => {
    const data = await RolService.getRoles();
    setRoles(data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // =======================
  // CREAR EMPLEADO
  // =======================
  const abrirCrear = async () => {
    await fetchRoles();
    setNombre('');
    setApellido('');
    setDni('');
    setDireccion('');
    setMail('');
    setTelefono('');
    setRolId('');
    setActiveModal('ADD');
  };

  const crearEmpleado = async () => {
    await EmpleadoService.crearEmpleado({
      nombre,
      apellido,
      dni,
      direccion,
      mail,
      telefono,
      rolId,
    });

    setActiveModal(null);
    fetchEmpleados();
  };

  // =======================
  // EDITAR ROL
  // =======================
  const abrirEditarRol = async (emp: Empleado) => {
    const usuario = (emp as any).usuario;
    if (!usuario) return;

    await fetchRoles();
    setEmpleadoSeleccionado(emp as any);
    setNuevoRolId(usuario.rol?.id ?? '');
    setActiveModal('EDIT_ROLE');
  };

  const guardarRol = async () => {
    const usuario = empleadoSeleccionado?.usuario;
    if (!usuario || !nuevoRolId) return;

    await UsuarioService.actualizarRolUsuario(usuario.id, {
      rolId: nuevoRolId,
    });

    setActiveModal(null);
    fetchEmpleados();
  };

  // =======================
  // ELIMINAR
  // =======================
  const abrirEliminar = (emp: Empleado) => {
    setEmpleadoSeleccionado(emp as any);
    setActiveModal('DELETE');
  };

  const confirmarEliminar = async () => {
    if (!empleadoSeleccionado) return;

    await EmpleadoService.eliminarEmpleado(empleadoSeleccionado.id);
    setActiveModal(null);
    fetchEmpleados();
  };

  return (
    <div className="space-y-8 animate-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Gestión de Personal
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Control de acceso dinámico y roles operativos
          </p>
        </div>
        <button
          onClick={abrirCrear}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all"
        >
          <Users className="w-5 h-5" /> Nuevo Colaborador
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar colaborador por nombre o email..."
          className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {empleados
          .filter((e) => {
            const emp: any = e;
            const mailEmp = emp.mail ?? emp.email ?? emp.usuario?.email ?? '';
            const apellidoEmp = emp.apellido ?? '';
            return (
              emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              apellidoEmp.toLowerCase().includes(searchTerm.toLowerCase()) ||
              mailEmp.toLowerCase().includes(searchTerm.toLowerCase())
            );
          })
          .map((e) => {
            const emp: any = e;
            const mailEmp = emp.mail ?? emp.email ?? emp.usuario?.email ?? '';
            const apellidoEmp = emp.apellido ?? '';

            return (
              <div
                key={emp.id}
                className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[24px] bg-slate-800 flex items-center justify-center text-white font-bold text-2xl">
                    {emp.nombre.charAt(0)}
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase bg-slate-50 text-slate-700">
                    {emp.usuario?.rol?.nombre ?? 'SIN ROL'}
                  </span>
                </div>

                <h4 className="text-xl font-bold mb-2">
                  {emp.nombre} {apellidoEmp}
                </h4>

                <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {mailEmp}
                </p>

                <div className="mt-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex gap-2">
                    <Shield className="w-3 h-3 text-indigo-500" />
                    Privilegios
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {emp.usuario?.rol?.permisos?.map((p: any) => (
                      <span
                        key={p.codigo}
                        className="px-3 py-1.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl border uppercase"
                      >
                        {p.codigo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={() => abrirEditarRol(emp)}
                    className="py-4 border rounded-[20px] text-[11px] font-bold uppercase flex justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" /> Editar Rol
                  </button>
                  <button
                    onClick={() => abrirEliminar(emp)}
                    className="py-4 bg-rose-50 text-rose-600 rounded-[20px] text-[11px] font-bold uppercase flex justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* MODAL NUEVO COLABORADOR */}
{activeModal === 'ADD' && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          NUEVO COLABORADOR
        </h3>
        <button
          onClick={() => setActiveModal(null)}
          className="text-slate-400 hover:text-slate-600 text-xl"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-6">
        
        {/* Nombre */}
        <div>
          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
            Nombre
          </label>
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
            placeholder="Ej: Juan"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Apellido + DNI */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
              Apellido
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
              placeholder="Ej: Pérez"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
              DNI
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
              placeholder="Ej: 40123456"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
            Dirección
          </label>
          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
            placeholder="Ej: Av. Siempre Viva 742"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        {/* Email + Teléfono */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
              Email
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
              placeholder="ejemplo@mail.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
              Teléfono
            </label>
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
              placeholder="Ej: 11 2345 6789"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
        </div>

        {/* Rol */}
        <div>
          <label className="block text-[11px] font-bold uppercase text-slate-400 mb-2">
            Rol
          </label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
            value={rolId}
            onChange={(e) => setRolId(Number(e.target.value))}
          >
            <option value="">Seleccionar rol</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => setActiveModal(null)}
          className="text-slate-400 font-semibold text-sm"
        >
          CERRAR
        </button>

        <button
          onClick={crearEmpleado}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>
    </div>
  </div>
)}


      {/* MODALES EDITAR / ELIMINAR quedan iguales */}
{activeModal === 'EDIT_ROLE' && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white p-10 rounded-[40px] w-full max-w-lg space-y-6 shadow-2xl">
      <h3 className="text-2xl font-bold uppercase">Editar Rol</h3>

      <select
        className="w-full bg-slate-50 border border-slate-200 p-5 rounded-2xl"
        value={nuevoRolId}
        onChange={(e) => setNuevoRolId(Number(e.target.value))}
      >
        <option value="">Seleccionar Rol...</option>
        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.nombre}
          </option>
        ))}
      </select>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setActiveModal(null)}
          className="flex-1 text-slate-400 font-semibold"
        >
          Cerrar
        </button>
        <button
          onClick={guardarRol}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[24px] flex justify-center gap-2 font-bold"
        >
          <Save className="w-4 h-4" /> Guardar
        </button>
      </div>
    </div>
  </div>
)}
{activeModal === 'DELETE' && (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white p-10 rounded-[40px] w-full max-w-md space-y-6 shadow-2xl">
      <h3 className="text-xl font-bold text-rose-600">
        ¿Eliminar empleado?
      </h3>

      <p className="text-sm text-slate-500">
        Esta acción es irreversible.
      </p>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setActiveModal(null)}
          className="flex-1 text-slate-400 font-semibold"
        >
          Cancelar
        </button>
        <button
          onClick={confirmarEliminar}
          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default Empleados;