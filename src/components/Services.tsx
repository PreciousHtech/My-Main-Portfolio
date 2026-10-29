import React from 'react';
import { Globe, Smartphone, Video, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: Globe,
    description: 'Blazing-fast, responsive web apps, SaaS portals, and landing experiences built with React, Vite, Next.js, and TypeScript.',
    deliverables: 'Architecture · Full-Stack API · SEO · Responsive UI'
  },
  {
    id: 'app-dev',
    title: 'App Development',
    icon: Smartphone,
    description: 'Cross-platform mobile applications engineered for fluid user interactions, offline resilience, and clean API sync.',
    deliverables: 'Native Performance · State Management · Push Notifications'
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    icon: Video,
    description: 'High-retention cinematic video post-production, motion graphics, color grading, and dynamic reel editing for creators.',
    deliverables: 'Premiere Pro & After Effects · Sound Design · Pacing'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Agents',
    icon: Bot,
    description: 'Autonomous multi-agent workflows, LLM tool integrations, and background automation pipelines that eliminate manual tasks.',
    deliverables: 'Gemini API · Workflow Orchestration · Custom Tool Calling'
  }
];

export function Services({ onSelectService }: ServicesProps) {
  const handleQuoteClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            What I Deliver
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Specialized Engineering & Creative Services
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
            End-to-end technical execution from initial system architecture to pixel-perfect deployment and high-impact media production.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs group"
              >
                <div>
                  {/* Clean Icon Container */}
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {service.title}
                  </h3>

                  {/* One-Line Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Unboxed Deliverable Highlights */}
                  <div className="text-xs text-neutral-400 dark:text-neutral-500 font-mono pt-2 border-t border-neutral-100 dark:border-neutral-800/80 mb-6">
                    {service.deliverables}
                  </div>
                </div>

                {/* Get a quote button */}
                <button
                  type="button"
                  onClick={() => handleQuoteClick(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/70 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 rounded-lg transition-colors group-hover:border-blue-600/50 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                >
                  <span>Get a quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
