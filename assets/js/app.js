/* =========================================================
   NHÀNH — app.js
   Header/Footer dùng chung · Giỏ hàng (localStorage) · UI
   ========================================================= */
(function () {
  'use strict';
  var D = window.NHANH;
  if (!D) { console.error('Thiếu data.js'); return; }

  /* ---------- Base path (root vs /pages/) ---------- */
  var inPages = /\/pages\//.test(location.pathname);
  var ROOT = inPages ? '../' : './';
  function url(p) { return ROOT + p; }
  function page(p) { return ROOT + (p === 'index.html' ? 'index.html' : 'pages/' + p); }
  function home() { return ROOT + 'index.html'; }
  function img(path) { return ROOT + path.split('/').map(encodeURIComponent).join('/'); }

  /* ---------- Helpers ---------- */
  function money(n) { return n.toLocaleString('vi-VN') + 'đ'; }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function qs(s, c) { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function byId(id) { return D.products.find(function (p) { return p.id === id; }); }
  function getParam(k) { return new URLSearchParams(location.search).get(k); }
  window.NH = { money: money, img: img, page: page, url: url, home: home, byId: byId, getParam: getParam, el: el, qs: qs, qsa: qsa };

  /* ---------- Icons ---------- */
  var I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 7h13l-1.2 10.5a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16z"/><path d="M9 15c2-3 5-5 8-6"/></svg>',
    rabbit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 13c-2 0-3.5-2-3.5-5S6 3 7 5s1 5 1 8z"/><path d="M13 13c2 0 3.5-2 3.5-5S14.5 3 13.5 5 12.5 10 13 13z"/><path d="M7 13h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H9a3 3 0 0 1 0-6"/><circle cx="16" cy="17" r="1"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l5 7h-3l4 6H7l4-6H8z"/><path d="M12 16v5"/></svg>',
    recycle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 7l2-3 3 5M17 9l1 4-5 1M11 19l-3-1-1-5"/><path d="M4 13l3-6M20 13l-3 6H9"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20s-7-4.3-9.5-9C1 8 2.5 4.5 6 4.5c2.2 0 3.4 1.4 4 2.5.6-1.1 1.8-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 15.7 12 20 12 20z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5"/><path d="M18 3v4h-4M6 21v-4h4"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11h16v9H4z"/><path d="M12 11v9M3 8h18v3H3zM12 8S9 3 6.5 4.5 9 8 12 8zM12 8s3-5 5.5-3.5S15 8 12 8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    seat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 18v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6M4 18h16M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12l9-9h6v6l-9 9z"/><circle cx="15" cy="9" r="1.4"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9V7c0-1 .3-1.5 1.6-1.5H18V2h-3c-3 0-4.5 1.6-4.5 4.4V9H8v3.5h2.5V22H14v-9.5h2.7L17 9z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.6 3.8 3.8 4v3c-1.4 0-2.7-.4-3.8-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.1A3 3 0 1 0 13 15V3h3z"/></svg>'
  };
  window.NH.icon = I;

  /* ===================== CART ===================== */
  var CART_BASE = 'nhanh_cart_v1';
  function currentEmail() { try { var u = JSON.parse(localStorage.getItem('nhanh_user')); return (u && u.email) ? u.email.toLowerCase() : null; } catch (e) { return null; } }
  function cartKey() { return CART_BASE + '__' + (currentEmail() || 'guest'); } // giỏ tách riêng theo tài khoản
  function readCart() { try { return JSON.parse(localStorage.getItem(cartKey())) || []; } catch (e) { return []; } }
  function writeCart(c) { localStorage.setItem(cartKey(), JSON.stringify(c)); updateCartUI(); }
  function clearCart() { localStorage.removeItem(cartKey()); updateCartUI(); }
  function cartCount() { return readCart().reduce(function (s, i) { return s + i.qty; }, 0); }
  function cartTotal() { return readCart().reduce(function (s, i) { return s + i.price * i.qty; }, 0); }

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  window.NH = window.NH || {}; // safety
  function addToCart(id, qty, variant, note) {
    var p = byId(id); if (!p) return;
    qty = qty || 1;
    var c = readCart();
    var key = id + '|' + (variant || '') + '|' + (note || '');
    var found = c.find(function (i) { return i.key === key; });
    if (found) { found.qty += qty; }
    else {
      c.push({ key: key, id: id, name: p.name, price: p.price, qty: qty, variant: variant || '', note: note || '', img: p.images[0] });
    }
    writeCart(c);
    toast(p.name + ' đã được thêm vào giỏ');
    openDrawer();
  }
  function setQty(key, qty) {
    var c = readCart();
    var it = c.find(function (i) { return i.key === key; });
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) c = c.filter(function (i) { return i.key !== key; });
    writeCart(c);
  }
  function removeItem(key) { writeCart(readCart().filter(function (i) { return i.key !== key; })); }
  window.NH.cart = { add: addToCart, read: readCart, setQty: setQty, remove: removeItem, total: cartTotal, count: cartCount, clear: clearCart, refreshUI: function () { updateCartUI(); } };

  /* ===================== ĐƠN HÀNG (lưu local) ===================== */
  var ORD_KEY = 'nhanh_orders_v1';
  var ORDER_STAGES = [
    { key: 'placed',    short: 'Đã đặt hàng', label: 'Đã đặt hàng',    desc: 'Đơn hàng đã được ghi nhận, đang chờ Nhành xác nhận.' },
    { key: 'confirmed', short: 'Đã xác nhận', label: 'Đã xác nhận',    desc: 'Nhành đã xác nhận đơn và bắt đầu chuẩn bị hàng.' },
    { key: 'packing',   short: 'Đóng gói',    label: 'Đang đóng gói',  desc: 'Sản phẩm đang được đóng gói cẩn thận, kèm thiệp (nếu có).' },
    { key: 'shipping',  short: 'Đang giao',   label: 'Đang giao hàng', desc: 'Đơn đã được bàn giao cho đơn vị vận chuyển và đang trên đường đến bạn.' },
    { key: 'delivered', short: 'Đã giao',     label: 'Giao thành công',desc: 'Đơn đã được giao đến bạn. Cảm ơn bạn đã tin chọn Nhành!' }
  ];
  var STAGE_AT = [0, 30 * 60000, 3 * 3600000, 8 * 3600000, 48 * 3600000];
  var CARRIERS = [
    { id: 'ghn',  name: 'Giao Hàng Nhanh',      short: 'GHN',  color: '#f26522', logo: '../public/logo/ghn.png',        trackUrl: 'https://donhang.ghn.vn/?order_code=' },
    { id: 'ghtk', name: 'Giao Hàng Tiết Kiệm',  short: 'GHTK', color: '#0068b3', logo: '../public/logo/ghtk.png',       trackUrl: 'https://i.ghtk.vn/' },
    { id: 'vtp',  name: 'Viettel Post',           short: 'VTP',  color: '#e30019', logo: '../public/logo/viettelpost.png',trackUrl: 'https://viettelpost.vn/tra-cuu-hanh-trinh-don/' },
    { id: 'jt',   name: 'J&T Express',            short: 'J&T',  color: '#e31837', logo: '../public/logo/jt.png',         trackUrl: 'https://jtexpress.vn/vi/trackyourparcel?type=0&billcode=' }
  ];
  function pickCarrier(seed) {
    return CARRIERS[seed % CARRIERS.length];
  }
  function genTrackCode(carrierShort, seed) {
    var n = String(100000000 + (seed % 900000000));
    return carrierShort.replace(/[^A-Z0-9]/g, '') + n;
  }
  function fmtDelivery(createdAt) {
    var d = new Date(createdAt + 3 * 86400000);
    var days = ['CN','T2','T3','T4','T5','T6','T7'];
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return days[d.getDay()] + ', ' + p(d.getDate()) + '/' + p(d.getMonth() + 1);
  }
  function readOrders() { try { return JSON.parse(localStorage.getItem(ORD_KEY)) || []; } catch (e) { return []; } }
  function writeOrders(a) { localStorage.setItem(ORD_KEY, JSON.stringify(a)); }
  function genCode() {
    var s = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = '';
    for (var i = 0; i < 6; i++) r += s.charAt(Math.floor(Math.random() * s.length));
    return 'NH-' + r;
  }
  function stageOf(o) {
    var e = Date.now() - (o.createdAt || 0), idx = 0;
    for (var i = 0; i < STAGE_AT.length; i++) { if (e >= STAGE_AT[i]) idx = i; }
    return idx;
  }
  function saveOrder(o) {
    var a = readOrders();
    o.code = o.code || genCode();
    o.createdAt = o.createdAt || Date.now();
    if (!o.carrierId) {
      var seed = parseInt(o.code.replace(/[^0-9]/g, '') || '0', 10) || (o.createdAt % 1000);
      var c = pickCarrier(seed);
      o.carrierId = c.id;
      o.trackCode = genTrackCode(c.short, seed);
    }
    a.unshift(o);
    writeOrders(a);
    return o;
  }
  function findOrders(q) {
    q = String(q || '').trim().toLowerCase();
    if (!q) return [];
    var qp = q.replace(/\s/g, '');
    return readOrders().filter(function (o) {
      return (o.code || '').toLowerCase() === q
        || (o.code || '').toLowerCase().indexOf(q) > -1
        || (o.email || '').toLowerCase() === q
        || ((o.phone || '').replace(/\s/g, '') === qp && qp.length >= 8);
    });
  }
  function seedDemoOrders() {
    if (localStorage.getItem(ORD_KEY) !== null) return;
    var now = Date.now();
    writeOrders([
      { code: 'NH-DALAT1', createdAt: now - 10 * 3600000, carrierId: 'ghn',  trackCode: 'GHN340912873', name: 'Khách trải nghiệm', email: 'demo@nhanh.vn', phone: '0901234567', address: 'Quận 1, TP. Hồ Chí Minh', method: 'COD',   items: [{ name: 'Body Mist Đà Lạt Sương Thông', qty: 1, price: 225000 }, { name: 'Bath Bomb Khởi Sương', qty: 2, price: 95000 }], total: 415000 },
      { code: 'NH-SEN888', createdAt: now - 4 * 86400000, carrierId: 'ghtk', trackCode: 'GHTK820741956', name: 'Khách trải nghiệm', email: 'demo@nhanh.vn', phone: '0907654321', address: 'Quận 3, TP. Hồ Chí Minh', method: 'VNPay', items: [{ name: 'Gift Set Một Góc Việt Nam', qty: 1, price: 699000 }], total: 699000 }
    ]);
  }
  function fmtDate(ms) { var d = new Date(ms); function p(n) { return (n < 10 ? '0' : '') + n; } return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear() + ' · ' + p(d.getHours()) + ':' + p(d.getMinutes()); }
  function trackerHTML(o) {
    var idx = stageOf(o);
    var pct = idx <= 0 ? 0 : (idx / (ORDER_STAGES.length - 1)) * 100;
    var steps = ORDER_STAGES.map(function (s, i) {
      var cls = i < idx ? 'done' : (i === idx ? 'current' : '');
      return '<div class="ot-step ' + cls + '"><span class="ot-dot">' + (i < idx ? '✓' : (i + 1)) + '</span><span class="ot-lbl">' + s.short + '</span></div>';
    }).join('');
    var items = (o.items || []).map(function (it) {
      return '<li><span>' + escapeHtml(it.name) + ' × ' + it.qty + '</span><span>' + money(it.price * it.qty) + '</span></li>';
    }).join('');
    var cur = ORDER_STAGES[idx] || ORDER_STAGES[0];
    // Carrier block — hiện ngay từ khi đặt hàng
    var carrierBlock = '';
    if (o.carrierId) {
      var c = CARRIERS.filter(function (x) { return x.id === o.carrierId; })[0] || CARRIERS[0];
      var logoHTML = '<img src="' + c.logo + '" alt="' + c.name + '" style="height:24px;object-fit:contain">';
      // Mã vận đơn + link chỉ hiện khi đang giao (idx>=3)
      var codeLine = idx >= 3
        ? 'Mã vận đơn: <b>' + escapeHtml(o.trackCode) + '</b> · <a href="' + c.trackUrl + escapeHtml(o.trackCode) + '" target="_blank" rel="noopener" class="ot-track-link">Theo dõi</a>'
        : idx >= 1
          ? 'Mã vận đơn: <b>' + escapeHtml(o.trackCode) + '</b>'
          : 'Đơn vị vận chuyển dự kiến';
      var eta = idx < 4
        ? '<span class="ot-eta">Dự kiến giao: <b>' + fmtDelivery(o.createdAt) + '</b></span>'
        : '<span class="ot-eta ot-eta-done">Đã giao thành công</span>';
      carrierBlock = '<div class="ot-carrier">' +
        '<div class="ot-carrier-left">' + logoHTML + '<div class="ot-carrier-info"><span class="ot-carrier-name">' + c.name + '</span><span class="ot-carrier-code">' + codeLine + '</span></div></div>' +
        eta +
      '</div>';
    }
    return '<div class="otrack">' +
      '<div class="ot-top"><div><span class="ot-code">' + escapeHtml(o.code) + '</span><div class="ot-date">Đặt lúc ' + fmtDate(o.createdAt) + '</div></div>' +
        '<span class="ot-badge">' + cur.label + '</span></div>' +
      '<div class="ot-steps" style="--p:' + pct + '%">' + steps + '</div>' +
      '<p class="ot-desc">' + cur.desc + '</p>' +
      carrierBlock +
      '<div class="ot-detail">' +
        '<div class="ot-info">' +
          '<div><b>Người nhận:</b> ' + escapeHtml(o.name || '—') + '</div>' +
          '<div><b>SĐT:</b> ' + escapeHtml(o.phone || '—') + '</div>' +
          '<div><b>Địa chỉ:</b> ' + escapeHtml(o.address || '—') + '</div>' +
          '<div><b>Thanh toán:</b> ' + escapeHtml(o.method || '—') + '</div>' +
          '<div><b>Vận chuyển:</b> ' + (o.carrierId ? (CARRIERS.filter(function(x){return x.id===o.carrierId;})[0]||{name:'—'}).name : '—') + '</div>' +
        '</div>' +
        '<ul class="ot-items">' + items + '<li class="ot-total"><span>Tổng cộng</span><span>' + money(o.total || 0) + '</span></li></ul>' +
      '</div>' +
    '</div>';
  }
  seedDemoOrders();
  window.NH.orders = { all: readOrders, save: saveOrder, find: findOrders, stages: ORDER_STAGES, stageOf: stageOf, trackerHTML: trackerHTML, carriers: CARRIERS };

  /* ===================== HEADER ===================== */
  function navHTML() {
    var cats = D.categories.map(function (c) {
      return '<a href="' + page('products.html') + '?cat=' + c.slug + '">' + c.name + '</a>';
    }).join('');
    return '' +
      '<li><a href="' + home() + '">Trang chủ</a></li>' +
      '<li><a href="' + page('products.html') + '">Sản phẩm <i class="caret"></i></a>' +
      '<div class="dropdown"><a href="' + page('products.html') + '">Tất cả sản phẩm</a>' + cats + '</div></li>' +
      '<li><a href="' + page('collections.html') + '">Bộ sưu tập <i class="caret"></i></a>' +
      '<div class="dropdown">' +
        '<a href="' + page('collections.html') + '">Tất cả bộ sưu tập</a>' +
        D.collections.map(function (c) { return '<a href="' + page('collections.html') + '?col=' + c.slug + '">' + c.name + '</a>'; }).join('') +
      '</div></li>' +
      '<li><a href="' + page('about.html') + '">Về chúng tôi <i class="caret"></i></a>' +
      '<div class="dropdown">' +
        '<a href="' + page('about.html') + '">Câu chuyện thương hiệu</a>' +
        '<a href="' + page('about.html') + '#values">Giá trị cốt lõi</a>' +
        '<a href="' + page('community.html') + '">Trách nhiệm cộng đồng</a>' +
      '</div></li>' +
      '<li><a href="' + page('gifts.html') + '">Quà tặng</a></li>' +
      '<li><a href="' + page('blog.html') + '">Bài viết <i class="caret"></i></a>' +
      '<div class="dropdown">' +
        '<a href="' + page('blog.html') + '">Blog</a>' +
        '<a href="' + page('workshop.html') + '">Workshop</a>' +
      '</div></li>' +
      '<li><a href="' + page('contact.html') + '">Liên hệ</a></li>' +
      '<li><a href="' + page('track-order.html') + '">Tra cứu đơn</a></li>';
  }

  function buildHeader() {
    var bar = el('<div class="announce">🌿 Miễn phí vận chuyển cho đơn từ <strong>399.000đ</strong> toàn quốc · Tặng thiệp viết tay cho mọi Gift Set</div>');
    var header = el(
      '<header class="site-header"><div class="header-inner">' +
        '<a class="brand-logo" href="' + home() + '">' +
          '<img src="' + img('public/logo/logo TMĐT.jpg') + '" alt="Nhành">' +
          '<span class="brand-text"><span class="wordmark">Nhành</span><span class="sub">Vietnam</span></span>' +
        '</a>' +
        '<nav class="primary-nav"><ul class="main-nav">' + navHTML() + '</ul></nav>' +
        '<div class="nav-right">' +
          '<button class="icon-btn" id="btnSearch" aria-label="Tìm kiếm">' + I.search + '</button>' +
          '<a class="icon-btn" href="' + page('account.html') + '" aria-label="Tài khoản">' + I.user + '</a>' +
          '<button class="icon-btn" id="btnCart" aria-label="Giỏ hàng">' + I.cart + '<span class="cart-count" id="cartCount">0</span></button>' +
          '<button class="icon-btn hamburger" id="btnMenu" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
        '</div>' +
      '</div></header>'
    );
    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(bar, header);

    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 12);
    });
    qs('#btnCart', header).addEventListener('click', openDrawer);
    qs('#btnSearch', header).addEventListener('click', openSearch);
    qs('#btnMenu', header).addEventListener('click', openMobileMenu);
  }

  /* ---------- Mobile menu ---------- */
  function openMobileMenu() {
    var existing = qs('#mobileMenu');
    if (existing) { existing.classList.add('show'); qs('#mmOverlay').classList.add('show'); return; }
    var ov = el('<div class="overlay" id="mmOverlay"></div>');
    var menu = el('<div class="drawer show" id="mobileMenu" style="left:0;right:auto;transform:translateX(0)"></div>');
    var links = D.categories.map(function (c) { return '<a href="' + page('products.html') + '?cat=' + c.slug + '">— ' + c.name + '</a>'; }).join('');
    menu.innerHTML =
      '<div class="drawer-head"><h3>Menu</h3><button class="drawer-close" id="mmClose">×</button></div>' +
      '<div class="drawer-items" style="padding:18px 24px;font-size:1.05rem;line-height:2.4">' +
        '<a href="' + home() + '">Trang chủ</a>' +
        '<a href="' + page('products.html') + '" style="font-weight:600">Sản phẩm</a>' + links +
        '<a href="' + page('collections.html') + '">Bộ sưu tập</a>' +
        '<a href="' + page('about.html') + '">Về chúng tôi</a>' +
        '<a href="' + page('community.html') + '">Trách nhiệm cộng đồng</a>' +
        '<a href="' + page('gifts.html') + '">Quà tặng</a>' +
        '<a href="' + page('blog.html') + '">Bài viết</a>' +
        '<a href="' + page('workshop.html') + '">Workshop</a>' +
        '<a href="' + page('contact.html') + '">Liên hệ</a>' +
        '<a href="' + page('track-order.html') + '">Tra cứu đơn hàng</a>' +
        '<a href="' + page('account.html') + '">Đăng nhập / Đăng ký</a>' +
      '</div>';
    document.body.appendChild(ov); document.body.appendChild(menu);
    menu.querySelectorAll('a').forEach(function (a) { a.style.display = 'block'; a.style.borderBottom = '1px solid var(--line-soft)'; });
    function close() { menu.classList.remove('show'); ov.classList.remove('show'); }
    qs('#mmClose').addEventListener('click', close);
    ov.addEventListener('click', close);
  }

  /* ---------- Search overlay ---------- */
  function openSearch() {
    var ov = qs('#searchOv');
    if (!ov) {
      ov = el('<div class="popup" id="searchOv"><div class="popup-card" style="grid-template-columns:1fr;max-width:680px"><div class="popup-body" style="padding:40px"><button class="popup-close" id="searchClose">×</button><h3>Tìm kiếm sản phẩm</h3><div class="field" style="margin-top:18px"><input type="text" id="searchInput" placeholder="Nhập tên sản phẩm hoặc mùi hương..." autocomplete="off"></div><div id="searchResults" style="max-height:340px;overflow:auto"></div></div></div></div>');
      document.body.appendChild(ov);
      qs('#searchClose').addEventListener('click', function () { ov.classList.remove('show'); });
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.classList.remove('show'); });
      qs('#searchInput').addEventListener('input', function (e) {
        var q = e.target.value.trim().toLowerCase();
        var box = qs('#searchResults');
        if (!q) { box.innerHTML = '<p class="muted" style="padding:16px 4px">Gợi ý: Body Mist, Sen Trắng, Bath Bomb, Gift Set...</p>'; return; }
        var res = D.products.filter(function (p) {
          return (p.name + ' ' + p.category + ' ' + (p.short || '')).toLowerCase().indexOf(q) > -1;
        }).slice(0, 6);
        box.innerHTML = res.length ? res.map(function (p) {
          return '<a href="' + page('product.html') + '?id=' + p.id + '" style="display:flex;gap:14px;align-items:center;padding:12px 6px;border-bottom:1px solid var(--line-soft)"><img src="' + img(p.images[0]) + '" style="width:50px;height:62px;object-fit:cover;border-radius:4px"><span><span style="font-family:var(--serif);font-size:1.1rem;color:var(--green-900);display:block">' + p.name + '</span><span style="font-size:.84rem;color:var(--gold-700)">' + money(p.price) + '</span></span></a>';
        }).join('') : '<p class="muted" style="padding:16px 4px">Không tìm thấy sản phẩm phù hợp.</p>';
      });
    }
    ov.classList.add('show');
    setTimeout(function () { qs('#searchInput').focus(); }, 100);
  }

  /* ===================== CART DRAWER ===================== */
  function buildDrawer() {
    var ov = el('<div class="overlay" id="cartOverlay"></div>');
    var drawer = el(
      '<aside class="drawer" id="cartDrawer">' +
        '<div class="drawer-head"><h3>Giỏ hàng</h3><button class="drawer-close" id="drawerClose">×</button></div>' +
        '<div class="drawer-items" id="drawerItems"></div>' +
        '<div class="drawer-foot" id="drawerFoot"></div>' +
      '</aside>'
    );
    document.body.appendChild(ov); document.body.appendChild(drawer);
    ov.addEventListener('click', closeDrawer);
    qs('#drawerClose').addEventListener('click', closeDrawer);
  }
  function openDrawer() { renderDrawer(); qs('#cartDrawer').classList.add('show'); qs('#cartOverlay').classList.add('show'); }
  function closeDrawer() { qs('#cartDrawer').classList.remove('show'); qs('#cartOverlay').classList.remove('show'); }
  window.NH.openDrawer = openDrawer;

  function renderDrawer() {
    var c = readCart();
    var box = qs('#drawerItems'); var foot = qs('#drawerFoot');
    if (!c.length) {
      box.innerHTML = '<div class="drawer-empty"><p style="font-family:var(--serif);font-size:1.4rem;color:var(--green-900);margin-bottom:8px">Giỏ hàng đang trống</p><p class="muted" style="margin-bottom:22px">Hãy để Nhành đồng hành cùng nghi thức chăm sóc của bạn.</p><a class="btn btn-primary" href="' + page('products.html') + '">Khám phá sản phẩm</a></div>';
      foot.innerHTML = ''; return;
    }
    box.innerHTML = c.map(function (i) {
      return '<div class="cart-line">' +
        '<img src="' + img(i.img) + '" alt="">' +
        '<div><div class="cl-name">' + i.name + '</div>' +
        (i.variant ? '<div class="cl-variant">' + escapeHtml(i.variant) + '</div>' : '') +
        (i.note ? '<div class="cl-note">' + escapeHtml(i.note) + '</div>' : '') +
        '<div class="cl-price">' + money(i.price) + '</div>' +
        '<div class="cl-qty"><button data-act="dec" data-key="' + i.key + '">−</button><span>' + i.qty + '</span><button data-act="inc" data-key="' + i.key + '">+</button></div></div>' +
        '<div style="text-align:right"><a class="cl-remove" data-act="rm" data-key="' + i.key + '">Xóa</a></div>' +
      '</div>';
    }).join('');
    var total = cartTotal();
    var FREE = 399000;
    var pct = Math.min(100, Math.round(total / FREE * 100));
    var remain = Math.max(0, FREE - total);
    foot.innerHTML =
      '<div class="ship-bar"><p>' + (remain > 0 ? 'Mua thêm <strong>' + money(remain) + '</strong> để được <strong>miễn phí vận chuyển</strong>!' : '🎉 Bạn được <strong>miễn phí vận chuyển</strong>!') + '</p><div class="track"><div class="fill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="drawer-total"><span class="t-label">Tạm tính</span><span class="t-val">' + money(total) + '</span></div>' +
      '<a class="btn btn-primary btn-block" href="' + page('cart.html') + '">Xem giỏ & Thanh toán</a>';

    box.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.dataset.key, act = b.dataset.act;
        var it = readCart().find(function (x) { return x.key === key; });
        if (act === 'inc') setQty(key, it.qty + 1);
        if (act === 'dec') setQty(key, it.qty - 1);
        if (act === 'rm') removeItem(key);
        renderDrawer();
      });
    });
  }

  function updateCartUI() {
    var n = cartCount();
    var badge = qs('#cartCount'); if (badge) badge.textContent = n;
    if (qs('#cartDrawer') && qs('#cartDrawer').classList.contains('show')) renderDrawer();
    document.dispatchEvent(new CustomEvent('cart:change'));
  }

  /* ===================== TOAST ===================== */
  var toastTimer;
  function toast(msg) {
    var t = qs('#toast');
    if (!t) { t = el('<div class="toast" id="toast"></div>'); document.body.appendChild(t); }
    t.innerHTML = I.check + '<span>' + msg + '</span>';
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  window.NH.toast = toast;

  /* ===================== FOOTER ===================== */
  function buildFooter() {
    var s = D.brand.social, b = D.brand;
    var footer = el(
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="footer-logo" href="' + home() + '"><img src="' + img('public/logo/logo TMĐT.jpg') + '" alt="Nhành"><span class="wordmark">Nhành</span></a>' +
            '<p>' + b.slogan + '. Nước hoa &amp; chăm sóc cơ thể thuần Việt — mỗi mùi hương là một mảnh ký ức.</p>' +
            '<ul class="footer-contact">' +
              '<li><span class="fc-ic">' + I.pin + '</span>' + b.address + '</li>' +
              '<li><span class="fc-ic">' + I.phone + '</span><a href="tel:' + b.hotline.replace(/\s/g, '') + '">' + b.hotline + '</a></li>' +
              '<li><span class="fc-ic">' + I.mail + '</span><a href="mailto:' + b.email + '">' + b.email + '</a></li>' +
            '</ul>' +
            '<div class="social-row">' +
              '<a href="' + s.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + I.fb + '</a>' +
              '<a href="' + s.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + '</a>' +
              '<a href="' + s.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">' + I.tt + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col"><h4>Sản phẩm</h4>' +
            D.categories.map(function (c) { return '<a href="' + page('products.html') + '?cat=' + c.slug + '">' + c.name + '</a>'; }).join('') +
            '<a href="' + page('collections.html') + '">Bộ sưu tập</a>' +
          '</div>' +
          '<div class="footer-col"><h4>Về Nhành</h4>' +
            '<a href="' + page('about.html') + '">Câu chuyện thương hiệu</a>' +
            '<a href="' + page('about.html') + '#values">Giá trị cốt lõi</a>' +
            '<a href="' + page('community.html') + '">Trách nhiệm cộng đồng</a>' +
            '<a href="' + page('blog.html') + '">Bài viết</a>' +
            '<a href="' + page('workshop.html') + '">Workshop</a>' +
          '</div>' +
          '<div class="footer-col"><h4>Hỗ trợ</h4>' +
            '<a href="' + page('track-order.html') + '">Tra cứu đơn hàng</a>' +
            '<a href="' + page('policy.html') + '?p=chinh-sach-giao-hang">Chính sách giao hàng</a>' +
            '<a href="' + page('policy.html') + '?p=chinh-sach-doi-tra">Chính sách đổi trả</a>' +
            '<a href="' + page('policy.html') + '?p=chinh-sach-bao-mat">Chính sách bảo mật</a>' +
            '<a href="' + page('policy.html') + '?p=chinh-sach-kiem-hang">Chính sách kiểm hàng</a>' +
            '<a href="' + page('policy.html') + '?p=dieu-khoan-dich-vu">Điều khoản dịch vụ</a>' +
            '<a href="' + page('faq.html') + '">Câu hỏi thường gặp</a>' +
            '<a href="' + page('contact.html') + '">Liên hệ</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 Nhành Vietnam. Thiết kế với 🌿 tại Việt Nam.</span>' +
          '<div class="footer-logos">' +
            '<div class="footer-logos-row">' +
              '<img src="' + img('public/logo/ghn.png') + '" alt="Giao Hàng Nhanh" title="Giao Hàng Nhanh">' +
              '<img src="' + img('public/logo/ghtk.png') + '" alt="GHTK" title="Giao Hàng Tiết Kiệm">' +
              '<img src="' + img('public/logo/viettelpost.png') + '" alt="Viettel Post" title="Viettel Post">' +
              '<img src="' + img('public/logo/jt.png') + '" alt="J&T Express" title="J&T Express">' +
            '</div>' +
            '<div class="footer-logos-sep"></div>' +
            '<div class="footer-logos-row">' +
              '<img src="' + img('public/logo/cod.jpg') + '" alt="COD" title="Thanh toán khi nhận hàng">' +
              '<img src="' + img('public/logo/momo.png') + '" alt="Momo" title="Ví Momo">' +
              '<img src="' + img('public/logo/vnpay.webp') + '" alt="VNPay" title="VNPay">' +
              '<img src="' + img('public/logo/visa.jpg') + '" alt="Visa" title="Thẻ Visa">' +
              '<img src="' + img('public/logo/zalopay.png') + '" alt="ZaloPay" title="ZaloPay">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div></footer>'
    );
    document.body.appendChild(footer);
  }

  /* ===================== NEWSLETTER POPUP ===================== */
  function maybePopup() {
    if (localStorage.getItem('nhanh_popup_seen')) return;
    setTimeout(function () {
      var pop = el(
        '<div class="popup" id="nlPopup"><div class="popup-card">' +
          '<div class="popup-media"><img src="' + img('public/products/BDM_BST1_Đà Lạt Sương Thông_2.jpg') + '" alt=""></div>' +
          '<div class="popup-body"><button class="popup-close" id="nlClose">×</button>' +
            '<span class="eyebrow">Chào mừng đến Nhành</span>' +
            '<h3>Giảm 10% cho đơn đầu tiên</h3>' +
            '<p>Đăng ký nhận tin để nhận ưu đãi và là người đầu tiên biết về bộ sưu tập mới, workshop và những câu chuyện mùi hương.</p>' +
            '<form class="nl-form" id="nlForm" style="flex-direction:column;gap:12px"><input type="email" required placeholder="Email của bạn" style="background:var(--cream-2);border-color:var(--line);color:var(--ink)"><button class="btn btn-gold btn-block" type="submit">Nhận ưu đãi</button></form>' +
            '<p class="muted" style="font-size:.76rem;margin-top:12px">Mã ưu đãi sẽ được gửi tới email của bạn.</p>' +
          '</div>' +
        '</div></div>'
      );
      document.body.appendChild(pop);
      requestAnimationFrame(function () { pop.classList.add('show'); });
      function close() { pop.classList.remove('show'); localStorage.setItem('nhanh_popup_seen', '1'); }
      qs('#nlClose').addEventListener('click', close);
      pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
      qs('#nlForm').addEventListener('submit', function (e) { e.preventDefault(); close(); toast('Cảm ơn bạn! Mã NHANH10 đã sẵn sàng.'); });
    }, 4000);
  }

  /* ===================== PRODUCT CARD ===================== */
  function famName(slug) { var f = D.families.find(function (x) { return x.slug === slug; }); return f ? f.name : ''; }
  function productCard(p) {
    var alt = p.images[1] || p.images[0];
    return '<article class="product-card reveal">' +
      '<a class="pc-media" href="' + page('product.html') + '?id=' + p.id + '">' +
        (p.badge && p.badge !== 'Sản phẩm phụ' ? '<span class="pc-badge">' + p.badge + '</span>' : '') +
        (p.family ? '<span class="pc-fam">' + famName(p.family) + '</span>' : '') +
        '<img class="main" src="' + img(p.images[0]) + '" alt="' + p.name + '" loading="lazy">' +
        '<img class="alt" src="' + img(alt) + '" alt="" loading="lazy">' +
      '</a>' +
      '<div class="pc-body">' +
        '<span class="pc-cat">' + p.category + '</span>' +
        '<a href="' + page('product.html') + '?id=' + p.id + '"><h3 class="pc-name">' + p.name.replace(p.category + ' ', '') + '</h3></a>' +
        '<p class="pc-short">' + (p.short || '') + '</p>' +
        '<div class="pc-foot"><span class="pc-price">' + money(p.price) + '</span>' +
        '<button class="pc-add" data-add="' + p.id + '" aria-label="Thêm vào giỏ">' + I.plus + '</button></div>' +
      '</div>' +
    '</article>';
  }
  function renderProducts(container, list) {
    container.innerHTML = list.map(productCard).join('');
    container.querySelectorAll('[data-add]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); addToCart(b.dataset.add, 1, ''); });
    });
    observeReveal(container);
  }
  window.NH.renderProducts = renderProducts;
  window.NH.productCard = productCard;
  window.NH.famName = famName;

  /* ===================== REVEAL ON SCROLL ===================== */
  var io;
  function observeReveal(scope) {
    if (!('IntersectionObserver' in window)) { qsa('.reveal', scope).forEach(function (e) { e.classList.add('in'); }); return; }
    if (!io) io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    qsa('.reveal', scope || document).forEach(function (e) { io.observe(e); });
    // Failsafe: nếu IO không kích hoạt (môi trường không cuộn / IO bị chặn),
    // vẫn hiện những phần tử đang nằm trong khung nhìn ban đầu sau 900ms.
    setTimeout(function () {
      qsa('.reveal:not(.in)', scope || document).forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) + 40) e.classList.add('in');
      });
    }, 900);
  }
  window.NH.observeReveal = observeReveal;

  /* ===================== SCROLL UI (back-to-top) ===================== */
  function buildScrollUI() {
    var top = el('<button class="to-top" id="toTop" aria-label="Lên đầu trang"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>');
    document.body.appendChild(top);
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var ticking = false;
    function upd() {
      ticking = false;
      var st = window.scrollY || document.documentElement.scrollTop || 0;
      top.classList.toggle('show', st > 420);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* ===================== NHÀNH BOT (chatbot offline) ===================== */
  function buildChatbot() {
    var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>';
    var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
    var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    var fab = el('<button class="chat-fab" id="chatFab" aria-label="Bé Mầm — trợ lý Nhành"><span class="chat-ping"></span><span class="cf-open">' + ICON_CHAT + '</span><span class="cf-close">' + ICON_X + '</span></button>');
    var panel = el(
      '<div class="chat-panel" id="chatPanel" role="dialog" aria-label="Bé Mầm">' +
        '<div class="chat-head"><span class="ch-ava">M</span>' +
          '<div class="ch-meta"><h4>Bé Mầm</h4><small><span class="dot"></span> Trợ lý mùi hương · luôn sẵn sàng</small></div>' +
          '<button class="ch-x" id="chatClose" aria-label="Đóng">×</button></div>' +
        '<div class="chat-body" id="chatBody"></div>' +
        '<form class="chat-input-row" id="chatForm"><input id="chatInput" placeholder="Nhắn cho Bé Mầm…" autocomplete="off"><button class="chat-send" type="submit" aria-label="Gửi">' + ICON_SEND + '</button></form>' +
      '</div>');
    document.body.appendChild(fab);
    document.body.appendChild(panel);
    var body = qs('#chatBody', panel), input = qs('#chatInput', panel);
    var opened = false;

    function scrollDown() { body.scrollTop = body.scrollHeight; }
    function deaccent(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
    function addBot(html) { body.appendChild(el('<div class="chat-msg bot">' + html + '</div>')); scrollDown(); }
    function addUser(t) { body.appendChild(el('<div class="chat-msg user">' + t.replace(/</g, '&lt;') + '</div>')); scrollDown(); }
    function addQuick(items) {
      var box = el('<div class="chat-quick"></div>');
      items.forEach(function (it) {
        var c = el('<button class="chat-chip">' + it.label + '</button>');
        c.addEventListener('click', function () { sendQuery(it.q, it.label); });
        box.appendChild(c);
      });
      body.appendChild(box); scrollDown();
    }
    function addProducts(list) {
      list.slice(0, 3).forEach(function (p) {
        var a = el('<a class="chat-prod" href="' + page('product.html') + '?id=' + p.id + '"><img src="' + img(p.images[0]) + '" alt=""><div><div class="cp-n">' + p.name.replace(p.category + ' ', '') + '</div><div class="cp-p">' + money(p.price) + '</div></div></a>');
        body.appendChild(a);
      });
      scrollDown();
    }
    function typing(cb) {
      var t = el('<div class="chat-typing"><span></span><span></span><span></span></div>');
      body.appendChild(t); scrollDown();
      setTimeout(function () { t.remove(); cb(); }, 600 + Math.random() * 400);
    }

    var GROQ_URL = '/api/groq';
    var GROQ_MODEL = 'llama-3.3-70b-versatile';
    var chatHistory = [];

    var FAM = [
      { k: ['ngot', 'ngot ngao', 'banh', 'kem', 'flan', 'duong'], slug: 'ngot', name: 'ngọt ngào' },
      { k: ['tuoi', 'tuoi mat', 'fresh', 'bien', 'cam', 'chanh', 'thanh mat'], slug: 'tuoi-mat', name: 'tươi mát' },
      { k: ['go', 'tram', 'dat', 'moc', 'khoi', 'rung'], slug: 'go-dat', name: 'gỗ – đất' },
      { k: ['am ap', 'vani', 'ca phe', 'cafe', 'mat ong', 'cacao'], slug: 'am', name: 'ấm áp' }
    ];
    var famByProducts = function (slug) { return D.products.filter(function (p) { return p.family === slug; }); };
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

    var FAM_CHIPS = [
      { label: '🌷 Ngọt ngào', q: 'gợi ý mùi ngọt ngào' }, { label: '🍃 Tươi mát', q: 'gợi ý mùi tươi mát' },
      { label: '🪵 Gỗ – Đất', q: 'gợi ý mùi gỗ đất' }, { label: '🔥 Ấm áp', q: 'gợi ý mùi ấm áp' }
    ];
    var MENU = [
      { label: '✨ Gợi ý sản phẩm', q: 'gợi ý sản phẩm phù hợp cho mình' },
      { label: '🌸 Tìm theo mùi hương', q: 'tôi muốn tìm sản phẩm theo mùi hương' },
      { label: '🎁 Quà tặng', q: 'tư vấn quà tặng' },
      { label: '🚚 Giao hàng & đổi trả', q: 'chính sách giao hàng và đổi trả' },
      { label: '🔎 Tra cứu đơn', q: 'tra cứu đơn hàng' }
    ];

    function buildSystemPrompt() {
      var prods = D.products.slice(0, 25).map(function (p) {
        return '- ' + p.name + ' | ' + p.category + ' | ' + money(p.price) + ' | mùi: ' + (p.family || '');
      }).join('\n');
      var workshops = (D.workshops || []).map(function (w) {
        return '- ' + w.title + ' | ' + w.date + ' ' + w.time + ' | ' + w.loc + ' | ' + w.price;
      }).join('\n');
      return 'Bạn là Bé Mầm — trợ lý ảo thân thiện của thương hiệu Nhành Vietnam, chuyên nước hoa & chăm sóc cơ thể thuần Việt. Xưng "Bé Mầm" hoặc "Nhành", gọi khách là "bạn".\n\n' +
        '## THƯƠNG HIỆU\n' +
        'Nhành Vietnam — nước hoa & chăm sóc cơ thể thuần Việt, thuần chay 100%, không thử nghiệm động vật, hương liệu đạt chuẩn IFRA.\n' +
        'Địa chỉ: Trường ĐH Kinh tế - Luật, Linh Xuân, TP. Thủ Đức, TP.HCM\n' +
        'Hotline: ' + D.brand.hotline + ' | Email: ' + D.brand.email + '\n\n' +
        '## SẢN PHẨM (tên | loại | giá | nhóm mùi)\n' + prods + '\n\n' +
        '## NHÓM HƯƠNG\n' +
        '- Ngọt ngào (ngot): vanilla, bánh, kem — nữ tính dễ chịu\n' +
        '- Tươi mát (tuoi-mat): cam, chanh, biển, cỏ — năng động sảng khoái\n' +
        '- Gỗ – Đất (go-dat): trầm, gỗ, khói — mạnh mẽ trầm lắng\n' +
        '- Ấm áp (am): cà phê, mật ong, vani nâu — ấm cúng quyến rũ\n\n' +
        '## BỘ SƯU TẬP\n' +
        '- Việt Nam trong Hương: 5 vùng đất (Đà Lạt, Tây Hồ, Đắk Lắk, Nha Trang)\n' +
        '- Hồi: ký ức tuổi thơ (kẹo bông, bánh flan, que kem dừa)\n\n' +
        '## GIFT SET\n' +
        '- Thanh Tân: 499.000đ\n- Một Góc Việt Nam: 699.000đ\n- Sương Hồng: 949.000đ\nKèm thiệp viết tay, đóng gói cao cấp.\n\n' +
        '## CHÍNH SÁCH\n' +
        '- Freeship: đơn ≥299k nội thành, ≥399k toàn quốc\n' +
        '- Giao hàng: 1–3 ngày nội thành, 3–6 ngày tỉnh thành\n' +
        '- Đổi trả: 7 ngày nếu lỗi nhà sản xuất / giao sai / hư hỏng\n' +
        '- Thanh toán: COD, Momo, VNPay, ZaloPay, Visa\n' +
        '- Voucher: NHANH10 giảm 10% đơn đầu tiên\n\n' +
        '## WORKSHOP\n' + workshops + '\n\n' +
        '## HƯỚNG DẪN SỬ DỤNG\n' +
        '- Body Mist: xịt cách da ~15cm vào mạch đập (cổ tay, cổ, sau tai)\n' +
        '- Mẹo giữ hương: thoa Body Lotion cùng mùi trước rồi xịt Body Mist\n' +
        '- Bath Bomb: thả vào bồn nước ấm, ngâm 15–20 phút\n' +
        '- Body Lotion: thoa khi da còn hơi ẩm sau tắm\n' +
        '- Scrub: massage nhẹ 2–3 lần/tuần lên da ướt, rửa sạch\n\n' +
        '## QUY TẮC\n' +
        '1. Trả lời tiếng Việt, thân thiện, ngắn gọn (tối đa 5 câu)\n' +
        '2. Chỉ tư vấn về Nhành, body care, mùi hương — từ chối lịch sự nếu hỏi ngoài phạm vi\n' +
        '3. Dùng 1–2 emoji nhẹ nhàng mỗi câu trả lời\n' +
        '4. Không bịa thông tin ngoài context trên\n' +
        '5. Tra cứu đơn → hướng dẫn vào trang /pages/track-order.html';
    }

    // Phát hiện sản phẩm cần hiện dựa vào câu hỏi
    function maybeShowProducts(q) {
      var s = ' ' + deaccent(q) + ' ';
      var fam = FAM.find(function (f) { return f.k.some(function (kw) { return s.indexOf(' ' + kw + ' ') > -1 || s.indexOf(kw) > -1; }); });
      if (fam) { addProducts(shuffle(famByProducts(fam.slug))); return; }
      if (s.indexOf('gift') > -1 || (s.indexOf('qua') > -1 && s.indexOf('tang') > -1)) { addProducts(D.products.filter(function (p) { return p.cat === 'gift-set'; })); return; }
      if (s.indexOf('body mist') > -1 || (s.indexOf('xit') > -1 && s.indexOf('thom') > -1)) { addProducts(shuffle(D.products.filter(function (p) { return p.cat === 'body-mist'; }))); return; }
      if (s.indexOf('bath') > -1 || s.indexOf('bom') > -1) { addProducts(shuffle(D.products.filter(function (p) { return p.cat === 'bath-bomb'; }))); return; }
      if (s.indexOf('lotion') > -1 || s.indexOf('duong the') > -1) { addProducts(shuffle(D.products.filter(function (p) { return p.cat === 'body-lotion'; }))); return; }
      if (s.indexOf('goi y') > -1 || s.indexOf('tu van') > -1 || s.indexOf('nen mua') > -1) { addProducts(shuffle(D.products).slice(0, 3)); }
    }

    function respond(q) {
      var typingEl = el('<div class="chat-typing"><span></span><span></span><span></span></div>');
      body.appendChild(typingEl); scrollDown();

      chatHistory.push({ role: 'user', content: q });
      var messages = [{ role: 'system', content: buildSystemPrompt() }].concat(chatHistory.slice(-12));

      fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: GROQ_MODEL, messages: messages, max_tokens: 450, temperature: 0.75 })
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        typingEl.remove();
        var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
        if (!reply) { addBot('Bé Mầm đang bận chút, bạn thử lại nhé 🥲'); return; }
        chatHistory.push({ role: 'assistant', content: reply });
        addBot(reply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'));
        maybeShowProducts(q);
      })
      .catch(function () {
        typingEl.remove();
        addBot('Kết nối gặp sự cố 🥲 Bạn thử lại hoặc liên hệ Nhành qua hotline <b>' + D.brand.hotline + '</b> nhé!');
      });
    }

    function sendQuery(q, display) {
      addUser(display || q);
      respond(q);
    }

    // lời chào ban đầu
    addBot('Chào bạn 🌿 Mình là <b>Bé Mầm</b>. Mình giúp bạn tìm mùi hương hợp gu, chọn quà, tra cứu đơn… Bạn cần gì nào?');
    addQuick(MENU);

    function toggle(open) {
      opened = open;
      panel.classList.toggle('open', open);
      fab.classList.toggle('open', open);
      if (open) { setTimeout(function () { input.focus(); scrollDown(); }, 120); }
    }
    fab.addEventListener('click', function () { toggle(!opened); });
    qs('#chatClose', panel).addEventListener('click', function () { toggle(false); });
    qs('#chatForm', panel).addEventListener('submit', function (e) {
      e.preventDefault(); var v = input.value.trim(); if (!v) return; input.value = ''; sendQuery(v);
    });
  }

  /* ===================== INIT ===================== */
  function init() {
    buildHeader();
    buildDrawer();
    buildFooter();
    buildScrollUI();
    buildChatbot();
    updateCartUI();
    observeReveal(document);
    maybePopup();
    document.dispatchEvent(new CustomEvent('nhanh:ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
