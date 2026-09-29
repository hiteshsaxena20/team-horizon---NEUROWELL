import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Layers, Ruler, Clock, Thermometer, Gauge,
  AlertTriangle, ChevronRight, Activity
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { mockWells, ropChartData } from '../data/mockData';

export default function WellDetails() {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const well = mockWells.find(w => w.id === wellId);

  if (!well) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-lg text-navy-300">Well not found</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-cyan-400 hover:text-cyan-300">← Go back</button>
        </div>
      </div>
    );
  }

  const severityColor = (s: string) => {
    switch (s) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const chartColors = {
    rop: '#22d3ee',
    wob: '#34d399',
    torque: '#fbbf24',
    mudWeight: '#a78bfa',
    pumpPressure: '#f87171',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-1">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft size={18} />
          <span className="text-sm font-semibold">Back to Wells</span>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{well.name}</h1>
            <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
              well.status === 'Active' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' :
              well.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
              well.status === 'Suspended' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
              well.status === 'Planned' ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' :
              'bg-navy-500/10 text-navy-300 border-navy-500/20'
            }`}>{well.status}</span>
          </div>
          <p className="text-sm text-navy-300 mt-1">{well.field} • {well.formation} Formation • {well.wellType}</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={() => navigate('/similar-wells')} className="px-4 py-2.5 text-xs font-bold bg-navy-900 text-navy-200 hover:text-white hover:bg-navy-800 border border-navy-700/60 rounded-xl transition-colors cursor-pointer">
            Compare Wells
          </button>
          <button onClick={() => navigate('/ai-assistant')} className="px-4 py-2.5 text-xs font-bold bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 rounded-xl transition-colors cursor-pointer">
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Key Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {[
          { label: 'Location', value: `${well.latitude.toFixed(3)}°N`, icon: MapPin, sub: `${well.longitude.toFixed(3)}°E` },
          { label: 'Total Depth', value: `${well.totalDepth}m`, icon: Ruler },
          { label: 'Formation', value: well.formation, icon: Layers },
          { label: 'Well Type', value: well.wellType, icon: Activity },
          { label: 'Duration', value: `${well.drillingDuration} days`, icon: Clock },
          { label: 'Temperature', value: `${well.temperature}°C`, icon: Thermometer },
          { label: 'Pressure', value: `${well.pressure} psi`, icon: Gauge },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-2">
              <item.icon size={14} className="text-cyan-400" />
              <span className="text-xs text-navy-400 uppercase tracking-wider font-semibold">{item.label}</span>
            </div>
            <p className="text-base font-bold text-white mt-1">{item.value}</p>
            {item.sub && <p className="text-xs text-navy-400 mt-0.5">{item.sub}</p>}
          </div>
        ))}
      </div>

      {/* Geological Information */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
          <Layers size={18} className="text-cyan-400" />
          Geological Strata & Pressure Regime
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Formation', value: well.formation },
            { label: 'Lithology', value: well.lithology },
            { label: 'Pressure', value: `${well.pressure} psi` },
            { label: 'Temperature', value: `${well.temperature}°C` },
            { label: 'Geological Age', value: well.formationAge },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <p className="text-xs text-navy-400 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Drilling Parameters Charts */}
      <div className="glass-card p-6">
        <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2.5">
          <Activity size={18} className="text-cyan-400" />
          Drilling Telemetry & Mechanical Logs
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROP Chart */}
          <div className="bg-navy-900/60 border border-navy-700/50 rounded-xl p-5">
            <h3 className="text-xs font-semibold text-navy-200 uppercase tracking-wider mb-3">Rate of Penetration (m/hr)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ropChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                <XAxis dataKey="depth" stroke="#4a5a8a" tick={{ fontSize: 10 }} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#4a5a8a' } }} />
                <YAxis stroke="#4a5a8a" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid #243054', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="rop" stroke={chartColors.rop} fill={chartColors.rop} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* WOB Chart */}
          <div className="bg-navy-800/50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-navy-200 uppercase tracking-wider mb-3">Weight on Bit (klbs)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ropChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                <XAxis dataKey="depth" stroke="#4a5a8a" tick={{ fontSize: 10 }} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#4a5a8a' } }} />
                <YAxis stroke="#4a5a8a" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid #243054', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="wob" stroke={chartColors.wob} fill={chartColors.wob} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Torque Chart */}
          <div className="bg-navy-800/50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-navy-200 uppercase tracking-wider mb-3">Torque (ft-lbs)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ropChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                <XAxis dataKey="depth" stroke="#4a5a8a" tick={{ fontSize: 10 }} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#4a5a8a' } }} />
                <YAxis stroke="#4a5a8a" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid #243054', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="torque" stroke={chartColors.torque} fill={chartColors.torque} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Mud Weight & Pump Pressure */}
          <div className="bg-navy-800/50 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-navy-200 uppercase tracking-wider mb-3">Mud Weight (ppg) & Pump Pressure (psi)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ropChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" />
                <XAxis dataKey="depth" stroke="#4a5a8a" tick={{ fontSize: 10 }} label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, style: { fontSize: 10, fill: '#4a5a8a' } }} />
                <YAxis yAxisId="left" stroke="#a78bfa" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#131b2e', border: '1px solid #243054', borderRadius: 8, fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="mudWeight" stroke={chartColors.mudWeight} strokeWidth={2} dot={false} name="Mud Weight" />
                <Line yAxisId="right" type="monotone" dataKey="pumpPressure" stroke={chartColors.pumpPressure} strokeWidth={2} dot={false} name="Pump Pressure" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Drilling Events Timeline */}
      <div className="glass-card p-5">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-400" />
          Historical Drilling Events
        </h2>
        {well.incidents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
              <Activity size={20} className="text-emerald-400" />
            </div>
            <p className="text-sm text-navy-300">No drilling incidents recorded</p>
            <p className="text-xs text-navy-500 mt-1">Clean drilling history</p>
          </div>
        ) : (
          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-navy-700" />
            <div className="space-y-4">
              {well.incidents.map((inc, i) => (
                <div key={inc.id} className="relative animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Timeline dot */}
                  <div className={`absolute -left-6 top-3 w-3.5 h-3.5 rounded-full border-2 border-navy-900 ${
                    inc.severity === 'Critical' ? 'bg-red-500' :
                    inc.severity === 'High' ? 'bg-red-400' :
                    inc.severity === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <div className="bg-navy-800/50 rounded-xl p-4 hover:bg-navy-800/80 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{inc.type}</h3>
                        <p className="text-xs text-navy-400 mt-0.5">{inc.date} • Depth: {inc.depth}m • Duration: {inc.duration}hrs</p>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border self-start ${severityColor(inc.severity)}`}>
                        {inc.severity}
                      </span>
                    </div>
                    <p className="text-xs text-navy-300 mt-2 leading-relaxed">{inc.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${inc.resolved ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      <span className="text-[10px] text-navy-500">{inc.resolved ? 'Resolved' : 'Unresolved'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
