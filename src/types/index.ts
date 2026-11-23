export type SkillCategory = 'languages' | 'frameworks' | 'cloud_devops' | 'cs_concepts' | 'soft_skills';

export interface KeywordItem {
  id: string;
  name: string;
  category: SkillCategory;
  found: boolean;
  occurrences: number;
  importance: 'critical' | 'recommended' | 'optional';
  isDynamic?: boolean;
}

export interface SectionAudit {
  name: string;
  present: boolean;
  score: number;
  recommendation?: string;
}

export interface ATSScoreReport {
  overallScore: number;
  keywordScore: number;
  actionVerbScore: number;
  metricsScore: number;
  formattingScore: number;
  readabilityGrade: string;
  totalWords: number;
  bulletCount: number;
  quantifiedBulletCount: number;
  foundKeywordsCount: number;
  missingKeywordsCount: number;
  sections: SectionAudit[];
  summaryFeedback: string;
}

export interface BulletGrade {
  totalScore: number;
  letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D';
  hasPowerVerb: boolean;
  hasMetric: boolean;
  hasTechnicalScope: boolean;
  hasOutcome: boolean;
  suggestions: string[];
}

export interface BulletImprovement {
  id: string;
  original: string;
  improved: string;
  scoreBefore: number;
  scoreAfter: number;
  explanation: string;
  metricsAdded: string[];
  mode?: 'performance' | 'scale' | 'reliability' | 'business';
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'system_design';
  triggerReason: string;
  strategy: string;
}

export interface RolePreset {
  id: string;
  title: string;
  company: string;
  icon: string;
  description: string;
  targetJobDesc: string;
  sampleResume: string;
  suggestedBullets: BulletImprovement[];
}

export interface DiffSegment {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}
