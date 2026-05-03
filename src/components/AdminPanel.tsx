import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Users, Mail, Briefcase, Download, Trash2, Eye,
  EyeOff, LogOut, RefreshCw, Search, Filter, ChevronDown,
  CheckCheck, Clock, AlertCircle, Lock, User,
} from 'lucide-react';
import { getLeads, deleteLead, clearAllLeads, exportCSV, markRead, type Lead } from '../store/leads';
import { login, logout, isAuthenticated } from '../store/auth';

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (login(username, password)) {
      onSuccess();
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen p-5"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C6A96B]/12 flex items-center justify-center">
              <span className="text-[#C6A96B] font-black text-base">TH</span>
            </div>
            <span className="text-[#F5F5F5] font-bold text-xl">TRIBE<span className="text-[#C6A96B]">HUNT</span></span>
          </div>
          <h1 className="text-[#F5F5F5] font-black text-2xl mb-1">Admin Access</h1>
          <p className="text-[#F5F5F5]/38 text-sm">Sign in to manage your leads</p>
        </div>

        <form onSubmit={handleLogin} className="glass p-7 flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">
              Username
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6A96B]/45" />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="tribehunt"
                className="w-full bg-[#0d0d0d] border border-[#C6A96B]/12 focus:border-[#C6A96B]/42 rounded-xl pl-9 pr-4 py-3 text-[#F5F5F5] text-sm placeholder-[#F5F5F5]/22 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] text-[#F5F5F5]/42 uppercase tracking-wider mb-1.5 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6A96B]/45" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••••••"
                className="w-full bg-[#0d0d0d] border border-[#C6A96B]/12 focus:border-[#C6A96B]/42 rounded-xl pl-9 pr-10 py-3 text-[#F5F5F5] text-sm placeholder-[#F5F5F5]/22 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#F5F5F5]/30 hover:text-[#C6A96B]/70 transition-colors"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400/80 text-xs bg-red-500/8 border border-red-500/20 rounded-lg px-3 py-2.5">
              <AlertCircle size={13} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold py-3.5 text-sm flex items-center justify-center gap-2 mt-1 disabled:opacity-60"
          >
            {loading ? (
              <><RefreshCw size={14} className="animate-spin" /> Signing in…</>
            ) : (
              <>Sign In to Dashboard</>
            )}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-4 glass p-4 text-center">
          <p className="text-[#F5F5F5]/28 text-xs leading-relaxed">
            Default: <span className="text-[#C6A96B]/55 font-mono">tribehunt</span>
            {' / '}
            <span className="text-[#C6A96B]/55 font-mono">TribeHunt@2025</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Lead Detail Modal ───────────────────────────────────────────────────────
function LeadModal({ lead, onClose, onDelete }: { lead: Lead; onClose: () => void; onDelete: () => void }) {
  useEffect(() => {
    markRead(lead.id);
  }, [lead.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass border !border-[#C6A96B]/18 p-7 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#F5F5F5]/35 hover:text-[#F5F5F5]/70 transition-colors">
          <X size={16} />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${lead.read ? 'bg-[#C6A96B]/40' : 'bg-[#C6A96B]'}`} />
            <span className="text-[10px] text-[#F5F5F5]/38 uppercase tracking-wider">
              {lead.read ? 'Read' : 'New'}
            </span>
          </div>
          <h2 className="text-[#F5F5F5] font-black text-xl">{lead.name}</h2>
          <p className="text-[#C6A96B] text-sm mt-0.5">@{lead.instagram}</p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            { label: 'Email', value: lead.email },
            { label: 'Type', value: lead.type || 'n/a' },
            { label: 'Submitted', value: new Date(lead.timestamp).toLocaleString() },
          ].map((row) => (
            <div key={row.label} className="flex gap-3">
              <span className="text-[#F5F5F5]/38 text-xs w-20 flex-shrink-0 pt-0.5">{row.label}</span>
              <span className="text-[#F5F5F5]/80 text-xs capitalize">{row.value}</span>
            </div>
          ))}
          <div className="flex gap-3">
            <span className="text-[#F5F5F5]/38 text-xs w-20 flex-shrink-0 pt-0.5">Message</span>
            <span className="text-[#F5F5F5]/80 text-xs leading-relaxed">{lead.message}</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <a
            href={`mailto:${lead.email}`}
            className="btn-gold flex-1 text-xs py-2.5 flex items-center justify-center gap-1.5"
          >
            <Mail size={13} /> Reply via Email
          </a>
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="w-10 h-10 flex-shrink-0 rounded-xl border border-red-500/25 text-red-400/60 hover:bg-red-500/10 hover:border-red-500/45 hover:text-red-400 transition-all flex items-center justify-center"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'creator' | 'brand' | 'unread'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const refresh = useCallback(() => setLeads(getLeads()), []);

  useEffect(() => {
    refresh();
    // Live update when a new lead is saved in same tab
    const fn = () => refresh();
    window.addEventListener('tribehunt:new-lead', fn);
    return () => window.removeEventListener('tribehunt:new-lead', fn);
  }, [refresh]);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.instagram.toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q);
    const matchFilter =
      filter === 'all' ||
      (filter === 'unread' && !l.read) ||
      l.type === filter;
    return matchSearch && matchFilter;
  });

  const unreadCount = leads.filter((l) => !l.read).length;
  const creatorCount = leads.filter((l) => l.type === 'creator').length;
  const brandCount = leads.filter((l) => l.type === 'brand').length;

  const handleDelete = (id: string) => {
    deleteLead(id);
    refresh();
  };

  const handleClearAll = () => {
    clearAllLeads();
    setConfirmClear(false);
    refresh();
  };

  const FILTERS: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All Leads' },
    { key: 'unread', label: 'Unread' },
    { key: 'creator', label: 'Creators' },
    { key: 'brand', label: 'Brands' },
  ];

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-[#C6A96B]/8 px-5 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center">
              <span className="text-[#C6A96B] font-black text-sm">TH</span>
            </div>
            <div>
              <h1 className="text-[#F5F5F5] font-black text-base leading-none">
                TRIBE<span className="text-[#C6A96B]">HUNT</span>
                <span className="text-[#F5F5F5]/40 font-normal text-sm ml-2">Admin</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={refresh}
              className="w-8 h-8 rounded-lg border border-[#C6A96B]/15 flex items-center justify-center text-[#F5F5F5]/45 hover:text-[#C6A96B] hover:border-[#C6A96B]/35 transition-all"
              title="Refresh"
            >
              <RefreshCw size={13} />
            </button>
            <button
              onClick={() => exportCSV(leads)}
              disabled={leads.length === 0}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#C6A96B]/15 text-[#F5F5F5]/55 hover:text-[#C6A96B] hover:border-[#C6A96B]/35 text-xs font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Download size={12} /> Export CSV
            </button>
            <button
              onClick={() => { logout(); onLogout(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-500/20 text-red-400/55 hover:text-red-400 hover:border-red-500/40 text-xs font-medium transition-all"
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Users, label: 'Total Leads', value: leads.length, sub: 'all time' },
            { icon: CheckCheck, label: 'Unread', value: unreadCount, sub: 'need attention', highlight: unreadCount > 0 },
            { icon: Mail, label: 'Creators', value: creatorCount, sub: 'college creators' },
            { icon: Briefcase, label: 'Brands', value: brandCount, sub: 'brand inquiries' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`glass p-4 sm:p-5 ${s.highlight ? 'border !border-[#C6A96B]/30' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C6A96B]/10 flex items-center justify-center">
                    <Icon size={15} className="text-[#C6A96B]" />
                  </div>
                  {s.highlight && (
                    <span className="w-2 h-2 rounded-full bg-[#C6A96B] animate-pulse" />
                  )}
                </div>
                <div className="text-[#C6A96B] font-black text-2xl sm:text-3xl leading-none mb-1">{s.value}</div>
                <div className="text-[#F5F5F5]/65 font-semibold text-xs">{s.label}</div>
                <div className="text-[#F5F5F5]/28 text-[10px] mt-0.5">{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C6A96B]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, Instagram…"
              className="w-full bg-[#0d0d0d] border border-[#C6A96B]/12 focus:border-[#C6A96B]/40 rounded-xl pl-9 pr-4 py-2.5 text-[#F5F5F5] text-sm placeholder-[#F5F5F5]/22 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 bg-[#0d0d0d] border border-[#C6A96B]/12 rounded-xl text-sm text-[#F5F5F5]/65 hover:border-[#C6A96B]/35 transition-colors"
            >
              <Filter size={13} className="text-[#C6A96B]/60" />
              {FILTERS.find((f) => f.key === filter)?.label}
              <ChevronDown size={13} className={`text-[#C6A96B]/40 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 w-40 glass border !border-[#C6A96B]/18 py-1.5 z-20"
                >
                  {FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => { setFilter(f.key); setFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        filter === f.key
                          ? 'text-[#C6A96B] bg-[#C6A96B]/8'
                          : 'text-[#F5F5F5]/55 hover:text-[#F5F5F5]/85 hover:bg-white/3'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Leads list */}
        <div className="glass overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_0.7fr_0.5fr_0.6fr_80px] gap-4 px-5 py-3 border-b border-[#C6A96B]/8">
            {['Name', 'Email', 'Instagram', 'Type', 'Date', 'Actions'].map((h) => (
              <div key={h} className="text-[10px] text-[#F5F5F5]/30 uppercase tracking-wider font-bold">{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Users size={28} className="mx-auto text-[#F5F5F5]/15 mb-3" />
              <p className="text-[#F5F5F5]/28 text-sm">
                {leads.length === 0
                  ? 'No leads yet. Share the website to start collecting!'
                  : 'No results match your search.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#C6A96B]/5">
              {filtered.map((lead) => (
                <motion.div
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`group px-5 py-4 hover:bg-[#C6A96B]/3 transition-colors cursor-pointer ${
                    !lead.read ? 'border-l-2 border-l-[#C6A96B]' : 'border-l-2 border-l-transparent'
                  }`}
                  onClick={() => { setSelectedLead(lead); markRead(lead.id); refresh(); }}
                >
                  {/* Mobile layout */}
                  <div className="sm:hidden flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {!lead.read && <span className="w-1.5 h-1.5 rounded-full bg-[#C6A96B] flex-shrink-0" />}
                        <span className="text-[#F5F5F5] font-semibold text-sm truncate">{lead.name}</span>
                      </div>
                      <p className="text-[#F5F5F5]/45 text-xs truncate">{lead.email}</p>
                      <p className="text-[#C6A96B] text-xs mt-0.5">@{lead.instagram}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#C6A96B]/10 text-[#C6A96B] capitalize">
                        {lead.type || 'n/a'}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                        className="text-[#F5F5F5]/20 hover:text-red-400/70 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden sm:grid grid-cols-[1fr_1fr_0.7fr_0.5fr_0.6fr_80px] gap-4 items-center">
                    <div className="flex items-center gap-2 min-w-0">
                      {!lead.read && <span className="w-1.5 h-1.5 rounded-full bg-[#C6A96B] flex-shrink-0" />}
                      <span className="text-[#F5F5F5] font-semibold text-sm truncate">{lead.name}</span>
                    </div>
                    <span className="text-[#F5F5F5]/50 text-sm truncate">{lead.email}</span>
                    <span className="text-[#C6A96B] text-sm truncate">@{lead.instagram}</span>
                    <span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A96B]/10 text-[#C6A96B] capitalize">
                        {lead.type || 'n/a'}
                      </span>
                    </span>
                    <span className="text-[#F5F5F5]/35 text-xs flex items-center gap-1">
                      <Clock size={11} />
                      {new Date(lead.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => { setSelectedLead(lead); markRead(lead.id); refresh(); }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#F5F5F5]/30 hover:text-[#C6A96B] hover:bg-[#C6A96B]/8 transition-all"
                        title="View details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#F5F5F5]/25 hover:text-red-400/70 hover:bg-red-500/8 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Table footer */}
          {leads.length > 0 && (
            <div className="px-5 py-3.5 border-t border-[#C6A96B]/8 flex items-center justify-between gap-4">
              <span className="text-[#F5F5F5]/28 text-xs">
                {filtered.length} of {leads.length} lead{leads.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => exportCSV(leads)}
                  className="sm:hidden flex items-center gap-1.5 text-[#F5F5F5]/40 hover:text-[#C6A96B] text-xs transition-colors"
                >
                  <Download size={12} /> Export
                </button>
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1.5 text-red-400/40 hover:text-red-400/70 text-xs transition-colors"
                >
                  <Trash2 size={12} /> Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm clear dialog */}
      <AnimatePresence>
        {confirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setConfirmClear(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border !border-red-500/25 p-7 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={20} className="text-red-400" />
              </div>
              <h3 className="text-[#F5F5F5] font-black text-lg mb-2">Clear All Leads?</h3>
              <p className="text-[#F5F5F5]/45 text-sm mb-6">
                This will permanently delete all {leads.length} lead{leads.length !== 1 ? 's' : ''}. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmClear(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#C6A96B]/18 text-[#F5F5F5]/55 text-sm font-medium hover:border-[#C6A96B]/35 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-sm font-bold transition-colors"
                >
                  Delete All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead detail modal */}
      <AnimatePresence>
        {selectedLead && (
          <LeadModal
            lead={selectedLead}
            onClose={() => { setSelectedLead(null); refresh(); }}
            onDelete={() => handleDelete(selectedLead.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(isAuthenticated());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#0B0B0B] overflow-auto"
    >
      {/* Close button always visible */}
      <button
        onClick={() => { logout(); onClose(); }}
        className="fixed top-4 right-4 z-[110] w-8 h-8 rounded-lg glass flex items-center justify-center text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70 transition-colors"
        title="Close admin"
      >
        <X size={15} />
      </button>

      <AnimatePresence mode="wait">
        {!authed ? (
          <LoginScreen key="login" onSuccess={() => setAuthed(true)} />
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard onLogout={() => setAuthed(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
