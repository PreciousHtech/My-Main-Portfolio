import { ApiResponse, ContactFormData, ContactResponse, Project } from '../types/portfolio';

const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

export async function fetchProjects(): Promise<Project[]> {
  const url = `${API_BASE}/projects`;
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to fetch projects (status: ${res.status})`);
  }
  const result: ApiResponse<Project[]> = await res.json();
  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to parse projects data');
  }
  return result.data;
}

export async function fetchProjectByName(name: string): Promise<Project> {
  const url = `${API_BASE}/projects/${encodeURIComponent(name)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Failed to fetch project details (status: ${res.status})`);
  }
  const result: ApiResponse<Project> = await res.json();
  if (!result.success || !result.data) {
    throw new Error(result.error?.message || 'Failed to parse project details');
  }
  return result.data;
}

export async function sendContactMessage(payload: ContactFormData): Promise<ContactResponse> {
  const url = `${API_BASE}/contact`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result: ApiResponse<ContactResponse> = await res.json();
  if (!res.ok || !result.success) {
    const message = result.error?.message || `Failed to send message (${res.status})`;
    throw new Error(message);
  }

  return (
    result.data || {
      message: 'Message processed successfully.',
      provider: 'simulated',
      recipient: 'precioushart205@gmail.com'
    }
  );
}
