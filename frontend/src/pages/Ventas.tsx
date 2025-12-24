
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, Trash2, CreditCard, DollarSign, 
  ScanLine, List, Eye, ArrowLeft, RefreshCw, ChevronLeft, ChevronRight, 
  Package, History, PlusCircle, X, Calendar, Hash
} from 'lucide-react';
import { ProductoDetalle, Cliente, ClienteEstado, VentaEstado, DetalleVenta, Venta } from '../types.ts';

const MOCK_VARIANTS: ProductoDetalle[] = [
  { id: 'v1', sku: 'REM-V-W-M', color: 'Blanco', talle: 'M', stockDisponible: 10, stockReservado: 0, stockMinimo: 5 },
  { id: 'v2', sku: 'REM-V-W-L', color: 'Blanco', talle: 'L', stockDisponible: 5, stockReservado: 0, stockMinimo: 3 },
];

const MOCK_CLIENTS: Cliente[] = [
  { id: 'c1', nombre: 'Juan Perez', dni: '12345678', email: 'juan@mail.com', telefono: '112233', estado: ClienteEstado.CONFIABLE, limiteCredito: 50000, deudaActual: 0 },
  { id: 'c2', nombre: 'Maria Rodriguez', dni: '87654321', email: 'maria@mail.com', telefono: '445566', estado: ClienteEstado.NO_CONFIABLE, limiteCredito: 0, deudaActual: 0 },
];

const MOCK_SALES: Venta[] = [
  { id: 'V-1001', clienteId: 'c1', clienteNombre: 'Juan Perez', fecha: '2024-03-20', estado: VentaEstado.PAGADA, detalles: [{ sku: 'REM-V-W-M', nombre: 'Remera Basic', cantidad: 1, precioUnitario: 2500 }], total: 2500, pagos: [] },
  { id: 'V-1002', clienteId: 'c1', clienteNombre: 'Juan Perez', fecha: '2024-03-19', estado: VentaEstado.RESERVADA, detalles: [{ sku: 'REM-V-W-L', nombre: 'Remera Premium', cantidad: 1, precioUnitario: 5000 }], total: 5000, pagos: [{ id: 'p1', monto: 1000, fecha: '2024-03-19', numeroSecuencial: 1 }] },
];

const Ventas: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<'POS' | 'LIST' | 'DETAIL'>('LIST');
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'PAYMENTS'>('DETAILS');
  const [cart, setCart] = useState<DetalleVenta[]>([]);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [skuSearch, setSkuSearch] = useState('');
  const [isExchangeMode, setIsExchangeMode] = useState(false);
  const [originalSaleTotal, setOriginalSaleTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReservaModal, setShowReservaModal] = useState(false);

  const [filters, setFilters] = useState({
    estado: '',
    direccion: 'DESC'
  });

  useEffect(() => {
    const state = location.state as any;
    if (state) {
      if (state.view === 'POS') {
        setView('POS');
        setCart([]);
        setSelectedClient(null);
        setIsExchangeMode(false);
        setOriginalSaleTotal(0);
      } else if (state.exchangeVenta) {
        const venta = state.exchangeVenta as Venta;
        setSelectedVenta(venta);
        setIsExchangeMode(true);
        setOriginalSaleTotal(venta.total);
        setCart([]); 
        const client = MOCK_CLIENTS.find(c => c.id === venta.clienteId);
        if (client) setSelectedClient(client);
        setView('POS');
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSkuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const variant = MOCK_VARIANTS.find(v => v.sku.toUpperCase() === skuSearch.toUpperCase());
    if (variant) {
      setCart(prev => {
        const existing = prev.find(item => item.sku === variant.sku);
        if (existing) return prev.map(item => item.sku === variant.sku ? { ...item, cantidad: item.cantidad + 1 } : item);
        return [...prev, { sku: variant.sku, nombre: `Producto (${variant.sku})`, cantidad: 1, precioUnitario: 2500 }];
      });
      setSkuSearch('');
    }
  };

  const handleStartExchange = () => {
    if (selectedVenta) {
      setIsExchangeMode(true);
      setOriginalSaleTotal(selectedVenta.total);
      setCart([]); 
      const client = MOCK_CLIENTS.find(c => c.id === selectedVenta.clienteId);
      if (client) setSelectedClient(client);
      setView('POS');
    }
  };

  const removeFromCart = (sku: string) => setCart(prev => prev.filter(item => item.sku !== sku));
  const subtotal = cart.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0);
  const differenceToPay = Math.max(0, subtotal - originalSaleTotal);
  const canReserve = selectedClient && selectedClient.estado === ClienteEstado.CONFIABLE;

  if (view === 'DETAIL' && selectedVenta) {
    const paid = selectedVenta.pagos.reduce((acc, p) => acc + p.monto, 0);
    return (
      <div className="space-y-6 animate-in">
        <button onClick={() => setView('LIST')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Historial
        </button>
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Detalle de Operación</p>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                  ${selectedVenta.estado === VentaEstado.PAGADA ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}
                `}>
                  {selectedVenta.estado}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedVenta.clienteNombre}</h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> {selectedVenta.id}
                </p>
                <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {selectedVenta.fecha}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Monto Total</p>
              <p className="text-4xl font-bold text-slate-900 tracking-tight leading-none">${selectedVenta.total}</p>
            </div>
          </div>

          <div className="flex border-b border-slate-100 px-10">
            <button onClick={() => setActiveTab('DETAILS')} className={`py-4 text-sm font-bold mr-8 border-b-2 transition-all ${activeTab === 'DETAILS' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent'}`}>Productos</button>
            <button onClick={() => setActiveTab('PAYMENTS')} className={`py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'PAYMENTS' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent'}`}>Pagos</button>
          </div>

          <div className="p-10">
            {activeTab === 'DETAILS' ? (
              <div className="space-y-4">
                {selectedVenta.detalles.map((d, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-800 leading-tight">{d.nombre}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{d.sku} • {d.cantidad} unidades</p>
                      </div>
                    </div>
                    <span className="font-bold text-2xl text-slate-900">${d.precioUnitario * d.cantidad}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {selectedVenta.pagos.length === 0 ? (
                  <div className="text-center py-16">
                    <History className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-300 font-bold text-sm uppercase tracking-widest">No hay pagos parciales registrados</p>
                  </div>
                ) : 
                  selectedVenta.pagos.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                          <History className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-800 leading-tight">Pago #{p.numeroSecuencial}</p>
                          <p className="text-xs font-medium text-slate-400 mt-0.5">{p.fecha}</p>
                        </div>
                      </div>
                      <span className="font-bold text-2xl text-emerald-600">${p.monto}</span>
                    </div>
                  ))
                }
              </div>
            )}
          </div>

          <div className="p-10 bg-slate-50/80 border-t border-slate-100 flex justify-between items-center">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Abonado</p>
                <p className="text-xl font-bold text-slate-700">${paid}</p>
              </div>
              {selectedVenta.estado === VentaEstado.RESERVADA && (
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pendiente</p>
                  <p className="text-xl font-bold text-rose-500">${selectedVenta.total - paid}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              {(selectedVenta.estado === VentaEstado.PAGADA || selectedVenta.estado === VentaEstado.RESERVADA) && (
                <button 
                  onClick={handleStartExchange}
                  className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-[24px] font-bold text-sm uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-100 active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" /> Iniciar Cambio
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'LIST') {
    return (
      <div className="space-y-8 animate-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Ventas</h2>
            <p className="text-slate-500 font-medium mt-1">Historial de transacciones y estados operativos</p>
          </div>
          <button onClick={() => { setCart([]); setSelectedClient(null); setIsExchangeMode(false); setOriginalSaleTotal(0); setView('POS'); }} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95">
            <PlusCircle className="w-5 h-5" /> Nueva Venta
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Buscar por cliente */}
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">Buscar ventas</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input 
                placeholder="Ingresa el nombre del cliente..." 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Filtro de estado */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">Estado</label>
            <select value={filters.estado} onChange={e => setFilters({...filters, estado: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none">
              <option value="">Todos los estados</option>
              <option value="PAGADA">Pagada</option>
              <option value="RESERVADA">Reservada</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          {/* Filtro de ordenar + Botón X */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide ml-1">Ordenar por fecha</label>
            <div className="flex gap-2">
              <select value={filters.direccion} onChange={e => setFilters({...filters, direccion: e.target.value})} className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none">
                <option value="DESC">Más recientes primero</option>
                <option value="ASC">Más antiguos primero</option>
              </select>
              
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ estado: '', direccion: 'DESC' });
                }}
                className="p-3.5 bg-white text-slate-300 hover:text-rose-500 border border-slate-200 rounded-xl transition-all flex items-center justify-center"
                title="Limpiar filtros"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-slate-50 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-6">ID Venta</th>
                <th className="px-6 py-6">Fecha</th>
                <th className="px-6 py-6">Cliente</th>
                <th className="px-6 py-6 text-center">Estado</th>
                <th className="px-6 py-6 text-right">Total</th>
                <th className="px-6 py-6 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_SALES
                .filter(v => v.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(v => (
                <tr key={v.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-8">
                    <span className="font-bold text-indigo-600 text-lg">{v.id}</span>
                  </td>
                  <td className="px-6 py-8">
                    <span className="text-base font-semibold text-slate-500">{v.fecha}</span>
                  </td>
                  <td className="px-6 py-8">
                    <span className="text-lg font-bold text-slate-900">{v.clienteNombre}</span>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${v.estado === VentaEstado.PAGADA ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'}`}>
                      {v.estado}
                    </span>
                  </td>
                  <td className="px-6 py-8 text-right">
                    <span className="font-bold text-slate-900 text-lg">${v.total}</span>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <button onClick={() => { setSelectedVenta(v); setView('DETAIL'); }} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                      <Eye className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
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
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-in h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Terminal de Venta (POS)</h2>
          <p className="text-slate-500 font-medium mt-1">Procesamiento de ventas y cobros en tiempo real</p>
        </div>
        <button onClick={() => setView('LIST')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-[10px] uppercase transition-all shadow-sm bg-white px-6 py-3 rounded-xl border border-slate-200 hover:border-indigo-300">
          <List className="w-4 h-4" /> Ver Historial
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-[600px] lg:h-[calc(100vh-320px)] overflow-hidden pb-4">
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          <form onSubmit={handleSkuSubmit} className="relative">
            <ScanLine className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input 
              type="text" 
              placeholder="ESCANEAR SKU O INGRESAR CÓDIGO..." 
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[28px] font-mono text-lg lg:text-xl font-bold tracking-widest uppercase outline-none" 
              value={skuSearch} 
              onChange={(e) => setSkuSearch(e.target.value)} 
            />
          </form>

          <div className="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-sm p-6 lg:p-8 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-indigo-600" /> Carrito Actual
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10">
                  <ShoppingCart className="w-20 lg:w-24 h-20 lg:h-24 mb-4" />
                  <p className="font-black text-lg uppercase tracking-widest text-center">Sin productos seleccionados</p>
                </div>
              ) : 
                cart.map(item => (
                  <div key={item.sku} className="bg-slate-50 p-4 lg:p-5 rounded-3xl flex items-center justify-between border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-sm transition-all group">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-base font-bold text-slate-800 truncate">{item.nombre}</p>
                      <p className="text-[10px] font-mono font-black text-indigo-500 uppercase tracking-tighter">{item.sku} • Cant. {item.cantidad}</p>
                    </div>
                    <div className="flex items-center gap-4 lg:gap-8">
                      <p className="font-bold text-lg lg:text-xl text-slate-900">${item.precioUnitario * item.cantidad}</p>
                      <button onClick={() => removeFromCart(item.sku)} className="p-2.5 bg-white text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-slate-100 shadow-sm">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 h-full">
          <div className="bg-white p-6 lg:p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cliente Asociado</label>
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Nombre o DNI..." 
                className="w-full pl-12 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                value={clientSearch} 
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  const found = MOCK_CLIENTS.find(c => c.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || c.dni.includes(e.target.value));
                  if (found && e.target.value !== '') setSelectedClient(found); 
                  else if (e.target.value === '') setSelectedClient(null);
                }} 
              />
            </div>
            {selectedClient ? (
              <div className={`p-4 lg:p-5 rounded-3xl border-l-4 animate-in slide-in-from-right-2 ${selectedClient.estado === ClienteEstado.CONFIABLE ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <p className="text-lg font-bold text-slate-900 leading-none">{selectedClient.nombre}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1.5">{selectedClient.estado}</p>
              </div>
            ) : (
              <div className="p-4 lg:p-5 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-widest">Sin cliente asociado</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-[40px] border border-slate-200 flex flex-col justify-between relative overflow-hidden">
            {isExchangeMode && <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>}
            
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Total de Operación</h4>
              <div className="space-y-2">
                <p className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">${subtotal}</p>
                {isExchangeMode && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-4 space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Diferencia a Pagar</p>
                    <p className="text-2xl font-black text-indigo-600">${differenceToPay}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-6 lg:mt-8">
              <button 
                disabled={cart.length === 0 || !selectedClient} 
                className="w-full bg-slate-900 text-white py-4 lg:py-5 rounded-2xl font-black text-xs lg:text-sm uppercase tracking-widest disabled:opacity-20 flex items-center justify-center gap-3 hover:bg-black transition-all transform active:scale-95"
              >
                <DollarSign className="w-5 h-5 lg:w-6 lg:h-6" /> {isExchangeMode ? 'Completar Cambio' : 'Cobrar Total'}
              </button>
              {!isExchangeMode && (
                <button 
                  onClick={() => setShowReservaModal(true)} 
                  disabled={!canReserve || cart.length === 0} 
                  className={`w-full py-3.5 lg:py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-2 flex items-center justify-center gap-3 transition-all ${canReserve ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50' : 'border-slate-100 text-slate-200 cursor-not-allowed'}`}
                >
                  <CreditCard className="w-4 h-4 lg:w-5 lg:h-5" /> Iniciar Reserva
                </button>
              )}
              {isExchangeMode && (
                <button 
                  onClick={() => { setIsExchangeMode(false); setOriginalSaleTotal(0); }}
                  className="w-full py-3.5 lg:py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancelar Cambio
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reservation confirmation modal */}
      {showReservaModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 space-y-8 animate-in duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Confirmar Reserva</h3>
              <button onClick={() => setShowReservaModal(false)}><X className="w-6 h-6 text-slate-300 hover:text-indigo-600 transition-colors" /></button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">¿Deseas iniciar una reserva para este cliente?</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Cliente</p>
                <p className="text-sm font-bold text-slate-800">{selectedClient?.nombre}</p>
                <p className="text-xs font-bold text-slate-400 uppercase mt-3 mb-1">Monto Total</p>
                <p className="text-xl font-black text-indigo-600">${subtotal}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button onClick={() => setShowReservaModal(false)} className="flex-1 py-4 font-bold text-sm text-slate-400 hover:text-slate-600 uppercase tracking-widest text-center">Cerrar</button>
              <button onClick={() => { setShowReservaModal(false); setView('LIST'); }} className="flex-[2] py-4 bg-indigo-600 text-white rounded-[20px] font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-center">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
