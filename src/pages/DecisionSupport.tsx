import { useNavigate } from 'react-router-dom';
import {
  Compass, Target, AlertTriangle, Settings, TrendingUp,
  FileText, MessageSquare, BarChart3, CheckCircle2, ArrowRight, Gauge
} from 'lucide-react';
import { targetWell, mockWells } from '../data/mockData';

const topSimilarWells = mockWells
  .filter(w => w.id !== targetWell.id)
  .sort((a, b) => b.similarityScore - a.similarityScore)
  .slice(0, 3);

const expectedChallenges = [
  { name: 'Lost Circulation', probability: 'High', depth: '2400-2700m', description: 'Based on 8 nearby wells with similar formation' },
  { name: 'Formation Pressure', probability: 'High', depth: '2800-3400m', description: 'Abnormal pressure gradient expected from offset data' },
  { name: 'Wellbore Instability', probability: 'Medium', depth: '2200-2600m', description: 'Reactive shale sections may cause enlargement' },
];

const recommendedParams = [
  { label: 'Mud Weight', value: '10.5 – 11.0', unit: 'ppg', icon: Gauge },
  { label: 'Rate of Penetration', value: '15 – 20', unit: 'm/hr', icon: TrendingUp },
  { label: 'Weight on Bit', value: '20 – 24', unit: 'klbs', icon: Settings },
  { label: 'RPM', value: '115 – 125', unit: 'rpm', icon: Settings },
];

export default function DecisionSupport() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <Compass size={28} className="text-cyan-400" />
            Drilling Decision Support
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            Empirical offset recommendations & operational parameters for <span className="text-cyan-400 font-semibold">{targetWell.name}</span>
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate('/reports')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <FileText size={16} />
            Generate Drilling Report
          </button>
          <button
            onClick={() => navigate('/similar-wells')}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-navy-200 hover:text-white hover:bg-navy-800 border border-navy-700/60 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <BarChart3 size={16} />
            Compare Wells
          </button>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-900 text-navy-200 hover:text-white hover:bg-navy-800 border border-navy-700/60 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            Ask AI Assistant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Target Well */}
        <div className="space-y-6">
          {/* Target Well Card */}
          <div className="glass-card p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2.5">
              <Target size={20} className="text-cyan-400" />
              Target Well Specifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Well ID', value: targetWell.name, highlight: true },
                { label: 'Field', value: targetWell.field },
                { label: 'Formation', value: targetWell.formation },
                { label: 'Total Depth', value: `${targetWell.totalDepth}m` },
                { label: 'Well Type', value: targetWell.wellType },
                { label: 'Status', value: targetWell.status },
                { label: 'Latitude', value: `${targetWell.latitude.toFixed(4)}°N` },
                { label: 'Longitude', value: `${targetWell.longitude.toFixed(4)}°E` },
              ].map((item, i) => (
                <div key={i} className={`p-3 rounded-xl border ${item.highlight ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-navy-900/60 border-navy-700/50'}`}>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">{item.label}</p>
                  <p className={`text-sm font-semibold mt-1 ${item.highlight ? 'text-cyan-300' : 'text-white'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Challenges */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" />
              Expected Drilling Challenges
            </h2>
            <div className="space-y-3">
              {expectedChallenges.map((ch, i) => (
                <div key={i} className="p-3.5 bg-navy-900/60 rounded-xl border border-navy-700/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-bold text-white">{ch.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      ch.probability === 'High' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {ch.probability} Risk
                    </span>
                  </div>
                  <p className="text-xs font-medium text-cyan-400">Critical Interval: {ch.depth}</p>
                  <p className="text-xs text-navy-300 mt-1 leading-relaxed">{ch.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Recommendations */}
        <div className="space-y-6">
          {/* Recommended Offset Wells */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              Top Analog Offset Wells
            </h2>
            <div className="space-y-3">
              {topSimilarWells.map((well, i) => (
                <button
                  key={well.id}
                  onClick={() => navigate(`/well/${well.id}`)}
                  className="w-full p-3.5 bg-navy-900/60 rounded-xl border border-navy-700/50 hover:bg-navy-800/80 transition-all text-left flex items-center gap-3.5 group cursor-pointer shadow-sm"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-sm font-bold shrink-0">
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{well.name}</h3>
                      <span className="text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md">{well.similarityScore}% Match</span>
                    </div>
                    <p className="text-xs text-navy-300 mt-1">{well.distance} km offset • {well.formation} • {well.totalDepth}m TD</p>
                  </div>
                  <ArrowRight size={16} className="text-navy-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Parameters */}
          <div className="glass-card p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <Settings size={18} className="text-cyan-400" />
              Recommended Drilling Parameters
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {recommendedParams.map((param, i) => (
                <div key={i} className="p-3.5 bg-navy-900/70 rounded-xl border border-navy-700/60 text-center">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2 text-cyan-400">
                    <param.icon size={16} />
                  </div>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">{param.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{param.value}</p>
                  <p className="text-xs font-medium text-cyan-400/90 mt-0.5">{param.unit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Score */}
          <div className="glass-card p-5 text-center">
            <h2 className="text-xs font-semibold text-navy-300 uppercase tracking-wider mb-3">AI Prediction Confidence Score</h2>
            <div className="relative inline-flex">
              <div className="w-28 h-28 rounded-full border-4 border-navy-700/60 flex items-center justify-center relative">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#1a2747" strokeWidth="8" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#22d3ee" strokeWidth="8" strokeDasharray={`${87 * 3.27} ${100 * 3.27}`} strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-bold text-cyan-400">87</span>
                  <span className="text-sm text-navy-300 font-bold">%</span>
                </div>
              </div>
            </div>
            <p className="text-xs font-medium text-navy-300 mt-3">
              Calculated across 18 regional offset wells using geomechanical Bayesian inference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
