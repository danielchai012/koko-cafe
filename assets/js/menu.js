/* 菜單頁：分類篩選 + 關鍵字搜尋 + 大圖檢視
   品項與分類名稱取自 KOKO Cafe Langkawi 的 Google 地圖菜單頁（2026-11-24 查詢）。 */
(function () {
  "use strict";

  var CATEGORIES = [
    { id: "special", label: "Special", zh: "指定日供應", note: "店長每日在 Instagram、Facebook 公告當天品項，並非每天都一樣。" },
    { id: "food", label: "FOOD", zh: "主餐", note: "馬來家常主餐的植物性版本。" },
    { id: "a-la-carte", label: "à la carte", zh: "單點", note: "" },
    { id: "hot-coffee", label: "Hot Coffee", zh: "熱咖啡", note: "使用 specialty 豆，可请加燕麥奶。" },
    { id: "iced-coffee", label: "Iced Coffee", zh: "冰咖啡", note: "" },
    { id: "non-coffee", label: "Non-Coffee", zh: "無咖啡熱飲", note: "" },
    { id: "ice-non-coffee", label: "Ice Non-Coffee", zh: "無咖啡冰飲", note: "" },
    { id: "refresher", label: "Refresher", zh: "清爽飲品", note: "" },
    { id: "frappe", label: "Frappe", zh: "冰沙", note: "" },
    { id: "kombucha", label: "Kombucha & Water Kefir", zh: "康普茶與 Water Kefir", note: "康普茶與 water kefir 系列。" },
    { id: "breakfast-brunch", label: "Breakfast / Brunch", zh: "早餐與早午餐", note: "店家公告早午餐菜單即將推出更多品項。" }
  ];

  var ITEMS = [
    /* Special */
    { name: "Nasi Lemak", zh: "椰漿飯", cat: "special", photo: "food-nasi-lemak", note: "店家過往公告的當日品項之一。" },
    { name: "Laksa Lemak", zh: "椰漿叻沙", cat: "special", photo: "food-laksa", note: "另有 Asam（羅望子）口味。" },
    { name: "House-made Vegan Burger", zh: "自家制純素漢堡", cat: "special", note: "來自公開資料的品項描述，沒有店內照片。" },

    /* FOOD */
    { name: "Nasi Lemak Mushroom Chop", zh: "椰漿飯配蕈菇扒", cat: "food", photo: "dish-nasi-lemak-mushroom-chop", note: "Google 地圖菜單頁的熱門品項。" },
    { name: "Kampung Fried Rice with Mushroom Chop", zh: "鄉村炒飯配蕈菇扒", cat: "food", photo: "dish-kampung-fried-rice", note: "" },
    { name: "Kolo Mee", zh: "哥羅面", cat: "food", photo: "dish-kolo-mee", note: "蘭卡威代表性拌面的素食版本。" },
    { name: "Vegetarian Wonton Noodles with Greens", zh: "素雲吞麵配青菜", cat: "food", photo: "dish-veg-wonton-noodles", note: "" },
    { name: "Vegetarian Noodle Soup with Egg", zh: "素湯麵（含蛋）", cat: "food", note: "顧客回饋指出，點餐系統會標示純素與含奶的差別。" },
    { name: "Rojak", zh: "羅惹", cat: "food", note: "顧客回饋中提到的配菜選項。" },
    { name: "Jawa Mee", zh: "爪哇面", cat: "food", note: "顧客回饋中提到的品項。" },

    /* Hot Coffee */
    { name: "Hot Rose Latte", zh: "熱玫瑰拿鐵", cat: "hot-coffee", photo: "drink-hot-rose-latte", note: "店內社群平台上最常被拍照的一杯。" },
    { name: "Spanish Latte", zh: "西班牙拿鐵", cat: "hot-coffee", note: "店家 Instagram 公告的新品。" },

    /* Non-Coffee */
    { name: "Hot Matcha Latte", zh: "熱抹茶拿鐵", cat: "non-coffee", photo: "drink-hot-matcha-latte", note: "可換燕麥奶。" },

    /* Frappe */
    { name: "Chocolate Frappe", zh: "巧克力冰沙", cat: "frappe", photo: "drink-chocolate-frappe", note: "" },

    /* Kombucha & Water Kefir */
    { name: "Water Kefir Shoots", zh: "Water Kefir 氣泡飲", cat: "kombucha", photo: "drink-water-kefir-shoots", note: "店內發酵飲品系列，口味依批次不同。" },

    /* Breakfast / Brunch */
    { name: "Set B", zh: "早午餐 B 套餐", cat: "breakfast-brunch", photo: "dish-set-b", note: "" },
    { name: "Croissant Sandwich", zh: "可頌三明治", cat: "breakfast-brunch", photo: "dish-croissant-sandwich", note: "" },
    { name: "咖椰吐司 Kaya Toast", zh: "傳統咖椰吐司", cat: "breakfast-brunch", photo: "dish-kaya-toast", note: "Google 地圖菜單頁標示的中文品項。" }
  ];

  var PHOTOS = {
    "food-nasi-lemak": { file: "food-nasi-lemak", w: 1050, h: 1050 },
    "food-laksa": { file: "food-laksa", w: 1280, h: 960 },
    "dish-nasi-lemak-mushroom-chop": { file: "dish-nasi-lemak-mushroom-chop", w: 1400, h: 1050 },
    "dish-kampung-fried-rice": { file: "dish-kampung-fried-rice", w: 1050, h: 1050 },
    "dish-kolo-mee": { file: "dish-kolo-mee", w: 1400, h: 788 },
    "dish-veg-wonton-noodles": { file: "dish-veg-wonton-noodles", w: 788, h: 1050 },
    "drink-hot-rose-latte": { file: "drink-hot-rose-latte", w: 1050, h: 1050 },
    "drink-hot-matcha-latte": { file: "drink-hot-matcha-latte", w: 1050, h: 1050 },
    "drink-chocolate-frappe": { file: "drink-chocolate-frappe", w: 1050, h: 1050 },
    "drink-water-kefir-shoots": { file: "drink-water-kefir-shoots", w: 1050, h: 1050 },
    "dish-set-b": { file: "dish-set-b", w: 900, h: 675 },
    "dish-croissant-sandwich": { file: "dish-croissant-sandwich", w: 1080, h: 810 },
    "dish-kaya-toast": { file: "dish-kaya-toast", w: 1400, h: 1050 }
  };

  var listRoot = document.getElementById("menu-list");
  var chipsRoot = document.getElementById("cat-rail");
  var searchInput = document.getElementById("menu-search");
  var clearSearch = document.getElementById("clear-search");
  var countOut = document.getElementById("result-count");
  var noResult = document.getElementById("no-result");

  if (!listRoot || !chipsRoot) return;

  var state = { cat: "all", q: "" };

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function matches(item) {
    if (state.cat !== "all" && item.cat !== state.cat) return false;
    if (!state.q) return true;
    var cat = CATEGORIES.filter(function (c) { return c.id === item.cat; })[0];
    var haystack = [item.name, item.zh, item.note, cat ? cat.label + " " + cat.zh : ""].join(" ").toLowerCase();
    return haystack.indexOf(state.q) !== -1;
  }

  function itemMarkup(item) {
    var photo = item.photo ? PHOTOS[item.photo] : null;
    var media = "";
    if (photo) {
      media = '<div class="item__media">' +
        '<button type="button" data-full="assets/photos/' + photo.file + '.jpg" ' +
        'data-alt="' + esc(item.name) + '" data-title="' + esc(item.name) + '" ' +
        'data-note="照片取自 KOKO Cafe Langkawi 的 Google 地圖菜單頁" aria-label="放大觀看 ' + esc(item.name) + ' 的照片">' +
        '<img class="od-media" src="assets/photos/' + photo.file + '.jpg" width="' + photo.w + '" height="' + photo.h + '" alt="' + esc(item.name) + '">' +
        "</button></div>";
    }
    var body = '<div class="item__body">' +
      '<h3 class="item__name">' + esc(item.name) + "</h3>" +
      (item.zh ? '<p class="item__zh">' + esc(item.zh) + "</p>" : "") +
      (item.note ? '<p class="item__note">' + esc(item.note) + "</p>" : "") +
      (photo ? "" : '<p class="no-photo"><svg class="od-icon" aria-hidden="true"><use href="#i-cup"></use></svg><span>無店內照片，品項與價格以菜單為準</span></p>') +
      "</div>";
    return '<article class="item' + (photo ? "" : " item--wide") + '">' + body + media + "</article>";
  }

  function emptyMarkup(cat) {
    return '<div class="empty-state">' +
      "<strong>" + esc(cat.label) + " 還沒有可引用的文字品項</strong>" +
      "<p>這個分類在 Google 地圖上只有品項照片，我們沒有查到可引用的文字品項與價格。請看下方「菜單實拍」，或到店時以紙本菜單為準。</p>" +
      '<p><a href="#menu-cards">看菜單實拍照片</a> · <a href="https://maps.app.goo.gl/8ypFsGQqxKsY5c7LA" rel="noopener">在 Google 地圖開菜單</a></p>' +
      "</div>";
  }

  function render() {
    var html = "";
    CATEGORIES.forEach(function (cat) {
      var items = ITEMS.filter(function (item) { return item.cat === cat.id && matches(item); });
      var known = ITEMS.some(function (item) { return item.cat === cat.id; });
      var browsingAll = state.cat === "all" && !state.q;
      var show = browsingAll || items.length > 0 || state.cat === cat.id;
      if (!show) return;

      html += '<section class="cat" id="' + cat.id + '" aria-labelledby="cat-' + cat.id + '-title">' +
        '<div class="cat__head">' +
        '<h2 id="cat-' + cat.id + '-title">' + esc(cat.label) +
        '<span class="cat__zh">' + esc(cat.zh) + "</span></h2>" +
        '<span class="cat__count">' + (items.length > 0 ? items.length + " 項" : "品項以菜單為準") + "</span>" +
        "</div>" +
        (cat.note ? '<p class="item__note">' + esc(cat.note) + "</p>" : "") +
        (items.length > 0
          ? '<div class="items">' + items.map(itemMarkup).join("") + "</div>"
          : (known ? "" : emptyMarkup(cat))) +
        "</section>";
    });

    var total = ITEMS.filter(matches).length;
    if (total === 0) {
      listRoot.innerHTML = "";
      noResult.hidden = false;
    } else {
      listRoot.innerHTML = html;
      noResult.hidden = true;
    }

    countOut.textContent = state.q || state.cat !== "all"
      ? "顯示 " + total + " / " + ITEMS.length + " 個品項"
      : "共 " + ITEMS.length + " 個已收錄品項 · 11 個分類";

    Array.prototype.forEach.call(chipsRoot.querySelectorAll(".cat-chip"), function (chip) {
      chip.setAttribute("aria-pressed", String(chip.getAttribute("data-cat") === state.cat));
    });
  }

  /* ---------- 事件：分類 chips（委托，不受重渲染影響） ---------- */
  chipsRoot.addEventListener("click", function (event) {
    var chip = event.target.closest(".cat-chip");
    if (!chip) return;
    state.cat = chip.getAttribute("data-cat");
    render();
    if (state.cat !== "all") {
      try { history.replaceState(null, "", "#" + state.cat); } catch (e) { /* 预览环境可能拒绝 URL 更新 */ }
    } else {
      try { history.replaceState(null, "", location.pathname); } catch (e) { /* 同上 */ }
    }
  });

  /* ---------- 事件：搜尋與清除 ---------- */
  searchInput.addEventListener("input", function () {
    state.q = searchInput.value.trim().toLowerCase();
    render();
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      state.q = searchInput.value.trim().toLowerCase();
      render();
    }
  });

  function resetFilters() {
    searchInput.value = "";
    state.q = "";
    state.cat = "all";
    render();
  }

  clearSearch.addEventListener("click", function () {
    resetFilters();
    searchInput.focus();
  });

  var retryClear = document.getElementById("retry-clear");
  if (retryClear) {
    retryClear.addEventListener("click", function () {
      resetFilters();
      searchInput.focus();
    });
  }

  /* ---------- 深連結：index.html 的招牌tiles 會带分類 hash 进來 ---------- */
  var initial = (location.hash || "").replace("#", "");
  if (initial && CATEGORIES.some(function (c) { return c.id === initial; })) {
    state.cat = initial;
  }

  render();

  if (initial && state.cat === initial) {
    var target = document.getElementById(initial);
    if (target) {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  }
})();
