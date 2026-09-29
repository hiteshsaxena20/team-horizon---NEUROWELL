import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Shield, TrendingUp, ChevronDown, ChevronUp,
  CheckCircle2, Bot, ArrowRight
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  RadialBarChart, RadialBar
} from 'recharts';
import { riskItems, targetWell } from '../data/mockData';

const overallScore = 68;

const riskDistribution = [
  { name: 'High', value: 2, color: '#f87171' },
  { name: 'Medium', value: 2, color: '#fbbf24' },
  { name: 'Low', value: 1, color: '#34d399' },
];

const gaugeData = [
  { name: 'Score', value: overallScore, fill: overallScore >= 70 ? '#f87171' : overallScore >= 40 ? '#fbbf24' : '#34d399' },
];

export default function RiskAnalysis() {
  const navigate = useNavigate();
  const [expandedRisk, setExpandedRisk] = useState<string | null>(riskItems[0].id);

  const riskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', bar: 'bg-red-500' };
      case 'High': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', bar: 'bg-red-400' };
      case 'Medium': return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', bar: 'bg-amber-400' };
      default: return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', bar: 'bg-emerald-400' };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <AlertTriangle size={28} className="text-amber-400" />
            Drilling Risk Analysis
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            Predicted drilling hazards based on 18 offset wells in Field Alpha
          </p>
        </div>
        <button
          onClick={() => navigate('/ai-assistant')}
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm"
        >
          <Bot size={18} />
          Ask AI About Risks
        </button>
      </div>

      {/* Overall Score + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <div className="glass-card p-6 text-center flex flex-col justify-between">
          <h2 className="text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Overall Drilling Risk Index</h2>
          <div className="relative w-48 h-48 mx-auto my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="75%" outerRadius="100%" data={gaugeData} startAngle={225} endAngle={-45}>
                <RadialBar background={{ fill: '#1a2540' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-amber-400">{overallScore}</span>
              <span className="text-xs font-semibold text-navy-300">/100</span>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-full mx-auto">
            <AlertTriangle size={16} className="text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">MEDIUM-HIGH RISK</span>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <h2 className="text-xs font-bold text-navy-300 uppercase tracking-wider mb-2">Hazard Classification Breakdown</h2>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={riskDistribution}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={6}
                dataKey="value"
              >
                {riskDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {riskDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-navy-200">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Risk Explanation */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-navy-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bot size={16} className="text-cyan-400" />
              AI Geomechanical Explanation
            </h2>
            <div className="p-4 bg-navy-900/70 rounded-xl border border-navy-700/60">
              <p className="text-sm text-navy-200 leading-relaxed">
                Historical nearby wells indicate an <span className="text-amber-400 font-bold">increased probability of lost circulation</span> between{' '}
                <span className="text-white font-semibold">2400m–2700m</span> due to fractured limestone.
                Combined with reactive shale below 2800m, the overall operational risk profile is elevated.
              </p>
              <p className="text-xs text-cyan-400 font-semibold mt-3">
                • 8 out of 18 offset wells encountered NPT in this formation.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-navy-400">
            <Sparkles size={12} className="text-cyan-400" />
            Generated by eRTMAC Geomechanical Engine v2.4
          </div>
        </div>
      </div>

      {/* Risk Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-wide">Detailed Risk Categories & Mitigation Plans</h2>
        {riskItems.map((risk) => {
          const colors = riskLevelColor(risk.level);
          const isExpanded = expandedRisk === risk.id;
          return (
            <div key={risk.id} className="glass-card overflow-hidden">
              <button
                onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                className="w-full p-5 flex items-center gap-4 hover:bg-navy-900/60 transition-colors text-left cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                  <AlertTriangle size={22} className={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-bold text-white">{risk.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {risk.level}
                    </span>
                  </div>
                  <p className="text-xs text-navy-400 mt-1">Critical Interval: <span className="text-navy-200 font-semibold">{risk.depthRange}</span></p>
                </div>
                <div className="flex items-center gap-5">
                  {/* Score Bar */}
                  <div className="hidden sm:flex items-center gap-2.5 w-36">
                    <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden border border-navy-700/60">
                      <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${risk.score}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${colors.text}`}>{risk.score}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-navy-300" /> : <ChevronDown size={18} className="text-navy-300" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="p-5 bg-navy-900/70 rounded-xl border border-navy-700/60 space-y-4">
                    <p className="text-sm text-navy-200 leading-relaxed">{risk.description}</p>
                    <div>
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2.5">Pre-Drill & Operational Mitigations</h4>
                      <div className="space-y-2">
                        {risk.mitigations.map((mit, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-navy-200 font-medium">{mit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recommended Actions */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2.5">
          <CheckCircle2 size={20} className="text-emerald-400" />
          Recommended Operational Directives
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Monitor mud losses continuously through 2400m-2700m interval',
            'Review historical casing depth decisions from WELL-A02 and WELL-B01',
            'Compare offset well drilling parameters before reaching 2500m',
            'Maintain appropriate mud weight of 10.5-11.0 ppg through loss zone',
            'Closely monitor pressure indicators below 2800m',
            'Ensure LCM and cementing materials are available on-site',
          ].map((action, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-cyan-500/15 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-navy-200 font-medium leading-relaxed">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper component for Bot sparkles
function Sparkles({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
