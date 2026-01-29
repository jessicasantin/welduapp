"use client";
import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import PricingCalculator from './components/PricingCalculator';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('loading'); // loading, login, calculator, admin

  // Simulación de Auth para Demo (En producción usaríamos useEffect con supabase.auth.getSession)
  useEffect(() => {
    // Check local session
    const localSession = localStorage.getItem('weldu_session');
    if (localSession) {
      setSession(JSON.parse(localSession));
      setView('calculator'); // Default a cotizador
    } else {
      setView('login');
    }
  }, []);

  const handleLoginSuccess = (userRole = 'client') => {
    const mockSession = { user: { id: '123', role: userRole } };
    localStorage.setItem('weldu_session', JSON.stringify(mockSession));
    setSession(mockSession);
    
    if (userRole === 'admin') {
      setView('admin');
    } else {
      setView('calculator');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('weldu_session');
    setSession(null);
    setView('login');
  };

  // Renderizado Condicional
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* NAVBAR TEMPORAL PARA DEMO */}
      <nav className="p-4 bg-white border-b flex justify-between items-center">
        <div className="font-black text-xl tracking-tighter">WELDU</div>
        {session && (
          <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-slate-900">
            Salir
          </button>
        )}
      </nav>

      {view === 'login' && <LoginScreen onLoginSuccess={() => handleLoginSuccess('client')} />}
      
      {view === 'calculator' && (
        <div className="container mx-auto py-8">
           <PricingCalculator />
           {/* Botón secreto para ir a admin en demo */}
           <div className="text-center mt-12 opacity-20 hover:opacity-100 transition-opacity">
             <button onClick={() => setView('admin')}>Ir a Admin (Secret)</button>
           </div>
        </div>
      )}

      {view === 'admin' && <AdminDashboard />}
      
    </main>
  );
}