/* =========================================================================
 * Khung giao diện dùng chung cho mockup web Thuế – Kế toán (Hoa Yêu Thương)
 * - Menu trái dựng từ cấu trúc Rainmaker.xml (Kế toán + Quản trị)
 * - Thanh trên: chọn sổ kế toán, ngày khoá sổ, người dùng
 * - Tiện ích: toast, modal, định dạng số/ngày kiểu Việt Nam
 * Mỗi trang đặt <body data-page="..."> để đánh dấu mục menu đang mở.
 * ========================================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------------- Icons
  // Đường nét kiểu Lucide, stroke = currentColor
  var ICONS = {
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    bank: '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    refund: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>',
    wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    handover: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    invoice: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    menu: '<path d="M3 12h18M3 6h18M3 18h18"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronRight: '<path d="M9 18l6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pencil: '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
    trash: '<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zM15.5 7.5l3 3L22 7l-3-3"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    split: '<path d="M16 3h5v5M8 3H3v5M21 3l-7 7M3 3l7 7M12 22v-8"/>',
    layers: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    sync: '<path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    tree: '<path d="M3 3h6v6H3zM15 15h6v6h-6zM15 3h6v6h-6zM6 9v6a3 3 0 0 0 3 3h6M18 9v6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || 'h-5 w-5') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  // ---------------------------------------------------------------- Menu
  // Theo Rainmaker.xml: Commands "Kế toán" (Id 7) và "Quản trị" (Id 4).
  // page = trang mockup đã có; chưa có thì mở trang "đang phát triển".
  var MENU = [
    {
      caption: 'Kế toán', items: [
        { group: 'Tổng quan', items: [
          { id: 701, caption: 'Sổ quỹ', icon: 'cash', page: 'tong-quan', href: 'tong-quan.html' },
          { id: 702, caption: 'Phải thu khách hàng', icon: 'download', page: 'phai-thu', href: 'cong-no.html?loai=thu' },
          { id: 703, caption: 'Phải trả người bán', icon: 'upload', page: 'phai-tra', href: 'cong-no.html?loai=tra' }
        ]},
        { group: 'Sổ sách', items: [
          { id: 711, caption: 'Sổ nhật ký', icon: 'book', page: 'so-nhat-ky', href: 'so-nhat-ky.html' },
          { id: 721, caption: 'Cài đặt kế toán', icon: 'settings', page: 'cai-dat', href: 'cai-dat.html' }
        ]}
      ]
    },
    {
      caption: 'Quản trị', items: [
        { group: '', items: [
          { id: 411, caption: 'Người dùng', icon: 'users', page: 'nguoi-dung', href: 'nguoi-dung.html' },
          { id: 421, caption: 'Cấu hình', icon: 'sliders', page: 'cau-hinh', href: 'cau-hinh.html' }
        ]}
      ]
    }
  ];

  // Sổ kế toán (ACCBooks) — dữ liệu mẫu
  var BOOKS = [
    { id: 6, name: 'Sổ kế toán', year: 2026, lockDate: '2025-12-31T23:59', isDefault: false },
    { id: 5, name: 'Sổ kế toán', year: 2025, lockDate: '2025-06-30T23:59', isDefault: false },
    { id: 4, name: 'Sổ kế toán', year: 2024, lockDate: '2024-12-31T23:59', isDefault: false },
    { id: 1, name: 'Sổ kế toán', year: 2021, lockDate: '2024-12-31T23:59', isDefault: true }
  ];

  // Tài khoản sổ quỹ (con của 111 / 112) — dữ liệu mẫu theo màn hình sổ cũ.
  // [số hiệu, tên, loại tiền]
  var CASH = [
    ['1111001', 'Tiền mặt Văn phòng – VND'], ['1111002', 'Tiền mặt Shop F – VND'],
    ['1111003', 'Tiền mặt Shop 270L (Bán hàng) – VND'], ['1111005', 'Tiền mặt Shop 230 (Điều hành) – VND'],
    ['1111006', 'Tiền mặt Shop 230 (Bán hàng) – VND'], ['1111007', 'Tiền mặt Shop 270L (Điều hành) – VND'],
    ['1111008', 'Dalat.flowers'], ['1111009', 'Tiền mặt Hà Nội (Điều hành) – VND'],
    ['1111010', 'Tiền mặt Đà Lạt'], ['1111011', 'Tiền mặt Hà Nội (Bán hàng) – VND'],
    ['1111012', 'Tiền mặt shop 17D Nguyễn Thái Học – VND'], ['1111013', 'Tiền mặt Shop 270H'],
    ['1112000', 'Tiền mặt – USD', 'USD']
  ];
  var BANK = [
    ['1121001', 'Techcombank (CTy)'], ['1121002', 'Vietcombank (CTy)'], ['1121003', 'Á Châu (Anh Dương)'],
    ['1121004', 'BIDV (Anh Dương)'], ['1121005', 'Sacombank (Anh Dương)'], ['1121006', 'Vietcombank 007 (Anh Dương)'],
    ['1121007', 'Vietcombank 053 (Anh Dương)'], ['1121008', 'Vietcombank 072 (Anh Dương)'], ['1121009', 'Vietinbank 102 (Anh Dương)'],
    ['1121010', 'Techcombank 116 (Anh Dương)'], ['1121011', 'Timo VPBank (Anh Dương)'], ['1121012', 'Bảo Kim (Anh Dương)'],
    ['1121013', 'Paypal (Anh Dương)'], ['1121014', 'Agribank (Anh Dương)'], ['1121015', 'Techcombank 190 (Anh Dương)'],
    ['1121022', 'Vietcombank (CN Đà Lạt)'], ['1121023', 'BIDV (CTy)'], ['1121024', 'Vietinbank (CTy)'],
    ['1121025', 'Á Châu (CTy)'], ['1121026', 'TMCP Sài Gòn SCB (CTy)'], ['1121027', 'Dalat (Techcombank)'],
    ['1121028', 'MB'], ['1121029', 'Dalat (Sacombank)'], ['1121030', 'OCB – CT'],
    ['1121031', 'Sacombank – CN Trung Tâm'], ['1121032', 'Vietcombank – 7300201028'], ['1121033', 'HDBank – 004704070022589'],
    ['1121034', 'Shinhan'],
    ['1122001', 'Đô Mỹ gửi Paypal (Anh Dương)', 'USD'], ['1122002', 'Đồng Euro gửi Paypal (Anh Dương)', 'EUR'],
    ['1122003', 'Đô Úc gửi Paypal (Anh Dương)', 'AUD'], ['1122004', 'Đô Canada gửi Paypal (Anh Dương)', 'CAD'],
    ['1122005', 'Đô Sin gửi Paypal (Anh Dương)', 'SGD'], ['1122006', 'Vietcombank USD', 'USD'],
    ['1122007', 'OCB – USD', 'USD']
  ];

  // ---------------------------------------------------------------- Helpers
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) { return (n || 0).toLocaleString('vi-VN'); }
  function fmtDateTime(iso) {
    var d = new Date(iso);
    var p = function (x) { return (x < 10 ? '0' : '') + x; };
    return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  function currentBook() {
    var id = parseInt(store('tax.bookId'), 10);
    for (var i = 0; i < BOOKS.length; i++) if (BOOKS[i].id === id) return BOOKS[i];
    for (var j = 0; j < BOOKS.length; j++) if (BOOKS[j].isDefault) return BOOKS[j];
    return BOOKS[0];
  }

  // ---------------------------------------------------------------- Toast
  function toast(msg, type) {
    var host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      host.className = 'fixed bottom-4 right-4 z-[70] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm';
      document.body.appendChild(host);
    }
    var tone = type === 'error'
      ? 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200'
      : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
    var el = document.createElement('div');
    el.className = 'toast-in rounded-xl border px-4 py-3 text-sm shadow-lg ' + tone;
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; }, 2600);
    setTimeout(function () { el.remove(); }, 3000);
  }

  // ---------------------------------------------------------------- Modal
  // Mở <div data-modal="id"> có sẵn trong trang; đóng bằng [data-close], Esc hoặc bấm nền.
  function openModal(id) {
    var m = document.querySelector('[data-modal="' + id + '"]');
    if (!m) return;
    m.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    var f = m.querySelector('input,select,textarea');
    if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function closeModal(m) {
    if (typeof m === 'string') m = document.querySelector('[data-modal="' + m + '"]');
    if (!m) return;
    m.classList.add('hidden');
    if (!document.querySelector('[data-modal]:not(.hidden)')) document.body.classList.remove('overflow-hidden');
  }
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-open]');
    if (open) { e.preventDefault(); openModal(open.getAttribute('data-open')); return; }
    var close = e.target.closest('[data-close]');
    if (close) { closeModal(close.closest('[data-modal]')); return; }
    if (e.target.hasAttribute && e.target.hasAttribute('data-modal-backdrop')) closeModal(e.target.closest('[data-modal]'));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var list = document.querySelectorAll('[data-modal]:not(.hidden)');
      if (list.length) closeModal(list[list.length - 1]);
    }
  });

  // ---------------------------------------------------------------- Theme
  function applyTheme(t) {
    var root = document.documentElement;
    if (t === 'dark' || (t !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
    else root.classList.remove('dark');
  }
  applyTheme(store('tax.theme'));

  // ---------------------------------------------------------------- Shell
  function renderSidebar(activePage) {
    var html = '';
    MENU.forEach(function (section) {
      html += '<div class="mt-5 first:mt-0">' +
        '<div class="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">' + esc(section.caption) + '</div>';
      section.items.forEach(function (g) {
        html += '<div class="mt-2">' + (g.group ? '<div class="px-3 pb-1 pt-2 text-xs font-medium text-slate-500 dark:text-slate-400">' + esc(g.group) + '</div>' : '') + '<ul class="space-y-0.5">';
        g.items.forEach(function (it) {
          var active = it.page && it.page === activePage;
          var href = it.href || ('dang-phat-trien.html?m=' + encodeURIComponent(it.caption));
          html += '<li><a href="' + href + '" class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ' +
            (active
              ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white') + '">' +
            icon(it.icon, 'h-[18px] w-[18px] shrink-0 ' + (active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200')) +
            '<span class="truncate">' + esc(it.caption) + '</span>' +
            (it.page ? '' : '<span class="ml-auto rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:bg-slate-800 dark:text-slate-500">sau</span>') +
            '</a></li>';
        });
        html += '</ul></div>';
      });
      html += '</div>';
    });
    return html;
  }

  // Menu con thay thế menu chính (vd: Cài đặt kế toán).
  // Trang khai báo window.APP_SUBMENU = { title, icon, items: [{head} | {id, t, i}] } trước DOMContentLoaded;
  // mục con dùng hash (#id), trang gọi App.setSubActive(id) khi đổi mục.
  function backHref() {
    // Quay về trang trước nếu cùng ứng dụng, không thì về trang mặc định
    try {
      var r = document.referrer ? new URL(document.referrer) : null;
      var here = location.pathname;
      if (r && r.origin === location.origin && r.pathname !== here && /\.html$/.test(r.pathname)) return r.href;
    } catch (e) {}
    return 'tong-quan.html';
  }
  function renderSubmenu(sub) {
    var html =
      '<a href="' + backHref() + '" id="sb-back" class="group mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">' +
        '<span class="grid h-7 w-7 place-items-center rounded-lg border border-slate-200 bg-white transition group-hover:-translate-x-0.5 group-hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800">' + icon('arrowLeft', 'h-4 w-4') + '</span>' +
        'Quay lại menu chính</a>' +
      '<div class="mb-2 flex items-center gap-2.5 px-3">' +
        '<span class="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">' + icon(sub.icon || 'settings', 'h-4 w-4') + '</span>' +
        '<span class="text-sm font-bold text-slate-900 dark:text-white">' + esc(sub.title) + '</span></div>';
    var open = false;
    sub.items.forEach(function (s) {
      if (s.head) {
        if (open) html += '</ul>';
        html += '<div class="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">' + esc(s.head) + '</div><ul class="space-y-0.5">';
        open = true;
      } else {
        html += '<li><a href="#' + s.id + '" data-sub="' + s.id + '" class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">' +
          icon(s.i, 'h-[18px] w-[18px] shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200') +
          '<span class="truncate">' + esc(s.t) + '</span></a></li>';
      }
    });
    return html + (open ? '</ul>' : '');
  }
  function setSubActive(id) {
    document.querySelectorAll('#sidebar [data-sub]').forEach(function (a) {
      var on = a.getAttribute('data-sub') === id;
      a.classList.toggle('bg-brand-50', on);
      a.classList.toggle('font-semibold', on);
      a.classList.toggle('text-brand-700', on);
      a.classList.toggle('dark:bg-brand-500/15', on);
      a.classList.toggle('dark:text-brand-300', on);
      a.classList.toggle('text-slate-600', !on);
      var svg = a.querySelector('svg');
      svg.classList.toggle('text-brand-600', on);
      svg.classList.toggle('dark:text-brand-300', on);
      svg.classList.toggle('text-slate-400', !on);
    });
  }

  function renderBookOptions(book) {
    return BOOKS.map(function (b) {
      return '<button type="button" data-book="' + b.id + '" class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ' +
        (b.id === book.id ? 'font-semibold text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-200') + '">' +
        '<span>' + esc(b.name) + ' · ' + b.year + '</span>' +
        (b.isDefault ? '<span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">Mặc định</span>' : '') +
        '</button>';
    }).join('');
  }

  function mountShell() {
    var body = document.body;
    var page = body.getAttribute('data-page');
    var main = document.getElementById('page');
    if (!main) return;
    var book = currentBook();

    var shell = document.createElement('div');
    shell.className = 'min-h-screen lg:pl-64';
    shell.innerHTML =
      // Sidebar
      '<div id="sb-backdrop" class="fixed inset-0 z-40 hidden bg-slate-900/40 backdrop-blur-sm lg:hidden"></div>' +
      '<aside id="sidebar" class="fixed inset-y-0 left-0 z-50 flex w-64 -translate-x-full flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0">' +
        '<div class="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">' +
          '<div class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">' + icon('layers', 'h-5 w-5') + '</div>' +
          '<div class="min-w-0"><div class="truncate text-sm font-bold text-slate-900 dark:text-white">Kế toán</div>' +
          '<div class="truncate text-xs text-slate-500 dark:text-slate-400">Hoa Yêu Thương</div></div>' +
          '<button id="sb-close" class="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Đóng menu">' + icon('x', 'h-5 w-5') + '</button>' +
        '</div>' +
        '<nav class="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin' + (window.APP_SUBMENU ? ' submenu-in' : '') + '">' +
          (window.APP_SUBMENU ? renderSubmenu(window.APP_SUBMENU) : renderSidebar(page)) + '</nav>' +
        '<div class="border-t border-slate-200 p-3 text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">Bản thiết kế UI · v0.1</div>' +
      '</aside>' +
      // Topbar
      '<header class="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/85 sm:px-6">' +
        '<button id="sb-open" class="-ml-1 rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Mở menu">' + icon('menu', 'h-5 w-5') + '</button>' +
        // Book switcher
        '<div class="relative">' +
          '<button id="book-btn" class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">' +
            icon('book', 'h-4 w-4 text-brand-600 dark:text-brand-300') +
            '<span class="hidden text-slate-500 dark:text-slate-400 sm:inline">Sổ:</span>' +
            '<span class="font-semibold text-slate-800 dark:text-slate-100">' + book.year + '</span>' +
            icon('chevronDown', 'h-4 w-4 text-slate-400') +
          '</button>' +
          '<div id="book-menu" class="absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900">' +
            '<div class="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Chọn sổ kế toán</div>' +
            renderBookOptions(book) +
          '</div>' +
        '</div>' +
        '<div class="hidden items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 md:flex" title="Bút toán trước thời điểm này không được sửa">' +
          icon('lock', 'h-3.5 w-3.5') + 'Khoá sổ đến ' + fmtDateTime(book.lockDate) +
        '</div>' +
        '<div class="ml-auto flex items-center gap-1 sm:gap-2">' +
          '<button id="theme-btn" class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="Đổi giao diện sáng/tối">' +
            '<span class="dark:hidden">' + icon('moon', 'h-5 w-5') + '</span><span class="hidden dark:inline">' + icon('sun', 'h-5 w-5') + '</span>' +
          '</button>' +
          '<div class="relative">' +
            '<button id="user-btn" class="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800">' +
              '<span class="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">KT</span>' +
              '<span class="hidden text-left leading-tight sm:block"><span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">ketoan.lan</span>' +
              '<span class="block text-[11px] text-slate-500 dark:text-slate-400">Kế toán</span></span>' +
              icon('chevronDown', 'hidden h-4 w-4 text-slate-400 sm:block') +
            '</button>' +
            '<div id="user-menu" class="absolute right-0 top-full z-50 mt-2 hidden w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900">' +
              '<a href="#" data-open="modal-pwd" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">' + icon('key', 'h-4 w-4') + 'Đổi mật khẩu</a>' +
              '<a href="login.html" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10">' + icon('logout', 'h-4 w-4') + 'Đăng xuất</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</header>';

    var content = document.createElement('main');
    content.className = 'mx-auto max-w-[1400px] px-4 py-6 sm:px-6';
    content.appendChild(main);
    shell.appendChild(content);
    body.insertBefore(shell, body.firstChild);

    // Modal đổi mật khẩu dùng chung
    var pwd = document.createElement('div');
    pwd.innerHTML = modalHtml('modal-pwd', 'Đổi mật khẩu',
      field('Mật khẩu hiện tại', '<input type="password" class="inp" autocomplete="current-password">') +
      field('Mật khẩu mới', '<input type="password" class="inp" autocomplete="new-password">', 'Tối thiểu 8 ký tự') +
      field('Nhập lại mật khẩu mới', '<input type="password" class="inp" autocomplete="new-password">'),
      '<button class="btn" data-close>Huỷ</button><button class="btn-primary" data-close onclick="App.toast(\'Đã đổi mật khẩu\')">Lưu</button>');
    body.appendChild(pwd.firstChild);

    // Events
    var sb = document.getElementById('sidebar'), bd = document.getElementById('sb-backdrop');
    function sbToggle(open) {
      sb.classList.toggle('-translate-x-full', !open);
      bd.classList.toggle('hidden', !open);
    }
    document.getElementById('sb-open').onclick = function () { sbToggle(true); };
    document.getElementById('sb-close').onclick = function () { sbToggle(false); };
    bd.onclick = function () { sbToggle(false); };
    // Mobile: chọn mục menu con thì đóng drawer
    sb.addEventListener('click', function (e) { if (e.target.closest('[data-sub]')) sbToggle(false); });

    dropdown('book-btn', 'book-menu');
    dropdown('user-btn', 'user-menu');
    document.getElementById('book-menu').addEventListener('click', function (e) {
      var b = e.target.closest('[data-book]');
      if (!b) return;
      store('tax.bookId', b.getAttribute('data-book'));
      location.reload();
    });
    document.getElementById('theme-btn').onclick = function () {
      var dark = !document.documentElement.classList.contains('dark');
      store('tax.theme', dark ? 'dark' : 'light');
      applyTheme(dark ? 'dark' : 'light');
    };
  }

  function dropdown(btnId, menuId) {
    var btn = document.getElementById(btnId), menu = document.getElementById(menuId);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('#book-menu,#user-menu').forEach(function (m) { if (m !== menu) m.classList.add('hidden'); });
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
  }

  // ---------------------------------------------------------------- Builders
  function modalHtml(id, title, bodyHtml, footHtml, size) {
    return '<div data-modal="' + id + '" class="fixed inset-0 z-[60] hidden">' +
      '<div data-modal-backdrop class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>' +
      '<div class="pointer-events-none absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4">' +
        '<div class="modal-in pointer-events-auto flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl dark:bg-slate-900 sm:rounded-2xl ' + (size || 'sm:max-w-md') + '">' +
          '<div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">' +
            '<h3 class="text-base font-semibold text-slate-900 dark:text-white">' + esc(title) + '</h3>' +
            '<button data-close class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Đóng">' + icon('x', 'h-5 w-5') + '</button>' +
          '</div>' +
          '<div class="space-y-4 overflow-y-auto px-5 py-4">' + bodyHtml + '</div>' +
          '<div class="flex justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-800">' + footHtml + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  function field(label, control, hint) {
    return '<label class="block"><span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">' + esc(label) + '</span>' +
      control + (hint ? '<span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">' + esc(hint) + '</span>' : '') + '</label>';
  }

  // Lọc nhanh: input[data-filter="selector"] ẩn các phần tử không khớp (bỏ dấu tiếng Việt)
  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }
  document.addEventListener('input', function (e) {
    var sel = e.target.getAttribute && e.target.getAttribute('data-filter');
    if (!sel) return;
    var q = normalize(e.target.value.trim());
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.toggle('hidden', q && normalize(el.textContent).indexOf(q) < 0);
    });
    document.dispatchEvent(new CustomEvent('filtered', { detail: sel }));
  });

  // Render icon cho <i data-icon="name" class="..."></i>
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(function (el) {
      el.outerHTML = icon(el.getAttribute('data-icon'), el.getAttribute('class') || 'h-5 w-5');
    });
  }

  window.App = {
    icon: icon, esc: esc, money: money, fmtDateTime: fmtDateTime, toast: toast,
    openModal: openModal, closeModal: closeModal, modalHtml: modalHtml, field: field,
    currentBook: currentBook, books: BOOKS, cash: CASH, bank: BANK, setSubActive: setSubActive, store: store, normalize: normalize, hydrateIcons: hydrateIcons
  };

  document.addEventListener('DOMContentLoaded', function () {
    mountShell();
    hydrateIcons();
    document.body.classList.remove('opacity-0');
  });
})();
