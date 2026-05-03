// ─── Simple Admin Auth (localStorage session) ──────────────────────────────
//
// Credentials are checked client-side. For production, replace with a
// real backend auth endpoint.

const ADMIN_USER = 'tribehunt';
const ADMIN_PASS = 'TribeHunt@2025';
const SESSION_KEY = 'tribehunt_admin_session';

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export const CREDENTIALS_HINT = {
  user: ADMIN_USER,
  pass: ADMIN_PASS,
};
