import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService.js';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [contrasenia, setContrasenia] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('Token inválido o ausente');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (contrasenia !== confirm) {
      setStatus('Las contraseñas no coinciden');
      return;
    }

    try {
      await AuthService.resetearContrasenia({ token: token, contraseniaNueva: contrasenia });
      setStatus('Contraseña reseteada correctamente. Serás redirigido al login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Error reseteando contraseña:', err);
      setStatus('Error al resetear la contraseña. El token puede haber expirado.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden">
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8">
          <h2 className="text-xl font-bold mb-4">Restablecer contraseña</h2>
          {status && <p className="mb-4">{status}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Nueva contraseña</label>
              <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} required className="w-full p-3 border rounded" />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">Confirmar contraseña</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full p-3 border rounded" />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded">Resetear contraseña</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

