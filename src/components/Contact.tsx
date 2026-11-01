import React, { useState, useEffect } from 'react';
import { Mail, Github, Send, Loader2, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { sendContactMessage } from '../services/api';
import { ContactFormData, ContactResponse } from '../types/portfolio';

interface ContactProps {
  selectedService?: string;
}

const SERVICE_OPTIONS = [
  'Web Development',
  'App Development',
  'Video Editing',
  'AI Automation & Agents',
  'General Engineering Inquiry'
];

export function Contact({ selectedService }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: '',
    hp: '' // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ContactResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync selectedService prop if passed from Services section
  useEffect(() => {
    if (selectedService) {
      const match = SERVICE_OPTIONS.find(
        (opt) => opt.toLowerCase().includes(selectedService.toLowerCase()) ||
                 selectedService.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }));
      }
    }
  }, [selectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmissionResult(null);

    // Client-side quick validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendContactMessage(formData);
      setSubmissionResult(response);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Web Development',
        message: '',
        hp: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit your message. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const directEmail = import.meta.env.VITE_CONTACT_EMAIL || 'precioushart205@gmail.com';
  const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://github.com/PreciousHtech';

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-28 bg-neutral-100/60 dark:bg-neutral-900/40 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5"
          >
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Let's Build Together
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Whether you need a full-stack platform, an AI automation pipeline, high-retention video editing, or want to discuss a software role, inquiries land straight in my inbox at <strong className="text-neutral-900 dark:text-white">{directEmail}</strong>.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-4">
              <a
                href={`mailto:${directEmail}?subject=${encodeURIComponent('Project Inquiry for Precious Hart')}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      Direct Email Inbox
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {directEmail}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      GitHub Profile
                    </div>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      github.com/PreciousHtech
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              <p>Response time: Usually within 24 hours.</p>
              <p className="mt-1 font-mono">Location: Port Harcourt, Rivers State, Nigeria (WAT / UTC+1)</p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs"
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
              Send a Project Brief
            </h3>

            {/* Success / Dispatch feedback */}
            {submissionResult && (
              <div
                className={`mb-6 p-5 rounded-xl border ${
                  submissionResult.provider === 'resend' || submissionResult.provider === 'smtp'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      submissionResult.provider === 'resend' || submissionResult.provider === 'smtp'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Inquiry Dispatched to Inbox!
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                      {submissionResult.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900 dark:text-red-200">
                    Submission Error
                  </h4>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from genuine users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp_field">Leave this field empty</label>
                <input
                  type="text"
                  id="hp_field"
                  name="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact_name" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="name"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact_email" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="contact_phone" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Phone / WhatsApp <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="phone"
                    placeholder="+234 800 000 0000"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
                  />
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="contact_service" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Interested Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact_service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact_message" className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Project Details / Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, deliverables, or team goals..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-blue-600 transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-blue-600 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
