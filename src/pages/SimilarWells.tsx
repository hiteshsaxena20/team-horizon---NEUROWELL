import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Target, ArrowUpRight, ChevronDown, Sparkles, ExternalLink
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { mockWells, targetWell } from '../data/mockData';

const similarityFactors = [
  'Geographic Proximity',
  'Formation Similarity',
  'Depth Similarity',
  'Geological Characteristics',
  'Drilling Parameters',
  'Historical Problems',
];

export default function SimilarWells() {
  const navigate = useNavigate();
  const [selectedWellId, setSelectedWellId] = useState<string | null>(null);

  const sortedWells = mockWells
    .filter(w => w.id !== targetWell.id)
    .sort((a, b) => b.similarityScore - a.similarityScore);

  const topWells = sortedWells.slice(0, 8);

  const getRadarData = (well: typeof mockWells[0]) => [
    { factor: 'Geographic', score: Math.max(0, 100 - well.distance * 12), fullMark: 100 },
    { factor: 'Formation', score: well.formation === targetWell.formation ? 95 : 55, fullMark: 100 },
    { factor: 'Depth', score: Math.max(0, 100 - Math.abs(well.totalDepth - targetWell.totalDepth) / 20), fullMark: 100 },
    { factor: 'Geology', score: well.formationAge === targetWell.formationAge ? 90 : 50, fullMark: 100 },
    { factor: 'Drilling', score: Math.max(0, 100 - Math.abs(well.rop - targetWell.rop) * 3), fullMark: 100 },
    { factor: 'Problems', score: well.incidents.length > 0 ? 70 + Math.min(well.incidents.length * 5, 25) : 40, fullMark: 100 },
  ];

  const barData = topWells.map(w => ({
    name: w.name,
    similarity: w.similarityScore,
    risk: w.riskScore,
  }));

  const selectedWell = selectedWellId ? mockWells.find(w => w.id === selectedWellId) : topWells[0];

  const riskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500/20 text-red-400';
      case 'High': return 'bg-red-500/10 text-red-400';
      case 'Medium': return 'bg-amber-500/10 text-amber-400';
      default: return 'bg-emerald-500/10 text-emerald-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles size={28} className="text-cyan-400" />
            Multi-Parameter Similar Well Analysis
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            Evaluating historical offset affinity against target well <span className="text-cyan-400 font-semibold">{targetWell.name}</span> ({targetWell.formation} Formation)
          </p>
        </div>
      </div>

      {/* Similarity Factors */}
      <div className="glass-card p-6">
        <h2 className="text-xs font-bold text-navy-300 uppercase tracking-wider mb-3.5">AI Similarity Weighting Criteria</h2>
        <div className="flex flex-wrap gap-2.5">
          {similarityFactors.map((factor, i) => (
            <span key={i} className="px-3.5 py-1.5 bg-navy-900 border border-navy-700/60 rounded-xl text-xs text-navy-200 font-semibold shadow-sm">
              {factor}
            </span>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h2 className="text-sm font-bold text-white mb-4">
            Multi-Dimensional Similarity Radar — {selectedWell?.name || topWells[0]?.name}
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={getRadarData(selectedWell || topWells[0])}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: '#cbd5e1', fontWeight: 500 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Radar name="Similarity" dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="glass-card p-6">
          <h2 className="text-sm font-bold text-white mb-4">Comparative Similarity Index</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fill: '#cbd5e1', fontWeight: 600 }} width={76} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="similarity" name="Similarity %" radius={[0, 6, 6, 0]}>
                {barData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.similarity >= 85 ? '#22d3ee' : entry.similarity >= 70 ? '#34d399' : '#fbbf24'} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ranked Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-navy-700/50">
          <h2 className="text-base font-bold text-white">Ranked Offset Analogues ({topWells.length} Wells)</h2>
          <p className="text-xs text-navy-400 mt-1">Select any well row to dynamically update the multi-dimensional radar comparison</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-900/80 border-b border-navy-700/60">
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Rank</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Well ID</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Offset</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Formation</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Total Depth</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Similarity</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Risk Level</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Incidents</th>
                <th className="text-left px-5 py-3.5 text-xs text-navy-300 uppercase tracking-wider font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {topWells.map((well, i) => (
                <tr
                  key={well.id}
                  onClick={() => setSelectedWellId(well.id)}
                  className={`cursor-pointer transition-colors ${
                    (selectedWell?.id === well.id) ? 'bg-cyan-500/10' : 'hover:bg-navy-800/50'
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                      i < 3 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-navy-800 text-navy-300 border border-navy-700'
                    }`}>
                      #{i + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-white">{well.name}</span>
                    <p className="text-xs text-navy-400">{well.field}</p>
                  </td>
                  <td className="px-5 py-3.5 text-navy-200 font-medium">{well.distance} km</td>
                  <td className="px-5 py-3.5 text-navy-200">{well.formation}</td>
                  <td className="px-5 py-3.5 text-navy-200">{well.totalDepth} m</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-navy-800 rounded-full overflow-hidden border border-navy-700/60">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${well.similarityScore}%`,
                            background: well.similarityScore >= 85 ? '#22d3ee' : well.similarityScore >= 70 ? '#34d399' : '#fbbf24'
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-cyan-400">{well.similarityScore}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      well.riskLevel === 'Critical' ? 'bg-red-500/15 text-red-400 border-red-500/30' :
                      well.riskLevel === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      well.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {well.riskLevel}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-navy-200 px-2 py-0.5 bg-navy-800 border border-navy-700 rounded-md">
                      {well.incidents.length}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/well/${well.id}`); }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Details <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
