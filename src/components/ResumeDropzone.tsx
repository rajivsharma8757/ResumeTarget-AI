import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ResumeDropzoneProps {
  onFileLoaded: (content: string, fileName: string) => void;
  currentFileName?: string;
  onClearFile?: () => void;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  onFileLoaded,
  currentFileName,
  onClearFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        if (!text.trim()) {
          setErrorMessage('Uploaded file is empty.');
          return;
        }
        onFileLoaded(text, file.name);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file. Please paste text directly.');
    };

    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.text,.json,.csv,.rtf"
        onChange={handleFileChange}
        className="hidden"
      />

      {currentFileName ? (
        <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl px-3 py-2 flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2 text-indigo-300 truncate">
            <FileText className="w-4 h-4 shrink-0 text-indigo-400" />
            <span className="font-semibold truncate">{currentFileName}</span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
              Loaded
            </span>
          </div>
          {onClearFile && (
            <button
              onClick={onClearFile}
              title="Clear loaded file"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all duration-200 mb-2 ${
            isDragging
              ? 'border-indigo-400 bg-indigo-500/10'
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
            <UploadCloud className="w-4 h-4 text-indigo-400" />
            <span className="font-medium text-slate-300">
              Drop resume file here or <span className="text-indigo-400 underline">browse</span>
            </span>
            <span className="text-[10px] text-slate-500">(.txt, .md)</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="text-[11px] text-rose-400 flex items-center gap-1 mb-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
