import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService.js';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await AuthService.recuperarContrasenia({ mail: email });
      setStatus('Si el correo existe en el sistema, recibirás un email con instrucciones.');
    } catch (err) {
      console.error('Error al pedir recuperación:', err);
      setStatus('Ocurrió un error al enviar la solicitud. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8">
          <h2 className="text-2xl font-black mb-4 text-slate-900">Recuperar contraseña</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded"
                placeholder="tu@correo.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-bold"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>

            <div className="text-center">
              <button type="button" onClick={() => navigate('/login')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-transparent">
                Volver al login
              </button>
            </div>

            {status && <p className="text-sm text-center mt-2">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
