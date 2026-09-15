const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const accessTokenKey = 'mide_cms_access_token';

export const isCmsConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const apiUrl = (path: string) => `${supabaseUrl}/rest/v1/${path}`;
const authUrl = () => `${supabaseUrl}/auth/v1`;

const headers = (token?: string): Record<string, string> => ({
  apikey: supabaseAnonKey ?? '',
  Authorization: `Bearer ${token ?? localStorage.getItem(accessTokenKey) ?? supabaseAnonKey ?? ''}`,
  'Content-Type': 'application/json',
});

async function readError(response: Response): Promise<never> {
  const body = await response.text();
  throw new Error(body || `Supabase request failed (${response.status})`);
}

export interface CmsUser {
  id: string;
  email?: string;
}

export interface CmsProject {
  id: string;
  title: string;
  category: string;
  description: string;
  full_description: string | null;
  features: string[];
  technologies: string[];
  gallery: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  sort_order: number;
  featured: boolean;
  published: boolean;
}

export interface CmsContent {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export async function signIn(email: string, password: string): Promise<CmsUser> {
  if (!isCmsConfigured) throw new Error('CMS is not configured. Add Supabase environment variables first.');
  const response = await fetch(`${authUrl()}/token?grant_type=password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) return readError(response);
  const session = await response.json() as { access_token: string; user: CmsUser };
  localStorage.setItem(accessTokenKey, session.access_token);
  return session.user;
}

export function signOut(): void {
  localStorage.removeItem(accessTokenKey);
}

export function hasSession(): boolean {
  return Boolean(localStorage.getItem(accessTokenKey));
}

export async function getCurrentUser(): Promise<CmsUser | null> {
  if (!isCmsConfigured || !hasSession()) return null;
  const response = await fetch(`${authUrl()}/user`, { headers: headers() });
  if (!response.ok) {
    signOut();
    return null;
  }
  return response.json() as Promise<CmsUser>;
}

export async function fetchPublishedContent(): Promise<CmsContent[]> {
  if (!isCmsConfigured) return [];
  const response = await fetch(apiUrl('site_content?select=*&published=eq.true&order=key.asc'), { headers: headers() });
  if (!response.ok) return readError(response);
  return response.json() as Promise<CmsContent[]>;
}

export async function fetchProjects(includeUnpublished = false): Promise<CmsProject[]> {
  if (!isCmsConfigured) return [];
  const query = includeUnpublished ? 'projects?select=*&order=sort_order.asc' : 'projects?select=*&published=eq.true&order=sort_order.asc';
  const response = await fetch(apiUrl(query), { headers: headers() });
  if (!response.ok) return readError(response);
  return response.json() as Promise<CmsProject[]>;
}

export async function saveContent(key: string, value: Record<string, unknown>, published = true): Promise<void> {
  const response = await fetch(apiUrl('site_content'), {
    method: 'POST',
    headers: { ...headers(), Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify({ key, value, published, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) return readError(response);
}

export async function saveProject(project: Partial<CmsProject> & { title: string }): Promise<void> {
  const response = await fetch(apiUrl('projects'), {
    method: 'POST',
    headers: { ...headers(), Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(project),
  });
  if (!response.ok) return readError(response);
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(apiUrl(`projects?id=eq.${encodeURIComponent(id)}`), {
    method: 'DELETE',
    headers: headers(),
  });
  if (!response.ok) return readError(response);
}

export async function uploadMedia(file: File): Promise<string> {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error('CMS is not configured.');
  const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/site-media/${path}`, {
    method: 'POST',
    headers: { apikey: supabaseAnonKey, Authorization: headers().Authorization ?? '', 'Content-Type': file.type },
    body: file,
  });
  if (!response.ok) return readError(response);
  return `${supabaseUrl}/storage/v1/object/public/site-media/${path}`;
}
