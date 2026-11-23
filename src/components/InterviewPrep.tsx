import React from 'react';
import { InterviewQuestion } from '../types';
import { MessageSquareQuote, Lightbulb, Target, Sparkles } from 'lucide-react';

interface InterviewPrepProps {
  questions: InterviewQuestion[];
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ questions }) => {
  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl">
      <div className="mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
          <span>Tailored Interview Readiness Engine</span>
        </h2>
        <p className="text-xs text-slate-400">
          Predicted recruiter and technical screener questions based on your specific keywords, gaps, and project profile.
        </p>
      </div>

      <div className="space-y-3.5">
        {questions.map((q, idx) => (
          <div 
            key={q.id}
            className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Question #{idx + 1} • {q.category.replace('_', ' ')}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                High Probability
              </span>
            </div>

            <p className="text-sm font-semibold text-white">
              "{q.question}"
            </p>

            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-lg p-2.5 text-xs space-y-1">
              <div className="text-[11px] text-indigo-300 font-medium flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Why Recruiters Ask This: {q.triggerReason}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <span className="font-semibold text-slate-200">Recommended Strategy:</span> {q.strategy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
