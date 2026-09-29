import { useState } from 'react';
import {
  FileText, Download, Check, Target, MapPin, BarChart3,
  AlertTriangle, Bot, Clock, Printer, Share2
} from 'lucide-react';
import { targetWell, mockWells, riskItems } from '../data/mockData';

const topSimilar = mockWells
  .filter(w => w.id !== targetWell.id)
  .sort((a, b) => b.similarityScore - a.similarityScore)
  .slice(0, 5);

const allIncidents = mockWells.flatMap(w =>
  w.incidents.map(inc => ({ ...inc, wellName: w.name }))
);

const reportId = 'NWIS-2024-8842';

export default function Reports() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Official Dossier
            </span>
            <span className="text-xs text-navy-400">• Ready for Export</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <FileText size={28} className="text-cyan-400" />
            AI Drilling Intelligence Report
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            Pre-drill offset analysis & risk mitigation recommendations for <span className="text-cyan-400 font-semibold">{targetWell.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 text-navy-200 hover:text-white hover:bg-navy-700 border border-navy-600/60 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            <Printer size={16} />
            Print
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 text-navy-200 hover:text-white hover:bg-navy-700 border border-navy-600/60 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            <Share2 size={16} />
            {shared ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-navy-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-70 cursor-pointer"
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                Generating PDF...
              </>
            ) : downloaded ? (
              <>
                <Check size={16} className="text-navy-950 font-bold" />
                Downloaded!
              </>
            ) : (
              <>
                <Download size={16} />
                Export Official PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {downloaded && (
        <div className="fixed top-20 right-6 z-50 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl shadow-2xl backdrop-blur-md">
            <Check size={20} className="text-emerald-400" />
            <div>
              <p className="text-sm font-semibold text-white">Report Generated Successfully</p>
              <p className="text-xs text-navy-200">NWIS_Report_{targetWell.name}.pdf has been saved</p>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Document */}
      <div className="report-document-card w-full overflow-hidden shadow-2xl border border-navy-700/80">
        {/* Report Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 p-6 sm:p-8 border-b border-navy-700/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-700/40">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <FileText size={24} className="text-navy-950" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">Drilling Intelligence Report</h2>
                <p className="text-xs text-cyan-400 font-medium tracking-wider uppercase mt-0.5">eRTMAC-NWIS • Nearby Wells Intelligence System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold rounded-lg tracking-wider">
                CONFIDENTIAL • FOR DRILLING CREW ONLY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-3.5 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Report Date</p>
              <p className="text-sm font-semibold text-white mt-1">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="p-3.5 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Engine Version</p>
              <p className="text-sm font-semibold text-cyan-400 mt-1">eRTMAC AI v2.4 (RAG-Enabled)</p>
            </div>
            <div className="p-3.5 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Target Asset</p>
              <p className="text-sm font-semibold text-white mt-1">{targetWell.name} ({targetWell.field})</p>
            </div>
            <div className="p-3.5 bg-navy-900/60 border border-navy-700/50 rounded-xl">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">Document ID</p>
              <p className="text-sm font-semibold text-white font-mono mt-1">{reportId}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10 space-y-10 bg-navy-950/60">
          {/* 1. Target Well Summary */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">1</span>
              Target Well Summary & Geological Properties
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {[
                { label: 'Well Identifier', value: targetWell.name, highlight: true },
                { label: 'Operational Field', value: targetWell.field },
                { label: 'Target Formation', value: `${targetWell.formation} (${targetWell.formationAge})` },
                { label: 'Planned Total Depth', value: `${targetWell.totalDepth} m` },
                { label: 'Well Category', value: targetWell.wellType },
                { label: 'Well Status', value: targetWell.completionStatus },
                { label: 'Surface Coordinates', value: `${targetWell.latitude.toFixed(4)}°N, ${targetWell.longitude.toFixed(4)}°E` },
                { label: 'Primary Lithology', value: targetWell.lithology },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border ${item.highlight ? 'bg-cyan-500/10 border-cyan-500/30 shadow-sm' : 'bg-navy-900/70 border-navy-700/60'}`}>
                  <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">{item.label}</p>
                  <p className={`text-sm font-bold mt-1.5 ${item.highlight ? 'text-cyan-300' : 'text-white'}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Nearby Wells Analyzed */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">2</span>
              Nearby Offset Wells Analyzed
            </h3>
            <p className="text-sm text-navy-200 mb-4 leading-relaxed">
              A total of <span className="text-white font-bold">{mockWells.length - 1}</span> offset wells within a 6.0 km spatial radius were processed and scored for lithological and geomechanical affinity.
            </p>
            <div className="overflow-x-auto rounded-xl border border-navy-700/60 bg-navy-900/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-700/80 bg-navy-900/90">
                    <th className="text-left py-3.5 px-5 text-xs font-semibold text-navy-300 uppercase tracking-wider">Well ID</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold text-navy-300 uppercase tracking-wider">Offset Distance</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold text-navy-300 uppercase tracking-wider">Formation</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold text-navy-300 uppercase tracking-wider">Total Depth</th>
                    <th className="text-left py-3.5 px-5 text-xs font-semibold text-navy-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800/60">
                  {mockWells.filter(w => w.id !== targetWell.id).slice(0, 8).map(well => (
                    <tr key={well.id} className="hover:bg-navy-800/40 transition-colors">
                      <td className="py-3 px-5 font-semibold text-white">{well.name}</td>
                      <td className="py-3 px-5 text-navy-200 font-medium">{well.distance} km</td>
                      <td className="py-3 px-5 text-navy-200">{well.formation}</td>
                      <td className="py-3 px-5 text-navy-200">{well.totalDepth} m</td>
                      <td className="py-3 px-5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          well.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                          well.status === 'Active' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' :
                          'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {well.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Similarity Analysis */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">3</span>
              AI Offset Similarity Rankings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {topSimilar.slice(0, 4).map((well, i) => (
                <div key={well.id} className="flex items-center gap-4 p-4.5 bg-navy-900/70 border border-navy-700/60 rounded-xl hover:border-navy-600/70 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-navy-800 border border-navy-600/60 text-cyan-400 text-xs flex items-center justify-center font-bold shrink-0">
                    #{i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-white truncate">{well.name}</span>
                      <span className="text-xs font-bold text-cyan-400 px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md">{well.similarityScore}% Match</span>
                    </div>
                    <div className="w-full h-2.5 bg-navy-800 rounded-full overflow-hidden border border-navy-700/60">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" style={{ width: `${well.similarityScore}%` }} />
                    </div>
                    <p className="text-xs text-navy-400 mt-1.5">{well.formation} • {well.distance} km offset • {well.totalDepth}m depth</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Historical Drilling Incidents */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">4</span>
              Historical Offset Incidents (Offset Analogues)
            </h3>
            <p className="text-sm text-navy-200 mb-4 leading-relaxed">
              <span className="text-white font-bold">{allIncidents.length}</span> documented non-productive time (NPT) events retrieved from offset drilling records:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
              {[
                { type: 'Lost Circulation', count: allIncidents.filter(i => i.type === 'Lost Circulation').length, color: 'text-red-400', border: 'border-red-500/30' },
                { type: 'Stuck Pipe', count: allIncidents.filter(i => i.type === 'Stuck Pipe').length, color: 'text-amber-400', border: 'border-amber-500/30' },
                { type: 'Well Kick', count: allIncidents.filter(i => i.type === 'Kick').length, color: 'text-red-400', border: 'border-red-500/30' },
                { type: 'Instability', count: allIncidents.filter(i => i.type === 'Wellbore Instability').length, color: 'text-amber-400', border: 'border-amber-500/30' },
                { type: 'Overpressure', count: allIncidents.filter(i => i.type === 'Formation Pressure').length, color: 'text-amber-400', border: 'border-amber-500/30' },
              ].map((item, i) => (
                <div key={i} className={`p-4 bg-navy-900/80 border ${item.border} rounded-xl text-center shadow-sm`}>
                  <p className={`text-2xl sm:text-3xl font-bold ${item.color}`}>{item.count}</p>
                  <p className="text-xs font-semibold text-navy-300 mt-1.5 uppercase tracking-wider">{item.type}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Risk Assessment */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">5</span>
              Pre-Drill Geomechanical Risk Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {riskItems.map((risk) => (
                <div key={risk.id} className="p-4 bg-navy-900/80 border border-navy-700/60 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{risk.name}</p>
                    <p className="text-xs text-navy-400 mt-1">Depth: {risk.depthRange}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      risk.level === 'High' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 
                      risk.level === 'Medium' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' : 
                      'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {risk.level}
                    </span>
                    <p className="text-xs font-semibold text-navy-300 mt-1.5">Score: {risk.score}/100</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. AI Recommendations */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-3 pb-3 border-b border-navy-700/60">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">6</span>
              Operational Pre-Drill Recommendations
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Lost Circulation Prevention', desc: 'Pre-treat drilling mud with Lost Circulation Material (LCM) before entering the 2400m–2700m loss zone identified in 8 offset wells.' },
                { title: 'Casing Seat Optimization', desc: 'Set intermediate casing shoe at 2800m to isolate the upper depleted reservoir before penetrating lower overpressured sandstones.' },
                { title: 'Inhibitive Mud Chemistry', desc: 'Deploy high-inhibition polymer/glycol mud through the 2200m–2600m reactive shale section to mitigate borehole sloughing.' },
                { title: 'Hydraulics & Mud Density', desc: 'Maintain ECD between 10.5–11.0 ppg through the critical interval to respect narrow fracture gradient margins.' },
                { title: 'Real-Time Flow Monitoring', desc: 'Conduct continuous automated flow checks and keep automated well-control chokes primed below 3000m depth.' },
                { title: 'Analog Lessons Transfer', desc: 'Mandate crew review of WELL-A02 stuck pipe incident report and WELL-B01 kick logs during pre-tour safety meetings.' },
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-navy-900/70 border border-navy-700/60 rounded-xl">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{rec.title}</p>
                    <p className="text-xs text-navy-300 mt-1 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Sources */}
          <section>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2.5 pb-2 border-b border-navy-700/60">
              <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs flex items-center justify-center font-bold">7</span>
              Validated Knowledge Bases & Offset Records
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Field Alpha Well Database (18 Wells)',
                'WELL-A02 End-of-Well Dossier',
                'WELL-B01 NPT Incident Log',
                'WELL-D01 Geological Summary',
                'Regional Formation Atlas v3.2',
                'eRTMAC Similarity Engine v2.4',
                'Historical Geomechanical Study',
                'Regional Pore Pressure Model',
                'eRTMAC RAG Pipeline v1.0',
              ].map((src, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-navy-900/90 border border-navy-700/80 rounded-lg text-navy-200 font-medium shadow-sm">
                  {src}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Report Footer */}
        <div className="px-6 sm:px-8 py-4 bg-navy-900 border-t border-navy-700/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-navy-400">
            Generated by <span className="text-cyan-400 font-semibold">eRTMAC-NWIS AI Engine</span> • SIH26121 • Team Horizon
          </p>
          <p className="text-xs text-navy-400 font-medium">
            Confidential — Authorized Drilling Engineers & Rig Managers Only
          </p>
        </div>
      </div>
    </div>
  );
}
