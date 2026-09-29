import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Search, Filter, X, ChevronDown, ExternalLink,
  Layers, Target, AlertTriangle
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { mockWells, targetWell, FIELD_CENTER } from '../data/mockData';

function getMarkerColor(well: typeof mockWells[0]): string {
  if (well.id === targetWell.id) return '#22d3ee';
  if (well.riskLevel === 'Critical') return '#ef4444';
  if (well.riskLevel === 'High') return '#f87171';
  if (well.riskLevel === 'Medium') return '#fbbf24';
  return '#34d399';
}

export default function NearbyWells() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    distance: 10,
    formation: 'All',
    wellType: 'All',
    status: 'All',
    depthMin: 0,
    depthMax: 5000,
    riskLevel: 'All',
  });

  const formations = ['All', ...new Set(mockWells.map(w => w.formation))];
  const wellTypes = ['All', ...new Set(mockWells.map(w => w.wellType))];
  const statuses = ['All', ...new Set(mockWells.map(w => w.status))];
  const riskLevels = ['All', 'Low', 'Medium', 'High', 'Critical'];

  const filteredWells = useMemo(() => {
    return mockWells.filter(well => {
      if (searchQuery && !well.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !well.field.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (well.distance > filters.distance) return false;
      if (filters.formation !== 'All' && well.formation !== filters.formation) return false;
      if (filters.wellType !== 'All' && well.wellType !== filters.wellType) return false;
      if (filters.status !== 'All' && well.status !== filters.status) return false;
      if (well.totalDepth < filters.depthMin || well.totalDepth > filters.depthMax) return false;
      if (filters.riskLevel !== 'All' && well.riskLevel !== filters.riskLevel) return false;
      return true;
    });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <MapPin size={28} className="text-cyan-400" />
            Nearby Wells Intelligence
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            Displaying <span className="text-cyan-400 font-semibold">{filteredWells.length}</span> active & historical wells within a {filters.distance} km radius
          </p>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="glass-card p-5">
        <div className="flex flex-col sm:flex-row gap-3.5">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search well name or field designation..."
              className="w-full pl-11 pr-4 py-2.5 bg-navy-900/90 border border-navy-700/60 rounded-xl text-sm text-white placeholder-navy-500 focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              showFilters ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm' : 'bg-navy-900 text-navy-300 border border-navy-700/60 hover:bg-navy-800 hover:text-white'
            }`}
          >
            <Filter size={16} />
            Filters & Parameters
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-5 pt-5 border-t border-navy-700/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4.5 animate-fade-in">
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Max Distance ({filters.distance} km)</label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={filters.distance}
                onChange={(e) => setFilters({ ...filters, distance: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Geological Formation</label>
              <select
                value={filters.formation}
                onChange={(e) => setFilters({ ...filters, formation: e.target.value })}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
              >
                {formations.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Well Type</label>
              <select
                value={filters.wellType}
                onChange={(e) => setFilters({ ...filters, wellType: e.target.value })}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
              >
                {wellTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Operational Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Risk Classification</label>
              <select
                value={filters.riskLevel}
                onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
                className="w-full px-3 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
              >
                {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-navy-300 mb-2 font-semibold">Depth Range (m)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.depthMin}
                  onChange={(e) => setFilters({ ...filters, depthMin: parseInt(e.target.value) || 0 })}
                  placeholder="Min"
                  className="w-full px-2.5 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
                />
                <input
                  type="number"
                  value={filters.depthMax}
                  onChange={(e) => setFilters({ ...filters, depthMax: parseInt(e.target.value) || 5000 })}
                  placeholder="Max"
                  className="w-full px-2.5 py-2 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map + Well List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 glass-card overflow-hidden flex flex-col" style={{ height: '600px' }}>
          <div style={{ height: '540px' }} className="flex-1">
            <MapContainer
              center={[FIELD_CENTER.lat, FIELD_CENTER.lng]}
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredWells.map((well) => (
                <CircleMarker
                  key={well.id}
                  center={[well.latitude, well.longitude]}
                  radius={well.id === targetWell.id ? 12 : 8}
                  pathOptions={{
                    fillColor: getMarkerColor(well),
                    fillOpacity: 0.9,
                    color: well.id === targetWell.id ? '#ffffff' : getMarkerColor(well),
                    weight: well.id === targetWell.id ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => navigate(`/well/${well.id}`),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} permanent={well.id === targetWell.id}>
                    <span className="text-xs font-medium">{well.name}</span>
                  </Tooltip>
                  <Popup>
                    <div className="min-w-[220px] space-y-1.5 text-xs">
                      <p className="font-bold text-base mb-2">{well.name}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p><span className="opacity-60">Distance:</span> <strong>{well.distance} km</strong></p>
                        <p><span className="opacity-60">Depth:</span> <strong>{well.totalDepth}m</strong></p>
                        <p><span className="opacity-60">Formation:</span> <strong>{well.formation}</strong></p>
                        <p><span className="opacity-60">Status:</span> <strong>{well.status}</strong></p>
                        <p><span className="opacity-60">Risk:</span> <strong className={
                          well.riskLevel === 'High' || well.riskLevel === 'Critical' ? 'text-red-400' :
                          well.riskLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                        }>{well.riskLevel}</strong></p>
                        <p><span className="opacity-60">Similarity:</span> <strong>{well.similarityScore}%</strong></p>
                      </div>
                      {well.incidents.length > 0 && (
                        <div className="pt-1.5 border-t border-navy-600/50">
                          <p className="opacity-60 mb-0.5">Major Problems:</p>
                          <p className="font-medium">{well.incidents.map(i => i.type).join(', ')}</p>
                        </div>
                      )}
                      <button
                        onClick={() => navigate(`/well/${well.id}`)}
                        className="w-full mt-2 py-1.5 text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-medium transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          {/* Map Legend */}
          <div className="p-3 border-t border-navy-700/50 flex flex-wrap gap-4 bg-navy-900/50">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-white" />
              <span className="text-xs text-navy-300">Target Well (WELL-A01)</span>
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
              <span className="text-xs text-navy-300">High / Critical</span>
            </div>
          </div>
        </div>

        {/* Well List */}
        <div className="glass-card overflow-hidden flex flex-col" style={{ height: '600px' }}>
          <div className="p-4 sm:p-5 border-b border-navy-700/50 flex items-center justify-between bg-navy-900/40">
            <h2 className="text-sm font-bold text-white">Offset Well Database</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30">{filteredWells.length} Wells</span>
          </div>
          <div className="overflow-y-auto flex-1 p-3.5 space-y-3">
            {filteredWells.map((well) => (
              <button
                key={well.id}
                onClick={() => navigate(`/well/${well.id}`)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 border cursor-pointer ${
                  well.id === targetWell.id ? 'bg-cyan-500/10 border-cyan-500/30 shadow-sm' : 'bg-navy-900/60 border-navy-700/50 hover:bg-navy-800/80 hover:border-navy-600/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{well.name}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                    well.riskLevel === 'Critical' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                    well.riskLevel === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    well.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {well.riskLevel}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-navy-400">Distance: <span className="text-white font-semibold">{well.distance} km</span></span>
                  <span className="text-navy-400">Depth: <span className="text-white font-semibold">{well.totalDepth}m</span></span>
                  <span className="text-navy-400">Formation: <span className="text-white font-semibold">{well.formation}</span></span>
                  <span className="text-navy-400">Similarity: <span className="text-cyan-400 font-bold">{well.similarityScore}%</span></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
