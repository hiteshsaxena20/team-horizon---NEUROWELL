import { useNavigate } from 'react-router-dom';
import {
  MapPin, Layers, Target, AlertTriangle, FileText, TrendingUp,
  ArrowUpRight, Activity, Droplets, Clock
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { mockWells, targetWell, FIELD_CENTER } from '../data/mockData';

const statCards = [
  {
    title: 'Active Field',
    value: 'Field Alpha',
    subtitle: 'Offshore Gujarat Basin',
    icon: Layers,
    color: 'from-cyan-500 to-cyan-600',
    link: '/nearby-wells',
  },
  {
    title: 'Nearby Wells',
    value: '24',
    subtitle: '+3 newly identified',
    icon: MapPin,
    color: 'from-blue-500 to-blue-600',
    link: '/nearby-wells',
  },
  {
    title: 'Similar Wells Found',
    value: '8',
    subtitle: 'AI similarity score >75%',
    icon: Target,
    color: 'from-emerald-500 to-emerald-600',
    link: '/similar-wells',
  },
  {
    title: 'High-Risk Wells',
    value: '3',
    subtitle: 'Require attention',
    icon: AlertTriangle,
    color: 'from-amber-500 to-amber-600',
    link: '/risk-analysis',
  },
  {
    title: 'Historical Incidents',
    value: '17',
    subtitle: 'Across all nearby wells',
    icon: FileText,
    color: 'from-red-500 to-red-600',
    link: '/risk-analysis',
  },
];

function getMarkerColor(well: typeof mockWells[0]): string {
  if (well.id === targetWell.id) return '#22d3ee';
  if (well.riskLevel === 'Critical') return '#ef4444';
  if (well.riskLevel === 'High') return '#f87171';
  if (well.riskLevel === 'Medium') return '#fbbf24';
  return '#34d399';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const highRiskWells = mockWells.filter(w => w.riskLevel === 'High' || w.riskLevel === 'Critical');
  const recentIncidents = mockWells
    .flatMap(w => w.incidents.map(inc => ({ ...inc, wellName: w.name })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-navy-300 mt-1">
            Real-time drilling intelligence & offset well monitoring • Target: <span className="text-cyan-400 font-semibold">{targetWell.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">System Live</span>
          </div>
          <div className="px-3.5 py-2 bg-navy-900 border border-navy-700/60 rounded-xl">
            <span className="text-xs text-navy-300">Updated: 2m ago</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map((card, i) => (
          <button
            key={i}
            onClick={() => navigate(card.link)}
            className="glass-card p-5 text-left hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-cyan-500/5 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} shadow-md`}>
                <card.icon size={20} className="text-white" />
              </div>
              <ArrowUpRight size={16} className="text-navy-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-navy-400 font-semibold uppercase tracking-wider">{card.title}</p>
              <p className="text-2xl font-bold text-white mt-1.5">{card.value}</p>
              <p className="text-xs text-navy-300 mt-1">{card.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Row 1: Map + Well Parameters & Critical Wells */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card overflow-hidden flex flex-col" style={{ height: '580px' }}>
          <div className="p-5 border-b border-navy-700/50 flex items-center justify-between bg-navy-900/40">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400" />
                Spatial Field Overview Map
              </h2>
              <p className="text-xs text-navy-400 mt-0.5">Interactive GIS telemetry and color-coded risk markers</p>
            </div>
            <button
              onClick={() => navigate('/nearby-wells')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-all"
            >
              Full Screen Map <ArrowUpRight size={14} />
            </button>
          </div>
          <div style={{ height: '460px' }} className="flex-1">
            <MapContainer
              center={[FIELD_CENTER.lat, FIELD_CENTER.lng]}
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mockWells.map((well) => (
                <CircleMarker
                  key={well.id}
                  center={[well.latitude, well.longitude]}
                  radius={well.id === targetWell.id ? 10 : 7}
                  pathOptions={{
                    fillColor: getMarkerColor(well),
                    fillOpacity: 0.9,
                    color: well.id === targetWell.id ? '#ffffff' : getMarkerColor(well),
                    weight: well.id === targetWell.id ? 3 : 1.5,
                    opacity: 1,
                  }}
                  eventHandlers={{
                    click: () => navigate(`/well/${well.id}`),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                    <div className="text-xs">
                      <strong>{well.name}</strong>
                      {well.id !== targetWell.id && <span className="ml-1 opacity-70">{well.distance} km</span>}
                    </div>
                  </Tooltip>
                  <Popup>
                    <div className="min-w-[180px] text-xs">
                      <p className="font-bold text-sm mb-1">{well.name}</p>
                      <p>Status: <span className="font-medium">{well.status}</span></p>
                      <p>Depth: {well.totalDepth}m</p>
                      <p>Formation: {well.formation}</p>
                      {well.id !== targetWell.id && <p>Distance: {well.distance} km</p>}
                      <p>Risk: <span className={`font-semibold ${well.riskLevel === 'High' || well.riskLevel === 'Critical' ? 'text-red-400' : well.riskLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>{well.riskLevel}</span></p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          {/* Map Legend */}
          <div className="p-3.5 border-t border-navy-700/50 flex flex-wrap gap-4 bg-navy-900/50">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-white" />
              <span className="text-xs text-navy-300">Target Well</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-navy-300">Low Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-xs text-navy-300">Medium Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-xs text-navy-300">High Risk</span>
            </div>
          </div>
        </div>

        {/* Right Column: Target Well Parameters & Critical Wells */}
        <div className="flex flex-col justify-between gap-5" style={{ height: '580px' }}>
          {/* Target Well Info */}
          <div className="glass-card p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target size={18} className="text-cyan-400" />
                  Target Well Parameters
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded-md">
                  Active Asset
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1.5 border-b border-navy-700/40">
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Well ID</span>
                  <span className="text-sm font-bold text-cyan-400">{targetWell.name}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-navy-700/40">
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Field</span>
                  <span className="text-xs font-semibold text-white">{targetWell.field}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-navy-700/40">
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Formation</span>
                  <span className="text-xs font-semibold text-white">{targetWell.formation}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-navy-700/40">
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Total Depth</span>
                  <span className="text-xs font-semibold text-white">{targetWell.totalDepth} m</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Risk Score</span>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 bg-amber-500/15 border border-amber-500/25 rounded-md">{targetWell.riskScore}/100</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/well/${targetWell.id}`)}
              className="w-full mt-3 py-2 text-xs font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              View Full Well Telemetry →
            </button>
          </div>

          {/* High Risk Wells */}
          <div className="glass-card p-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-400" />
                Critical & High Risk Wells
              </h3>
              <span className="text-xs px-2.5 py-0.5 bg-red-500/15 text-red-400 rounded-full font-bold border border-red-500/30">{highRiskWells.length}</span>
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-around">
              {highRiskWells.slice(0, 3).map((well) => (
                <button
                  key={well.id}
                  onClick={() => navigate(`/well/${well.id}`)}
                  className="w-full flex items-center justify-between p-2.5 bg-navy-900/70 hover:bg-navy-800/90 border border-navy-700/60 rounded-xl transition-all text-left group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${well.riskLevel === 'Critical' ? 'bg-red-500 animate-pulse ring-2 ring-red-500/30' : 'bg-red-400'}`} />
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">{well.name}</p>
                      <p className="text-[11px] text-navy-400 mt-0.5">{well.formation} • {well.distance} km offset</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-400 px-2 py-0.5 bg-red-500/15 border border-red-500/25 rounded-md">{well.riskScore}</span>
                    <ArrowUpRight size={14} className="text-navy-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Incidents Feed & AI Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Incidents Feed */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock size={18} className="text-amber-400" />
                Historical Offset Drilling Incidents (NPT Events)
              </h3>
              <p className="text-xs text-navy-400 mt-0.5">Chronological offset logs retrieved to prevent recurring operational bottlenecks</p>
            </div>
            <button
              onClick={() => navigate('/risk-analysis')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-all"
            >
              Full Risk Logs →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {recentIncidents.slice(0, 4).map((inc) => (
              <div key={inc.id} className="flex items-start gap-3.5 p-3.5 bg-navy-900/60 border border-navy-700/50 rounded-xl hover:border-navy-600/70 transition-colors">
                <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                  inc.severity === 'Critical' ? 'bg-red-500 ring-2 ring-red-500/30' :
                  inc.severity === 'High' ? 'bg-red-400' :
                  inc.severity === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white font-bold truncate">{inc.type}</p>
                    <span className="text-[11px] text-navy-400 font-medium ml-1">{inc.date}</span>
                  </div>
                  <p className="text-xs text-navy-300 mt-1"><span className="text-cyan-400 font-semibold">{inc.wellName}</span> at <span className="text-white font-medium">{inc.depth}m</span> depth</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Directives Quick Box */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Target size={18} className="text-cyan-400" />
              Operational Directives
            </h3>
            <p className="text-xs text-navy-400 mb-4">Immediate pre-drill advisories synthesized by AI</p>
            <div className="space-y-3">
              <div className="p-3 bg-navy-900/70 rounded-xl border border-navy-700/60">
                <p className="text-xs font-bold text-amber-400">Lost Circulation Pre-treatment</p>
                <p className="text-xs text-navy-300 mt-0.5">Pre-mix LCM pills before penetrating 2400m–2700m zone.</p>
              </div>
              <div className="p-3 bg-navy-900/70 rounded-xl border border-navy-700/60">
                <p className="text-xs font-bold text-cyan-400">Intermediate Casing Shoe</p>
                <p className="text-xs text-navy-300 mt-0.5">Seat casing shoe at 2800m to isolate reactive shale.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-700/50 flex items-center justify-between">
            <span className="text-[11px] text-navy-400">8 Analogue Wells Verified</span>
            <button
              onClick={() => navigate('/decision-support')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Open Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
