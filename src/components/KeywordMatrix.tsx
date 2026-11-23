import React, { useState } from 'react';
import { KeywordItem, SkillCategory } from '../types';
import { Check, Plus, AlertCircle, Sparkles, Filter } from 'lucide-react';

interface KeywordMatrixProps {
  keywords: KeywordItem[];
  onAddSkillToResume: (skillName: string) => void;
}

export const KeywordMatrix: React.FC<KeywordMatrixProps> = ({
  keywords,
  onAddSkillToResume
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'missing' | 'found' | SkillCategory>('missing');

  const filteredKeywords = keywords.filter(k => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'missing') return !k.found;
    if (activeFilter === 'found') return k.found;
    return k.category === activeFilter;
  });

  const missingCount = keywords.filter(k => !k.found).length;
  const foundCount = keywords.filter(k => k.found).length;

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Keyword Gap Matrix</span>
            <span className="text-xs font-normal text-slate-400">
              ({foundCount} matched, {missingCount} gaps)
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            ATS engines screen resumes against exact match keywords. Add missing skills to boost your score.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setActiveFilter('missing')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'missing'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            Missing ({missingCount})
          </button>
          <button
            onClick={() => setActiveFilter('found')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'found'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            Found ({foundCount})
          </button>
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            All ({keywords.length})
          </button>
        </div>
      </div>

      {/* Chips Grid */}
      <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-1">
        {filteredKeywords.map(keyword => {
          return (
            <div
              key={keyword.id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                keyword.found
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300 hover:border-emerald-500/50'
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-300 hover:border-rose-500/50'
              }`}
            >
              {keyword.found ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              )}
              
              <span className="font-semibold">{keyword.name}</span>

              {keyword.importance === 'critical' && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                  Must Have
                </span>
              )}

              {keyword.found ? (
                <span className="text-[10px] text-emerald-400/80 font-mono">
                  {keyword.occurrences}x
                </span>
              ) : (
                <button
                  onClick={() => onAddSkillToResume(keyword.name)}
                  title={`Add ${keyword.name} to Technical Skills`}
                  className="ml-1 px-1.5 py-0.5 rounded-md bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 transition-all flex items-center gap-0.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">Add</span>
                </button>
              )}
            </div>
          );
        })}

        {filteredKeywords.length === 0 && (
          <div className="w-full text-center py-6 text-slate-500 text-xs">
            No keywords match this filter category.
          </div>
        )}
      </div>
    </div>
  );
};
