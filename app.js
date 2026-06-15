const STORAGE_KEY = "linking-lunch-sustainability-demo";
const NAV_STORAGE_KEY = "linking-lunch-sustainability-nav-expanded";

const days = [
  { id: "mon", label: "週一", date: "10/06" },
  { id: "tue", label: "週二", date: "10/07" },
  { id: "wed", label: "週三", date: "10/08" },
  { id: "thu", label: "週四", date: "10/09" },
  { id: "fri", label: "週五", date: "10/10" }
];

const templates = [
  {
    id: "rice-chicken",
    name: "糙米雞丁餐",
    main: "竹北糙米飯",
    protein: "香菇雞丁",
    vegetable: "有機小松菜",
    soup: "蘿蔔味噌湯",
    fruit: "新埔柿子",
    supplier: "新竹縣農學合作社",
    carbon: 1.08,
    local: true,
    shortage: false,
    nutrition: { calories: 642, protein: 28, vegetable: 2.3, sodium: 720, fruit: 1 }
  },
  {
    id: "tofu-veg",
    name: "豆腐蔬食餐",
    main: "栗香地瓜飯",
    protein: "板豆腐燴菇",
    vegetable: "高麗菜炒紅蘿蔔",
    soup: "玉米海帶湯",
    fruit: "關西仙草凍",
    supplier: "山線青農供應組",
    carbon: 0.74,
    local: true,
    shortage: false,
    nutrition: { calories: 618, protein: 23, vegetable: 2.7, sodium: 650, fruit: 0.8 }
  },
  {
    id: "fish-rice",
    name: "白肉魚均衡餐",
    main: "白米糙米雙拼",
    protein: "檸檬蒸魚片",
    vegetable: "青江菜炒木耳",
    soup: "冬瓜薑絲湯",
    fruit: "苗栗巨峰葡萄",
    supplier: "北埔冷鏈共配站",
    carbon: 1.34,
    local: false,
    shortage: false,
    nutrition: { calories: 635, protein: 31, vegetable: 2.1, sodium: 780, fruit: 1 }
  },
  {
    id: "egg-curry",
    name: "蛋香咖哩餐",
    main: "薑黃米飯",
    protein: "茶葉蛋與咖哩豆",
    vegetable: "季節根莖蔬菜",
    soup: "番茄蔬菜湯",
    fruit: "湖口芭樂",
    supplier: "湖口友善農場",
    carbon: 0.92,
    local: true,
    shortage: true,
    nutrition: { calories: 668, protein: 24, vegetable: 2.4, sodium: 830, fruit: 1 }
  },
  {
    id: "milk-noodle",
    name: "鮮奶湯麵餐",
    main: "關西米粉湯",
    protein: "雞蛋豆包",
    vegetable: "菠菜與玉米",
    soup: "鮮奶南瓜湯",
    fruit: "當季香蕉",
    supplier: "竹東共好乳品",
    carbon: 1.16,
    local: true,
    shortage: false,
    nutrition: { calories: 626, protein: 26, vegetable: 2.2, sodium: 760, fruit: 1 }
  }
];

const suppliers = [
  {
    id: "farm-hsinchu",
    name: "新竹縣農學合作社",
    county: "新竹縣",
    category: "主食",
    distance: 11,
    capacity: 1800,
    score: 94,
    carbon: 0.18,
    price: "穩定",
    certification: "產銷履歷、友善耕作",
    shortage: false,
    note: "糙米、白米與根莖類供應穩定，可週配三次。"
  },
  {
    id: "green-mountain",
    name: "山線青農供應組",
    county: "新竹縣",
    category: "蔬菜",
    distance: 24,
    capacity: 920,
    score: 91,
    carbon: 0.22,
    price: "略低",
    certification: "有機轉型期",
    shortage: false,
    note: "葉菜與菇類品質佳，適合做低碳蔬食日。"
  },
  {
    id: "cold-chain",
    name: "北埔冷鏈共配站",
    county: "新竹縣",
    category: "蛋白質",
    distance: 18,
    capacity: 1200,
    score: 86,
    carbon: 0.31,
    price: "中等",
    certification: "HACCP 共配",
    shortage: false,
    note: "支援白肉魚、豆製品與冷藏蔬果混載配送。"
  },
  {
    id: "hukou-farm",
    name: "湖口友善農場",
    county: "新竹縣",
    category: "水果",
    distance: 15,
    capacity: 760,
    score: 82,
    carbon: 0.2,
    price: "穩定",
    certification: "友善農法",
    shortage: true,
    note: "芭樂本週採收延遲，建議以新埔柿子替代。"
  },
  {
    id: "taoyuan-dairy",
    name: "桃園鮮乳共同配送",
    county: "桃園市",
    category: "乳品",
    distance: 43,
    capacity: 2300,
    score: 84,
    carbon: 0.38,
    price: "中等",
    certification: "CAS 乳品",
    shortage: false,
    note: "鮮乳與優格可配合週三、週五點心。"
  },
  {
    id: "miaoli-fruit",
    name: "苗栗山城果物班",
    county: "苗栗縣",
    category: "水果",
    distance: 58,
    capacity: 1500,
    score: 79,
    carbon: 0.46,
    price: "浮動",
    certification: "產銷履歷",
    shortage: false,
    note: "葡萄、梨與柑橘量足，運距較高但批次完整。"
  }
];

const ingredientRecords = {
  rice: {
    name: "竹北糙米",
    batch: "BR-2025-4106",
    origin: "新竹縣竹北市",
    supplier: "新竹縣農學合作社",
    carbon: 0.42,
    baseline: 0.62,
    water: "中低",
    inspection: "農藥殘留未檢出",
    timeline: [
      ["09/28", "收割", "濕穀批次完成田間紀錄。"],
      ["10/01", "碾製", "低溫倉儲後小批量碾製。"],
      ["10/03", "檢驗", "產銷履歷與農藥檢驗上傳。"],
      ["10/06", "入校", "上午 08:10 抵達中央廚房。"]
    ]
  },
  greens: {
    name: "有機小松菜",
    batch: "VG-2025-4102",
    origin: "新竹縣橫山鄉",
    supplier: "山線青農供應組",
    carbon: 0.21,
    baseline: 0.39,
    water: "低",
    inspection: "有機轉型期批次合格",
    timeline: [
      ["10/05", "採收", "清晨採收並完成預冷。"],
      ["10/05", "分級", "去除黃葉，保留可食率 92%。"],
      ["10/06", "配送", "共配車 06:40 發車。"],
      ["10/06", "驗收", "溫度 7.2 度，重量足量。"]
    ]
  },
  tofu: {
    name: "板豆腐",
    batch: "PF-2025-4104",
    origin: "新竹縣北埔鄉",
    supplier: "北埔冷鏈共配站",
    carbon: 0.36,
    baseline: 0.52,
    water: "中",
    inspection: "大豆來源與冷鏈紀錄完整",
    timeline: [
      ["10/04", "製作", "非基改黃豆製作批次完成。"],
      ["10/04", "冷藏", "4 度冷藏入庫。"],
      ["10/06", "共配", "與蔬菜批次併車配送。"],
      ["10/06", "留樣", "午餐供應後完成留樣。"]
    ]
  },
  guava: {
    name: "湖口芭樂",
    batch: "FR-2025-4107",
    origin: "新竹縣湖口鄉",
    supplier: "湖口友善農場",
    carbon: 0.28,
    baseline: 0.33,
    water: "中",
    inspection: "採收延遲，替代建議已產生",
    timeline: [
      ["10/03", "巡園", "雨後甜度未達出貨標準。"],
      ["10/05", "採樣", "抽樣糖度偏低。"],
      ["10/06", "預警", "平台標記缺貨風險。"],
      ["10/07", "替代", "建議新埔柿子或苗栗葡萄。"]
    ]
  }
};

const substitutions = [
  {
    shortage: "湖口芭樂",
    replacement: "新埔柿子",
    supplier: "新竹縣農學合作社",
    reason: "同縣市供應，甜度穩定，碳排少 0.07 kgCO2e。",
    templateId: "rice-chicken"
  },
  {
    shortage: "季節根莖蔬菜",
    replacement: "南瓜與紅蘿蔔",
    supplier: "山線青農供應組",
    reason: "可共配，適合咖哩餐，維持蔬菜份量。",
    templateId: "tofu-veg"
  },
  {
    shortage: "鮮奶南瓜湯",
    replacement: "豆漿南瓜湯",
    supplier: "北埔冷鏈共配站",
    reason: "降低乳品配送壓力，蛋白質仍可達標。",
    templateId: "milk-noodle"
  }
];

const approvalSteps = ["菜單草案", "營養師檢核", "總務核准", "校長核定", "下單配送"];

const defaultRequests = [
  {
    id: "REQ-4106-A",
    title: "第 41 週在地蔬菜採購",
    amount: 48600,
    supplier: "山線青農供應組",
    status: "營養師檢核",
    stage: 1,
    note: "葉菜類 920 份，含有機小松菜與青江菜。"
  },
  {
    id: "REQ-4106-B",
    title: "主食米穀批次採購",
    amount: 39200,
    supplier: "新竹縣農學合作社",
    status: "總務核准",
    stage: 2,
    note: "糙米與白米雙批次，已附產銷履歷。"
  },
  {
    id: "REQ-4106-C",
    title: "水果缺貨替代採購",
    amount: 16800,
    supplier: "湖口友善農場",
    status: "待補件",
    stage: 1,
    note: "芭樂採收延遲，需確認替代水果數量。"
  }
];

const defaultFeedback = [
  { className: "二年仁班", score: 4, waste: 2, comment: "糙米飯接受度高，湯品偏鹹。" },
  { className: "四年信班", score: 5, waste: 1, comment: "雞丁份量剛好，水果很受歡迎。" },
  { className: "六年平班", score: 3, waste: 4, comment: "小松菜剩比較多，需要調整切段。" }
];

const defaultMenu = {
  mon: cloneTemplate("rice-chicken"),
  tue: cloneTemplate("tofu-veg"),
  wed: cloneTemplate("fish-rice"),
  thu: cloneTemplate("egg-curry"),
  fri: cloneTemplate("milk-noodle")
};

const state = {
  selectedView: "overview",
  selectedDay: "mon",
  selectedIngredient: "rice",
  selectedSupplier: "farm-hsinchu",
  menu: loadSavedMenu(),
  requests: loadSavedRequests(),
  feedback: loadSavedFeedback()
};

function cloneTemplate(templateId) {
  const template = templates.find((item) => item.id === templateId);
  return JSON.parse(JSON.stringify(template));
}

function loadSavedMenu() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved.menu || JSON.parse(JSON.stringify(defaultMenu));
  } catch {
    return JSON.parse(JSON.stringify(defaultMenu));
  }
}

function loadSavedRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved.requests || JSON.parse(JSON.stringify(defaultRequests));
  } catch {
    return JSON.parse(JSON.stringify(defaultRequests));
  }
}

function loadSavedFeedback() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return saved.feedback || JSON.parse(JSON.stringify(defaultFeedback));
  } catch {
    return JSON.parse(JSON.stringify(defaultFeedback));
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        menu: state.menu,
        requests: state.requests,
        feedback: state.feedback
      })
    );
  } catch {
    // Some file:// or privacy-mode contexts block storage; the demo remains usable in memory.
  }
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[match];
  });
}

function formatCurrency(value) {
  return `NT$${Number(value).toLocaleString("zh-TW")}`;
}

function getSelectedMenu() {
  return state.menu[state.selectedDay];
}

function calculateSummary() {
  const meals = Object.values(state.menu);
  const localMeals = meals.filter((meal) => meal.local).length;
  const carbonAverage = meals.reduce((sum, meal) => sum + meal.carbon, 0) / meals.length;
  const nutritionDays = meals.filter((meal) => isNutritionPassing(meal.nutrition)).length;
  const shortageCount = meals.filter((meal) => meal.shortage).length;
  return {
    localRate: Math.round((localMeals / meals.length) * 100),
    carbonAverage,
    nutritionDays,
    shortageCount
  };
}

function isNutritionPassing(nutrition) {
  return (
    nutrition.calories >= 600 &&
    nutrition.calories <= 700 &&
    nutrition.protein >= 22 &&
    nutrition.vegetable >= 2 &&
    nutrition.sodium <= 850 &&
    nutrition.fruit >= 0.8
  );
}

function renderSummary() {
  const summary = calculateSummary();
  $("#localRate").textContent = `${summary.localRate}%`;
  $("#carbonAverage").textContent = summary.carbonAverage.toFixed(2);
  $("#nutritionDays").textContent = `${summary.nutritionDays}/5`;
  $("#shortageCount").textContent = `${summary.shortageCount} 件`;
}

function renderFlow(targetSelector, large = false) {
  const maxStage = Math.max(...state.requests.map((request) => request.stage));
  const markup = approvalSteps
    .map((step, index) => {
      const statusClass = index < maxStage ? "done" : index === maxStage ? "current" : "";
      const label = index < maxStage ? "完成" : index === maxStage ? "進行中" : "待處理";
      return `
        <div class="flow-step ${statusClass}">
          <span>${index + 1}</span>
          <div>
            <strong>${escapeHtml(step)}</strong>
            <small>${large ? escapeHtml(label) : escapeHtml(label)}</small>
          </div>
        </div>
      `;
    })
    .join("");
  $(targetSelector).innerHTML = markup;
}

function renderTodayCard() {
  const day = days.find((item) => item.id === state.selectedDay);
  const meal = getSelectedMenu();
  $("#todayCard").innerHTML = `
    <dl>
      <dt>日期</dt><dd>${escapeHtml(day.label)} ${escapeHtml(day.date)}</dd>
      <dt>主餐</dt><dd>${escapeHtml(meal.name)}</dd>
      <dt>供應商</dt><dd>${escapeHtml(meal.supplier)}</dd>
      <dt>碳足跡</dt><dd>${meal.carbon.toFixed(2)} kgCO2e / 餐</dd>
      <dt>狀態</dt><dd>${meal.shortage ? "有缺貨風險" : "可供餐"}</dd>
    </dl>
  `;
}

function renderActions() {
  const shortageMeals = days.filter((day) => state.menu[day.id].shortage);
  const pendingRequests = state.requests.filter((request) => request.status !== "已核准");
  const actions = [
    ...shortageMeals.map((day) => ({
      title: `${day.label} 缺貨替代`,
      detail: `${state.menu[day.id].name} 需要確認替代食材。`,
      tag: "缺貨",
      warn: true
    })),
    ...pendingRequests.slice(0, 2).map((request) => ({
      title: request.status,
      detail: `${request.title} ${formatCurrency(request.amount)}`,
      tag: "簽核",
      warn: false
    }))
  ];
  $("#actionList").innerHTML = actions
    .map(
      (action) => `
        <div class="action-item">
          <div>
            <strong>${escapeHtml(action.title)}</strong>
            <p>${escapeHtml(action.detail)}</p>
          </div>
          <span class="tag ${action.warn ? "warn" : "gold"}">${escapeHtml(action.tag)}</span>
        </div>
      `
    )
    .join("");
}

function renderWeekBoard() {
  $("#weekBoard").innerHTML = days
    .map((day) => {
      const meal = state.menu[day.id];
      return `
        <article class="day-card ${day.id === state.selectedDay ? "active" : ""}">
          <header>
            <h3>${escapeHtml(day.label)} ${escapeHtml(day.date)}</h3>
            <span class="tag ${meal.shortage ? "warn" : ""}">${meal.shortage ? "缺貨" : "穩定"}</span>
          </header>
          <strong>${escapeHtml(meal.name)}</strong>
          <ul class="menu-list">
            <li><span>主食</span><strong>${escapeHtml(meal.main)}</strong></li>
            <li><span>蛋白質</span><strong>${escapeHtml(meal.protein)}</strong></li>
            <li><span>蔬菜</span><strong>${escapeHtml(meal.vegetable)}</strong></li>
            <li><span>湯品</span><strong>${escapeHtml(meal.soup)}</strong></li>
            <li><span>水果</span><strong>${escapeHtml(meal.fruit)}</strong></li>
          </ul>
          <button class="tiny-button" type="button" data-select-day="${day.id}">
            <span aria-hidden="true">◎</span>
            <span>編輯</span>
          </button>
        </article>
      `;
    })
    .join("");
}

function renderMenuEditor() {
  const daySelect = $("#daySelect");
  const nutritionDaySelect = $("#nutritionDaySelect");
  const templateSelect = $("#templateSelect");
  daySelect.innerHTML = days.map((day) => `<option value="${day.id}">${day.label} ${day.date}</option>`).join("");
  nutritionDaySelect.innerHTML = daySelect.innerHTML;
  templateSelect.innerHTML = templates.map((template) => `<option value="${template.id}">${template.name}</option>`).join("");
  daySelect.value = state.selectedDay;
  nutritionDaySelect.value = state.selectedDay;
  templateSelect.value = getSelectedMenu().id;

  const meal = getSelectedMenu();
  $("#menuEditor").innerHTML = `
    <dl>
      <dt>供應商</dt><dd>${escapeHtml(meal.supplier)}</dd>
      <dt>碳足跡</dt><dd>${meal.carbon.toFixed(2)} kgCO2e / 餐</dd>
      <dt>熱量</dt><dd>${meal.nutrition.calories} kcal</dd>
      <dt>蛋白質</dt><dd>${meal.nutrition.protein} g</dd>
      <dt>蔬菜量</dt><dd>${meal.nutrition.vegetable} 份</dd>
      <dt>鈉含量</dt><dd>${meal.nutrition.sodium} mg</dd>
    </dl>
  `;
}

function renderSubstitutions() {
  $("#substitutionBoard").innerHTML = substitutions
    .map(
      (item, index) => `
        <article class="substitution-item">
          <span class="tag warn">替代建議 ${index + 1}</span>
          <div>
            <strong>${escapeHtml(item.shortage)} → ${escapeHtml(item.replacement)}</strong>
            <p>${escapeHtml(item.reason)}</p>
            <p>建議供應：${escapeHtml(item.supplier)}</p>
          </div>
          <button class="tiny-button" type="button" data-apply-substitution="${escapeHtml(item.templateId)}">
            <span aria-hidden="true">↔</span>
            <span>套用至選取日</span>
          </button>
        </article>
      `
    )
    .join("");
}

function renderSuppliers() {
  const category = $("#categoryFilter").value;
  const county = $("#countyFilter").value;
  const filtered = suppliers
    .filter((supplier) => category === "all" || supplier.category === category)
    .filter((supplier) => county === "all" || supplier.county === county)
    .sort((a, b) => b.score - a.score);

  if (!filtered.some((supplier) => supplier.id === state.selectedSupplier)) {
    state.selectedSupplier = filtered[0]?.id || suppliers[0].id;
  }

  $("#supplierList").innerHTML = filtered
    .map(
      (supplier) => `
        <article class="supplier-row ${supplier.id === state.selectedSupplier ? "active" : ""}" role="button" tabindex="0" data-supplier-id="${supplier.id}">
          <div>
            <h3>${escapeHtml(supplier.name)}</h3>
            <p>${escapeHtml(supplier.note)}</p>
            <div class="supplier-meta">
              <span class="tag">${escapeHtml(supplier.county)}</span>
              <span class="tag">${escapeHtml(supplier.category)}</span>
              <span class="tag ${supplier.shortage ? "warn" : ""}">${supplier.shortage ? "缺貨風險" : "供應穩定"}</span>
            </div>
          </div>
          <span class="supplier-score">${supplier.score}</span>
        </article>
      `
    )
    .join("");

  renderSupplierDetail();
  drawSupplyMap();
}

function renderSupplierDetail() {
  const supplier = suppliers.find((item) => item.id === state.selectedSupplier) || suppliers[0];
  $("#selectedSupplierLabel").textContent = supplier.name;
  $("#supplierDetail").innerHTML = `
    <h3>${escapeHtml(supplier.name)}</h3>
    <dl>
      <dt>縣市</dt><dd>${escapeHtml(supplier.county)}</dd>
      <dt>類別</dt><dd>${escapeHtml(supplier.category)}</dd>
      <dt>距離</dt><dd>${supplier.distance} km</dd>
      <dt>可供份數</dt><dd>${supplier.capacity.toLocaleString("zh-TW")} 份 / 週</dd>
      <dt>履約分數</dt><dd>${supplier.score} / 100</dd>
      <dt>配送碳排</dt><dd>${supplier.carbon.toFixed(2)} kgCO2e / kg</dd>
      <dt>價格</dt><dd>${escapeHtml(supplier.price)}</dd>
      <dt>驗證</dt><dd>${escapeHtml(supplier.certification)}</dd>
    </dl>
    <div class="request-actions">
      <button class="primary-button" type="button" id="createRequestButton">
        <span aria-hidden="true">＋</span>
        <span>加入採購草案</span>
      </button>
    </div>
  `;
}

function renderTrace() {
  const select = $("#ingredientSelect");
  select.innerHTML = Object.entries(ingredientRecords)
    .map(([id, item]) => `<option value="${id}">${item.name}</option>`)
    .join("");
  select.value = state.selectedIngredient;

  const record = ingredientRecords[state.selectedIngredient];
  $("#traceSummary").innerHTML = `
    <div class="trace-summary-title">
      <span class="tag">${escapeHtml(record.batch)}</span>
      <strong>${escapeHtml(record.name)}</strong>
    </div>
    <dl class="trace-facts">
      <dt>產地</dt><dd>${escapeHtml(record.origin)}</dd>
      <dt>供應商</dt><dd>${escapeHtml(record.supplier)}</dd>
      <dt>碳足跡</dt><dd>${record.carbon.toFixed(2)} kgCO2e / kg</dd>
      <dt>水資源</dt><dd>${escapeHtml(record.water)}</dd>
      <dt>檢驗</dt><dd>${escapeHtml(record.inspection)}</dd>
    </dl>
  `;
  $("#traceTimeline").innerHTML = record.timeline
    .map(
      ([date, title, detail]) => `
        <article class="trace-node">
          <time>${escapeHtml(date)}</time>
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(detail)}</p>
          </div>
        </article>
      `
    )
    .join("");
  const max = Math.max(record.baseline, record.carbon);
  $("#carbonBars").innerHTML = `
    ${renderBar("本批次", record.carbon, max, "teal")}
    ${renderBar("一般採購基準", record.baseline, max, "rust")}
    ${renderBar("校方目標", 0.32, max, "gold")}
  `;
}

function renderBar(label, value, max, tone) {
  const width = Math.min(100, Math.round((value / max) * 100));
  const className = tone === "rust" ? "rust" : tone === "gold" ? "gold" : "";
  return `
    <div class="bar-row">
      <header><span>${escapeHtml(label)}</span><span>${value.toFixed(2)} kgCO2e</span></header>
      <div class="bar-track"><div class="bar-fill ${className}" style="--value: ${width}%"></div></div>
    </div>
  `;
}

function renderNutrition() {
  const meal = getSelectedMenu();
  const targets = [
    ["熱量", meal.nutrition.calories, 650, "kcal", 600, 700],
    ["蛋白質", meal.nutrition.protein, 26, "g", 22, 34],
    ["蔬菜量", meal.nutrition.vegetable, 2.4, "份", 2, 3],
    ["鈉含量", meal.nutrition.sodium, 800, "mg", 0, 850],
    ["水果", meal.nutrition.fruit, 1, "份", 0.8, 1.2]
  ];
  $("#nutritionBars").innerHTML = `
    <h3>${escapeHtml(meal.name)}</h3>
    <div class="nutrition-bars">
      ${targets
        .map(([label, value, target, unit, min, max]) => {
          const percent = Math.min(100, Math.round((value / max) * 100));
          const pass = label === "鈉含量" ? value <= max : value >= min && value <= max;
          return `
            <div class="nutrition-row">
              <header><span>${escapeHtml(label)}</span><span>${value}${escapeHtml(unit)}</span></header>
              <div class="bar-track">
                <div class="bar-fill ${pass ? "" : "rust"}" style="--value: ${percent}%"></div>
              </div>
              <small>目標 ${target}${escapeHtml(unit)}，${pass ? "達標" : "需調整"}</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
  $("#nutritionDetail").innerHTML = `
    <h3>檢核摘要</h3>
    <dl class="nutrition-detail-list">
      <dt>主食</dt><dd>${escapeHtml(meal.main)}</dd>
      <dt>蛋白質</dt><dd>${escapeHtml(meal.protein)}</dd>
      <dt>蔬菜</dt><dd>${escapeHtml(meal.vegetable)}</dd>
      <dt>湯品</dt><dd>${escapeHtml(meal.soup)}</dd>
      <dt>水果</dt><dd>${escapeHtml(meal.fruit)}</dd>
      <dt>結果</dt><dd>${isNutritionPassing(meal.nutrition) ? "可送審" : "需營養師調整"}</dd>
    </dl>
  `;
}

function renderFeedback() {
  const total = state.feedback.length || 1;
  const scoreAverage = state.feedback.reduce((sum, item) => sum + item.score, 0) / total;
  const wasteAverage = state.feedback.reduce((sum, item) => sum + item.waste, 0) / total;
  $("#feedbackSummary").innerHTML = `
    <h3>回饋摘要</h3>
    <dl class="nutrition-detail-list">
      <dt>平均滿意度</dt><dd>${scoreAverage.toFixed(1)} / 5</dd>
      <dt>平均剩食</dt><dd>${wasteAverage.toFixed(1)} 桶</dd>
      <dt>回報班級</dt><dd>${state.feedback.length} 班</dd>
      <dt>優先處理</dt><dd>${wasteAverage >= 3 ? "調整蔬菜切法" : "維持供餐節奏"}</dd>
    </dl>
  `;
  $("#feedbackList").innerHTML = state.feedback
    .slice()
    .reverse()
    .map(
      (item) => `
        <article class="feedback-item">
          <header>
            <strong>${escapeHtml(item.className)}</strong>
            <span class="feedback-score">${"★".repeat(item.score)}${"☆".repeat(5 - item.score)}</span>
          </header>
          <p>剩食 ${item.waste} 桶｜${escapeHtml(item.comment)}</p>
        </article>
      `
    )
    .join("");
}

function renderRequests() {
  $("#requestList").innerHTML = state.requests
    .map(
      (request) => `
        <article class="request-item">
          <div>
            <h3>${escapeHtml(request.title)}</h3>
            <p>${escapeHtml(request.note)}</p>
            <div class="request-meta">
              <span class="tag">${escapeHtml(request.id)}</span>
              <span class="tag">${escapeHtml(request.supplier)}</span>
              <span class="tag gold">${formatCurrency(request.amount)}</span>
              <span class="tag ${request.status === "待補件" ? "warn" : ""}">${escapeHtml(request.status)}</span>
            </div>
          </div>
          <div class="request-actions">
            <button class="tiny-button" type="button" data-approve-request="${escapeHtml(request.id)}">
              <span aria-hidden="true">✓</span>
              <span>核准下一關</span>
            </button>
            <button class="tiny-button" type="button" data-hold-request="${escapeHtml(request.id)}">
              <span aria-hidden="true">!</span>
              <span>標記補件</span>
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function drawSupplyMap() {
  const canvas = $("#supplyCanvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const selected = suppliers.find((supplier) => supplier.id === state.selectedSupplier) || suppliers[0];
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#f8faf5";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#d8dfd8";
  context.lineWidth = 1;
  for (let x = 40; x < width; x += 72) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 36; y < height; y += 72) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  const school = { x: 360, y: 182 };
  const points = suppliers.map((supplier, index) => {
    const angle = (Math.PI * 2 * index) / suppliers.length - Math.PI / 7;
    const radius = 82 + supplier.distance * 2.1;
    return {
      supplier,
      x: school.x + Math.cos(angle) * radius,
      y: school.y + Math.sin(angle) * radius
    };
  });

  points.forEach((point) => {
    const isSelected = point.supplier.id === selected.id;
    context.strokeStyle = isSelected ? "#2f756d" : "#c6d2c9";
    context.lineWidth = isSelected ? 4 : 2;
    context.beginPath();
    context.moveTo(school.x, school.y);
    context.lineTo(point.x, point.y);
    context.stroke();
  });

  context.fillStyle = "#1f5d56";
  context.beginPath();
  context.arc(school.x, school.y, 30, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "700 18px sans-serif";
  context.textAlign = "center";
  context.fillText("校", school.x, school.y + 7);

  points.forEach((point) => {
    const isSelected = point.supplier.id === selected.id;
    context.fillStyle = isSelected ? "#c69b38" : point.supplier.shortage ? "#a85843" : "#476f91";
    context.beginPath();
    context.arc(point.x, point.y, isSelected ? 19 : 14, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#24312c";
    context.font = "700 14px sans-serif";
    context.textAlign = point.x > school.x ? "left" : "right";
    const labelX = point.x > school.x ? point.x + 22 : point.x - 22;
    context.fillText(point.supplier.category, labelX, point.y + 5);
  });
}

function setSelectedDay(dayId) {
  state.selectedDay = dayId;
  renderAll();
}

function setView(view) {
  state.selectedView = view;
  $all(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  $all("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === view);
  });
  if (view === "suppliers" || view === "overview") {
    window.requestAnimationFrame(drawSupplyMap);
  }
}

function setNavExpanded(expanded) {
  const toggle = $("#railToggle");
  document.body.classList.toggle("nav-expanded", expanded);
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.setAttribute("aria-label", expanded ? "收合平台導覽" : "展開平台導覽");
  toggle.setAttribute("title", expanded ? "收合平台導覽" : "展開平台導覽");
  toggle.querySelector("span").textContent = expanded ? "‹" : "›";
  writeStorage(NAV_STORAGE_KEY, expanded ? "1" : "0");
}

function restoreNavState() {
  setNavExpanded(readStorage(NAV_STORAGE_KEY) === "1");
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Demo remains usable when storage is unavailable.
  }
}

function applyTemplateToSelectedDay(templateId) {
  state.menu[state.selectedDay] = cloneTemplate(templateId);
  saveState();
  renderAll();
}

function createRequestFromSupplier() {
  const supplier = suppliers.find((item) => item.id === state.selectedSupplier) || suppliers[0];
  const request = {
    id: `REQ-${Date.now().toString().slice(-6)}`,
    title: `${supplier.category}採購草案`,
    amount: Math.round((supplier.capacity * 23) / 100) * 100,
    supplier: supplier.name,
    status: "菜單草案",
    stage: 0,
    note: `${supplier.county}供應，距離 ${supplier.distance} km，履約分數 ${supplier.score}。`
  };
  state.requests.unshift(request);
  saveState();
  renderAll();
  setView("approval");
}

function approveRequest(requestId) {
  const request = state.requests.find((item) => item.id === requestId);
  if (!request) return;
  request.stage = Math.min(request.stage + 1, approvalSteps.length - 1);
  request.status = request.stage === approvalSteps.length - 1 ? "已核准" : approvalSteps[request.stage];
  saveState();
  renderAll();
}

function holdRequest(requestId) {
  const request = state.requests.find((item) => item.id === requestId);
  if (!request) return;
  request.status = "待補件";
  saveState();
  renderAll();
}

function resetDemo() {
  state.menu = JSON.parse(JSON.stringify(defaultMenu));
  state.requests = JSON.parse(JSON.stringify(defaultRequests));
  state.feedback = JSON.parse(JSON.stringify(defaultFeedback));
  state.selectedDay = "mon";
  state.selectedIngredient = "rice";
  state.selectedSupplier = "farm-hsinchu";
  saveState();
  renderAll();
}

function renderAll() {
  renderSummary();
  renderFlow("#flowLine");
  renderFlow("#approvalFlow", true);
  renderTodayCard();
  renderActions();
  renderWeekBoard();
  renderMenuEditor();
  renderSubstitutions();
  renderSuppliers();
  renderTrace();
  renderNutrition();
  renderFeedback();
  renderRequests();
}

function bindEvents() {
  $("#railToggle").addEventListener("click", () => {
    setNavExpanded(!document.body.classList.contains("nav-expanded"));
  });

  $all(".nav-button").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $("#daySelect").addEventListener("change", (event) => setSelectedDay(event.target.value));
  $("#nutritionDaySelect").addEventListener("change", (event) => setSelectedDay(event.target.value));
  $("#templateSelect").addEventListener("change", (event) => applyTemplateToSelectedDay(event.target.value));
  $("#applyTemplateButton").addEventListener("click", () => applyTemplateToSelectedDay($("#templateSelect").value));
  $("#categoryFilter").addEventListener("change", renderSuppliers);
  $("#countyFilter").addEventListener("change", renderSuppliers);
  $("#ingredientSelect").addEventListener("change", (event) => {
    state.selectedIngredient = event.target.value;
    renderTrace();
  });
  $("#resetDemo").addEventListener("click", resetDemo);

  document.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-select-day]");
    if (dayButton) {
      setSelectedDay(dayButton.dataset.selectDay);
      return;
    }

    const supplierButton = event.target.closest("[data-supplier-id]");
    if (supplierButton) {
      state.selectedSupplier = supplierButton.dataset.supplierId;
      renderSuppliers();
      return;
    }

    const substitutionButton = event.target.closest("[data-apply-substitution]");
    if (substitutionButton) {
      applyTemplateToSelectedDay(substitutionButton.dataset.applySubstitution);
      return;
    }

    const createButton = event.target.closest("#createRequestButton");
    if (createButton) {
      createRequestFromSupplier();
      return;
    }

    const approveButton = event.target.closest("[data-approve-request]");
    if (approveButton) {
      approveRequest(approveButton.dataset.approveRequest);
      return;
    }

    const holdButton = event.target.closest("[data-hold-request]");
    if (holdButton) {
      holdRequest(holdButton.dataset.holdRequest);
    }
  });

  document.addEventListener("keydown", (event) => {
    const supplierButton = event.target.closest("[data-supplier-id]");
    if (!supplierButton || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    state.selectedSupplier = supplierButton.dataset.supplierId;
    renderSuppliers();
  });

  $("#feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const item = {
      className: $("#classSelect").value,
      score: Number($("#scoreInput").value),
      waste: Number($("#wasteInput").value),
      comment: $("#commentInput").value.trim() || "已收到班級回饋"
    };
    state.feedback.push(item);
    saveState();
    renderFeedback();
  });

  window.addEventListener("resize", drawSupplyMap);
}

renderAll();
bindEvents();
restoreNavState();
setView(state.selectedView);
