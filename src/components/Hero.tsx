import React from 'react';
import { ArrowUpRight, Github, FileDown, Code2, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import portraitImg from '../assets/images/profile.jpg';

// Profile picture uploaded by Precious Ezekiel-Hart
const PORTRAIT_PATH = portraitImg;

// Uploaded CV by Precious Ezekiel-Hart
const CV_PATH = '/assets/aistudio/Software_Engineer_CV__1___3__24b75c40.pdf';

export function Hero() {
  const handleHireMeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/PreciousHtech';

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Typography on Left, Visual Asset on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Quiet Location & Role Kicker (Zero-Pill: unboxed text with typographic separator) */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-5">
              <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>Software Developer & Engineer</span>
              </span>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>Rivers State, Nigeria</span>
              </span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6 text-balance">
              Building resilient web platforms, mobile apps & autonomous AI agents.
            </h1>

            {/* Short Intro */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-2xl">
              I’m <strong className="text-neutral-900 dark:text-white font-semibold">Precious Ezekiel-Hart</strong>, a Computer Science student at Rivers State University and software engineer at Technoville Innovation Nigeria. I engineer production-grade software and high-retention creative media.
            </p>

            {/* Action Buttons: View GitHub, Hire Me, Download Résumé */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white rounded-lg transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <Github className="w-4 h-4" />
                <span>View my GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="#contact"
                onClick={handleHireMeClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span>Hire me</span>
              </a>

              <a
                href={CV_PATH}
                download="Software_Engineer_CV_Precious_Ezekiel_Hart.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <FileDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Visual Portrait Asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
              <img
                src={PORTRAIT_PATH}
                alt="Precious Ezekiel-Hart - Software Engineer and Creative Technologist"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/profile.jpg') {
                    target.src = '/profile.jpg';
                  } else {
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling;
                    if (fallback) fallback.classList.remove('hidden');
                  }
                }}
              />

              {/* Styled Fallback Container (Zero-Broken-Image Policy) */}
              <div className="hidden absolute inset-0 flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-neutral-900 to-neutral-950 text-white">
                <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Precious Ezekiel-Hart</h3>
                <p className="text-xs text-neutral-400 mt-1">Software Engineer · Rivers State, Nigeria</p>
              </div>

              {/* Discreet Editorial Overlay Plate */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent flex items-center justify-between text-xs text-neutral-200">
                <span className="font-medium">Technoville Innovation NG</span>
                <span className="font-mono text-neutral-400">RSU CS · Port Harcourt</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Claim-to-Proof Row (Below the split, unboxed text) */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white tabular-nums">
              4+
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Years Coding Experience
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white tabular-nums">
              1+
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Web & App Deployments
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Production Uptime Focus
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white tabular-nums">
              1+
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              AI Automations Built
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
