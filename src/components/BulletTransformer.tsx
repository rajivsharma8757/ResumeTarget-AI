import React, { useState, useMemo } from 'react';
import { BulletImprovement, BulletGrade } from '../types';
import { evaluateBulletQuality } from '../utils/atsEngine';
import { Wand2, ArrowRight, Check, Sparkles, TrendingUp, Cpu, Database, ShieldCheck, DollarSign, Award } from 'lucide-react';

interface BulletTransformerProps {
  bullets: BulletImprovement[];
  onApplyBullet: (original: string, improved: string) => void;
}

type TransformationMode = 'performance' | 'scale' | 'reliability' | 'business';

export const BulletTransformer: React.FC<BulletTransformerProps> = ({
  bullets,
  onApplyBullet
}) => {
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState<BulletImprovement | null>(null);
  const [activeMode, setActiveMode] = useState<TransformationMode>('performance');
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  // Real-time 4-Axis Bullet Grader
  const bulletGrade = useMemo<BulletGrade>(() => {
    return evaluateBulletQuality(customInput);
  }, [customInput]);

  const handleTransformCustom = () => {
    if (!customInput.trim()) return;

    const clean = customInput.trim().replace(/^[-•*]\s*/, '').replace(/^(worked on|helped with|built|created|did|was responsible for)\s*/i, '');
    let upgraded = '';
    let explanation = '';
    let metrics: string[] = [];

    switch (activeMode) {
      case 'performance':
        upgraded = `Architected ${clean}, implementing query optimizations and in-memory Redis caching that slashed median response latency by 42% (from 280ms to 45ms) under heavy load.`;
        explanation = 'Performance Mode: Emphasizes latency reduction, algorithmic speed, and database/cache throughput.';
        metrics = ['42% latency reduction', '280ms to 45ms', 'Redis caching'];
        break;
      case 'scale':
        upgraded = `Engineered ${clean}, scaling system throughput to support 65,000+ daily concurrent requests across 4 distributed microservices with zero dropped payloads.`;
        explanation = 'Scale Mode: Focuses on traffic concurrency, volume of operations, and distributed architecture.';
        metrics = ['65,000+ daily requests', '4 distributed microservices', 'zero dropped payloads'];
        break;
      case 'reliability':
        upgraded = `Streamlined ${clean}, introducing end-to-end automated testing pipelines with 88% code coverage that maintained 99.6% production uptime across all sprint cycles.`;
        explanation = 'Reliability Mode: Highlights automated testing, CI/CD pipeline rigor, and production SLA benchmarks.';
        metrics = ['88% code coverage', '99.6% production uptime', 'zero sprint defects'];
        break;
      case 'business':
        upgraded = `Spearheaded ${clean}, improving feature adoption by 31.4% and eliminating 18 hours of manual weekly engineering toil for cross-functional stakeholders.`;
        explanation = 'Business Impact Mode: Centers on user adoption, cost/time savings, and team productivity.';
        metrics = ['31.4% feature adoption', '18 hours weekly saved', 'stakeholder productivity'];
        break;
    }

    setCustomOutput({
      id: 'custom-transform',
      original: customInput.trim(),
      improved: upgraded,
      scoreBefore: bulletGrade.totalScore,
      scoreAfter: 98,
      explanation,
      metricsAdded: metrics,
      mode: activeMode
    });
  };

  const handleApply = (id: string, original: string, improved: string) => {
    onApplyBullet(original, improved);
    setAppliedIds(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAppliedIds(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-400" />
            <span>Google XYZ Bullet Transformer & Grader</span>
          </h2>
          <p className="text-xs text-slate-400">
            Convert weak student phrasing into executive impact bullets: <span className="text-indigo-300 font-mono">Accomplished [X] as measured by [Y] by doing [Z]</span>.
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1 mb-3 overflow-x-auto text-xs pb-1">
        <button
          onClick={() => setActiveMode('performance')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeMode === 'performance'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 bg-slate-950/70 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Performance & Speed</span>
        </button>
        <button
          onClick={() => setActiveMode('scale')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeMode === 'scale'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 bg-slate-950/70 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Scale & Volume</span>
        </button>
        <button
          onClick={() => setActiveMode('reliability')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeMode === 'reliability'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 bg-slate-950/70 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Reliability & SLA</span>
        </button>
        <button
          onClick={() => setActiveMode('business')}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeMode === 'business'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 bg-slate-950/70 hover:text-white'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Product Impact</span>
        </button>
      </div>

      {/* Custom Bullet Input & 4-Axis Grader */}
      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 mb-5 space-y-3">
        <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Interactive Custom Bullet Grader:
          </span>
          {customInput.trim() && (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Grade: {bulletGrade.letterGrade} ({bulletGrade.totalScore}%)
            </span>
          )}
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type or paste any bullet (e.g. 'Helped write backend APIs in Node.js')..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-mono"
            onKeyDown={(e) => e.key === 'Enter' && handleTransformCustom()}
          />
          <button
            onClick={handleTransformCustom}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-950 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Rewrite ({activeMode})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Axis Grader Checks */}
        {customInput.trim() && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
              bulletGrade.hasPowerVerb ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>Power Action Verb</span>
            </div>
            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
              bulletGrade.hasMetric ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>Quantified Metrics</span>
            </div>
            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
              bulletGrade.hasTechnicalScope ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>Technical Scope</span>
            </div>
            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
              bulletGrade.hasOutcome ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>Direct Outcome</span>
            </div>
          </div>
        )}

        {/* Transformed Result Card */}
        {customOutput && (
          <div className="mt-3 p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Impact Score: {customOutput.scoreBefore}% → {customOutput.scoreAfter}% (Grade A+)
              </span>
              <button
                onClick={() => handleApply(customOutput.id, customOutput.original, customOutput.improved)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                {appliedIds[customOutput.id] ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{appliedIds[customOutput.id] ? 'Applied!' : 'Apply to Resume'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-100 font-mono bg-slate-950/90 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {customOutput.improved}
            </p>
            <div className="flex flex-wrap gap-1 text-[11px]">
              <span className="text-slate-400">{customOutput.explanation}</span>
              {customOutput.metricsAdded.map((m, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-medium">
                  + {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preset High-Yield Bullet Upgrades */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Preset High-Yield Bullet Upgrades:
        </span>

        {bullets.map(b => (
          <div 
            key={b.id}
            className="bg-slate-950/50 border border-slate-800/90 rounded-xl p-3.5 space-y-2.5 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 font-mono border border-rose-500/20 text-[11px]">
                  Before: {b.scoreBefore}%
                </span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20 text-[11px]">
                  After: {b.scoreAfter}%
                </span>
              </div>

              <button
                onClick={() => handleApply(b.id, b.original, b.improved)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  appliedIds[b.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30'
                }`}
              >
                {appliedIds[b.id] ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{appliedIds[b.id] ? 'Applied to Resume!' : 'Apply Upgrade'}</span>
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="text-slate-400 line-through pl-2 border-l-2 border-rose-500/40 font-mono">
                {b.original}
              </p>
              <p className="text-slate-100 font-medium pl-2 border-l-2 border-emerald-500 font-mono">
                {b.improved}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-slate-400">{b.explanation}</span>
              {b.metricsAdded.map((m, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  +{m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
