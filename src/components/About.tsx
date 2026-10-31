import React, { useState } from 'react';
import { GraduationCap, Briefcase, MapPin, Check, Copy, HeartHandshake, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const [copied, setCopied] = useState(false);
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'precioushart205@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Bio */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Background & Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
              Engineering with Purpose, Craft & Curiosity
            </h2>

            <div className="space-y-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <p>
                I am a Nigerian software developer and engineer based in Port Harcourt, Rivers State. My daily work revolves around taking complex ideas—whether an enterprise logistics dashboard, a mobile client, or an autonomous AI agent—and shaping them into performant, reliable digital products.
              </p>
              <p>
                Currently, I am pursuing my degree in <strong>Computer Science at Rivers State University (RSU)</strong>, grounding my practical development experience in strong algorithmic fundamentals, distributed systems principles, and database management.
              </p>
              <p>
                In industry, I work at <strong>Technoville Innovation Nigeria</strong>, where I collaborate with multidisciplinary teams to build high-availability software platforms, streamline operational workflows with AI integrations, and deliver client-facing applications across web and mobile.
              </p>
              <p>
                Beyond code, I have a deep appreciation for storytelling and media. Having directed and edited cinematic video content, I bring a sharp eye for visual balance, typography, and human retention to every interface I construct.
              </p>
            </div>

            {/* Quick Email Copy Callout */}
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-4">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Want to connect directly?
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/80 dark:hover:bg-neutral-700 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied {email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Institutional & Professional Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Education Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Academic Background
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                    Rivers State University
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    B.Sc. in Computer Science Candidate
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Focus on Algorithms, Database Systems, Software Engineering, and Machine Learning foundations.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Work Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Current Position
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                    Technoville Innovation Nigeria
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                    Software Developer & Engineer
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Architecting modern web platforms, mobile solutions, and integrating AI automation for client pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Location & Collaboration Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Work Location & Availability
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                    Port Harcourt, Nigeria (WAT / UTC+1)
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2">
                    Available for high-impact full-stack freelance contracts, remote software engineering roles, and AI tooling consulting worldwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
