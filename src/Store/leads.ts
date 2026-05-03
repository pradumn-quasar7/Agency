// ─── Lead Store (localStorage-persisted) ───────────────────────────────────
//
// All form submissions are saved to localStorage so they survive page refresh.
// The admin panel reads from the same store.
//
// In a production app you'd replace this with a real API/database call.

export interface Lead {
  id: string;
  name: string;
  email: string;
  instagram: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const KEY = 'tribehunt_leads';

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(data: Omit<Lead, 'id' | 'timestamp' | 'read'>): Lead {
  const lead: Lead = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  const all = getLeads();
  all.unshift(lead); // newest first
  localStorage.setItem(KEY, JSON.stringify(all));
  // Dispatch custom event so admin panel can react in same tab
  window.dispatchEvent(new CustomEvent('tribehunt:new-lead', { detail: lead }));
  return lead;
}

export function markRead(id: string): void {
  const all = getLeads().map((l) => (l.id === id ? { ...l, read: true } : l));
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function deleteLead(id: string): void {
  const all = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearAllLeads(): void {
  localStorage.removeItem(KEY);
}

export function exportCSV(leads: Lead[]): void {
  const headers = ['Name', 'Email', 'Instagram', 'Type', 'Message', 'Date', 'Read'];
  const rows = leads.map((l) => [
    `"${l.name}"`,
    `"${l.email}"`,
    `"@${l.instagram}"`,
    `"${l.type || 'n/a'}"`,
    `"${l.message.replace(/"/g, '""')}"`,
    `"${new Date(l.timestamp).toLocaleString()}"`,
    `"${l.read ? 'Yes' : 'No'}"`,
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tribehunt-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
