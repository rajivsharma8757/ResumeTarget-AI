import React, { useState } from 'react';
import { ATSScoreReport } from '../types';
import { X, Copy, Check, Download, FileText, Share2, Printer, Eye } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeText: string;
  report: ATSScoreReport;
  jobRoleTitle: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  resumeText,
  report,
  jobRoleTitle
}) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'text' | 'print_preview'>('text');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Optimized_Resume_${jobRoleTitle.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAuditReport = () => {
    const reportData = {
      project: 'ResumeTarget AI — Algorithmic ATS Gap Auditor',
      competition: 'Deploy With Embarko Student Challenge 2026',
      candidate: 'Rajiv Kumar Sharma',
      role: jobRoleTitle,
      timestamp: new Date().toISOString(),
      atsMatchScore: `${report.overallScore}%`,
      keywordDensityScore: `${report.keywordScore}%`,
      actionVerbRating: `${report.actionVerbScore}%`,
      quantifiedMetricsScore: `${report.metricsScore}%`,
      formattingScore: `${report.formattingScore}%`,
      totalWords: report.totalWords,
      readabilityVerdict: report.readabilityGrade,
      feedback: report.summaryFeedback
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ATS_Audit_Report_${report.overallScore}pct.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">
                Export Tailored Resume & ATS Report
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Role: <strong className="text-indigo-300">{jobRoleTitle}</strong> • Match: <span className="text-emerald-400 font-bold">{report.overallScore}%</span>
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mr-8 text-xs">
            <button
              onClick={() => setActiveView('text')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activeView === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Raw Text / MD
            </button>
            <button
              onClick={() => setActiveView('print_preview')}
              className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                activeView === 'print_preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>1-Page Print View</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto my-4 pr-1">
          {activeView === 'text' ? (
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap select-all">
              {resumeText}
            </div>
          ) : (
            <div className="bg-white text-neutral-900 rounded-xl p-8 border border-neutral-300 font-sans shadow-lg leading-snug print:p-0 print:m-0 print:border-none print:shadow-none text-xs">
              <div className="border-b-2 border-neutral-900 pb-2 mb-3 text-center">
                <h1 className="text-xl font-bold tracking-tight text-neutral-900 uppercase">
                  RAJIV KUMAR SHARMA
                </h1>
                <p className="text-[11px] text-neutral-700 font-medium mt-0.5">
                  Bettiah, Bihar • +91 8757988988 • rajivkumarsharma200@gmail.com • github.com/rajivsharma8757
                </p>
              </div>

              <div className="whitespace-pre-wrap text-[11px] font-sans leading-relaxed text-neutral-800">
                {resumeText.replace(/RAJIV KUMAR SHARMA[\s\S]*?(?=TECHNICAL SKILLS|SKILLS)/i, '')}
              </div>
            </div>
          )}
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all cursor-pointer border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-indigo-950"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleDownloadAuditReport}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-emerald-950"
          >
            <Share2 className="w-4 h-4" />
            <span>Audit JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-amber-950"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
