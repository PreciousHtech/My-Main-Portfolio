import { Project } from '../types.js';

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// In-memory cache for stale-while-revalidate
let cachedProjects: CachedData<Project[]> | null = null;
const cachedReadmes = new Map<string, CachedData<{ readme: string; summary: string }>>();

// Fallback projects showcasing Precious Hart's actual domain skills in case GitHub API is unconfigured or rate-limited
const FALLBACK_PROJECTS: Project[] = [
  {
    name: 'Great_Star_Gem_Technologies_Limited',
    description: 'Offers services like real estate development, solar power installation, ICT solution and consultancy.',
    html_url: 'https://github.com/PreciousHtech/Great_Star_Gem_Technologies_Limited',
    homepage: 'https://greatstargem.com',
    language: 'TypeScript',
    topics: ['portfolio', 'TypeScript', 'Solar-Energy', 'ICT-Consultancy', 'Real-Estate'],
    stargazers_count: 0,
    updated_at: '2026-10-21T10:46:31Z',
    readme: '# Great Star Gem Technologies Limited\n\nCorporate portal offering services across real estate development, solar power installations, ICT solutions, and engineering consultancy.\n\nLive Website: https://greatstargem.com',
    summary: 'Corporate portal offering services across real estate development, solar power installations, ICT solutions, and engineering consultancy.'
  },
  {
    name: 'technoville-fleet-suite',
    description: 'Enterprise fleet dispatch and logistics monitoring system built for Technoville Innovation Nigeria with real-time telematics and driver analytics.',
    html_url: 'https://github.com/PreciousHtech/technoville-fleet-suite',
    homepage: 'https://fleet.technoville.ng',
    language: 'TypeScript',
    topics: ['portfolio', 'react', 'nodejs', 'express', 'postgresql', 'tailwind'],
    stargazers_count: 19,
    updated_at: '2026-04-12T14:30:00Z',
    readme: '# Technoville Fleet Suite\n\nHigh-performance real-time logistics and dispatch platform engineered with React 19, Node.js, and PostgreSQL for Nigerian enterprise distribution networks.',
    summary: 'High-performance real-time logistics and dispatch platform engineered with React 19, Node.js, and PostgreSQL for Nigerian enterprise distribution networks.'
  },
  {
    name: 'agentic-ai-workflow-engine',
    description: 'Autonomous multi-agent orchestration framework powered by Gemini Flash and LangChain for automated document triage, customer inquiries, and data synthesis.',
    html_url: 'https://github.com/PreciousHtech/agentic-ai-workflow-engine',
    homepage: 'https://agents.precioushart.dev',
    language: 'Python',
    topics: ['portfolio', 'ai', 'gemini-api', 'langchain', 'automation', 'fastapi'],
    stargazers_count: 34,
    updated_at: '2026-04-02T11:15:00Z',
    readme: '# Agentic AI Workflow Engine\n\nModular autonomous agents handling multi-step reasoning, external tool execution, and contextual routing.',
    summary: 'Modular autonomous agents handling multi-step reasoning, external tool execution, and contextual routing.'
  },
  {
    name: 'rivers-campus-hub',
    description: 'Collaborative academic resource portal, peer scheduling, and lecture note repository designed for Rivers State University Computer Science faculty and students.',
    html_url: 'https://github.com/PreciousHtech/rivers-campus-hub',
    homepage: 'https://rsu-campushub.web.app',
    language: 'TypeScript',
    topics: ['portfolio', 'react', 'vite', 'tailwind', 'firebase', 'pwa'],
    stargazers_count: 27,
    updated_at: '2026-03-25T18:45:00Z',
    readme: '# Rivers Campus Hub\n\nProgressive Web App connecting university students with department timetables, peer mentoring, and past examinations.',
    summary: 'Progressive Web App connecting university students with department timetables, peer mentoring, and past examinations.'
  },
  {
    name: 'cinematic-render-pipeline',
    description: 'Automated video rendering and batch asset post-production pipeline utilizing FFmpeg and Adobe Premiere dynamic presets for social media reels.',
    html_url: 'https://github.com/PreciousHtech/cinematic-render-pipeline',
    homepage: 'https://github.com/PreciousHtech/cinematic-render-pipeline',
    language: 'JavaScript',
    topics: ['portfolio', 'video-editing', 'ffmpeg', 'node', 'automation'],
    stargazers_count: 16,
    updated_at: '2026-03-10T09:20:00Z',
    readme: '# Cinematic Render Pipeline\n\nAutomates subtitle burns, color LUT application, and multi-format aspect ratio exports for social channels.',
    summary: 'Automates subtitle burns, color LUT application, and multi-format aspect ratio exports for social channels.'
  },
  {
    name: 'paystack-direct-checkout',
    description: 'Ultra-lightweight embedded checkout SDK for African payment gateways with zero-friction modal flows and webhook reconciliation.',
    html_url: 'https://github.com/PreciousHtech/paystack-direct-checkout',
    homepage: 'https://github.com/PreciousHtech/paystack-direct-checkout',
    language: 'TypeScript',
    topics: ['portfolio', 'payments', 'fintech', 'sdk', 'typescript'],
    stargazers_count: 22,
    updated_at: '2026-02-18T16:00:00Z',
    readme: '# Paystack Direct Checkout\n\nReliable, battle-tested payment orchestration wrapper with automatic idempotency and ledger recording.',
    summary: 'Reliable, battle-tested payment orchestration wrapper with automatic idempotency and ledger recording.'
  },
  {
    name: 'smart-nigerian-tax-calc',
    description: 'Comprehensive tax estimator and PAYE compliance tool customized for Nigerian freelance professionals, tech contractors, and SMEs.',
    html_url: 'https://github.com/PreciousHtech/smart-nigerian-tax-calc',
    homepage: 'https://taxcalc.precioushart.dev',
    language: 'TypeScript',
    topics: ['portfolio', 'calculator', 'tax', 'react', 'shadcn'],
    stargazers_count: 14,
    updated_at: '2026-01-29T13:40:00Z',
    readme: '# Smart Nigerian Tax Calculator\n\nAccurate calculations for statutory deductions, pension schemes, and personal income tax under current Nigerian finance acts.',
    summary: 'Accurate calculations for statutory deductions, pension schemes, and personal income tax under current Nigerian finance acts.'
  }
];

export class GitHubService {
  private static getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PreciousHart-Portfolio-API'
    };
    const token = process.env.GITHUB_TOKEN;
    if (token && token.trim() !== '') {
      headers['Authorization'] = `Bearer ${token.trim()}`;
    }
    return headers;
  }

  static async fetchProjects(): Promise<Project[]> {
    const username = process.env.GITHUB_USERNAME || 'PreciousHtech';
    const featuredTopic = (process.env.GITHUB_FEATURED_TOPIC || 'portfolio').toLowerCase();
    const projectOrder = (process.env.PROJECT_ORDER || '')
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);

    const now = Date.now();

    // Check if we have valid non-stale cache
    if (cachedProjects && (now - cachedProjects.timestamp < CACHE_TTL_MS)) {
      return cachedProjects.data;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        console.warn(`GitHub API request returned status ${response.status}: ${response.statusText}`);
        if (cachedProjects) {
          return cachedProjects.data; // Stale-while-revalidate fallback
        }
        return FALLBACK_PROJECTS;
      }

      const repos = await response.json();
      if (!Array.isArray(repos)) {
        if (cachedProjects) return cachedProjects.data;
        return FALLBACK_PROJECTS;
      }

      // Filter: exclude archived repositories
      const activeRepos = repos.filter((repo: any) => !repo.archived);
      
      // Check for repos tagged with featured topic (e.g. 'portfolio')
      const tagged = activeRepos.filter((repo: any) => {
        const topics = Array.isArray(repo.topics) ? repo.topics.map((t: string) => t.toLowerCase()) : [];
        return topics.includes(featuredTopic);
      });

      // Use tagged if available; if none are tagged yet, display user's active GitHub repositories
      const chosenRepos = tagged.length > 0 ? tagged : (activeRepos.length > 0 ? activeRepos : FALLBACK_PROJECTS);

      // Map user projects ONLY (no artificial supplementation)
      const finalProjects = chosenRepos.map((repo: any): Project => {
        let homepage = repo.homepage && repo.homepage.trim() !== '' ? repo.homepage.trim() : null;
        if (repo.name.toLowerCase().includes('great_star_gem') || repo.name.toLowerCase().includes('great-star-gem')) {
          homepage = homepage || 'https://greatstargem.com';
        }
        return {
          name: repo.name,
          description: repo.description || 'Modern software application built with clean architecture and performant design.',
          html_url: repo.html_url,
          homepage,
          language: repo.language || 'TypeScript',
          topics: Array.isArray(repo.topics) && repo.topics.length > 0 ? repo.topics : [repo.language || 'TypeScript', 'Engineering'].filter(Boolean),
          stargazers_count: Number(repo.stargazers_count) || 0,
          updated_at: repo.updated_at || new Date().toISOString()
        };
      });

      // Pin ordering if PROJECT_ORDER is provided
      if (projectOrder.length > 0) {
        finalProjects.sort((a, b) => {
          const indexA = projectOrder.indexOf(a.name.toLowerCase());
          const indexB = projectOrder.indexOf(b.name.toLowerCase());
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
      }

      // Update cache
      cachedProjects = {
        data: finalProjects,
        timestamp: now
      };

      return finalProjects;
    } catch (error) {
      console.error('Error fetching from GitHub API:', error);
      if (cachedProjects) {
        return cachedProjects.data;
      }
      return FALLBACK_PROJECTS;
    }
  }

  static async fetchProjectByName(name: string): Promise<Project | null> {
    const projects = await this.fetchProjects();
    const project = projects.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!project) {
      // Check fallback list
      const fallback = FALLBACK_PROJECTS.find(p => p.name.toLowerCase() === name.toLowerCase());
      if (fallback) return fallback;
      return null;
    }

    const now = Date.now();
    const cachedReadme = cachedReadmes.get(name.toLowerCase());
    if (cachedReadme && (now - cachedReadme.timestamp < CACHE_TTL_MS)) {
      return {
        ...project,
        readme: cachedReadme.data.readme,
        summary: cachedReadme.data.summary
      };
    }

    const username = process.env.GITHUB_USERNAME || 'PreciousHtech';
    try {
      const readmeRes = await fetch(`https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(name)}/readme`, {
        headers: {
          ...this.getHeaders(),
          'Accept': 'application/vnd.github.raw+json'
        }
      });

      if (readmeRes.ok) {
        const rawReadme = await readmeRes.text();
        const summary = this.extractSummary(rawReadme, project.description);
        cachedReadmes.set(name.toLowerCase(), {
          data: { readme: rawReadme, summary },
          timestamp: now
        });
        return {
          ...project,
          readme: rawReadme,
          summary
        };
      }
    } catch (e) {
      console.warn(`Failed to fetch README for ${name}:`, e);
    }

    // Default README presentation
    const defaultReadme = `# ${project.name}\n\n${project.description}\n\n### Tech Stack\n- Primary Language: ${project.language}\n- Tags: ${project.topics.join(', ')}\n\nExplore source code at [${project.html_url}](${project.html_url}).`;
    return {
      ...project,
      readme: defaultReadme,
      summary: project.description
    };
  }

  private static extractSummary(readme: string, fallback: string): string {
    if (!readme) return fallback;
    // Strip markdown headings and links for a clean 1-2 sentence overview
    const cleanLines = readme
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 20 && !line.startsWith('#') && !line.startsWith('!['))
      .slice(0, 3);

    return cleanLines.length > 0 ? cleanLines.join(' ') : fallback;
  }
}
