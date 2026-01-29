import React from 'react';
import { DollarSign, Users, AlertCircle, Clock, Search, MapPin } from 'lucide-react';

const MOCK_APPOINTMENTS = [
  { id: 1, client: 'Ana García', address: 'San Jerónimo #405', time: '09:00 AM', status: 'confirmed', tech: 'Juan Pérez', type: 'Fumigación Grande' },
  { id: 2, client: 'Roberto Mtz', address: 'Del Valle #120', time: '11:30 AM', status: 'completed', tech: 'Juan Pérez', type: 'Fumigación Chica' },
  { id: 3, client: 'Oficinas WeWork', address: 'Constitución #999', time: '03:00 PM', status: 'pending', tech: 'Sin Asignar', type: 'Fumigación Bimestral' },
];

const AdminDashboard = () => {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Weldu Admin</h1>
          <p className="text-slate-500 font-medium">Panel de Control Operativo</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-slate-800 transition-all">
          + Nueva Cita
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Ingresos Mes', value: '$145,200', color: 'text-green-600', bg: 'bg-green-100' },
          { icon: Clock, label: 'Citas Hoy', value: '8 Pendientes', color: 'text-blue-600', bg: 'bg-blue-100' },
          { icon: Users, label: 'Suscripciones', value: '342 Activas', color: 'text-purple-600', bg: 'bg-purple-100' },
          { icon: AlertCircle, label: 'Pagos Fallidos', value: '3 Alertas', color: 'text-red-600', bg: 'bg-red-100', border: 'border-l-4 border-red-500' }
        ].map((kpi, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 ${kpi.border || ''}`}>
            <div className={`${kpi.bg} p-3 rounded-full ${kpi.color}`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{kpi.label}</p>
              <h3 className={`text-2xl font-black ${kpi.color === 'text-red-600' ? 'text-red-600' : 'text-slate-900'}`}>{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-lg font-bold text-slate-800">Agenda del Día</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="pl-10 pr-4 py-2.5 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50"
            />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold tracking-wider">
            <tr>
              <th className="p-5">Hora</th>
              <th className="p-5">Cliente</th>
              <th className="p-5">Servicio</th>
              <th className="p-5">Técnico</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100">
            {MOCK_APPOINTMENTS.map((cita) => (
              <tr key={cita.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-5 font-mono font-bold text-slate-600">{cita.time}</td>
                <td className="p-5">
                  <div className="font-bold text-slate-900">{cita.client}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {cita.address}
                  </div>
                </td>
                <td className="p-5 text-slate-600 font-medium">{cita.type}</td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                      {cita.tech.charAt(0)}
                    </div>
                    <span className="text-slate-700">{cita.tech}</span>
                  </div>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(cita.status)}`}>
                    {cita.status === 'confirmed' ? 'Confirmado' : cita.status === 'completed' ? 'Completado' : 'Pendiente'}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-slate-400 hover:text-blue-600 font-medium transition-colors">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;