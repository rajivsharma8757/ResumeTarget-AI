import React from 'react';
import { calculateResumeDiff } from '../utils/atsEngine';
import { GitCompare, TrendingUp, Sparkles, Check, ArrowRight } from 'lucide-react';

interface BeforeAfterDiffProps {
  originalResume: string;
  currentResume: string;
  originalScore?: number;
  currentScore: number;
}

export const BeforeAfterDiff: React.FC<BeforeAfterDiffProps> = ({
  originalResume,
  currentResume,
  originalScore = 52,
  currentScore
}) => {
  const { diffSegments, addedLinesCount, removedLinesCount } = calculateResumeDiff(
    originalResume,
    currentResume
  );

  const deltaScore = currentScore - originalScore;

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl">
      {/* Header & Delta Score Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-indigo-400" />
            <span>Before vs. After Optimization Diff</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time visual comparison contrasting your baseline submission against the ATS-tailored version.
          </p>
        </div>

        {/* Delta Score Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs flex items-center gap-2">
            <span className="text-slate-400">Baseline: <strong className="text-slate-200">{originalScore}%</strong></span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-emerald-400 font-bold">Tailored: {currentScore}%</span>
          </div>

          <div className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1 ${
            deltaScore >= 0
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{deltaScore >= 0 ? `+${deltaScore}%` : `${deltaScore}%`}</span>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-4">
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 block">Upgraded / Added Lines</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">+{addedLinesCount}</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 block">Passive Phrasing Removed</span>
          <span className="text-sm font-bold text-rose-400 font-mono">{removedLinesCount}</span>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 block">Status Verdict</span>
          <span className="text-xs font-bold text-indigo-300 block truncate mt-0.5">
            {currentScore >= 90 ? 'High Interview Ready' : 'Competitive Draft'}
          </span>
        </div>
      </div>

      {/* Synchronized Diff Box */}
      <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 max-h-96 overflow-y-auto font-mono text-xs space-y-1">
        {diffSegments.map((seg, idx) => {
          if (seg.type === 'added') {
            return (
              <div 
                key={idx}
                className="bg-emerald-950/40 text-emerald-200 border-l-2 border-emerald-400 px-2.5 py-1 rounded-r-md flex items-start gap-2"
              >
                <span className="text-emerald-400 select-none font-bold">+</span>
                <span className="break-all">{seg.text}</span>
              </div>
            );
          }
          return (
            <div key={idx} className="text-slate-400 px-2.5 py-0.5 break-all pl-6">
              {seg.text || <br />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
