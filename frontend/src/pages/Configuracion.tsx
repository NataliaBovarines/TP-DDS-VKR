
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Save, Building2, AlertTriangle, Plus, Trash2, Shield, Layers, Tag, Palette, Ruler, Truck, ChevronRight,
  CheckSquare, Square, CalendarDays, Bell, MessageCircle, Mail,
  Pencil,
  X
} from 'lucide-react';
import { Permission, CatalogoItem } from '../types.ts';
import ConfiguracionService from '../services/configuracionService.js';
import CategoriaService from '../services/categoriaService.js';
import ColorService from '../services/colorService.js';
import TalleService from '../services/talleService.js';
import ProveedorService from '../services/proveedorService.js';
import RolService from '../services/rolService.js';
import PermisoService from '../services/permisoService.js';
import SubcategoriaService from '../services/subcategoriaService.js';
import UsuarioService from '../services/usuarioService.js';

const Configuracion: React.FC = () => {
  const [activeCatalog, setActiveCatalog] = useState<'GENERAL' | 'CATALOGOS'>('GENERAL');
  const [selectedSubCatalog, setSelectedSubCatalog] = useState<'ROLES' | 'CATEGORIAS' | 'SUBCATEGORIAS' | 'COLORES' | 'TALLES' | 'PROVEEDORES'>('CATEGORIAS');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // States for general settings
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsApp, setNotifWhatsApp] = useState(false);

  const getSingularName = (catalog) => {
    const singulars = {
      'CATEGORIAS': 'categoría',
      'SUBCATEGORIAS': 'subcategoría',
      'COLORES': 'color',
      'TALLES': 'talle',
      'PROVEEDORES': 'proveedor',
      'ROLES': 'rol'
    };
    return singulars[catalog] || catalog;
  };

  // =======================
  // ELIMINAR ITEMS
  // =======================  
  const [itemParaEliminar, setItemParaEliminar] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const preHandleDelete = (item: any) => {
    setItemParaEliminar(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemParaEliminar) return;
    try {
      const id = itemParaEliminar.id;
      switch (selectedSubCatalog) {
        case 'CATEGORIAS': await CategoriaService.eliminarCategoria(id); break;
        case 'COLORES': await ColorService.eliminarColor(id); break;
        case 'TALLES': await TalleService.eliminarTalle(id); break;
        case 'PROVEEDORES': await ProveedorService.eliminarProveedor(id); break;
        case 'ROLES': await RolService.eliminarRol(id); break;
        case 'SUBCATEGORIAS': await SubcategoriaService.eliminarSubcategoria(id); break;
      }
      fetchMasterData();
      setShowDeleteModal(false);
      setItemParaEliminar(null);
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  // =======================
  // CARGAR CONFIGURACION
  // =======================
  const [generalConfig, setGeneralConfig] = useState({
    nombreEmpresa: '',
    eslogan: '',
    permiteReserva: true,
    porcentajeMinimoSena: 0,
    diasValidezReserva: 0,
    stockMinimoGlobal: 0,
    diasMaximoCancelacion: 0
  });

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ConfiguracionService.getConfiguracion();
      setGeneralConfig(data);
    } catch (error) {
      console.error("Error cargando configuración", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // =======================
  // ACTUALIZAR CONFIGURACION
  // =======================
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleSaveGeneralConfig = async () => {
    try {
      const payload = {
        ...generalConfig,
        porcentajeMinimoSena: generalConfig.porcentajeMinimoSena / 100
      };
      await ConfiguracionService.actualizarConfiguracion(payload);
      setSuccessMessage("Los datos del negocio se actualizaron correctamente.");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  // =======================
  // CARGAR CATALOGO MAESTRO
  // =======================
  const [masterData, setMasterData] = useState<any[]>([]);
  const [loadingMaster, setLoadingMaster] = useState(false);
  const [allPermisos, setAllPermisos] = useState<any[]>([]);

  const fetchMasterData = useCallback(async () => {
    setLoadingMaster(true);
    try {
      let data = [];
      switch (selectedSubCatalog) {
        case 'CATEGORIAS': data = await CategoriaService.getCategorias(); break;
        case 'COLORES': data = await ColorService.getColores(); break;
        case 'TALLES': data = await TalleService.getTalles(); break;
        case 'PROVEEDORES': data = await ProveedorService.getProveedores(); break;
        case 'ROLES': 
          data = await RolService.getRoles();
          const perms = await PermisoService.getPermisos();
          setAllPermisos(perms);
          break;
        case 'SUBCATEGORIAS':
          const cats = await CategoriaService.getCategorias();
          data = cats.flatMap((c: any) => c.subcategorias.map((s: any) => ({...s, parentName: c.descripcion})));
          break;
      }
      setMasterData(data);
    } catch (error) {
      console.error("Error cargando maestro:", error);
    } finally {
      setLoadingMaster(false);
    }
  }, [selectedSubCatalog]);

  useEffect(() => {
      if (activeCatalog === 'CATALOGOS') fetchMasterData();
  }, [fetchMasterData, activeCatalog]);

  // =======================
  // CREAR ITEMS
  // =======================  
  const [newItemName, setNewItemName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  const handleCreateItem = async () => {
    try {
      switch (selectedSubCatalog) {
        case 'CATEGORIAS': await CategoriaService.crearCategoria({ descripcion: newItemName }); break;
        case 'COLORES': await ColorService.crearColor({ descripcion: newItemName }); break;
        case 'TALLES': await TalleService.crearTalle({ descripcion: newItemName }); break;
        case 'PROVEEDORES': await ProveedorService.crearProveedor({ nombre: newItemName }); break;
        case 'ROLES': 
          await RolService.crearRol({ nombre: newItemName, permisos: [] }); 
          break;
        case 'SUBCATEGORIAS': 
          await SubcategoriaService.crearSubcategoria({ descripcion: newItemName, categoriaId: Number(parentCategoryId) }); 
          break;
      }
      setNewItemName('');
      setShowAddModal(false);
      fetchMasterData();
    } catch (error) {
      console.error("Error al crear item");
    }
  };

  // =======================
  // CARGAR CATEGORIAS
  // =======================  
  const [listaCategoriasPadre, setListaCategoriasPadre] = useState<any[]>([]);

  useEffect(() => {
    const loadCats = async () => {
      const data = await CategoriaService.getCategorias();
      setListaCategoriasPadre(data);
    };
    loadCats();
  }, []);

  // =======================
  // ACTUALIZAR ROLES
  // =======================  
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [tempPermisos, setTempPermisos] = useState([]);

  const handleOpenEditPermissions = (rol) => {
    setEditingRole(rol);
    setTempPermisos(rol.permisos.map(p => p.codigo)); 
    setShowPermissionsModal(true);
  };

  const handleToggleTempPermiso = (permisoCodigo) => {
    setTempPermisos(prev => 
      prev.includes(permisoCodigo) 
        ? prev.filter(c => c !== permisoCodigo) 
        : [...prev, permisoCodigo]
    );
  };

  const handleSavePermissions = async () => {
    try {
      await RolService.actualizarPermisos(editingRole.id, { permisos: tempPermisos });
      await fetchMasterData();
      setShowPermissionsModal(false);
      setEditingRole(null);
      setSuccessMessage("Los permisos del rol han sido sincronizados.");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al guardar permisos definitivos:", error);
    }
  };

  // ===================================================================================================================
  // RETURN
  // ===================================================================================================================

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
            Ajustes generales
          </button>
          <button 
            onClick={() => setActiveCatalog('CATALOGOS')} 
            className={`px-8 py-3 rounded-[18px] text-sm font-bold tracking-tight transition-all ${activeCatalog === 'CATALOGOS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Catálogos maestros
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando configuración...</p>
        </div>
      ) : activeCatalog === 'GENERAL' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-indigo-600" /> Datos del negocio
              </h4>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Razón social</label>
                  <input 
                    type="text" 
                    value={generalConfig.nombreEmpresa} 
                    onChange={e => setGeneralConfig({...generalConfig, nombreEmpresa: e.target.value})} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Eslogan</label>
                  <input 
                    type="text" 
                    value={generalConfig.eslogan} 
                    onChange={e => setGeneralConfig({...generalConfig, eslogan: e.target.value})} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Gestión de inventario
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Alerta de stock</label>
                  <input 
                    type="number" 
                    value={generalConfig.stockMinimoGlobal} 
                    onChange={e => setGeneralConfig({...generalConfig, stockMinimoGlobal: Number(e.target.value)})} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-slate-900 focus:bg-white outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Días de cancelación</label>
                  <input 
                    type="number" 
                    value={generalConfig.diasMaximoCancelacion} 
                    onChange={e => setGeneralConfig({...generalConfig, diasMaximoCancelacion: Number(e.target.value)})} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-slate-900 focus:bg-white outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-indigo-600" /> Políticas de reserva
                </h4>
                <div 
                  onClick={() => setGeneralConfig({...generalConfig, permiteReserva: !generalConfig.permiteReserva})}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">
                    {generalConfig.permiteReserva ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                  <div className={`w-12 h-6 rounded-full transition-all relative ${generalConfig.permiteReserva ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${generalConfig.permiteReserva ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all ${!generalConfig.permiteReserva ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Seña mínima (%)</label>
                  <input 
                    type="number" 
                    value={generalConfig.porcentajeMinimoSena * 100} 
                    onChange={e => setGeneralConfig({...generalConfig, porcentajeMinimoSena: Number(e.target.value) / 100})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-indigo-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">Días de validez</label>
                  <input 
                    type="number" 
                    value={generalConfig.diasValidezReserva}
                    onChange={e => setGeneralConfig({...generalConfig, diasValidezReserva: Number(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-lg font-black text-indigo-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-600" /> Canales de notificación
              </h4>
              <p className="text-sm font-bold text-slate-700 tracking-tight ml-1 mb-2 block">
                  Recibe avisos de stock crítico.
              </p>
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
                      <p className="text-sm font-bold text-slate-900 tracking-tight">Email</p>
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
                      <p className="text-sm font-bold text-slate-900 tracking-tight">WhatsApp</p>
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
            <button 
              onClick={handleSaveGeneralConfig}
              className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-bold text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Save className="w-5 h-5" /> 
              Guardar motor de negocio
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
                <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-1">Maestro de datos</h4>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedSubCatalog}</h3>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-[18px] font-bold text-sm tracking-tight flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                <Plus className="w-4 h-4" /> Nuevo registro
              </button>
            </div>

            <div className="flex-1 space-y-3">
              {loadingMaster ? (
                <div className="text-center py-10">Cargando datos...</div>
              ) : masterData.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No hay registros en este catálogo.</div>
              ) : masterData.map(item => (
                <div key={item.id} className="group flex flex-col p-6 bg-slate-50 rounded-[30px] border border-transparent hover:border-indigo-100 transition-all space-y-4">
                  <div className="flex items-center justify-between">
                    
                    {/* LADO IZQUIERDO: NOMBRE, BADGE Y SUBTÍTULO */}
                    <div className="flex flex-col gap-1.5">
                      {/* Fila superior: Nombre + Badge */}
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800 text-lg leading-none tracking-tight">
                          {item.descripcion || item.nombre}
                        </span>

                        {/* BADGE (Solo para ROLES) */}
                        {selectedSubCatalog === 'ROLES' && (
                          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-wider">
                              {[...new Set(item.permisos?.map((p: any) => p.codigo))].length} Permisos activos
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Fila inferior: Categoría Padre (si existe) */}
                      {item.parentName && (
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                          Cat: {item.parentName}
                        </span>
                      )}
                    </div>

                    {/* LADO DERECHO: ACCIONES SUPERIORES */}
                    <div className="flex gap-2">
                      {selectedSubCatalog === 'ROLES' && (
                        <button 
                          onClick={() => handleOpenEditPermissions(item)}
                          className="p-3 bg-white text-slate-300 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 shadow-sm active:scale-90"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      )}

                      <button 
                        onClick={() => preHandleDelete(item)}
                        className="p-3 bg-white text-slate-300 hover:text-rose-600 rounded-xl transition-all border border-slate-100 shadow-sm active:scale-90"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
              <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-2">Acción de catálogo</h4>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
                Agregar {getSingularName(selectedSubCatalog)}
              </h3>
            </div>
            
            <div className="space-y-6">
              {/* Selector de Padre (Solo si es SUBCATEGORIAS) */}
              {selectedSubCatalog === 'SUBCATEGORIAS' && (
                <div>
                  <label className="text-sm font-bold text-slate-700 tracking-tight mb-2 block ml-1">Categoría padre</label>
                  <select 
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none"
                  >
                    <option value="">Seleccionar categoría...</option>
                    {/* Filtramos solo los nombres de categorías del masterData si las tenemos cargadas o de un estado aparte */}
                    {listaCategoriasPadre.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.descripcion}</option>
                  ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-sm font-bold text-slate-700 tracking-tight mb-2 block ml-1">
                  {selectedSubCatalog === 'PROVEEDORES' ? 'Nombre / Razón Social' : 'Descripción'}
                </label>
                <input 
                  type="text" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Ej: Nueva Colección..." 
                  className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-5 font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" 
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => { setShowAddModal(false); setNewItemName(''); setParentCategoryId(''); }} 
                className="flex-1 py-5 font-bold text-sm text-slate-400 tracking-tight"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateItem}
                disabled={!newItemName || (selectedSubCatalog === 'SUBCATEGORIAS' && !parentCategoryId)}
                className="flex-[2] py-5 bg-indigo-600 text-white rounded-[24px] font-bold text-sm tracking-tight shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar registro
              </button>
            </div>
          </div>
        </div>
      )}

      {showPermissionsModal && editingRole && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in duration-300 overflow-hidden">
            
            {/* 1. CABECERA (Cerrar descarta cambios) */}
            <div className="p-8 lg:p-12 pb-6 border-b border-slate-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Permisos de {editingRole.nombre}</h3>
                  <p className="text-slate-400 text-sm font-medium">Los cambios se aplicarán al presionar guardar</p>
                </div>
                <button onClick={() => { setShowPermissionsModal(false); setEditingRole(null); }} className="p-3 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 2. CUERPO (Usa tempPermisos) */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 pt-4 space-y-12 custom-scrollbar">
              {Array.from(new Set(allPermisos.map(p => p.codigo.split('_')[0]))).map(grupo => (
                <div key={grupo} className="space-y-4">
                  <h5 className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Módulo {grupo}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allPermisos.filter(p => p.codigo.startsWith(grupo)).map((perm) => {
                      const tienePermiso = tempPermisos.includes(perm.codigo);
                      return (
                        <div 
                          key={perm.codigo} 
                          onClick={() => handleToggleTempPermiso(perm.codigo)}
                          className={`flex items-center justify-between p-5 rounded-[24px] border transition-all cursor-pointer group
                            ${tienePermiso ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                        >
                          <span className={`text-sm font-bold ${tienePermiso ? 'text-indigo-700' : 'text-slate-600'}`}>{perm.descripcion}</span>
                          <div className={`transition-all transform ${tienePermiso ? 'text-indigo-600 scale-110' : 'text-slate-300'}`}>
                            {tienePermiso ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. PIE DE MODAL (Botones con funciones distintas) */}
            <div className="p-8 lg:p-10 border-t border-slate-100 bg-slate-50/50 flex gap-4 justify-end">
              <button 
                onClick={() => { setShowPermissionsModal(false); setEditingRole(null); }} 
                className="px-8 py-4 rounded-2xl font-bold text-sm text-slate-400 hover:text-slate-600"
              >
                Cerrar
              </button>
              <button 
                onClick={handleSavePermissions}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && itemParaEliminar && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in duration-200">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[30px] mx-auto flex items-center justify-center">
                <Trash2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  ¿Eliminar {getSingularName(selectedSubCatalog)}?
                </h4>
                <p className="text-slate-500 text-sm">
                  Estás por eliminar <span className="font-bold text-slate-700">
                    "{itemParaEliminar.descripcion || itemParaEliminar.nombre}"
                  </span>. <br /> Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { setShowDeleteModal(false); setItemParaEliminar(null); }}
                className="flex-1 py-4 font-bold text-sm text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-[2] py-4 bg-rose-600 text-white rounded-[20px] font-bold text-sm tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all active:scale-95"
              >
                Confirmar eliminación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl p-10 space-y-6 animate-in zoom-in duration-300">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[30px] mx-auto flex items-center justify-center">
                <CheckSquare className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight">¡Excelente!</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {successMessage}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-[20px] font-bold text-sm uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuracion;
