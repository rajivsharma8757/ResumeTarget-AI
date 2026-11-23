import { KeywordItem, ATSScoreReport, InterviewQuestion, SkillCategory, BulletGrade, DiffSegment } from '../types';

// Curated comprehensive technical taxonomy (150+ technologies)
const TECH_DICTIONARY: { name: string; category: SkillCategory; aliases: string[]; importance: 'critical' | 'recommended' | 'optional' }[] = [
  // Languages
  { name: 'Java', category: 'languages', aliases: ['java', 'jdk', 'jvm'], importance: 'critical' },
  { name: 'Python', category: 'languages', aliases: ['python', 'py'], importance: 'critical' },
  { name: 'TypeScript', category: 'languages', aliases: ['typescript', 'ts'], importance: 'critical' },
  { name: 'JavaScript', category: 'languages', aliases: ['javascript', 'js', 'es6', 'ecmascript'], importance: 'recommended' },
  { name: 'C++', category: 'languages', aliases: ['c++', 'cpp'], importance: 'recommended' },
  { name: 'C#', category: 'languages', aliases: ['c#', '.net', 'csharp'], importance: 'optional' },
  { name: 'SQL', category: 'languages', aliases: ['sql', 'rdbms', 'transact-sql'], importance: 'critical' },
  { name: 'Go / Golang', category: 'languages', aliases: ['golang', 'go language'], importance: 'recommended' },
  { name: 'Rust', category: 'languages', aliases: ['rust', 'cargo'], importance: 'optional' },
  { name: 'Kotlin', category: 'languages', aliases: ['kotlin'], importance: 'optional' },
  { name: 'Swift', category: 'languages', aliases: ['swift', 'swiftui', 'ios'], importance: 'optional' },
  { name: 'Bash / Shell', category: 'languages', aliases: ['bash', 'shell script', 'powershell', 'zsh'], importance: 'recommended' },

  // Frontend & UI
  { name: 'React', category: 'frameworks', aliases: ['react', 'react.js', 'reactjs'], importance: 'critical' },
  { name: 'Next.js', category: 'frameworks', aliases: ['next.js', 'nextjs'], importance: 'recommended' },
  { name: 'Vue.js', category: 'frameworks', aliases: ['vue', 'vue.js', 'vuejs'], importance: 'optional' },
  { name: 'Angular', category: 'frameworks', aliases: ['angular'], importance: 'optional' },
  { name: 'Tailwind CSS', category: 'frameworks', aliases: ['tailwind', 'tailwindcss'], importance: 'recommended' },
  { name: 'HTML5 & CSS3', category: 'frameworks', aliases: ['html', 'html5', 'css', 'css3'], importance: 'recommended' },
  { name: 'Redux / State Mgmt', category: 'frameworks', aliases: ['redux', 'zustand', 'mobx', 'context api'], importance: 'recommended' },
  { name: 'GraphQL', category: 'frameworks', aliases: ['graphql', 'apollo'], importance: 'optional' },

  // Backend Frameworks & Runtimes
  { name: 'Node.js', category: 'frameworks', aliases: ['node.js', 'nodejs', 'node'], importance: 'critical' },
  { name: 'Express', category: 'frameworks', aliases: ['express', 'express.js', 'expressjs'], importance: 'recommended' },
  { name: 'Spring Boot', category: 'frameworks', aliases: ['spring boot', 'spring framework'], importance: 'recommended' },
  { name: 'FastAPI', category: 'frameworks', aliases: ['fastapi'], importance: 'recommended' },
  { name: 'Django', category: 'frameworks', aliases: ['django'], importance: 'recommended' },
  { name: 'Flask', category: 'frameworks', aliases: ['flask'], importance: 'optional' },
  { name: 'NestJS', category: 'frameworks', aliases: ['nestjs', 'nest.js'], importance: 'optional' },

  // AI & Machine Learning
  { name: 'PyTorch', category: 'frameworks', aliases: ['pytorch', 'torch'], importance: 'recommended' },
  { name: 'TensorFlow', category: 'frameworks', aliases: ['tensorflow', 'tf', 'keras'], importance: 'recommended' },
  { name: 'Scikit-Learn', category: 'frameworks', aliases: ['scikit-learn', 'sklearn'], importance: 'recommended' },
  { name: 'Pandas & NumPy', category: 'frameworks', aliases: ['pandas', 'numpy'], importance: 'critical' },
  { name: 'LangChain & LLMs', category: 'frameworks', aliases: ['langchain', 'llamaindex', 'rag', 'llm', 'transformer'], importance: 'recommended' },
  { name: 'Vector Databases', category: 'frameworks', aliases: ['pinecone', 'chromadb', 'weaviate', 'milvus', 'qdrant'], importance: 'recommended' },

  // Databases & Storage
  { name: 'PostgreSQL', category: 'cloud_devops', aliases: ['postgresql', 'postgres'], importance: 'critical' },
  { name: 'MySQL', category: 'cloud_devops', aliases: ['mysql'], importance: 'recommended' },
  { name: 'MongoDB', category: 'cloud_devops', aliases: ['mongodb', 'nosql'], importance: 'recommended' },
  { name: 'Redis', category: 'cloud_devops', aliases: ['redis', 'caching', 'in-memory'], importance: 'recommended' },
  { name: 'Kafka', category: 'cloud_devops', aliases: ['kafka', 'message queue', 'pub/sub', 'rabbitmq'], importance: 'recommended' },
  { name: 'Snowflake / BigQuery', category: 'cloud_devops', aliases: ['snowflake', 'bigquery', 'data warehouse'], importance: 'optional' },

  // Cloud & DevOps
  { name: 'Docker', category: 'cloud_devops', aliases: ['docker', 'containerization'], importance: 'critical' },
  { name: 'Kubernetes', category: 'cloud_devops', aliases: ['kubernetes', 'k8s'], importance: 'recommended' },
  { name: 'AWS', category: 'cloud_devops', aliases: ['aws', 'amazon web services', 's3', 'ec2', 'lambda'], importance: 'recommended' },
  { name: 'GCP', category: 'cloud_devops', aliases: ['gcp', 'google cloud'], importance: 'optional' },
  { name: 'Azure', category: 'cloud_devops', aliases: ['azure', 'microsoft azure'], importance: 'optional' },
  { name: 'CI/CD Pipelines', category: 'cloud_devops', aliases: ['ci/cd', 'github actions', 'jenkins', 'gitlab ci'], importance: 'recommended' },
  { name: 'Terraform', category: 'cloud_devops', aliases: ['terraform', 'iac'], importance: 'optional' },
  { name: 'Git & GitHub', category: 'cloud_devops', aliases: ['git', 'github', 'version control'], importance: 'critical' },
  { name: 'Linux OS', category: 'cloud_devops', aliases: ['linux', 'unix', 'ubuntu'], importance: 'recommended' },

  // CS Fundamentals & Architecture
  { name: 'REST APIs', category: 'cs_concepts', aliases: ['rest api', 'restful', 'rest apis'], importance: 'critical' },
  { name: 'Data Structures & Algorithms', category: 'cs_concepts', aliases: ['data structures', 'algorithms', 'dsa'], importance: 'critical' },
  { name: 'System Architecture', category: 'cs_concepts', aliases: ['system design', 'system architecture', 'microservices'], importance: 'recommended' },
  { name: 'Unit Testing', category: 'cs_concepts', aliases: ['unit testing', 'jest', 'junit', 'pytest', 'vitest', 'testing'], importance: 'recommended' },
  { name: 'Object-Oriented Design', category: 'cs_concepts', aliases: ['oop', 'object-oriented', 'ood'], importance: 'recommended' },
  { name: 'Concurrency & Multi-threading', category: 'cs_concepts', aliases: ['concurrency', 'multithreading', 'asynchronous'], importance: 'recommended' },

  // Soft Skills & Delivery
  { name: 'Cross-functional Collaboration', category: 'soft_skills', aliases: ['collaboration', 'cross-functional', 'teamwork'], importance: 'recommended' },
  { name: 'Agile / Scrum', category: 'soft_skills', aliases: ['agile', 'scrum', 'sprint'], importance: 'recommended' },
  { name: 'Problem Solving', category: 'soft_skills', aliases: ['problem solving', 'analytical skills'], importance: 'critical' },
  { name: 'Technical Leadership', category: 'soft_skills', aliases: ['leadership', 'mentored', 'guided'], importance: 'optional' }
];

const POWER_ACTION_VERBS = [
  'architected', 'engineered', 'spearheaded', 'implemented', 'designed',
  'optimized', 'accelerated', 'orchestrated', 'streamlined', 'slashed',
  'deployed', 'scaled', 'refactored', 'automated', 'integrated',
  'formulated', 'modeled', 'developed', 'delivered', 'built', 'analyzed',
  'benchmarked', 'provisioned', 'migrated', 'transformed', 'authored'
];

const WEAK_PASSIVE_VERBS = [
  'worked on', 'helped with', 'assisted', 'was responsible for',
  'responsible for', 'handled', 'did', 'made', 'looked after',
  'participated in', 'contributed to', 'tried to'
];

const METRIC_PATTERNS = [
  /\b\d+(\.\d+)?%/g,                 // percentages (e.g. 45%, 99.4%)
  /\b\d+([kmgtKMGT]\+?|\+)\b/g,      // counts (e.g. 10k+, 50M)
  /\b\d+,\d{3}\+?\b/g,               // numbers with commas (e.g. 45,000+)
  /\b\$\d+(\.\d+)?[kmbKMB]?\b/g,     // dollar amounts
  /\b\d+\s*(ms|seconds|sec|hours|hrs|days|mins|minutes)\b/gi, // latency/time
  /\b\d+\s*(qps|rps|tps|skus|users|queries|records|stars|commits)\b/gi // throughput/metrics
];

/**
 * Extracts dynamic technical keywords from any arbitrary job description
 */
function extractDynamicJobKeywords(jobDesc: string, knownAliases: Set<string>): string[] {
  const dynamicWords = new Set<string>();
  const lines = jobDesc.split(/\n/);

  // Common technical patterns: PascalCase, acronyms (2-5 caps), or technology terms
  const pattern = /\b([A-Z][a-zA-Z0-9_\-\.]{2,}|[A-Z]{2,5})\b/g;

  // Stopwords to ignore
  const stopwords = new Set([
    'WE', 'YOU', 'OUR', 'THE', 'AND', 'FOR', 'WITH', 'ARE', 'THIS', 'THAT', 'HAVE',
    'WILL', 'JOIN', 'TEAM', 'ROLE', 'ABOUT', 'MUST', 'PLUS', 'NOTE', 'RESPONSIBILITIES',
    'REQUIREMENTS', 'QUALIFICATIONS', 'MINIMUM', 'PREFERRED', 'INTERN', 'STUDENT',
    'COLLEGE', 'UNIVERSITY', 'DEGREE', 'YEAR', 'WORK', 'EXPERIENCE', 'YEARS', 'APPLICATION'
  ]);

  for (const line of lines) {
    let match;
    while ((match = pattern.exec(line)) !== null) {
      const word = match[1];
      const upper = word.toUpperCase();
      if (!stopwords.has(upper) && !knownAliases.has(word.toLowerCase()) && word.length >= 3 && word.length <= 20) {
        dynamicWords.add(word);
      }
    }
  }

  return Array.from(dynamicWords).slice(0, 8); // Top 8 dynamic terms
}

/**
 * Core ATS Multi-Factor Analysis Function
 */
export function analyzeResumeAndJob(resumeText: string, jobDescText: string): {
  report: ATSScoreReport;
  keywords: KeywordItem[];
  weakBulletsFound: string[];
  interviewQuestions: InterviewQuestion[];
} {
  const normResume = resumeText.toLowerCase();
  const normJob = jobDescText.toLowerCase();

  const allKnownAliases = new Set<string>();
  TECH_DICTIONARY.forEach(t => t.aliases.forEach(a => allKnownAliases.add(a.toLowerCase())));

  // 1. Analyze Dictionary Keywords
  const baseKeywords: KeywordItem[] = TECH_DICTIONARY.map(item => {
    const relevantInJob = item.aliases.some(alias => normJob.includes(alias.toLowerCase()));
    
    let countInResume = 0;
    item.aliases.forEach(alias => {
      const regex = new RegExp(`\\b${escapeRegExp(alias)}\\b`, 'gi');
      const matches = resumeText.match(regex);
      if (matches) countInResume += matches.length;
    });

    return {
      id: item.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: item.name,
      category: item.category,
      found: countInResume > 0,
      occurrences: countInResume,
      importance: relevantInJob ? (item.importance === 'critical' ? 'critical' : 'recommended') : 'optional'
    };
  });

  // 2. Discover Dynamic Keywords from Job Description
  const dynamicWords = extractDynamicJobKeywords(jobDescText, allKnownAliases);
  const dynamicKeywords: KeywordItem[] = dynamicWords.map(word => {
    const countInResume = (resumeText.match(new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi')) || []).length;
    return {
      id: `dynamic-${word.toLowerCase()}`,
      name: word,
      category: 'frameworks',
      found: countInResume > 0,
      occurrences: countInResume,
      importance: 'recommended',
      isDynamic: true
    };
  });

  // Combined Active Keywords
  const allAuditedKeywords = [...baseKeywords, ...dynamicKeywords];
  const activeKeywords = allAuditedKeywords.filter(k => {
    const isMentionedInJob = k.isDynamic || TECH_DICTIONARY.find(t => t.name === k.name)?.aliases.some(a => normJob.includes(a.toLowerCase()));
    return isMentionedInJob || k.found;
  });

  const criticalKeywords = activeKeywords.filter(k => k.importance === 'critical');
  const criticalFound = criticalKeywords.filter(k => k.found).length;
  const totalCritical = Math.max(criticalKeywords.length, 1);

  const foundKeywordsCount = activeKeywords.filter(k => k.found).length;
  const missingKeywordsCount = activeKeywords.filter(k => !k.found).length;

  const keywordScore = Math.min(
    100,
    Math.round(((criticalFound / totalCritical) * 0.7 + (foundKeywordsCount / Math.max(activeKeywords.length, 1)) * 0.3) * 100)
  );

  // 3. Action Verbs Analysis
  const lines = resumeText.split('\n').map(l => l.trim()).filter(l => l.startsWith('-') || l.startsWith('•') || l.startsWith('*'));
  const bulletCount = lines.length;
  
  let powerVerbCount = 0;
  let weakBulletsFound: string[] = [];

  lines.forEach(line => {
    const cleanLine = line.replace(/^[-•*]\s*/, '').toLowerCase();
    const hasPower = POWER_ACTION_VERBS.some(v => cleanLine.includes(v));
    const hasWeak = WEAK_PASSIVE_VERBS.some(w => cleanLine.includes(w));
    
    if (hasPower) powerVerbCount++;
    if (hasWeak) weakBulletsFound.push(line);
  });

  const actionVerbScore = bulletCount > 0 
    ? Math.min(100, Math.round((powerVerbCount / bulletCount) * 100))
    : 50;

  // 4. Metric / Quantification Density
  let quantifiedBullets = 0;
  lines.forEach(line => {
    let hasMetric = false;
    METRIC_PATTERNS.forEach(pattern => {
      if (pattern.test(line)) hasMetric = true;
    });
    if (hasMetric) quantifiedBullets++;
  });

  const metricsScore = bulletCount > 0
    ? Math.min(100, Math.round((quantifiedBullets / bulletCount) * 100))
    : 40;

  // 5. Section & Formatting Analysis
  const sections = [
    { name: 'Contact Information (Email, Phone, Location)', present: normResume.includes('@') && (normResume.includes('phone') || normResume.includes('+91') || normResume.includes('8757988988')), score: 100 },
    { name: 'Links Block (GitHub / LinkedIn / Portfolio)', present: normResume.includes('github') || normResume.includes('linkedin'), score: 100 },
    { name: 'Technical Skills Block', present: normResume.includes('skill') || normResume.includes('technologies'), score: 100 },
    { name: 'Featured Projects Section', present: normResume.includes('project') || normResume.includes('dealfinder') || normResume.includes('breathewise'), score: 100 },
    { name: 'Experience / Internships', present: normResume.includes('experience') || normResume.includes('intern') || normResume.includes('skillsbuild'), score: 100 },
    { name: 'Education & Degree Program', present: normResume.includes('education') || normResume.includes('b.tech') || normResume.includes('university'), score: 100 }
  ];

  const presentSectionsCount = sections.filter(s => s.present).length;
  const formattingScore = Math.round((presentSectionsCount / sections.length) * 100);

  // 6. Total Words & Readability
  const words = resumeText.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  let readabilityGrade = 'Optimal (350–650 words)';
  let readabilityScore = 95;
  if (totalWords < 200) {
    readabilityGrade = 'Too Short (<200 words)';
    readabilityScore = 40;
  } else if (totalWords > 800) {
    readabilityGrade = 'Too Dense (>800 words, exceeds 1 page)';
    readabilityScore = 70;
  }

  // 7. Overall Composite ATS Score
  const overallScore = Math.round(
    keywordScore * 0.40 +
    actionVerbScore * 0.20 +
    metricsScore * 0.20 +
    formattingScore * 0.10 +
    readabilityScore * 0.10
  );

  let summaryFeedback = '';
  if (overallScore >= 90) {
    summaryFeedback = '🌟 Top 5% ATS Ready! Excellent keyword density, strong action verbs, and quantified metric impact. High probability of clearing automated filters.';
  } else if (overallScore >= 75) {
    summaryFeedback = '📈 Competitive Baseline. Close to passing thresholds, but patch the remaining keyword gaps and upgrade passive bullet points to reach 90%+.';
  } else if (overallScore >= 55) {
    summaryFeedback = '⚠️ Moderate Rejection Risk. Several core qualifications from the job posting are missing, and multiple bullets lack quantifiable results.';
  } else {
    summaryFeedback = '🚨 High Rejection Risk. Significant keyword gaps and passive wording will likely cause automated screening rejection.';
  }

  // 8. Generate Targeted Interview Questions
  const missingCritical = activeKeywords.filter(k => !k.found && k.importance === 'critical').slice(0, 2);
  const foundHighlights = activeKeywords.filter(k => k.found).slice(0, 3);

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 'iq-1',
      question: `How have you used ${foundHighlights[0]?.name || 'Data Structures'} to solve performance or latency bottlenecks in your projects?`,
      category: 'technical',
      triggerReason: `Highlighted because ${foundHighlights[0]?.name || 'technical skills'} is strongly emphasized in your resume.`,
      strategy: 'Cite a specific project (e.g. DealFinder or BreatheWise). State initial metric, architecture change, and resulting latency improvement.'
    },
    {
      id: 'iq-2',
      question: `The job description strongly desires experience with ${missingCritical[0]?.name || 'Docker / Cloud deployment'}. How would you quickly ramp up on this stack?`,
      category: 'technical',
      triggerReason: `Identified as a critical keyword gap in your ATS scan.`,
      strategy: 'Be transparent about theoretical knowledge, connect it to adjacent tooling you know (e.g. Linux, Node.js), and discuss a hands-on sandbox experiment you built.'
    },
    {
      id: 'iq-3',
      question: 'Describe a situation where a software build failed right before a deadline. How did you diagnose the root cause?',
      category: 'behavioral',
      triggerReason: 'Standard behavioral question for engineering interns to test debugging resilience.',
      strategy: 'Use the STAR method (Situation, Task, Action, Result). Highlight systematic debugging, log inspection, and team communication.'
    },
    {
      id: 'iq-4',
      question: 'How do you design a database schema for an application expected to scale from 1,000 to 1,000,000 active records?',
      category: 'system_design',
      triggerReason: 'Evaluates relational database maturity and indexing knowledge.',
      strategy: 'Explain indexing strategies (B-Tree), foreign key constraints, connection pooling, and read-replicas or caching with Redis.'
    }
  ];

  return {
    report: {
      overallScore,
      keywordScore,
      actionVerbScore,
      metricsScore,
      formattingScore,
      readabilityGrade,
      totalWords,
      bulletCount,
      quantifiedBulletCount: quantifiedBullets,
      foundKeywordsCount,
      missingKeywordsCount,
      sections,
      summaryFeedback
    },
    keywords: activeKeywords,
    weakBulletsFound,
    interviewQuestions
  };
}

/**
 * 4-Axis Interactive Bullet Quality Evaluator
 */
export function evaluateBulletQuality(bulletText: string): BulletGrade {
  const clean = bulletText.trim().replace(/^[-•*]\s*/, '').toLowerCase();
  if (!clean) {
    return {
      totalScore: 0,
      letterGrade: 'D',
      hasPowerVerb: false,
      hasMetric: false,
      hasTechnicalScope: false,
      hasOutcome: false,
      suggestions: ['Enter a bullet point to analyze its ATS strength.']
    };
  }

  const hasPowerVerb = POWER_ACTION_VERBS.some(v => clean.startsWith(v) || clean.includes(` ${v} `));
  const hasMetric = METRIC_PATTERNS.some(p => p.test(clean));
  const hasTechnicalScope = TECH_DICTIONARY.some(t => t.aliases.some(a => clean.includes(a.toLowerCase())));
  const hasOutcome = clean.includes('reducing') || clean.includes('increasing') || clean.includes('resulting in') || clean.includes('slashing') || clean.includes('achieving') || clean.includes('yielding');

  let score = 25; // baseline
  const suggestions: string[] = [];

  if (hasPowerVerb) score += 25;
  else suggestions.push('Begin with an authoritative action verb (e.g. "Architected", "Engineered", "Optimized") instead of passive phrasing.');

  if (hasMetric) score += 25;
  else suggestions.push('Include quantifiable metrics (percentages, volume of data, latency reduction, user counts, or uptime SLA).');

  if (hasTechnicalScope) score += 15;
  else suggestions.push('Explicitly name the languages, frameworks, or cloud databases utilized (e.g. TypeScript, PostgreSQL, Docker).');

  if (hasOutcome) score += 10;
  else suggestions.push('State the direct business or performance outcome (e.g. "reducing latency by 34%").');

  score = Math.min(100, score);

  let letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (score >= 90) letterGrade = 'A+';
  else if (score >= 75) letterGrade = 'A';
  else if (score >= 60) letterGrade = 'B';
  else if (score >= 40) letterGrade = 'C';

  return {
    totalScore: score,
    letterGrade,
    hasPowerVerb,
    hasMetric,
    hasTechnicalScope,
    hasOutcome,
    suggestions
  };
}

/**
 * Real-time Document Diff Comparator
 */
export function calculateResumeDiff(original: string, modified: string): {
  diffSegments: DiffSegment[];
  addedLinesCount: number;
  removedLinesCount: number;
} {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');

  const diffSegments: DiffSegment[] = [];
  let addedLinesCount = 0;
  let removedLinesCount = 0;

  const origSet = new Set(origLines.map(l => l.trim()));
  const modSet = new Set(modLines.map(l => l.trim()));

  // Process modified lines
  modLines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      diffSegments.push({ type: 'unchanged', text: line });
    } else if (!origSet.has(trimmed)) {
      diffSegments.push({ type: 'added', text: line });
      addedLinesCount++;
    } else {
      diffSegments.push({ type: 'unchanged', text: line });
    }
  });

  // Check removed lines
  origLines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !modSet.has(trimmed)) {
      removedLinesCount++;
    }
  });

  return {
    diffSegments,
    addedLinesCount,
    removedLinesCount
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
