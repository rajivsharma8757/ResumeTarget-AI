import React from 'react';
import { ATSScoreReport } from '../types';
import { Award, Zap, AlertTriangle, CheckCircle2, TrendingUp, BarChart3, FileText, Check } from 'lucide-react';

interface ScoreGaugeProps {
  report: ATSScoreReport;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ report }) => {
  const {
    overallScore,
    keywordScore,
    actionVerbScore,
    metricsScore,
    formattingScore,
    readabilityGrade,
    totalWords,
    bulletCount,
    quantifiedBulletCount,
    foundKeywordsCount,
    missingKeywordsCount,
    sections,
    summaryFeedback
  } = report;

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  // Color tier mapping
  const getScoreTheme = (score: number) => {
    if (score >= 85) return { text: 'text-emerald-400', stroke: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Top 5% ATS Ready' };
    if (score >= 70) return { text: 'text-amber-400', stroke: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Competitive Baseline' };
    return { text: 'text-rose-400', stroke: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/20', label: 'High Rejection Risk' };
  };

  const theme = getScoreTheme(overallScore);

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: theme.stroke }}
      ></div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        
        {/* Radial Score Gauge */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold tracking-tighter ${theme.text}`}>
                {overallScore}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                ATS Match
              </span>
            </div>
          </div>

          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${theme.bg} ${theme.text} border ${theme.border} flex items-center gap-1.5`}>
            {overallScore >= 80 ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : overallScore >= 60 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5" />
            )}
            <span>{theme.label}</span>
          </div>
        </div>

        {/* Breakdown Sub-Metrics & Analysis */}
        <div className="flex-1 w-full space-y-3.5">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                Technical Keyword Density
              </span>
              <span className="font-semibold text-white">{keywordScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-700" 
                style={{ width: `${keywordScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Action Verb Power Rating
              </span>
              <span className="font-semibold text-white">{actionVerbScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-700" 
                style={{ width: `${actionVerbScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                Quantified Metric Bullets
              </span>
              <span className="font-semibold text-white">{metricsScore}% ({quantifiedBulletCount}/{bulletCount})</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-700" 
                style={{ width: `${metricsScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Structural Completeness
              </span>
              <span className="font-semibold text-white">{formattingScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full transition-all duration-700" 
                style={{ width: `${formattingScore}%` }}
              ></div>
            </div>
          </div>

          {/* Feedback message */}
          <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
            {summaryFeedback}
          </p>
        </div>

      </div>

      {/* Quick Summary Strip */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
          <span className="text-slate-400 block text-[11px]">Total Words</span>
          <span className="font-bold text-white text-sm">{totalWords}</span>
          <span className="text-[10px] text-slate-500 block truncate">{readabilityGrade}</span>
        </div>
        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
          <span className="text-slate-400 block text-[11px]">Keywords Found</span>
          <span className="font-bold text-emerald-400 text-sm">{foundKeywordsCount}</span>
          <span className="text-[10px] text-slate-500 block">in target role</span>
        </div>
        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
          <span className="text-slate-400 block text-[11px]">Keyword Gaps</span>
          <span className="font-bold text-rose-400 text-sm">{missingKeywordsCount}</span>
          <span className="text-[10px] text-slate-500 block">missing skills</span>
        </div>
        <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800/50">
          <span className="text-slate-400 block text-[11px]">Sections Verified</span>
          <span className="font-bold text-indigo-400 text-sm">
            {sections.filter(s => s.present).length} / {sections.length}
          </span>
          <span className="text-[10px] text-slate-500 block">ATS standard</span>
        </div>
      </div>
    </div>
  );
};
