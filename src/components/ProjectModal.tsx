import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, Star, Calendar, Loader2 } from 'lucide-react';
import { Project } from '../types/portfolio';
import { fetchProjectByName } from '../services/api';

interface ProjectModalProps {
  projectName: string | null;
  onClose: () => void;
}

export function ProjectModal({ projectName, onClose }: ProjectModalProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectName) {
      setProject(null);
      setError(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchProjectByName(projectName)
      .then((data) => {
        if (isMounted) setProject(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Failed to load project details');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectName, onClose]);

  if (!projectName) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading project repository details...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={() => {
                if (projectName) {
                  setLoading(true);
                  setError(null);
                  fetchProjectByName(projectName)
                    .then(setProject)
                    .catch((err) => setError(err.message))
                    .finally(() => setLoading(false));
                }
              }}
              className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : project ? (
          <div>
            {/* Header */}
            <div className="pr-10">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">
                <span>{project.language || 'Software'}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="tabular-nums">{project.stargazers_count}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white capitalize tracking-tight break-words [overflow-wrap:anywhere]">
                {project.name.replace(/[-_]/g, ' ')}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>

            {/* Topics / Tech (Zero-Pill: unboxed clean items) */}
            {project.topics && project.topics.length > 0 && (
              <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                  Tagged Technologies
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  {project.topics.map((topic, i) => (
                    <React.Fragment key={topic}>
                      <span>#{topic}</span>
                      {i < project.topics.length - 1 && <span aria-hidden="true" className="text-neutral-400">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* README Content Presentation */}
            {project.readme && (
              <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  Repository Overview
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-950/60 rounded-xl p-5 border border-neutral-200/80 dark:border-neutral-800/80 font-mono text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {project.readme}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-8 pt-5 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>

                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
