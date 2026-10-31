import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Github, ExternalLink, BookOpen, AlertCircle, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchProjects } from '../services/api';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

const PROJECTS_PER_PAGE = 6;

export function Projects() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [activeProjectName, setActiveProjectName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery<Project[]>({
    queryKey: ['portfolio-projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Extract unique languages for filter bar
  const languages = useMemo(() => {
    if (!projects) return ['All'];
    const langs = new Set<string>();
    projects.forEach((p) => {
      if (p.language) langs.add(p.language);
    });
    return ['All', ...Array.from(langs)];
  }, [projects]);

  // Filter projects based on active language tab
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedLanguage === 'All') return projects;
    return projects.filter((p) => p.language === selectedLanguage);
  }, [projects, selectedLanguage]);

  // Pagination calculations (display Prev/Next ONLY when projects > 6)
  const hasMultiplePages = filteredProjects.length > PROJECTS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PROJECTS_PER_PAGE, filteredProjects.length);
  const currentProjects = useMemo(() => {
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, startIndex, endIndex]);

  // Ensure currentPage is valid if filter reduces totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      const target = document.getElementById('projects');
      if (target) {
        const navHeight = document.querySelector('header')?.offsetHeight || 72;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, targetTop - navHeight),
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="projects" className="scroll-mt-20 py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Featured Repositories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Selected Software & Systems
            </h2>
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Dynamically retrieved from GitHub via the Express backend API. Tagged with <code className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">portfolio</code>.
            </p>
          </div>

          {/* Refresh / Status indicator */}
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh repository cache"
            className="inline-flex items-center gap-2 self-start md:self-end px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Sync Repos</span>
          </button>
        </div>

        {/* Interactive Language Filter Controls (Segmented Tabs) */}
        {!isLoading && !isError && languages.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedLanguage === lang
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <div
                key={key}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between animate-pulse h-72 min-w-0 overflow-hidden"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-4/6"></div>
                  </div>
                </div>
                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-between gap-3">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-20"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-8 text-center max-w-lg mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
              Unable to Load GitHub Projects
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5">
              {(error as Error)?.message || 'There was an issue communicating with the GitHub API.'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredProjects.length === 0 && (
          <div className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl p-12 text-center max-w-md mx-auto">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              No projects tagged with '{selectedLanguage}'.
            </p>
            <button
              type="button"
              onClick={() => handleLanguageChange('All')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Reset filter to All
            </button>
          </div>
        )}

        {/* Projects Cards Grid (Displays exactly up to 6 cards per page) */}
        {!isLoading && !isError && currentProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-xs group min-w-0 overflow-hidden"
              >
                <div className="min-w-0 w-full">
                  {/* Top unboxed metadata line */}
                  <div className="flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-3">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 truncate">
                      {project.language || 'Other'}
                    </span>
                  </div>

                  {/* Project Name (Clickable for README modal) */}
                  <button
                    type="button"
                    onClick={() => setActiveProjectName(project.name)}
                    className="text-left group/title block w-full min-w-0"
                  >
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white capitalize group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors break-words [overflow-wrap:anywhere] hyphens-auto leading-snug">
                      {project.name.replace(/[-_]/g, ' ')}
                    </h3>
                  </button>

                  {/* Description */}
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 break-words [overflow-wrap:anywhere]">
                    {project.description}
                  </p>

                  {/* Topics (Zero-Pill: clean unboxed text with bullet separators) */}
                  {project.topics && project.topics.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {project.topics.slice(0, 4).map((t, i) => (
                        <React.Fragment key={t}>
                          <span>#{t}</span>
                          {i < Math.min(project.topics.length, 4) - 1 && (
                            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions: Code, Live Demo, README Modal */}
                <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Code button */}
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View ${project.name} source code on GitHub`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    {/* Live Demo button */}
                    {project.homepage ? (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open ${project.name} live demo`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live demo</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 italic px-1">
                        CLI / Internal
                      </span>
                    )}
                  </div>

                  {/* README overview button */}
                  <button
                    type="button"
                    onClick={() => setActiveProjectName(project.name)}
                    aria-label={`Read ${project.name} README`}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                    title="View README summary"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination: Prev & Next buttons ONLY displayed when projects > 6 */}
        {!isLoading && !isError && hasMultiplePages && (
          <div className="mt-12 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Showing <span className="font-semibold text-neutral-900 dark:text-white">{startIndex + 1}–{endIndex}</span> of <span className="font-semibold text-neutral-900 dark:text-white">{filteredProjects.length}</span> projects
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Numbered page buttons */}
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`min-w-8 h-8 px-2 text-xs font-semibold rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next projects"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* README Detail Lightbox Modal */}
      <ProjectModal
        projectName={activeProjectName}
        onClose={() => setActiveProjectName(null)}
      />
    </section>
  );
}
