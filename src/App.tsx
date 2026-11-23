import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ROLE_PRESETS } from './data/presets';
import { analyzeResumeAndJob } from './utils/atsEngine';
import { triggerConfettiBurst } from './utils/confetti';
import { Header } from './components/Header';
import { ScoreGauge } from './components/ScoreGauge';
import { KeywordMatrix } from './components/KeywordMatrix';
import { BulletTransformer } from './components/BulletTransformer';
import { InterviewPrep } from './components/InterviewPrep';
import { BeforeAfterDiff } from './components/BeforeAfterDiff';
import { ResumeDropzone } from './components/ResumeDropzone';
import { ExportModal } from './components/ExportModal';
import { FileEdit, Briefcase, Sparkles, GitCompare, Info } from 'lucide-react';

export function App() {
  // Active Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('swe-intern');
  const currentPreset = useMemo(() => {
    return ROLE_PRESETS.find(p => p.id === selectedPresetId) || ROLE_PRESETS[0];
  }, [selectedPresetId]);

  // Baseline Resume for Diff comparison
  const [baselineResume, setBaselineResume] = useState<string>(() => {
    return currentPreset.sampleResume;
  });

  // Dual Editor State (with LocalStorage initialization)
  const [resumeText, setResumeText] = useState<string>(() => {
    const saved = localStorage.getItem('resumetarget_resume');
    return saved || currentPreset.sampleResume;
  });

  const [jobDescText, setJobDescText] = useState<string>(() => {
    const saved = localStorage.getItem('resumetarget_jobdesc');
    return saved || currentPreset.targetJobDesc;
  });

  // Loaded File Name
  const [loadedFileName, setLoadedFileName] = useState<string | undefined>(undefined);

  // Mobile active tab ('input' | 'score' | 'keywords' | 'bullets' | 'diff' | 'interview')
  const [activeMobileTab, setActiveMobileTab] = useState<'input' | 'score' | 'keywords' | 'bullets' | 'diff' | 'interview'>('input');

  // Export Modal state
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Confetti trigger tracking
  const hasTriggeredConfetti = useRef(false);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('resumetarget_resume', resumeText);
  }, [resumeText]);

  useEffect(() => {
    localStorage.setItem('resumetarget_jobdesc', jobDescText);
  }, [jobDescText]);

  // Compute real-time ATS analysis for CURRENT resume
  const { report, keywords, weakBulletsFound, interviewQuestions } = useMemo(() => {
    return analyzeResumeAndJob(resumeText, jobDescText);
  }, [resumeText, jobDescText]);

  // Compute baseline ATS score for diff
  const baselineReport = useMemo(() => {
    return analyzeResumeAndJob(baselineResume, jobDescText).report;
  }, [baselineResume, jobDescText]);

  // Trigger celebration on 90%+
  useEffect(() => {
    if (report.overallScore >= 90 && !hasTriggeredConfetti.current) {
      triggerConfettiBurst();
      hasTriggeredConfetti.current = true;
      showToast('🎉 Milestone Unlocked: Top 5% ATS Score (90%+)!');
    } else if (report.overallScore < 90) {
      hasTriggeredConfetti.current = false;
    }
  }, [report.overallScore]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle preset switch
  const handleSelectPreset = (id: string) => {
    const preset = ROLE_PRESETS.find(p => p.id === id);
    if (!preset) return;
    setSelectedPresetId(id);
    setResumeText(preset.sampleResume);
    setBaselineResume(preset.sampleResume);
    setJobDescText(preset.targetJobDesc);
    setLoadedFileName(undefined);
    showToast(`Loaded ${preset.title} preset!`);
  };

  // Reset to default
  const handleReset = () => {
    setResumeText(currentPreset.sampleResume);
    setBaselineResume(currentPreset.sampleResume);
    setJobDescText(currentPreset.targetJobDesc);
    setLoadedFileName(undefined);
    showToast('Reset to role baseline.');
  };

  // File Loaded via Dropzone
  const handleFileLoaded = (content: string, fileName: string) => {
    setResumeText(content);
    setBaselineResume(content);
    setLoadedFileName(fileName);
    showToast(`Uploaded ${fileName} successfully!`);
  };

  // 1-Click add missing skill to resume Technical Skills block
  const handleAddSkillToResume = (skillName: string) => {
    if (resumeText.toLowerCase().includes(skillName.toLowerCase())) {
      showToast(`${skillName} is already present in your resume.`);
      return;
    }

    if (resumeText.includes('TECHNICAL SKILLS:') || resumeText.includes('SKILLS:')) {
      const updated = resumeText.replace(
        /(TECHNICAL SKILLS:|SKILLS:)/,
        `$1\n- Tools & Stack: ${skillName}`
      );
      setResumeText(updated);
    } else {
      setResumeText(prev => `${prev}\n\nTECHNICAL SKILLS:\n- Core Competencies: ${skillName}`);
    }

    showToast(`Added ${skillName} to resume skills!`);
  };

  // 1-Click upgrade bullet in resume
  const handleApplyBullet = (original: string, improved: string) => {
    const cleanOriginal = original.trim().replace(/^[-•*]\s*/, '');
    
    const lines = resumeText.split('\n');
    let replaced = false;
    const newLines = lines.map(line => {
      const cleanLine = line.trim().replace(/^[-•*]\s*/, '');
      if (!replaced && (cleanLine === cleanOriginal || line.includes(cleanOriginal))) {
        replaced = true;
        return `- ${improved}`;
      }
      return line;
    });

    if (replaced) {
      setResumeText(newLines.join('\n'));
      showToast('Bullet point upgraded with Google XYZ impact formula!');
    } else {
      setResumeText(prev => `${prev}\n- ${improved}`);
      showToast('New power bullet appended to resume projects!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-indigo-400/40 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        presets={ROLE_PRESETS}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onOpenExport={() => setIsExportOpen(true)}
        overallScore={report.overallScore}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-3 py-2 sticky top-[77px] z-30">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-0.5">
          <button
            onClick={() => setActiveMobileTab('input')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'input'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Inputs & Job
          </button>
          <button
            onClick={() => setActiveMobileTab('score')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'score'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Scorecard ({report.overallScore}%)
          </button>
          <button
            onClick={() => setActiveMobileTab('keywords')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'keywords'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Skill Gaps ({report.missingKeywordsCount})
          </button>
          <button
            onClick={() => setActiveMobileTab('bullets')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'bullets'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Bullet Studio
          </button>
          <button
            onClick={() => setActiveMobileTab('diff')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'diff'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Before/After Diff
          </button>
          <button
            onClick={() => setActiveMobileTab('interview')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeMobileTab === 'interview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 bg-slate-950/70 hover:text-white'
            }`}
          >
            Interview Prep
          </button>
        </div>
      </div>

      {/* Main Dual-Column Workbench */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN: Editors / Input Workbench (Desktop or Mobile Tab: input) */}
          <div className={`lg:col-span-5 space-y-5 ${activeMobileTab !== 'input' ? 'hidden lg:block' : ''}`}>
            
            {/* Resume Input Editor & Dropzone */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col h-[520px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-bold text-white">Your Candidate Resume</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{report.totalWords} words</span>
                  <span>•</span>
                  <span>{report.bulletCount} bullets</span>
                </div>
              </div>

              {/* Drag and Drop File Ingestion Zone */}
              <ResumeDropzone
                onFileLoaded={handleFileLoaded}
                currentFileName={loadedFileName}
                onClearFile={() => {
                  setLoadedFileName(undefined);
                  setResumeText(currentPreset.sampleResume);
                }}
              />

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your student resume markdown or text here, or drop a file above..."
                className="flex-1 w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                <span>Real-time ATS parsing & NLP extraction</span>
                <span className="text-emerald-400 font-medium">Auto-saved locally</span>
              </p>
            </div>

            {/* Target Job Description Editor */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col h-[320px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Target Job Description</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentPreset.company}
                </span>
              </div>

              <textarea
                value={jobDescText}
                onChange={(e) => setJobDescText(e.target.value)}
                placeholder="Paste the target job posting / requirements here..."
                className="flex-1 w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-2">
                Paste any internship post (Google, Amazon, Scaleup) to dynamically extract required tech keywords.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Diagnostic & Intelligence Modules */}
          <div className="lg:col-span-7 space-y-6">

            {/* Scorecard Module (Desktop or Mobile Tab: score) */}
            <div className={activeMobileTab !== 'score' && activeMobileTab !== 'input' ? 'hidden lg:block' : ''}>
              <ScoreGauge report={report} />
            </div>

            {/* Before vs After Diff Module (Desktop or Mobile Tab: diff) */}
            <div className={activeMobileTab !== 'diff' && activeMobileTab !== 'input' ? 'hidden lg:block' : ''}>
              <BeforeAfterDiff
                originalResume={baselineResume}
                currentResume={resumeText}
                originalScore={baselineReport.overallScore}
                currentScore={report.overallScore}
              />
            </div>

            {/* Keyword Matrix Module (Desktop or Mobile Tab: keywords) */}
            <div className={activeMobileTab !== 'keywords' && activeMobileTab !== 'input' ? 'hidden lg:block' : ''}>
              <KeywordMatrix
                keywords={keywords}
                onAddSkillToResume={handleAddSkillToResume}
              />
            </div>

            {/* Bullet Power Studio Module (Desktop or Mobile Tab: bullets) */}
            <div className={activeMobileTab !== 'bullets' && activeMobileTab !== 'input' ? 'hidden lg:block' : ''}>
              <BulletTransformer
                bullets={currentPreset.suggestedBullets}
                onApplyBullet={handleApplyBullet}
              />
            </div>

            {/* Interview Readiness Module (Desktop or Mobile Tab: interview) */}
            <div className={activeMobileTab !== 'interview' && activeMobileTab !== 'input' ? 'hidden lg:block' : ''}>
              <InterviewPrep questions={interviewQuestions} />
            </div>

          </div>

        </div>
      </main>

      {/* Footer / Attribution */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">ResumeTarget AI</span>
            <span>•</span>
            <span>Official Submission for <strong className="text-indigo-400">Deploy With Embarko — Student Challenge 2026</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Participant: Rajiv Kumar Sharma</span>
            <span>•</span>
            <span className="text-indigo-400 font-mono">#DeployWithEmbarko</span>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        resumeText={resumeText}
        report={report}
        jobRoleTitle={currentPreset.title}
      />
    </div>
  );
}

export default App;
