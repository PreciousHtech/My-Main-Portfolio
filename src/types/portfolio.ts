export interface Project {
  name: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  readme?: string;
  summary?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
  hp?: string;
}

export interface ContactResponse {
  message: string;
  provider: 'resend' | 'smtp' | 'simulated' | 'honeypot';
  recipient: string;
  mailtoUrl?: string;
}
