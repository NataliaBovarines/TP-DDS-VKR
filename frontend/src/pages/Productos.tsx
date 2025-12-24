
import React, { useState } from 'react';
import { Producto, ProductoDetalle } from '../types.ts';
import { Plus, Search, Package, ChevronDown, ChevronRight, AlertCircle, Edit, Trash2, Save, X, Info, ChevronLeft } from 'lucide-react';

const MOCK_PRODUCTS: Producto[] = [
  { id: '1', nombre: 'Remera Basic V', categoria: 'Remeras', subcategoria: 'Escote V', proveedor: 'Textil Sur', descripcion: 'Remera de algodón premium soft touch.', precioBase: 1500, 
    variantes: [{ id: 'v1', sku: 'REM-V-W-M', color: 'Blanco', talle: 'M', stockDisponible: 3, stockReservado: 2, stockMinimo: 5 }]
  },
  { id: '2', nombre: 'Jeans Denim Pro', categoria: 'Pantalones', subcategoria: 'Slim Fit', proveedor: 'Denim Corp', descripcion: 'Jeans de alta calidad', precioBase: 4500,
    variantes: [{ id: 'v2', sku: 'JEAN-S-42', color: 'Azul', talle: '42', stockDisponible: 15, stockReservado: 0, stockMinimo: 10 }]
  }
];

const Productos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'ADD_PRODUCT' | 'EDIT_PRODUCT' | 'ADD_VARIANT' | 'EDIT_VARIANT' | 'DELETE' | null>(null);

  const toggleProduct = (id: string) => setSelectedProduct(selectedProduct === id ? null : id);

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Catálogo de Productos</h2>
          <p className="text-slate-500 font-medium mt-1">Gestiona inventario, variantes y stock mínimo</p>
        </div>
        <button onClick={() => setActiveModal('ADD_PRODUCT')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95">
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, SKU, proveedor..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <button 
          onClick={() => setShowLowStock(!showLowStock)} 
          className={`px-8 py-4 rounded-3xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm border ${
            showLowStock 
              ? 'bg-amber-100 text-amber-700 border-amber-200' 
              : 'bg-white text-slate-500 border-slate-200 hover:border-amber-200'
          }`}
        >
          <AlertCircle className="w-4 h-4" /> Mostrar Stock Bajo
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-50 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr><th className="px-6 py-6 w-12"></th><th className="px-6 py-6">Producto</th><th className="px-6 py-6">Proveedor</th><th className="px-6 py-6 text-center">Total</th><th className="px-6 py-6 text-right">Precio Base</th><th className="px-6 py-6 w-32"></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PRODUCTS.map(product => {
              const totalStock = product.variantes.reduce((acc, v) => acc + v.stockDisponible + v.stockReservado, 0);
              const isExpanded = selectedProduct === product.id;
              return (
                <React.Fragment key={product.id}>
                  <tr onClick={() => toggleProduct(product.id)} className={`hover:bg-slate-50 transition-colors cursor-pointer ${isExpanded ? 'bg-indigo-50/20' : ''}`}>
                    <td className="px-6 py-8 text-center">{isExpanded ? <ChevronDown className="w-6 h-6 text-indigo-600" /> : <ChevronRight className="w-6 h-6 text-slate-300" />}</td>
                    <td className="px-6 py-8">
                      <div>
                        <p className="font-bold text-slate-900 text-lg leading-tight">{product.nombre}</p>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">{product.categoria} • {product.subcategoria}</p>
                      </div>
                    </td>
                    <td className="px-6 py-8"><span className="text-base font-semibold text-slate-600">{product.proveedor}</span></td>
                    <td className="px-6 py-8 text-center font-bold text-slate-700 text-lg">{totalStock}</td>
                    <td className="px-6 py-8 text-right font-bold text-slate-900 text-lg">${product.precioBase}</td>
                    <td className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); setActiveModal('EDIT_PRODUCT'); }} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                          <Edit className="w-6 h-6" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setActiveModal('DELETE'); }} className="p-2 text-slate-300 hover:text-rose-600 transition-colors">
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50/30">
                      <td colSpan={6} className="px-4 py-8 md:px-10">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-x-auto">
                          <div className="bg-slate-50 px-8 py-5 flex justify-between items-center border-b border-slate-100 min-w-[800px]">
                            <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Variantes de Stock</span>
                            <button onClick={() => setActiveModal('ADD_VARIANT')} className="text-indigo-600 text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:text-indigo-800">
                              <Plus className="w-5 h-5" /> Agregar Variante
                            </button>
                          </div>
                          <table className="w-full text-left text-base min-w-[800px]">
                            <thead className="bg-white text-xs text-slate-400 font-bold uppercase tracking-widest border-b border-slate-50">
                              <tr>
                                <th className="px-8 py-5">SKU</th>
                                <th className="px-8 py-5">Color/Talle</th>
                                <th className="px-8 py-5 text-center">Disponible</th>
                                <th className="px-8 py-5 text-center">Reservado</th>
                                <th className="px-8 py-5 text-center">Mínimo</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                              {product.variantes.map(v => (
                                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="px-8 py-5 font-mono font-bold text-indigo-600 text-base">{v.sku}</td>
                                  <td className="px-8 py-5 font-semibold text-slate-600">{v.color} / {v.talle}</td>
                                  <td className="px-8 py-5 text-center font-bold text-slate-800">{v.stockDisponible}</td>
                                  <td className="px-8 py-5 text-center font-semibold text-slate-400">{v.stockReservado}</td>
                                  <td className="px-8 py-5 text-center font-bold text-amber-600">{v.stockMinimo}</td>
                                  <td className="px-8 py-5 text-right flex justify-end gap-3">
                                    <button onClick={() => setActiveModal('EDIT_VARIANT')} className="p-2 hover:text-indigo-600 transition-colors"><Edit className="w-5 h-5" /></button>
                                    <button onClick={() => setActiveModal('DELETE')} className="p-2 hover:text-rose-600 transition-colors"><Trash2 className="w-5 h-5" /></button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-8 py-4 border border-slate-200 rounded-3xl flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider shadow-sm">
        <span>Página 1 de 1</span>
        <div className="flex gap-2">
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button disabled className="p-2 border border-slate-200 bg-white rounded-xl opacity-30 shadow-sm transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MODALES */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-10 space-y-8 animate-in zoom-in duration-200 overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-50 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
                  {activeModal === 'ADD_PRODUCT' ? 'Nuevo Producto' : 
                   activeModal === 'EDIT_PRODUCT' ? 'Editar Producto' :
                   activeModal === 'ADD_VARIANT' ? 'Nueva Variante' :
                   activeModal === 'EDIT_VARIANT' ? 'Editar Variante' : 'Eliminar Registro'}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 text-slate-300 hover:text-slate-500 transition-all"><X className="w-6 h-6" /></button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6">
              {(activeModal === 'ADD_PRODUCT' || activeModal === 'EDIT_PRODUCT') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Nombre del Producto</label>
                      <input placeholder="Ej: Remera Básica Escote V" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Proveedor</label>
                      <input placeholder="Ej: Textil Sur" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Categoría</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none">
                        <option>Remeras</option>
                        <option>Pantalones</option>
                        <option>Accesorios</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Precio Base ($)</label>
                      <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Descripción</label>
                    <textarea placeholder="Breve descripción del producto..." rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none resize-none"></textarea>
                  </div>
                </>
              )}

              {(activeModal === 'ADD_VARIANT' || activeModal === 'EDIT_VARIANT') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">SKU / Código</label>
                      <input placeholder="REM-BAS-V" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none uppercase font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Color</label>
                        <input placeholder="Blanco" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Talle</label>
                        <input placeholder="XL" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none uppercase" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Stock Inicial</label>
                      <input type="number" defaultValue={0} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Alerta Stock Mínimo</label>
                      <input type="number" defaultValue={5} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-bold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none text-rose-600" />
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'DELETE' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[30px] mx-auto flex items-center justify-center">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">¿Confirmar eliminación?</h4>
                    <p className="text-slate-500 text-sm">Esta acción no se puede deshacer y el registro será removido permanentemente del sistema.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-50">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-4 font-bold text-sm text-slate-400 hover:text-slate-600 uppercase tracking-widest">Cerrar</button>
              <button onClick={() => setActiveModal(null)} className={`flex-[2] py-4 rounded-[20px] font-bold text-sm tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 ${activeModal === 'DELETE' ? 'bg-rose-600 text-white shadow-rose-100 hover:bg-rose-700' : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'}`}>
                {activeModal === 'DELETE' ? <Trash2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {activeModal === 'DELETE' ? 'Confirmar Eliminación' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
