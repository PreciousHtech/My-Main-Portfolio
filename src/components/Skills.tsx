import React from 'react';
import { Layout, Server, Cpu, Palette } from 'lucide-react';
import { motion } from 'motion/react';

interface SkillGroup {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: { name: string; detail: string }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Layout,
    description: 'Modern, reactive client-side engineering focused on fluid UX and strict performance.',
    skills: [
      { name: 'React 19 & Next.js', detail: 'Server Components & SPA' },
      { name: 'TypeScript', detail: 'Strict Type Safety' },
      { name: 'Tailwind CSS', detail: 'Utility Architecture' },
      { name: 'Framer Motion', detail: 'Compositor Animations' },
      { name: 'Vite Ecosystem', detail: 'Rapid Tooling & HMR' },
      { name: 'Web Performance', detail: 'Core Web Vitals & a11y' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    description: 'Scalable server-side architectures, hardened endpoints, and reliable data storage.',
    skills: [
      { name: 'Node.js & Express', detail: 'Microservices & REST' },
      { name: 'Zod Validation', detail: 'Schema Verification' },
      { name: 'PostgreSQL & SQL', detail: 'Relational Modeling' },
      { name: 'Security & Auth', detail: 'Helmet, CORS & Rate Limits' },
      { name: 'Caching & Redis', detail: 'Stale-While-Revalidate' },
      { name: 'API Integrations', detail: 'Third-Party Webhooks' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    icon: Cpu,
    description: 'Autonomous multi-agent workflows, tool routing, and intelligent API integrations.',
    skills: [
      { name: 'Gemini API & SDK', detail: 'Multi-Modal Generation' },
      { name: 'Agentic Workflows', detail: 'Autonomous Loops' },
      { name: 'Function Calling', detail: 'Structured JSON Outputs' },
      { name: 'LangChain & n8n', detail: 'Pipeline Orchestration' },
      { name: 'Prompt Engineering', detail: 'Context Grounding' },
      { name: 'Task Automation', detail: 'Cron & Headless Scripts' }
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: Palette,
    description: 'High-impact multimedia production, cinematic editing, and visual brand identity.',
    skills: [
      { name: 'Adobe Premiere Pro', detail: 'Cinematic Sequencing' },
      { name: 'After Effects', detail: 'Motion Graphics' },
      { name: 'Color Grading', detail: 'Look Profiles & LUTs' },
      { name: 'Sound Design', detail: 'Audio Mastering' },
      { name: 'Short-Form Video', detail: 'Retention Pacing' },
      { name: 'Design Systems', detail: 'Figma to Code' }
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 md:py-28 bg-neutral-100/60 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            Technical Repertoire
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Skills & Core Competencies
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
            A balanced synthesis of software engineering rigor, machine intelligence pipelines, and high-retention creative media.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {group.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills List (Zero-Pill: Clean unboxed list with typographic details) */}
                  <ul className="space-y-3">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="flex flex-col text-xs">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                          {skill.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
                  {group.skills.length} core technologies
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
