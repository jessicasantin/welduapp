import React, { useState, useMemo } from 'react';
import { Check } from 'lucide-react';

const PricingCalculator = () => {
  const [size, setSize] = useState('small'); 
  const [frequency, setFrequency] = useState('monthly');

  const prices = {
    small: { label: '1 - 200 m²', price: 870 },
    medium: { label: '201 - 400 m²', price: 1067 },
    large: { label: '401 - 800 m²', price: 1392 },
    xlarge: { label: '801 - 1200 m²', price: 1682 }
  };

  const frequencies = {
    single: { 
      label: 'Visita Única', 
      discount: 0, 
      monthsDivisor: 1,
      color: 'bg-gray-100 border-gray-200'
    },
    monthly: { 
      label: 'Mensual', 
      discount: 0.30, 
      monthsDivisor: 1, 
      badge: 'AHORRA 30%',
      color: 'bg-blue-50 border-blue-200 ring-1 ring-blue-500'
    },
    bimonthly: { 
      label: 'Bimestral', 
      discount: 0.20, 
      monthsDivisor: 2, 
      badge: 'AHORRA 20%',
      color: 'bg-green-50 border-green-200'
    },
    quarterly: { 
      label: 'Trimestral', 
      discount: 0.10, 
      monthsDivisor: 3, 
      badge: 'AHORRA 10%',
      color: 'bg-purple-50 border-purple-200'
    }
  };

  const calculation = useMemo(() => {
    const basePrice = prices[size].price;
    const discount = frequencies[frequency].discount;
    const divisor = frequencies[frequency].monthsDivisor;
    const priceWithDiscount = basePrice * (1 - discount);
    const monthlyPayment = priceWithDiscount / divisor;

    return { monthlyPayment, savings: basePrice - priceWithDiscount };
  }, [size, frequency]);

  return (
    <div className="max-w-md mx-auto font-sans text-slate-800 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 text-white p-6 text-center">
        <h2 className="text-2xl font-light tracking-wide">Cotiza tu Fumigación</h2>
        <p className="text-slate-400 text-sm mt-2">Elige tamaño y frecuencia ideal.</p>
      </div>
      
      <div className="p-6">
        {/* PASO 1 */}
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Tamaño Propiedad</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(prices).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSize(key)}
                className={`p-3 rounded-lg text-sm transition-all border ${
                  size === key 
                    ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="font-semibold">{value.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* PASO 2 */}
        <div className="mb-8 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">2. Frecuencia</h3>
          {Object.entries(frequencies).map(([key, value]) => (
            <div 
              key={key}
              onClick={() => setFrequency(key)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all ${
                frequency === key ? value.color : 'bg-white border-slate-100'
              }`}
            >
              {value.badge && (
                <span className="absolute -top-2 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {value.badge}
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  frequency === key ? 'border-slate-800' : 'border-slate-300'
                }`}>
                  {frequency === key && <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />}
                </div>
                <div>
                  <div className="font-bold text-slate-800">{value.label}</div>
                  <div className="text-xs text-slate-500">
                    {key === 'single' ? 'Pago único' : `Visita cada ${value.monthsDivisor} meses`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-slate-800">
                  ${Math.round((prices[size].price * (1 - value.discount)) / value.monthsDivisor)}
                  <span className="text-xs font-normal text-slate-500">/mes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-slate-500 text-sm">Tu mensualidad</p>
              <h2 className="text-4xl font-black text-slate-900">
                ${Math.round(calculation.monthlyPayment)}
                <span className="text-sm font-medium text-slate-500 ml-1">MXN</span>
              </h2>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg shadow-blue-200 transition-all">
            Agendar Ahora
          </button>
          <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
            <Check className="w-3 h-3" /> Cancelación flexible
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;