import React, { useState } from 'react';
import { Smartphone, Loader2 } from 'lucide-react';

const LoginScreen = ({ onLoginSuccess }) => {
  const [step, setStep] = useState('phone'); 
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('verify'); }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (token === '123456') onLoginSuccess();
      else setError('Código incorrecto. Usa 123456');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 text-center border-b border-slate-50">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {step === 'phone' ? 'Ingresa a Weldu' : 'Verifica tu número'}
          </h2>
          <p className="text-slate-500 text-sm">
            {step === 'phone' ? 'Acceso seguro sin contraseña' : `Enviamos un código al +52 ${phone}`}
          </p>
        </div>

        <div className="p-8">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Tu Celular</label>
                <div className="flex gap-2">
                  <div className="bg-slate-100 rounded-lg px-4 py-3 text-slate-500 font-mono font-medium flex items-center border border-slate-200">
                    🇲🇽 +52
                  </div>
                  <input 
                    type="tel" 
                    placeholder="81 1234 5678" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-3 text-lg tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl text-lg font-bold transition-all disabled:opacity-50"
                disabled={loading || phone.length < 10}
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Enviar Código'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
               <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Código de 6 dígitos</label>
                <input 
                  type="text" 
                  placeholder="000000" 
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full text-center text-4xl tracking-[0.5em] font-mono h-20 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  maxLength={6}
                  autoFocus
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 p-3 rounded-lg">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl text-lg font-bold transition-all disabled:opacity-50"
                disabled={loading || token.length < 6}
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Entrar'}
              </button>
              <button type="button" onClick={() => setStep('phone')} className="w-full text-center text-sm text-slate-400 mt-4 hover:text-slate-600">
                ¿Número incorrecto? Regresar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;