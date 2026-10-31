import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_USERNAME = 'PreciousHtech';

const STATIC_FALLBACK_REPOS = [
  {
    name: 'Great_Star_Gem_Technologies_Limited',
    description: 'Corporate portal and services platform for real estate development, solar power installation, and ICT consultancy.',
    html_url: 'https://github.com/PreciousHtech/Great_Star_Gem_Technologies_Limited',
    homepage: 'https://greatstargem.com',
    language: 'TypeScript',
    topics: ['portfolio', 'TypeScript', 'Solar-Energy', 'ICT-Consultancy', 'Real-Estate'],
    stargazers_count: 0,
    updated_at: '2026-10-24T08:48:22Z',
    readme: '# Great Star Gem Technologies Limited\n\nCorporate portal offering services across real estate development, solar power installations, ICT solutions, and engineering consultancy.\n\nLive Website: https://greatstargem.com',
    summary: 'Corporate portal offering services across real estate development, solar power installations, ICT solutions, and engineering consultancy.'
  },
  {
    name: 'My-Main-Portfolio',
    description: 'Personal portfolio of Precious Ezekiel-Hart showcasing full-stack engineering, projects, and expertise.',
    html_url: 'https://github.com/PreciousHtech/My-Main-Portfolio',
    homepage: null,
    language: 'TypeScript',
    topics: ['portfolio', 'react', 'vite', 'tailwind'],
    stargazers_count: 0,
    updated_at: '2026-10-31T12:40:50Z',
    readme: '# My Main Portfolio\n\nEngineering portfolio of Precious Ezekiel-Hart.',
    summary: 'Personal portfolio of Precious Ezekiel-Hart showcasing full-stack engineering, projects, and expertise.'
  },
  {
    name: 'My-Portfolio',
    description: 'Personal portfolio repository designed to showcase software engineering work and projects.',
    html_url: 'https://github.com/PreciousHtech/My-Portfolio',
    homepage: null,
    language: 'HTML',
    topics: ['portfolio', 'web-development'],
    stargazers_count: 0,
    updated_at: '2026-10-21T15:44:45Z',
    readme: '# My Portfolio\n\nShowcasing projects and engineering expertise.',
    summary: 'Personal portfolio repository designed to showcase software engineering work and projects.'
  },
  {
    name: 'Suxul-E-commerce',
    description: 'Modern e-commerce platform built with responsive catalog browsing and shopping cart features.',
    html_url: 'https://github.com/PreciousHtech/Suxul-E-commerce',
    homepage: null,
    language: 'TypeScript',
    topics: ['ecommerce', 'react', 'shopping'],
    stargazers_count: 0,
    updated_at: '2026-09-15T09:30:36Z',
    readme: '# Suxul E-commerce\n\nModern shopping experience with catalog, filtering, and checkout flows.',
    summary: 'Modern e-commerce platform built with responsive catalog browsing and shopping cart features.'
  },
  {
    name: 'Machine-Translator',
    description: 'Natural language machine translation utility engineered for real-time text processing.',
    html_url: 'https://github.com/PreciousHtech/Machine-Translator',
    homepage: null,
    language: 'JavaScript',
    topics: ['machine-learning', 'translator', 'nlp'],
    stargazers_count: 0,
    updated_at: '2026-08-21T13:32:06Z',
    readme: '# Machine Translator\n\nReal-time natural language translation system.',
    summary: 'Natural language machine translation utility engineered for real-time text processing.'
  },
  {
    name: 'Movie-Website',
    description: 'Dynamic movie database web application featuring TMDB API integration and real-time search.',
    html_url: 'https://github.com/PreciousHtech/Movie-Website',
    homepage: null,
    language: 'JavaScript',
    topics: ['movies', 'tmdb-api', 'react-router'],
    stargazers_count: 0,
    updated_at: '2026-08-21T13:14:51Z',
    readme: '# Movie Website\n\nDynamic movie platform using TMDB API for discovering movies, ratings, and trailers.',
    summary: 'Dynamic movie database web application featuring TMDB API integration and real-time search.'
  },
  {
    name: 'interns_on_boarding',
    description: 'Structured onboarding workflows and developer guides for new engineering interns.',
    html_url: 'https://github.com/PreciousHtech/interns_on_boarding',
    homepage: null,
    language: 'Software',
    topics: ['onboarding', 'documentation'],
    stargazers_count: 0,
    updated_at: '2025-10-21T11:24:28Z',
    readme: '# Interns On Boarding\n\nDocumentation and guides for developer onboarding.',
    summary: 'Structured onboarding workflows and developer guides for new engineering interns.'
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Edge Caching: 10 minutes cache, 20 minutes stale-while-revalidate
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200');

  const { name } = req.query;

  // Single repo lookup (with README)
  if (name && typeof name === 'string') {
    try {
      const headers: Record<string, string> = {
        'User-Agent': 'Precious-Portfolio-Vercel',
        'Accept': 'application/vnd.github.v3+json'
      };
      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN.trim()}`;
      }

      const repoRes = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(name)}`,
        { headers }
      );

      if (repoRes.ok) {
        const repo = await repoRes.json();
        let readme = repo.description || '';

        // Fetch raw README
        try {
          const readmeRes = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${encodeURIComponent(name)}/main/README.md`
          );
          if (readmeRes.ok) {
            readme = await readmeRes.text();
          } else {
            const masterReadme = await fetch(
              `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${encodeURIComponent(name)}/master/README.md`
            );
            if (masterReadme.ok) {
              readme = await masterReadme.text();
            }
          }
        } catch {
          // Keep description fallback
        }

        return res.status(200).json({
          success: true,
          data: {
            name: repo.name,
            description: repo.description || 'Software engineering repository by Precious Ezekiel-Hart',
            html_url: repo.html_url,
            homepage: repo.homepage || (repo.name === 'Great_Star_Gem_Technologies_Limited' ? 'https://greatstargem.com' : null),
            language: repo.language || 'Software',
            topics: repo.topics || [],
            stargazers_count: repo.stargazers_count || 0,
            updated_at: repo.updated_at,
            readme,
            summary: repo.description || ''
          }
        });
      }
    } catch {
      // Fall through to static fallback
    }

    const match = STATIC_FALLBACK_REPOS.find(r => r.name.toLowerCase() === name.toLowerCase());
    if (match) {
      return res.status(200).json({ success: true, data: match });
    }
    return res.status(404).json({ success: false, error: { message: `Project ${name} not found` } });
  }

  // All repos lookup
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Precious-Portfolio-Vercel',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN.trim()}`;
    }

    const githubRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (githubRes.ok) {
      const repos = await githubRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        const formatted = repos
          .filter((repo: any) => !repo.fork && !repo.archived)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'Software engineering repository by Precious Ezekiel-Hart',
            html_url: repo.html_url,
            homepage: repo.homepage || (repo.name === 'Great_Star_Gem_Technologies_Limited' ? 'https://greatstargem.com' : null),
            language: repo.language || 'Software',
            topics: repo.topics || [],
            stargazers_count: repo.stargazers_count || 0,
            updated_at: repo.updated_at,
            readme: repo.description || '',
            summary: repo.description || ''
          }));

        return res.status(200).json({
          success: true,
          data: formatted
        });
      }
    }
  } catch {
    // If rate-limited or error, fall through to static fallback
  }

  // Guaranteed fallback
  return res.status(200).json({
    success: true,
    data: STATIC_FALLBACK_REPOS
  });
}
