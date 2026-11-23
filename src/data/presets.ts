import { RolePreset } from '../types';

export const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'swe-intern',
    title: 'Software Engineering Intern',
    company: 'Tier-1 Tech / High-Growth Scaleup',
    icon: '💻',
    description: 'Core backend, algorithms, scalable REST services, and database systems.',
    targetJobDesc: `About the Role:
We are seeking ambitious Software Engineering Interns to join our core engineering organization. You will collaborate with senior staff to architect high-throughput microservices, optimize database schemas, and write maintainable, tested production code.

Minimum Qualifications:
- Currently pursuing a B.S. or B.Tech in Computer Science, Computer Engineering, or related technical field.
- Experience with Java, Python, TypeScript, or Go.
- Solid understanding of Data Structures, Algorithms, Object-Oriented Design, and System Architecture.
- Hands-on experience with Relational Databases (PostgreSQL, MySQL) and REST APIs.

Preferred Qualifications:
- Experience with Docker, Kubernetes, CI/CD pipelines, and AWS or GCP.
- Familiarity with Redis, Kafka, or message queue brokers.
- Experience writing automated unit and integration tests (JUnit, Jest, PyTest).
- Demonstrated passion through open-source contributions or impactful personal software projects.`,
    sampleResume: `RAJIV KUMAR SHARMA
B.Tech in Computer Science & Engineering (2024 - 2028)
Maharishi Markandeshwar (Deemed to be University)
Email: rajivkumarsharma200@gmail.com | Phone: +91 8757988988 | GitHub: github.com/rajivsharma8757

TECHNICAL SKILLS:
Languages: Java, Python, C++, TypeScript, SQL, HTML/CSS
Frameworks & Databases: Node.js, Express, Spring Boot, MySQL, PostgreSQL, Tailwind CSS
Tools & Platforms: Git, GitHub, Linux, Postman, Vite, REST APIs

PROJECTS:
DealFinder AI — Autonomous Price Tracking Engine (Oct 2026 – Nov 2026)
- Built a web scraper and price aggregator in Node.js and TypeScript.
- Designed database schemas in PostgreSQL to store 10,000+ daily product pricing points.
- Implemented automated email alert triggers whenever prices dropped below a historical moving average.
- Added responsive dashboard UI using React and Tailwind CSS for mobile and desktop users.

BreatheWise AI — Diurnal Urban Air Quality Intelligence (Nov 2026)
- Created an interactive environmental health web platform integrating real-time particulate sensor telemetry.
- Engineered client-side ventilation algorithms calculating inhaled PM2.5 dosage and cigarette equivalents.
- Deployed full application live with zero downtime; achieved top 0.5% ranking among 55,000 participants in PromptWars 2026.

EXPERIENCE:
Data Analytics & AI Intern — IBM SkillsBuild & BharatCares (Aug 2026 – Sep 2026)
- Analyzed large datasets with Python (Pandas, NumPy) and built predictive models for user retention.
- Created interactive dashboards and reported weekly progress metrics to mentors.
- Received Certificate of Training with Outstanding Distinction (Unique ID: IBMACBHDAI0107).

EDUCATION:
Maharishi Markandeshwar (Deemed to be University), Mullana, Ambala
Bachelor of Technology in Computer Science and Engineering | CGPA: 8.8 / 10.0 (Expected 2028)`,
    suggestedBullets: [
      {
        id: 'b1',
        original: 'Built a web scraper and price aggregator in Node.js and TypeScript.',
        improved: 'Architected an automated multi-threaded price scraping pipeline in TypeScript and Node.js, ingesting 45,000+ daily product SKUs across 4 major e-commerce platforms with 99.4% uptime.',
        scoreBefore: 45,
        scoreAfter: 96,
        explanation: 'Replaced passive verb "Built" with power verb "Architected", quantified volume (45,000+ SKUs), specified scope (4 platforms), and added reliability SLA (99.4% uptime).',
        metricsAdded: ['45,000+ daily product SKUs', '4 platforms', '99.4% uptime']
      },
      {
        id: 'b2',
        original: 'Designed database schemas in PostgreSQL to store 10,000+ daily product pricing points.',
        improved: 'Engineered normalized PostgreSQL relational schemas with B-tree indexing and composite keys, reducing median query execution latency from 240ms to 32ms under high-load read traffic.',
        scoreBefore: 58,
        scoreAfter: 98,
        explanation: 'Specified technical mechanism (B-tree indexing, composite keys) and demonstrated measurable business impact (reduced query latency from 240ms to 32ms).',
        metricsAdded: ['reduced latency from 240ms to 32ms', 'high-load traffic']
      },
      {
        id: 'b3',
        original: 'Analyzed large datasets with Python (Pandas, NumPy) and built predictive models for user retention.',
        improved: 'Executed exploratory data pipelines over 120,000+ customer records using Python (Pandas, Scikit-Learn), deploying a gradient-boosted retention classifier that lifted early churn detection by 23.5%.',
        scoreBefore: 50,
        scoreAfter: 95,
        explanation: 'Quantified dataset size (120,000+ records), specified ML algorithm (gradient-boosted), and stated measurable predictive gain (+23.5% churn detection).',
        metricsAdded: ['120,000+ customer records', '+23.5% early churn detection']
      }
    ]
  },
  {
    id: 'aiml-intern',
    title: 'AI / Machine Learning Intern',
    company: 'AI Research Lab / Autonomous Systems',
    icon: '🧠',
    description: 'LLM agents, fine-tuning, retrieval-augmented generation (RAG), and data engineering.',
    targetJobDesc: `Role Overview:
Join our Machine Learning team as an AI Engineering Intern. You will design, evaluate, and deploy production ML models, LLM pipelines, and vector retrieval architectures.

Key Responsibilities:
- Implement Retrieval-Augmented Generation (RAG) pipelines using vector databases (Pinecone, ChromaDB, Weaviate).
- Train and evaluate transformer models using PyTorch, Hugging Face, and LangChain/LlamaIndex.
- Conduct data preprocessing, embedding generation, and prompt optimization.
- Build benchmarking evaluation frameworks for hallucination detection and response latency.

Required Skills:
- Fluency in Python and deep learning frameworks (PyTorch, TensorFlow).
- Experience with NLP, LLM prompt engineering, and fine-tuning techniques (LoRA, QLoRA).
- Familiarity with Vector Search, Embeddings, Docker, and FastAPI.
- Strong mathematical intuition in Linear Algebra, Probability, and Optimization.`,
    sampleResume: `RAJIV KUMAR SHARMA
Computer Science & AI Undergraduate
Email: rajivkumarsharma200@gmail.com | Phone: +91 8757988988 | GitHub: github.com/rajivsharma8757

SKILLS:
Languages: Python, SQL, C++, TypeScript
AI / ML: PyTorch, Hugging Face, Pandas, NumPy, Scikit-Learn, LangChain, Transformers, Vector Databases
Backend & Tools: FastAPI, Docker, Git, Linux, Jupyter, REST APIs

PROJECTS:
LegalDoc RAG — Document Intelligence Assistant
- Created a RAG system for querying 500-page legal contracts using LangChain and ChromaDB.
- Implemented chunking strategies and semantic search to extract relevant clauses.
- Used FastAPI to serve predictions to a simple web client.

Air Quality Inhalation Predictor
- Trained regression models to predict hourly PM2.5 levels based on meteorological variables.
- Evaluated models using RMSE and MAE metrics.`,
    suggestedBullets: [
      {
        id: 'b4',
        original: 'Created a RAG system for querying 500-page legal contracts using LangChain and ChromaDB.',
        improved: 'Engineered an end-to-end RAG question-answering architecture using ChromaDB vector store and LangChain, slashing document search retrieval latency by 68% across 500+ page institutional contracts.',
        scoreBefore: 52,
        scoreAfter: 97,
        explanation: 'Uses strong technical verb "Engineered", quantifies latency reduction (68%), and clarifies business scope.',
        metricsAdded: ['68% latency reduction', '500+ page contracts']
      }
    ]
  },
  {
    id: 'fullstack-intern',
    title: 'Full-Stack Web Engineering Intern',
    company: 'Next-Gen Fintech / Web3 / SaaS',
    icon: '⚡',
    description: 'Modern frontend interfaces, reactive state, REST/GraphQL APIs, and cloud deployments.',
    targetJobDesc: `About the Team:
We are looking for a product-minded Full-Stack Web Developer Intern who loves building responsive, pixel-perfect user experiences backed by robust, scalable serverless and containerized APIs.

What You Will Do:
- Build reactive, accessible web applications in React 18/19, Next.js, and TypeScript.
- Design responsive UI layouts with Tailwind CSS, ensuring 100% cross-device compatibility.
- Develop robust backend endpoints using Node.js, Express, PostgreSQL, and Redis caching.
- Write unit, integration, and end-to-end tests with Vitest, Jest, and Playwright.
- Deploy applications to cloud environments (Vercel, AWS, Embarko, Render).

Qualifications:
- Strong foundations in JavaScript/TypeScript, DOM manipulation, and asynchronous programming.
- Hands-on experience with React Hooks, Context API, and state management.
- Understanding of web security (CORS, CSRF, JWT authentication).`,
    sampleResume: `RAJIV KUMAR SHARMA
Full-Stack Web Developer & B.Tech Student
Email: rajivkumarsharma200@gmail.com | Phone: +91 8757988988 | GitHub: github.com/rajivsharma8757

TECHNICAL EXPERTISE:
Frontend: React, TypeScript, Tailwind CSS, Vite, HTML5, CSS3, Responsive Design
Backend: Node.js, Express, REST APIs, PostgreSQL, MySQL
Tools: Git, GitHub, Docker, Postman, Linux

FEATURED PROJECTS:
Dynamic E-Commerce & Price Tracking Portal
- Built responsive user interface with React and Tailwind CSS.
- Connected frontend to Node.js backend to fetch real-time product prices.
- Implemented search filters and sorting options for users.`,
    suggestedBullets: [
      {
        id: 'b5',
        original: 'Built responsive user interface with React and Tailwind CSS.',
        improved: 'Developed a mobile-first, WCAG 2.1 AA compliant UI using React 18, TypeScript, and Tailwind CSS, achieving a 99/100 Google Lighthouse performance score and sub-1.2s Largest Contentful Paint (LCP).',
        scoreBefore: 40,
        scoreAfter: 99,
        explanation: 'Elevates basic "Built UI" into quantifiable engineering excellence with Lighthouse metrics and accessibility compliance.',
        metricsAdded: ['WCAG 2.1 AA compliant', '99/100 Lighthouse score', 'sub-1.2s LCP']
      }
    ]
  }
];
