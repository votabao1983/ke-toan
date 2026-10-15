/* Cấu hình Tailwind (Play CDN) + các class thành phần dùng chung.
 * Nạp NGAY SAU <script src="https://cdn.tailwindcss.com/3.4.16">.
 * Khi lên production sẽ build ra 1 file CSS tĩnh bằng Tailwind CLI (không dùng CDN). */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        brand: {
          50: '#eef4ff', 100: '#dbe7ff', 200: '#bed3ff', 300: '#91b5ff', 400: '#5d8cfd',
          500: '#3866f8', 600: '#2148ed', 700: '#1a37d5', 800: '#1c30ac', 900: '#1d2f87', 950: '#161e52'
        }
      }
    }
  }
};

(function () {
  var css = [
    '@layer base {',
    '  body { @apply bg-slate-50 text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200; }',
    '  input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }',
    '}',
    '@layer components {',
    '  .card { @apply rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900; }',
    '  .inp { @apply block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100; }',
    '  .btn { @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700; }',
    '  .btn-primary { @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-500/30 disabled:opacity-50; }',
    '  .btn-danger { @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/30; }',
    '  .btn-icon { @apply inline-grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white; }',
    '  .badge { @apply inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium; }',
    '  .tbl { @apply w-full text-left text-sm; }',
    '  .tbl thead th { @apply sticky top-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400; }',
    '  .tbl tbody td { @apply border-b border-slate-100 px-4 py-2.5 align-middle dark:border-slate-800; }',
    '  .tbl tbody tr { @apply transition hover:bg-brand-50/40 dark:hover:bg-slate-800/40; }',
    '  .tab { @apply whitespace-nowrap border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white; }',
    '  .tab-active { @apply border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300; }',
    '  .switch { @apply relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-slate-300 transition dark:bg-slate-600; }',
    '  .switch::after { content: ""; @apply absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition; }',
    '  .switch[aria-checked=true] { @apply bg-brand-600; }',
    '  .switch[aria-checked=true]::after { @apply translate-x-4; }',
    '  .kbd { @apply rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400; }',
    '}',
    '@layer utilities {',
    '  .scrollbar-thin { scrollbar-width: thin; }',
    '  .num { font-variant-numeric: tabular-nums; }',
    '  .toast-in { animation: toastIn .25s ease-out; }',
    '  .modal-in { animation: modalIn .2s ease-out; }',
    '  .submenu-in { animation: submenuIn .22s ease-out; }',
    '  @keyframes submenuIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }',
    '  @keyframes toastIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }',
    '  @keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }',
    '}'
  ].join('\n');
  var s = document.createElement('style');
  s.type = 'text/tailwindcss';
  s.textContent = css;
  document.head.appendChild(s);
})();
