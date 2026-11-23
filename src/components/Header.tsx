import React from 'react';
import { Target, Sparkles, Download, RefreshCw, Rocket, ShieldCheck } from 'lucide-react';
import { RolePreset } from '../types';

interface HeaderProps {
  presets: RolePreset[];
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  onReset: () => void;
  onOpenExport: () => void;
  overallScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  onReset,
  onOpenExport,
  overallScore
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
      {/* Embarko Challenge Ribbon Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-300 font-medium overflow-hidden">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate">Deploy With Embarko — Student Challenge 2026 Entry</span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline text-indigo-400 font-mono">#DeployWithEmbarko</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">100% Client-Side Privacy</span>
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="text-slate-400 font-mono">Verified Candidate: Rajiv Kumar Sharma</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  ResumeTarget <span className="text-indigo-400">AI</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  ATS v2.6
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Algorithmic ATS Gap Auditor & Google XYZ Bullet Transformer
              </p>
            </div>
          </div>

          {/* Preset Selector & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1 hidden lg:flex">
                <Sparkles className="w-3 h-3 text-amber-400" />
                1-Click Presets:
              </span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[280px] sm:max-w-none py-0.5">
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPreset(p.id)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                      selectedPresetId === p.id
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate max-w-[110px] sm:max-w-none">{p.title.replace(' Intern', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              title="Reset to selected preset defaults"
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-950/60 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-all text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Export Button */}
            <button
              onClick={onOpenExport}
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-950 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit ({overallScore}%)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
