
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Venta, VentaEstado } from '../types.ts';
import { DollarSign, XCircle, Eye, ArrowLeft, History, Package, Calendar, TrendingUp, Hash, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_RESERVAS: Venta[] = [
  { id: 'R-001', clienteId: 'c1', clienteNombre: 'Juan Perez', fecha: '2023-11-01', estado: VentaEstado.RESERVADA, detalles: [{ sku: 'REM-B', nombre: 'Remera Basic Blanca', cantidad: 2, precioUnitario: 1500 }], total: 3000, pagos: [{ id: 'p1', monto: 500, fecha: '2023-11-01', numeroSecuencial: 1 }], fechaVencimientoReserva: '2024-05-20' },
  { id: 'R-002', clienteId: 'c2', clienteNombre: 'Maria Rodriguez', fecha: '2023-12-05', estado: VentaEstado.RESERVADA, detalles: [{ sku: 'JEAN-D', nombre: 'Jeans Blue Denim', cantidad: 1, precioUnitario: 4500 }], total: 4500, pagos: [{ id: 'p2', monto: 1500, fecha: '2023-12-05', numeroSecuencial: 1 }], fechaVencimientoReserva: '2024-03-05' },
];

const Reservas: React.FC = () => {
  const navigate = useNavigate();
  const [selectedReserva, setSelectedReserva] = useState<Venta | null>(null);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'PAYMENTS'>('DETAILS');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const calculateTotalPaid = (reserva: Venta) => reserva.pagos.reduce((acc, p) => acc + p.monto, 0);

  if (selectedReserva) {
    const paid = calculateTotalPaid(selectedReserva);
    return (
      <div className="space-y-6 animate-in">
        <button onClick={() => setSelectedReserva(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al listado
        </button>
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Ficha de Reserva</p>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {selectedReserva.estado}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedReserva.clienteNombre}</h2>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> {selectedReserva.id}
                </p>
                <p className="text-sm font-medium text-rose-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Vence: {selectedReserva.fechaVencimientoReserva}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Saldo Pendiente</p>
              <p className="text-4xl font-bold text-rose-600 tracking-tight leading-none">${selectedReserva.total - paid}</p>
            </div>
          </div>

          <div className="flex border-b border-slate-100 px-10">
            <button onClick={() => setActiveTab('DETAILS')} className={`py-4 text-sm font-bold mr-8 border-b-2 transition-all ${activeTab === 'DETAILS' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent'}`}>Productos</button>
            <button onClick={() => setActiveTab('PAYMENTS')} className={`py-4 text-sm font-bold border-b-2 transition-all ${activeTab === 'PAYMENTS' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent'}`}>Historial de Pagos</button>
          </div>

          <div className="p-10">
            {activeTab === 'DETAILS' ? (
              <div className="space-y-4">
                {selectedReserva.detalles.map((d, i) => (
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
                {selectedReserva.pagos.length === 0 ? (
                  <div className="text-center py-16 opacity-30">
                    <History className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">No hay pagos registrados</p>
                  </div>
                ) : 
                  selectedReserva.pagos.map((p, i) => (
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Reserva</p>
                <p className="text-xl font-bold text-slate-700">${selectedReserva.total}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Abonado</p>
                <p className="text-xl font-bold text-emerald-600">${paid}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPaymentModal(true)} 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-[24px] font-bold text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
              >
                <DollarSign className="w-5 h-5" /> Registrar Abono
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-rose-500 rounded-[24px] font-bold text-sm uppercase tracking-widest border border-slate-200 hover:bg-rose-50 hover:border-rose-100 transition-all"
              >
                <XCircle className="w-5 h-5" /> Cancelar Reserva
              </button>
            </div>
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl p-10 space-y-8 animate-in duration-200">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Registrar Abono</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Monto a abonar</label>
                <input 
                  type="number" 
                  value={paymentAmount} 
                  onChange={(e) => setPaymentAmount(e.target.value)} 
                  placeholder="0.00" 
                  className="w-full text-4xl font-bold text-indigo-600 bg-slate-50 border border-slate-200 rounded-2xl p-8 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-4 font-bold text-sm text-slate-400 hover:text-slate-600 uppercase">Cerrar</button>
                <button onClick={() => setShowPaymentModal(false)} className="flex-[2] py-4 bg-indigo-600 text-white rounded-[20px] font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Confirmar Pago</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Reservas</h2>
        <p className="text-slate-500 font-medium mt-1">Control de pagos parciales y estados de crédito</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_RESERVAS.map(reserva => {
          const totalPaid = calculateTotalPaid(reserva);
          const progress = (totalPaid / reserva.total) * 100;
          
          return (
            <div key={reserva.id} className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-100">
                  {reserva.clienteNombre.charAt(0)}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {reserva.estado}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                    <Calendar className="w-3.5 h-3.5" /> Vence: {reserva.fechaVencimientoReserva}
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{reserva.clienteNombre}</h4>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Reserva ID: {reserva.id}
                </p>
              </div>

              <div className="flex-1 border-t border-slate-50 pt-6 space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-indigo-500" /> Estado del Pago
                </p>
                
                <div className="bg-slate-50 p-6 rounded-[24px] space-y-3 border border-slate-100">
                  {/* Top part: Percentage text and label */}
                  <div className="flex justify-between items-end">
                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Cobrado</p>
                    <p className="text-xs font-black text-slate-900">{Math.round(progress)}%</p>
                  </div>
                  
                  {/* Middle part: Progress bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-1000 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Bottom part: Total and Pending */}
                  <div className="flex justify-between items-end pt-2">
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total</p>
                      <p className="text-lg font-medium text-slate-700 tracking-tighter leading-none">${reserva.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Pendiente</p>
                      <p className="text-2xl font-black text-rose-600 tracking-tighter leading-none">${reserva.total - totalPaid}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                <button 
                  onClick={() => setSelectedReserva(reserva)} 
                  className="py-4 bg-white border border-slate-200 rounded-[20px] text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Eye className="w-4 h-4" /> Detalle
                </button>
                <button 
                  className="py-4 bg-rose-50 text-rose-600 rounded-[20px] text-[11px] font-bold uppercase tracking-wider hover:bg-rose-100 transition-all flex items-center justify-center gap-2 border border-rose-100" 
                >
                  <XCircle className="w-4 h-4" /> Cancelar
                </button>
              </div>
            </div>
          );
        })}
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
};

export default Reservas;
