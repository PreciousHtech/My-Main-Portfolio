import React from 'react';
import { ArrowUp, Github, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Footer() {
  const { theme, setTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const directEmail = import.meta.env.VITE_CONTACT_EMAIL || 'precioushart205@gmail.com';
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/PreciousHtech';

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity & Origin */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-neutral-900 dark:text-white tracking-tight">
              Precious Ezekiel-Hart
            </span>
            <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700" aria-hidden="true">
              ·
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Software Developer & Engineer · Port Harcourt, Nigeria
            </span>
          </div>

          {/* Social Links, Theme Switcher & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Quick Footer Theme Switcher */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                  theme === 'light'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Switch to Light Mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                  theme === 'dark'
                    ? 'bg-neutral-800 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
                title="Switch to Dark Mode"
              >
                <Moon className="w-3.5 h-3.5 text-blue-400" />
                <span>Dark</span>
              </button>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub Profile"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${directEmail}`}
              aria-label="Send direct email"
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors ml-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
          <p>© {currentYear} Precious Ezekiel-Hart. All rights reserved.</p>
          <p>Rivers State University · Technoville Innovation Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
