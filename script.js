const STORAGE_KEY = "cheq-transactions-v3";
const LEGACY_STORAGE_KEY = "cheq-transactions-v2";
const PROFILE_KEY = "cheq-profile-v1";
const ADJUSTMENTS_KEY = "cheq-net-worth-adjustments-v1";
const BILLS_KEY = "cheq-bills-v1";

const START_YEAR = 2026;
const START_MONTH_INDEX = 4;
const START_DATE = new Date(START_YEAR, START_MONTH_INDEX, 1);
const START_DATE_KEY = "2026-05-01";

const TYPE_COLORS = {
  expense: "#ff4d55",
  discover: "#ff9f1c",
  amex: "#47a6ff",
  income: "#36d873"
};

const TYPES = {
  expense: {
    label: "Expense",
    shortLabel: "Cash",
    sign: "-",
    className: "type-expense",
    badge: "E",
    color: TYPE_COLORS.expense,
    outflow: true
  },
  discover: {
    label: "Discover Credit",
    shortLabel: "Disc",
    sign: "-",
    className: "type-discover",
    badge: "D",
    color: TYPE_COLORS.discover,
    outflow: true
  },
  amex: {
    label: "Amex Credit",
    shortLabel: "Amex",
    sign: "-",
    className: "type-amex",
    badge: "A",
    color: TYPE_COLORS.amex,
    outflow: true
  },
  income: {
    label: "Income",
    shortLabel: "Inc",
    sign: "+",
    className: "type-income",
    badge: "I",
    color: TYPE_COLORS.income,
    outflow: false
  }
};

const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const summaryTitle = document.getElementById("summaryTitle");
const transactionCount = document.getElementById("transactionCount");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const cashExpenseTotal = document.getElementById("cashExpenseTotal");
const discoverTotal = document.getElementById("discoverTotal");
const amexTotal = document.getElementById("amexTotal");
const netTotal = document.getElementById("netTotal");
const netTile = document.getElementById("netTile");

const headerNetWorth = document.getElementById("headerNetWorth");
const headerNetWorthChange = document.getElementById("headerNetWorthChange");

const monthStatusBanner = document.getElementById("monthStatusBanner");
const monthStatusText = document.getElementById("monthStatusText");
const monthStatusSubtext = document.getElementById("monthStatusSubtext");

const appSplash = document.getElementById("appSplash");
const safeToSpendCard = document.querySelector(".safe-spend-card");
const safeToSpendAmount = document.getElementById("safeToSpendAmount");
const safeToSpendNote = document.getElementById("safeToSpendNote");
const hudMonthlyNet = document.getElementById("hudMonthlyNet");
const hudUpcomingOutflow = document.getElementById("hudUpcomingOutflow");
const hudCreditUsage = document.getElementById("hudCreditUsage");
const upcomingBillsTotal = document.getElementById("upcomingBillsTotal");
const upcomingBillsNext = document.getElementById("upcomingBillsNext");

const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const startMonthBtn = document.getElementById("startMonthBtn");
const openAddBtn = document.getElementById("openAddBtn");

const selectedStripDate = document.getElementById("selectedStripDate");
const selectedStripNet = document.getElementById("selectedStripNet");
const selectedStripExpense = document.getElementById("selectedStripExpense");
const selectedStripIncome = document.getElementById("selectedStripIncome");
const selectedStripItems = document.getElementById("selectedStripItems");
const openSelectedDayBtn = document.getElementById("openSelectedDayBtn");

const calendarView = document.getElementById("calendarView");
const transactionsView = document.getElementById("transactionsView");
const summaryView = document.getElementById("summaryView");
const navItems = Array.from(document.querySelectorAll(".nav-item"));

const filterChips = Array.from(document.querySelectorAll(".filter-chip"));
const allTransactionList = document.getElementById("allTransactionList");
const allTransactionCount = document.getElementById("allTransactionCount");

const summaryNetWorth = document.getElementById("summaryNetWorth");
const summaryNetWorthChange = document.getElementById("summaryNetWorthChange");
const startingNetWorthDisplay = document.getElementById("startingNetWorthDisplay");
const netWorthCashFlowDisplay = document.getElementById("netWorthCashFlowDisplay");
const netWorthManualDisplay = document.getElementById("netWorthManualDisplay");

const monthChartTitle = document.getElementById("monthChartTitle");
const monthChartTotal = document.getElementById("monthChartTotal");
const outflowDonut = document.getElementById("outflowDonut");
const outflowLegend = document.getElementById("outflowLegend");
const cashFlowDonut = document.getElementById("cashFlowDonut");
const cashFlowLegend = document.getElementById("cashFlowLegend");
const cashFlowChartTotal = document.getElementById("cashFlowChartTotal");

const resetOnboardingBtn = document.getElementById("resetOnboardingBtn");
const summaryIncomeKpi = document.getElementById("summaryIncomeKpi");
const summaryOutflowKpi = document.getElementById("summaryOutflowKpi");
const summaryNetKpi = document.getElementById("summaryNetKpi");
const summaryCreditKpi = document.getElementById("summaryCreditKpi");

const exportBackupBtn = document.getElementById("exportBackupBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const importBackupInput = document.getElementById("importBackupInput");

const adjustmentForm = document.getElementById("adjustmentForm");
const adjustmentAmount = document.getElementById("adjustmentAmount");
const adjustmentNote = document.getElementById("adjustmentNote");
const adjustmentList = document.getElementById("adjustmentList");

const dayDrawer = document.getElementById("dayDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const clearDayBtn = document.getElementById("clearDayBtn");
const selectedDateLabel = document.getElementById("selectedDateLabel");
const drawerTitle = document.getElementById("drawerTitle");

const transactionForm = document.getElementById("transactionForm");
const transactionName = document.getElementById("transactionName");
const transactionAmount = document.getElementById("transactionAmount");
const dayTransactionList = document.getElementById("dayTransactionList");
const dayNetTotal = document.getElementById("dayNetTotal");
const dayExpenseTotal = document.getElementById("dayExpenseTotal");
const dayDiscoverTotal = document.getElementById("dayDiscoverTotal");
const dayAmexTotal = document.getElementById("dayAmexTotal");
const dayIncomeTotal = document.getElementById("dayIncomeTotal");

const onboardingOverlay = document.getElementById("onboardingOverlay");
const netWorthSetupStep = document.getElementById("netWorthSetupStep");
const billSetupStep = document.getElementById("billSetupStep");
const netWorthForm = document.getElementById("netWorthForm");
const startingNetWorth = document.getElementById("startingNetWorth");
const netWorthError = document.getElementById("netWorthError");
const startAtZeroBtn = document.getElementById("startAtZeroBtn");

const billSetupForm = document.getElementById("billSetupForm");
const setupBillName = document.getElementById("setupBillName");
const setupBillAmount = document.getElementById("setupBillAmount");
const setupBillUnknown = document.getElementById("setupBillUnknown");
const setupBillDueDay = document.getElementById("setupBillDueDay");
const setupBillList = document.getElementById("setupBillList");
const billSetupError = document.getElementById("billSetupError");
const finishSetupButton = document.getElementById("finishSetupButton");
const skipBillsButton = document.getElementById("skipBillsButton");
const homeBillList = document.getElementById("homeBillList");
const homeBillForm = document.getElementById("homeBillForm");
const homeBillName = document.getElementById("homeBillName");
const homeBillAmount = document.getElementById("homeBillAmount");
const homeBillUnknown = document.getElementById("homeBillUnknown");
const homeBillDueDay = document.getElementById("homeBillDueDay");
const homeBillError = document.getElementById("homeBillError");
const billCountPill = document.getElementById("billCountPill");

let visibleDate = getInitialVisibleDate();
let selectedDateKey = toDateKey(visibleDate);
let activeView = "calendar";
let activeFilter = "all";

let transactions = loadTransactions();
let profile = loadProfile();
let adjustments = loadAdjustments();
let bills = loadBills();

function getInitialVisibleDate() {
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (currentMonth < START_DATE) {
    return new Date(START_DATE);
  }

  return currentMonth;
}

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);

    if (!saved) {
      return {};
    }

    return normalizeTransactions(JSON.parse(saved));
  } catch (error) {
    console.error("Could not load Cheq transactions", error);
    return {};
  }
}

function normalizeTransactions(data) {
  if (!data || typeof data !== "object") {
    return {};
  }

  const normalized = {};

  Object.entries(data).forEach(([dateKey, items]) => {
    if (!isValidDateKey(dateKey) || dateKey < START_DATE_KEY || !Array.isArray(items)) {
      return;
    }

    normalized[dateKey] = items
      .filter(item => item && typeof item === "object")
      .map(item => ({
        id: item.id || createId(),
        type: TYPES[item.type] ? item.type : "expense",
        name: String(item.name || "Transaction"),
        amount: Number(item.amount) || 0,
        createdAt: item.createdAt || new Date().toISOString()
      }))
      .filter(item => item.amount > 0);

    if (normalized[dateKey].length === 0) {
      delete normalized[dateKey];
    }
  });

  return normalized;
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    const startingValue = Number(parsed.startingNetWorth);

    if (!Number.isFinite(startingValue)) {
      return null;
    }

    return {
      startingNetWorth: startingValue,
      createdAt: parsed.createdAt || new Date().toISOString()
    };
  } catch (error) {
    console.error("Could not load Cheq profile", error);
    return null;
  }
}

function loadAdjustments() {
  try {
    const saved = localStorage.getItem(ADJUSTMENTS_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(item => item && typeof item === "object")
      .map(item => ({
        id: item.id || createId(),
        type: item.type === "minus" ? "minus" : "plus",
        amount: Number(item.amount) || 0,
        note: String(item.note || "Manual adjustment"),
        createdAt: item.createdAt || new Date().toISOString()
      }))
      .filter(item => item.amount > 0);
  } catch (error) {
    console.error("Could not load net worth adjustments", error);
    return [];
  }
}

function loadBills() {
  try {
    const saved = localStorage.getItem(BILLS_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeBills(parsed);
  } catch (error) {
    console.error("Could not load Cheq bills", error);
    return [];
  }
}

function normalizeBills(rawBills) {
  if (!Array.isArray(rawBills)) {
    return [];
  }

  return rawBills
    .filter(item => item && typeof item === "object")
    .map(item => {
      const amountKnown = Boolean(item.amountKnown);
      const amount = amountKnown ? Number(item.amount) : null;
      const dueDay = Math.min(31, Math.max(1, Number(item.dueDay) || 1));
      const validAmount = amountKnown && Number.isFinite(amount) && amount > 0;

      return {
        id: item.id || createId(),
        name: String(item.name || "Bill"),
        amount: validAmount ? amount : null,
        amountKnown: validAmount,
        dueDay,
        reminderEnabled: Boolean(item.reminderEnabled),
        createdAt: item.createdAt || new Date().toISOString()
      };
    })
    .filter(item => item.name && item.dueDay >= 1 && item.dueDay <= 31);
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function saveAdjustments() {
  localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(adjustments));
}

function saveBills() {
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isValidDateKey(dateKey) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(dateKey));
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getMonthMeta(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    year,
    month,
    firstDay,
    lastDay,
    daysInMonth: lastDay.getDate(),
    startWeekday: firstDay.getDay()
  };
}

function formatMoney(amount, options = {}) {
  const sign = options.sign || "";
  const absAmount = Math.abs(Number(amount) || 0);

  return `${sign}${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(absAmount)}`;
}

function formatSignedMoney(amount) {
  const sign = amount > 0 ? "+" : amount < 0 ? "-" : "";
  return formatMoney(amount, { sign });
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatShortMonth(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric"
  }).format(date);
}

function formatFullDate(dateKey) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(fromDateKey(dateKey));
}

function shortDate(dateKey) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(fromDateKey(dateKey));
}

function formatShortDateFromDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(date);
}

function compactMoney(amount) {
  const abs = Math.abs(amount);

  if (abs >= 1000) {
    return `$${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}k`;
  }

  return `$${Math.round(abs)}`;
}

function formatBillAmount(bill) {
  return bill.amountKnown ? formatMoney(bill.amount) : "N/A";
}

function getTransactionsForDate(dateKey) {
  return transactions[dateKey] || [];
}

function getBillsForDate(dateKey) {
  const date = fromDateKey(dateKey);
  const { lastDay } = getMonthMeta(date);
  const effectiveDay = date.getDate();

  return bills.filter(bill => {
    const billDueDay = Math.min(Number(bill.dueDay) || 1, lastDay.getDate());
    return billDueDay === effectiveDay;
  });
}

function blankTotals() {
  return {
    income: 0,
    expense: 0,
    discover: 0,
    amex: 0,
    outflow: 0,
    net: 0,
    count: 0
  };
}

function addToTotals(totals, item) {
  const type = TYPES[item.type] ? item.type : "expense";
  const amount = Number(item.amount) || 0;

  totals[type] += amount;
  totals.count += 1;

  if (TYPES[type].outflow) {
    totals.outflow += amount;
  }

  totals.net = totals.income - totals.outflow;

  return totals;
}

function getDayTotals(dateKey) {
  return getTransactionsForDate(dateKey).reduce(addToTotals, blankTotals());
}

function getAllTransactions() {
  return Object.entries(transactions)
    .flatMap(([dateKey, items]) => items.map(item => ({ ...item, dateKey })))
    .sort((a, b) => {
      if (a.dateKey !== b.dateKey) {
        return b.dateKey.localeCompare(a.dateKey);
      }

      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
}

function getVisibleMonthTransactions() {
  const { year, month, daysInMonth } = getMonthMeta(visibleDate);
  const items = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = toDateKey(new Date(year, month, day));

    getTransactionsForDate(dateKey).forEach(item => {
      items.push({ ...item, dateKey });
    });
  }

  return items.sort((a, b) => {
    if (a.dateKey !== b.dateKey) {
      return a.dateKey.localeCompare(b.dateKey);
    }

    return String(a.createdAt).localeCompare(String(b.createdAt));
  });
}

function getMonthTotals() {
  return getVisibleMonthTransactions().reduce(addToTotals, blankTotals());
}

function getUpcomingBillsForVisibleMonth() {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const { year, month, daysInMonth } = getMonthMeta(visibleDate);

  return bills
    .map(bill => {
      const dueDay = Math.min(Number(bill.dueDay) || 1, daysInMonth);
      const dueDate = new Date(year, month, dueDay);

      return {
        ...bill,
        dueDate,
        dueDateKey: toDateKey(dueDate)
      };
    })
    .filter(bill => {
      const visibleMonthIsCurrentMonth =
        year === today.getFullYear() &&
        month === today.getMonth();

      if (visibleMonthIsCurrentMonth) {
        return bill.dueDate >= todayStart;
      }

      return true;
    })
    .sort((a, b) => a.dueDate - b.dueDate);
}

function getUpcomingKnownBillsTotalForVisibleMonth() {
  return getUpcomingBillsForVisibleMonth().reduce((total, bill) => {
    return total + (bill.amountKnown ? Number(bill.amount) || 0 : 0);
  }, 0);
}

function getUpcomingOutflowForVisibleMonth() {
  const today = new Date();
  const { year, month, daysInMonth } = getMonthMeta(visibleDate);
  let total = 0;

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = toDateKey(date);
    const isPastVisibleMonth = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (isPastVisibleMonth) {
      continue;
    }

    getTransactionsForDate(dateKey).forEach(item => {
      const type = TYPES[item.type] || TYPES.expense;

      if (type.outflow) {
        total += Number(item.amount) || 0;
      }
    });
  }

  return total + getUpcomingKnownBillsTotalForVisibleMonth();
}

function getSafeToSpendValue() {
  const totals = getMonthTotals();

  return totals.income - totals.outflow;
}

function getOverallTotals() {
  return getAllTransactions().reduce(addToTotals, blankTotals());
}

function getSignedTransactionAmount(item) {
  const type = TYPES[item.type] || TYPES.expense;
  const amount = Number(item.amount) || 0;

  return type.outflow ? -amount : amount;
}

function getSignedAdjustmentAmount(item) {
  const amount = Number(item.amount) || 0;

  return item.type === "minus" ? -amount : amount;
}

function getNetWorthBreakdown() {
  const start = profile ? profile.startingNetWorth : 0;
  const cashFlow = getAllTransactions().reduce((total, item) => total + getSignedTransactionAmount(item), 0);
  const manual = adjustments.reduce((total, item) => total + getSignedAdjustmentAmount(item), 0);
  const change = cashFlow + manual;

  return {
    start,
    cashFlow,
    manual,
    change,
    current: start + change
  };
}

function setSelectedDate(dateKey) {
  if (dateKey < START_DATE_KEY) {
    return;
  }

  selectedDateKey = dateKey;

  const selectedDate = fromDateKey(dateKey);
  visibleDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
}

function renderApp() {
  renderNetWorth();
  renderFinancialHud();
  renderUpcomingBillsHud();
  renderMonthStatus();
  renderCalendar();
  renderTransactionsView();
  renderSummaryView();
  renderSetupBills();
  renderHomeBills();
}

function renderNetWorth() {
  const netWorth = getNetWorthBreakdown();
  const changeSign = netWorth.change > 0 ? "+" : netWorth.change < 0 ? "-" : "";

  headerNetWorth.textContent = formatMoney(netWorth.current, {
    sign: netWorth.current < 0 ? "-" : ""
  });

  headerNetWorthChange.textContent = `${formatMoney(netWorth.change, {
    sign: changeSign
  })} from start`;

  headerNetWorthChange.classList.toggle("positive", netWorth.change >= 0);
  headerNetWorthChange.classList.toggle("negative", netWorth.change < 0);
}

function renderFinancialHud() {
  const totals = getMonthTotals();
  const safeToSpend = getSafeToSpendValue();
  const upcomingOutflow = getUpcomingOutflowForVisibleMonth();
  const creditUsage = totals.discover + totals.amex;

  safeToSpendAmount.textContent = formatSignedMoney(safeToSpend);
  safeToSpendNote.textContent = `Based on entered ${formatShortMonth(visibleDate)} activity`;

  safeToSpendCard.classList.toggle("positive", safeToSpend >= 0);
  safeToSpendCard.classList.toggle("negative", safeToSpend < 0);

  hudMonthlyNet.textContent = formatSignedMoney(totals.net);
  hudUpcomingOutflow.textContent = formatMoney(upcomingOutflow, {
    sign: upcomingOutflow > 0 ? "-" : ""
  });
  hudCreditUsage.textContent = formatMoney(creditUsage, {
    sign: creditUsage > 0 ? "-" : ""
  });

  hudMonthlyNet.parentElement.classList.toggle("positive", totals.net >= 0);
  hudMonthlyNet.parentElement.classList.toggle("negative", totals.net < 0);
}

function renderUpcomingBillsHud() {
  if (!upcomingBillsTotal || !upcomingBillsNext) {
    return;
  }

  const upcomingBills = getUpcomingBillsForVisibleMonth();

  const knownTotal = upcomingBills.reduce((total, bill) => {
    return total + (bill.amountKnown ? Number(bill.amount) || 0 : 0);
  }, 0);

  const hasUnknown = upcomingBills.some(bill => !bill.amountKnown);
  const nextBill = upcomingBills[0];

  upcomingBillsTotal.textContent = hasUnknown
    ? `${formatMoney(knownTotal)} + N/A`
    : formatMoney(knownTotal);

  upcomingBillsNext.textContent = nextBill
    ? `Next: ${nextBill.name} · ${formatShortDateFromDate(nextBill.dueDate)} · ${formatBillAmount(nextBill)}`
    : "No upcoming bills";
}

function renderMonthStatus() {
  const totals = getMonthTotals();
  const creditUsage = totals.discover + totals.amex;

  monthStatusBanner.classList.remove("positive", "negative", "neutral", "warning");

  if (totals.count === 0) {
    monthStatusBanner.classList.add("neutral");
    monthStatusText.textContent = `${formatShortMonth(visibleDate)} has no activity yet`;
    monthStatusSubtext.textContent = bills.length
      ? "Bills are mapped on the calendar. Add income and actual outflow to build the month view."
      : "Add income and outflow to build the month view.";
    return;
  }

  if (totals.net > 0) {
    monthStatusBanner.classList.add("positive");
    monthStatusText.textContent = `Ahead by ${formatMoney(totals.net)}`;
    monthStatusSubtext.textContent = `${formatMoney(totals.income)} income against ${formatMoney(totals.outflow)} outflow.`;
    return;
  }

  if (totals.net < 0) {
    monthStatusBanner.classList.add(creditUsage > totals.expense ? "warning" : "negative");
    monthStatusText.textContent = `Behind by ${formatMoney(totals.net, { sign: "-" })}`;
    monthStatusSubtext.textContent = creditUsage > 0
      ? `${formatMoney(creditUsage)} on credit cards this month.`
      : `${formatMoney(totals.outflow)} outflow logged this month.`;
    return;
  }

  monthStatusBanner.classList.add("neutral");
  monthStatusText.textContent = "Flat for the month";
  monthStatusSubtext.textContent = "Income and outflow are balanced right now.";
}

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const todayKey = toDateKey(new Date());
  const { year, month, daysInMonth, startWeekday } = getMonthMeta(visibleDate);
  const previousMonthLastDay = new Date(year, month, 0).getDate();
  const totalCells = 42;

  monthTitle.textContent = formatMonth(visibleDate);
  prevMonthBtn.disabled = new Date(year, month - 1, 1) < START_DATE;

  for (let cellIndex = 0; cellIndex < totalCells; cellIndex += 1) {
    const dayNumber = cellIndex - startWeekday + 1;
    let cellDate;
    let isOutsideMonth = false;
    let labelDay;

    if (dayNumber < 1) {
      labelDay = previousMonthLastDay + dayNumber;
      cellDate = new Date(year, month - 1, labelDay);
      isOutsideMonth = true;
    } else if (dayNumber > daysInMonth) {
      labelDay = dayNumber - daysInMonth;
      cellDate = new Date(year, month + 1, labelDay);
      isOutsideMonth = true;
    } else {
      labelDay = dayNumber;
      cellDate = new Date(year, month, dayNumber);
    }

    const dateKey = toDateKey(cellDate);
    const totals = getDayTotals(dateKey);
    const dayBills = getBillsForDate(dateKey);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "day-cell";
    button.setAttribute("aria-label", `Open ${formatFullDate(dateKey)}`);

    if (isOutsideMonth) {
      button.classList.add("outside-month");
    }

    if (dateKey < START_DATE_KEY) {
      button.classList.add("before-start");
      button.disabled = true;
    }

    if (dateKey === todayKey) {
      button.classList.add("today");
    }

    if (dateKey === selectedDateKey) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="day-number">${labelDay}</span>
      ${renderDayEntries(totals, dayBills)}
    `;

    button.addEventListener("click", () => openDayDrawer(dateKey));
    calendarGrid.appendChild(button);
  }

  renderMonthSummary();
  renderSelectedDayStrip();
}

function renderDayEntries(totals, dayBills = []) {
  const entries = [];

  if (totals.expense > 0) {
    entries.push(`<span class="day-entry type-expense">-${compactMoney(totals.expense)}</span>`);
  }

  if (totals.discover > 0) {
    entries.push(`<span class="day-entry type-discover">-${compactMoney(totals.discover)}</span>`);
  }

  if (totals.amex > 0) {
    entries.push(`<span class="day-entry type-amex">-${compactMoney(totals.amex)}</span>`);
  }

  if (totals.income > 0) {
    entries.push(`<span class="day-entry type-income">+${compactMoney(totals.income)}</span>`);
  }

  dayBills.forEach(bill => {
    entries.push(`<span class="day-entry type-bill">${escapeHtml(bill.name)} ${escapeHtml(formatBillAmount(bill))}</span>`);
  });

  if (!entries.length) {
    return "";
  }

  const visibleEntries = entries.slice(0, 3).join("");
  const hiddenCount = entries.length - 3;

  return `
    <span class="day-entries">
      ${visibleEntries}
      ${hiddenCount > 0 ? `<span class="more-dot" title="${hiddenCount} more"></span>` : ""}
    </span>
  `;
}

function renderSelectedDayStrip() {
  const totals = getDayTotals(selectedDateKey);
  const selectedBills = getBillsForDate(selectedDateKey);
  const totalItems = totals.count + selectedBills.length;

  selectedStripDate.textContent = shortDate(selectedDateKey);
  selectedStripNet.textContent = formatSignedMoney(totals.net);
  selectedStripNet.className = totals.net >= 0 ? "positive-text" : "negative-text";

  selectedStripExpense.textContent = formatMoney(totals.outflow, {
    sign: totals.outflow > 0 ? "-" : ""
  });
  selectedStripExpense.className = totals.outflow > 0 ? "negative-text" : "";

  selectedStripIncome.textContent = formatMoney(totals.income, {
    sign: totals.income > 0 ? "+" : ""
  });
  selectedStripIncome.className = totals.income > 0 ? "positive-text" : "";

  selectedStripItems.textContent = `${totalItems} ${totalItems === 1 ? "item" : "items"}`;
}

function renderMonthSummary() {
  const totals = getMonthTotals();

  summaryTitle.textContent = formatShortMonth(visibleDate);
  transactionCount.textContent = `${totals.count} ${totals.count === 1 ? "item" : "items"}`;

  incomeTotal.textContent = formatMoney(totals.income, { sign: "+" });
  expenseTotal.textContent = formatMoney(totals.outflow, { sign: "-" });
  cashExpenseTotal.textContent = formatMoney(totals.expense, { sign: "-" });
  discoverTotal.textContent = formatMoney(totals.discover, { sign: "-" });
  amexTotal.textContent = formatMoney(totals.amex, { sign: "-" });
  netTotal.textContent = formatSignedMoney(totals.net);

  netTile.classList.toggle("positive", totals.net >= 0);
  netTile.classList.toggle("negative", totals.net < 0);
}

function renderDayDrawer() {
  const totals = getDayTotals(selectedDateKey);

  selectedDateLabel.textContent = formatFullDate(selectedDateKey);
  drawerTitle.textContent = "Daily Activity";

  dayNetTotal.textContent = formatSignedMoney(totals.net);
  dayNetTotal.className = totals.net >= 0 ? "amount type-income" : "amount type-expense";

  dayExpenseTotal.textContent = formatMoney(totals.expense, { sign: "-" });
  dayDiscoverTotal.textContent = formatMoney(totals.discover, { sign: "-" });
  dayAmexTotal.textContent = formatMoney(totals.amex, { sign: "-" });
  dayIncomeTotal.textContent = formatMoney(totals.income, { sign: "+" });

  renderDayTransactionList();
}

function renderDayTransactionList() {
  const items = getTransactionsForDate(selectedDateKey);
  const selectedBills = getBillsForDate(selectedDateKey);

  dayTransactionList.innerHTML = "";

  if (!items.length && !selectedBills.length) {
    dayTransactionList.innerHTML = `<li class="empty-state"><strong>No activity here.</strong>Add income, expenses, Discover, or Amex usage for this selected day.</li>`;
    return;
  }

  selectedBills.forEach(bill => {
    const li = document.createElement("li");
    li.className = "transaction-item type-bill";
    li.innerHTML = `
      <span class="type-badge" aria-hidden="true">B</span>
      <span class="transaction-copy">
        <strong>${escapeHtml(bill.name)}</strong>
        <small>Planned monthly bill - due day ${bill.dueDay}</small>
      </span>
      <span class="transaction-amount type-bill">${escapeHtml(formatBillAmount(bill))}</span>
    `;

    dayTransactionList.appendChild(li);
  });

  items.forEach(item => {
    dayTransactionList.appendChild(createTransactionListItem(item, selectedDateKey, true, false));
  });
}

function renderTransactionsView() {
  let items = getAllTransactions();

  if (activeFilter !== "all") {
    items = items.filter(item => item.type === activeFilter);
  }

  allTransactionList.innerHTML = "";
  allTransactionCount.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;

  if (!items.length) {
    allTransactionList.innerHTML = `<li class="empty-state"><strong>No transactions match this view.</strong>Use Calendar to add your first entry, then this becomes your clean ledger.</li>`;
    return;
  }

  items.forEach(item => {
    allTransactionList.appendChild(createTransactionListItem(item, item.dateKey, true, true));
  });
}

function createTransactionListItem(item, dateKey, allowDelete, showDate) {
  const type = TYPES[item.type] || TYPES.expense;
  const li = document.createElement("li");

  li.className = `transaction-item ${type.className}`;

  li.innerHTML = `
    <span class="type-badge" aria-hidden="true">${type.badge}</span>
    <span class="transaction-copy">
      <strong>${escapeHtml(item.name)}</strong>
      <small>${escapeHtml(type.label)}${showDate ? ` - ${escapeHtml(shortDate(dateKey))}` : ""}</small>
    </span>
    <span class="transaction-amount ${type.className}">${type.sign}${formatMoney(item.amount)}</span>
    ${allowDelete ? `<button class="delete-button" type="button" aria-label="Delete ${escapeHtml(item.name)}">x</button>` : ""}
  `;

  const deleteButton = li.querySelector(".delete-button");

  if (deleteButton) {
    deleteButton.addEventListener("click", () => deleteTransaction(dateKey, item.id));
  }

  return li;
}

function renderSummaryView() {
  const netWorth = getNetWorthBreakdown();
  const monthTotals = getMonthTotals();
  const overallTotals = getOverallTotals();
  const changeSign = netWorth.change > 0 ? "+" : netWorth.change < 0 ? "-" : "";

  summaryNetWorth.textContent = formatMoney(netWorth.current, {
    sign: netWorth.current < 0 ? "-" : ""
  });
  summaryNetWorthChange.textContent = `${formatMoney(netWorth.change, {
    sign: changeSign
  })} from start`;
  summaryNetWorthChange.className = netWorth.change >= 0 ? "positive-text" : "negative-text";

  startingNetWorthDisplay.textContent = formatMoney(netWorth.start, {
    sign: netWorth.start < 0 ? "-" : ""
  });

  netWorthCashFlowDisplay.textContent = formatSignedMoney(netWorth.cashFlow);
  netWorthCashFlowDisplay.className = netWorth.cashFlow >= 0 ? "positive-text" : "negative-text";

  netWorthManualDisplay.textContent = formatSignedMoney(netWorth.manual);
  netWorthManualDisplay.className = netWorth.manual >= 0 ? "positive-text" : "negative-text";

  summaryIncomeKpi.textContent = formatMoney(monthTotals.income, { sign: "+" });
  summaryOutflowKpi.textContent = formatMoney(monthTotals.outflow, { sign: "-" });
  summaryNetKpi.textContent = formatSignedMoney(monthTotals.net);
  summaryCreditKpi.textContent = formatMoney(monthTotals.discover + monthTotals.amex, { sign: "-" });

  summaryNetKpi.parentElement.classList.toggle("positive", monthTotals.net >= 0);
  summaryNetKpi.parentElement.classList.toggle("negative", monthTotals.net < 0);

  monthChartTitle.textContent = `${formatShortMonth(visibleDate)} Outflow`;
  monthChartTotal.textContent = formatMoney(monthTotals.outflow, { sign: "-" });

  renderDonutChart(outflowDonut, outflowLegend, [
    { label: "Cash / Debit", value: monthTotals.expense, color: TYPE_COLORS.expense },
    { label: "Discover", value: monthTotals.discover, color: TYPE_COLORS.discover },
    { label: "Amex", value: monthTotals.amex, color: TYPE_COLORS.amex }
  ]);

  const cashFlowTotal = overallTotals.income + overallTotals.outflow;
  cashFlowChartTotal.textContent = formatMoney(cashFlowTotal);

  renderDonutChart(cashFlowDonut, cashFlowLegend, [
    { label: "Income", value: overallTotals.income, color: TYPE_COLORS.income },
    { label: "Outflow", value: overallTotals.outflow, color: TYPE_COLORS.expense }
  ]);

  renderAdjustmentList();
}

function renderDonutChart(chartElement, legendElement, segments) {
  const positiveSegments = segments.filter(segment => Number(segment.value) > 0);
  const total = positiveSegments.reduce((sum, segment) => sum + Number(segment.value), 0);

  chartElement.classList.toggle("empty", total <= 0);

  if (total <= 0) {
    chartElement.style.background = "rgba(255, 255, 255, 0.07)";
    legendElement.innerHTML = `<div class="empty-state"><strong>No chart data yet.</strong>Add transactions to generate this breakdown.</div>`;
    return;
  }

  let cursor = 0;

  const gradientParts = positiveSegments.map(segment => {
    const start = cursor;
    const end = cursor + (Number(segment.value) / total) * 360;
    cursor = end;

    return `${segment.color} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
  });

  chartElement.style.background = `conic-gradient(${gradientParts.join(", ")})`;

  legendElement.innerHTML = positiveSegments
    .map(segment => {
      const percent = total > 0 ? (Number(segment.value) / total) * 100 : 0;

      return `
        <div class="legend-item">
          <span class="legend-name"><span class="legend-dot" style="--dot-color: ${segment.color}"></span>${escapeHtml(segment.label)}</span>
          <span class="legend-value">${formatMoney(segment.value)} <small>${percent.toFixed(0)}%</small></span>
        </div>
      `;
    })
    .join("");
}

function renderAdjustmentList() {
  adjustmentList.innerHTML = "";

  if (!adjustments.length) {
    adjustmentList.innerHTML = `<li class="empty-state"><strong>No manual adjustments.</strong>Use this only when net worth changes outside income or spending.</li>`;
    return;
  }

  adjustments
    .slice()
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .forEach(item => {
      const signedAmount = getSignedAdjustmentAmount(item);
      const li = document.createElement("li");
      li.className = `transaction-item ${item.type === "minus" ? "type-expense" : "type-income"}`;

      li.innerHTML = `
        <span class="type-badge" aria-hidden="true">${item.type === "minus" ? "-" : "+"}</span>
        <span class="transaction-copy">
          <strong>${escapeHtml(item.note || "Manual adjustment")}</strong>
          <small>${escapeHtml(new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }).format(new Date(item.createdAt)))}</small>
        </span>
        <span class="transaction-amount ${item.type === "minus" ? "type-expense" : "type-income"}">${formatSignedMoney(signedAmount)}</span>
        <button class="delete-button" type="button" aria-label="Delete adjustment">x</button>
      `;

      li.querySelector(".delete-button").addEventListener("click", () => deleteAdjustment(item.id));
      adjustmentList.appendChild(li);
    });
}

function renderSetupBills() {
  if (!setupBillList) {
    return;
  }

  setupBillList.innerHTML = "";

  if (!bills.length) {
    setupBillList.innerHTML = `<li class="empty-state"><strong>No bills added yet.</strong>Add bills now or skip this step.</li>`;
    return;
  }

  bills
    .slice()
    .sort((a, b) => a.dueDay - b.dueDay)
    .forEach(bill => {
      const li = document.createElement("li");
      li.className = "bill-list-item";

      li.innerHTML = `
        <div>
          <strong>${escapeHtml(bill.name)}</strong>
          <small>Due every month on day ${bill.dueDay}</small>
        </div>
        <span>${escapeHtml(formatBillAmount(bill))}</span>
        <button class="delete-button" type="button" aria-label="Remove ${escapeHtml(bill.name)}">x</button>
      `;

      li.querySelector("button").addEventListener("click", () => {
        bills = bills.filter(item => item.id !== bill.id);
        saveBills();
        renderApp();
      });

      setupBillList.appendChild(li);
    });
}
function renderHomeBills() {
  if (!homeBillList || !billCountPill) {
    return;
  }

  billCountPill.textContent = `${bills.length} ${bills.length === 1 ? "bill" : "bills"}`;
  homeBillList.innerHTML = "";

  if (!bills.length) {
    homeBillList.innerHTML = `
      <li class="empty-state">
        <strong>No bills added.</strong>
        Add recurring bills to map monthly obligations.
      </li>
    `;
    return;
  }

  bills
    .slice()
    .sort((a, b) => a.dueDay - b.dueDay)
    .forEach(bill => {
      const li = document.createElement("li");
      li.className = "bill-list-item";

      li.innerHTML = `
        <div>
          <strong>${escapeHtml(bill.name)}</strong>
          <small>Due every month on day ${bill.dueDay}</small>
        </div>
        <span>${escapeHtml(formatBillAmount(bill))}</span>
        <button class="delete-button" type="button" aria-label="Remove ${escapeHtml(bill.name)}">x</button>
      `;

      li.querySelector("button").addEventListener("click", () => {
        const confirmed = window.confirm(`Remove ${bill.name} from monthly bills?`);

        if (!confirmed) {
          return;
        }

        bills = bills.filter(item => item.id !== bill.id);
        saveBills();
        renderApp();
      });

      homeBillList.appendChild(li);
    });
}

function switchView(viewName) {
  activeView = viewName;

  calendarView.classList.toggle("active", viewName === "calendar");
  transactionsView.classList.toggle("active", viewName === "transactions");
  summaryView.classList.toggle("active", viewName === "summary");

  navItems.forEach(item => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  if (viewName === "transactions") {
    renderTransactionsView();
  }

  if (viewName === "summary") {
    renderSummaryView();
  }
}

function openDayDrawer(dateKey = selectedDateKey) {
  if (dateKey < START_DATE_KEY) {
    return;
  }

  setSelectedDate(dateKey);
  renderCalendar();
  renderDayDrawer();

  dayDrawer.classList.add("open");
  dayDrawer.setAttribute("aria-hidden", "false");

  window.setTimeout(() => transactionName.focus(), 60);
}

function closeDayDrawer() {
  dayDrawer.classList.remove("open");
  dayDrawer.setAttribute("aria-hidden", "true");
  transactionForm.reset();
}

function addTransaction(dateKey, item) {
  const dayItems = getTransactionsForDate(dateKey);

  transactions[dateKey] = [...dayItems, item];

  saveTransactions();
  renderApp();
  renderDayDrawer();
}

function deleteTransaction(dateKey, transactionId) {
  transactions[dateKey] = getTransactionsForDate(dateKey).filter(item => item.id !== transactionId);

  if (transactions[dateKey].length === 0) {
    delete transactions[dateKey];
  }

  saveTransactions();
  renderApp();

  if (dayDrawer.classList.contains("open")) {
    renderDayDrawer();
  }
}

function clearSelectedDay() {
  if (!getTransactionsForDate(selectedDateKey).length) {
    return;
  }

  const confirmed = window.confirm(`Clear all transactions for ${formatFullDate(selectedDateKey)}?`);

  if (!confirmed) {
    return;
  }

  delete transactions[selectedDateKey];

  saveTransactions();
  renderApp();
  renderDayDrawer();
}

function addAdjustment(item) {
  adjustments = [item, ...adjustments];
  saveAdjustments();
  renderApp();
}

function deleteAdjustment(adjustmentId) {
  adjustments = adjustments.filter(item => item.id !== adjustmentId);
  saveAdjustments();
  renderApp();
}

function showOnboarding() {
  startingNetWorth.value = profile ? String(profile.startingNetWorth) : "";
  netWorthError.textContent = "";

  if (billSetupError) {
    billSetupError.textContent = "";
  }

  if (netWorthSetupStep && billSetupStep) {
    netWorthSetupStep.classList.remove("hidden");
    billSetupStep.classList.add("hidden");
  }

  renderSetupBills();

  onboardingOverlay.classList.add("open");
  onboardingOverlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => startingNetWorth.focus(), 60);
}

function showBillSetupStep() {
  if (netWorthSetupStep && billSetupStep) {
    netWorthSetupStep.classList.add("hidden");
    billSetupStep.classList.remove("hidden");
  }

  renderSetupBills();

  window.setTimeout(() => {
    if (setupBillName) {
      setupBillName.focus();
    }
  }, 60);
}

function hideOnboarding() {
  onboardingOverlay.classList.remove("open");
  onboardingOverlay.setAttribute("aria-hidden", "true");
}

function completeOnboarding() {
  hideOnboarding();
  renderApp();
}

function saveStartingNetWorth(value) {
  profile = {
    startingNetWorth: value,
    createdAt: profile && profile.createdAt ? profile.createdAt : new Date().toISOString()
  };

  saveProfile();
  renderApp();
  showBillSetupStep();
}

function createBillFromFields({ nameInput, amountInput, unknownInput, dueDayInput, errorElement }) {
  const name = nameInput.value.trim();
  const amountUnknown = unknownInput.checked;
  const amount = Number(amountInput.value);
  const dueDay = Number(dueDayInput.value);

  errorElement.textContent = "";

  if (!name) {
    errorElement.textContent = "Enter a bill name.";
    return false;
  }

  if (!amountUnknown && (!Number.isFinite(amount) || amount <= 0)) {
    errorElement.textContent = "Enter an amount or mark it as N/A.";
    return false;
  }

  if (!Number.isFinite(dueDay) || dueDay < 1 || dueDay > 31) {
    errorElement.textContent = "Enter a due day from 1 to 31.";
    return false;
  }

  bills.push({
    id: createId(),
    name,
    amount: amountUnknown ? null : amount,
    amountKnown: !amountUnknown,
    dueDay,
    reminderEnabled: false,
    createdAt: new Date().toISOString()
  });

  saveBills();
  renderApp();

  nameInput.value = "";
  amountInput.value = "";
  unknownInput.checked = false;
  amountInput.disabled = false;
  dueDayInput.value = "";

  return true;
}

function addBillFromSetup() {
  const created = createBillFromFields({
    nameInput: setupBillName,
    amountInput: setupBillAmount,
    unknownInput: setupBillUnknown,
    dueDayInput: setupBillDueDay,
    errorElement: billSetupError
  });

  if (created) {
    setupBillName.focus();
  }
}

function addBillFromHome() {
  const created = createBillFromFields({
    nameInput: homeBillName,
    amountInput: homeBillAmount,
    unknownInput: homeBillUnknown,
    dueDayInput: homeBillDueDay,
    errorElement: homeBillError
  });

  if (created) {
    homeBillName.focus();
  }
}

  saveBills();
  renderApp();

  setupBillName.value = "";
  setupBillAmount.value = "";
  setupBillUnknown.checked = false;
  setupBillAmount.disabled = false;
  setupBillDueDay.value = "";

  setupBillName.focus();
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function exportBackup() {
  const payload = {
    app: "Cheq",
    version: 5,
    exportedAt: new Date().toISOString(),
    startDate: START_DATE_KEY,
    profile,
    transactions,
    adjustments,
    bills
  };

  downloadTextFile(
    `cheq-backup-${toDateKey(new Date())}.json`,
    JSON.stringify(payload, null, 2),
    "application/json"
  );
}

function exportCsv() {
  const rows = [["date", "type", "name", "amount", "signed_amount", "created_at"]];

  getAllTransactions()
    .slice()
    .sort((a, b) => {
      return a.dateKey.localeCompare(b.dateKey) || String(a.createdAt).localeCompare(String(b.createdAt));
    })
    .forEach(item => {
      rows.push([
        item.dateKey,
        (TYPES[item.type] || TYPES.expense).label,
        item.name,
        Number(item.amount).toFixed(2),
        getSignedTransactionAmount(item).toFixed(2),
        item.createdAt
      ]);
    });

  const csv = rows
    .map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  downloadTextFile(`cheq-transactions-${toDateKey(new Date())}.csv`, csv, "text/csv");
}

function importBackupFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const confirmed = window.confirm(
        "Restore this Cheq backup? This replaces your current transactions, adjustments, and profile on this device. Bills will only be replaced if the backup file includes bills."
      );

      if (!confirmed) {
        return;
      }

      transactions = normalizeTransactions(parsed.transactions || {});

      adjustments = Array.isArray(parsed.adjustments)
        ? parsed.adjustments
            .map(item => ({
              id: item.id || createId(),
              type: item.type === "minus" ? "minus" : "plus",
              amount: Number(item.amount) || 0,
              note: String(item.note || "Manual adjustment"),
              createdAt: item.createdAt || new Date().toISOString()
            }))
            .filter(item => item.amount > 0)
        : [];

      if (Array.isArray(parsed.bills)) {
        bills = normalizeBills(parsed.bills);
      }

      const startingValue = Number(parsed.profile && parsed.profile.startingNetWorth);

      profile = Number.isFinite(startingValue)
        ? {
            startingNetWorth: startingValue,
            createdAt: parsed.profile.createdAt || new Date().toISOString()
          }
        : {
            startingNetWorth: 0,
            createdAt: new Date().toISOString()
          };

      saveTransactions();
      saveAdjustments();

      if (Array.isArray(parsed.bills)) {
        saveBills();
      }

      saveProfile();
      hideOnboarding();
      renderApp();

      window.alert("Cheq backup restored.");
    } catch (error) {
      console.error("Could not restore Cheq backup", error);
      window.alert("That backup file could not be restored.");
    } finally {
      importBackupInput.value = "";
    }
  };

  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

transactionForm.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(transactionForm);
  const type = String(formData.get("transactionType") || "expense");
  const name = transactionName.value.trim();
  const amount = Number(transactionAmount.value);

  if (!TYPES[type] || !name || !Number.isFinite(amount) || amount <= 0 || selectedDateKey < START_DATE_KEY) {
    return;
  }

  addTransaction(selectedDateKey, {
    id: createId(),
    type,
    name,
    amount,
    createdAt: new Date().toISOString()
  });

  transactionName.value = "";
  transactionAmount.value = "";
  transactionName.focus();
});

adjustmentForm.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(adjustmentForm);
  const type = String(formData.get("adjustmentType") || "plus");
  const amount = Number(adjustmentAmount.value);
  const note = adjustmentNote.value.trim() || "Manual net worth adjustment";

  if (!["plus", "minus"].includes(type) || !Number.isFinite(amount) || amount <= 0) {
    return;
  }

  addAdjustment({
    id: createId(),
    type,
    amount,
    note,
    createdAt: new Date().toISOString()
  });

  adjustmentAmount.value = "";
  adjustmentNote.value = "";
  adjustmentAmount.focus();
});

netWorthForm.addEventListener("submit", event => {
  event.preventDefault();

  const value = Number(startingNetWorth.value);

  if (!Number.isFinite(value)) {
    netWorthError.textContent = "Enter a valid number.";
    return;
  }

  saveStartingNetWorth(value);
});

startAtZeroBtn.addEventListener("click", () => {
  saveStartingNetWorth(0);
});

if (setupBillUnknown) {
  setupBillUnknown.addEventListener("change", () => {
    setupBillAmount.disabled = setupBillUnknown.checked;

    if (setupBillUnknown.checked) {
      setupBillAmount.value = "";
    }
  });
}
if (homeBillUnknown) {
  homeBillUnknown.addEventListener("change", () => {
    homeBillAmount.disabled = homeBillUnknown.checked;

    if (homeBillUnknown.checked) {
      homeBillAmount.value = "";
    }
  });
}
if (billSetupForm) {
  billSetupForm.addEventListener("submit", event => {
    event.preventDefault();
    addBillFromSetup();
  });
}
if (homeBillForm) {
  homeBillForm.addEventListener("submit", event => {
    event.preventDefault();
    addBillFromHome();
  });
}
if (finishSetupButton) {
  finishSetupButton.addEventListener("click", completeOnboarding);
}

if (skipBillsButton) {
  skipBillsButton.addEventListener("click", completeOnboarding);
}

prevMonthBtn.addEventListener("click", () => {
  const previousMonth = new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1, 1);

  if (previousMonth < START_DATE) {
    return;
  }

  visibleDate = previousMonth;
  selectedDateKey = toDateKey(new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1));

  renderApp();
});

nextMonthBtn.addEventListener("click", () => {
  visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 1);
  selectedDateKey = toDateKey(new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 1));

  renderApp();
});

startMonthBtn.addEventListener("click", () => {
  visibleDate = new Date(START_DATE);
  selectedDateKey = START_DATE_KEY;

  switchView("calendar");
  renderApp();
});

openAddBtn.addEventListener("click", () => {
  openDayDrawer(selectedDateKey);
});

openSelectedDayBtn.addEventListener("click", () => {
  openDayDrawer(selectedDateKey);
});

closeDrawerBtn.addEventListener("click", closeDayDrawer);
clearDayBtn.addEventListener("click", clearSelectedDay);
resetOnboardingBtn.addEventListener("click", showOnboarding);
exportBackupBtn.addEventListener("click", exportBackup);
exportCsvBtn.addEventListener("click", exportCsv);
importBackupInput.addEventListener("change", event => importBackupFile(event.target.files[0]));

navItems.forEach(item => {
  item.addEventListener("click", () => {
    switchView(item.dataset.view);
  });
});

filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter || "all";
    filterChips.forEach(item => item.classList.toggle("active", item === chip));
    renderTransactionsView();
  });
});

dayDrawer.addEventListener("click", event => {
  if (event.target === dayDrawer) {
    closeDayDrawer();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && dayDrawer.classList.contains("open")) {
    closeDayDrawer();
  }
});

renderApp();

if (!profile) {
  showOnboarding();
}

window.setTimeout(() => {
  if (appSplash) {
    appSplash.classList.add("hidden");
  }
}, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 650);
