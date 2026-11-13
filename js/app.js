// =========================================================
// НАСТРОЙКИ
// =========================================================
const LEVELS_PER_STAGE = 7;                 // обычных уровней в этапе
const BOSS_LEVEL = LEVELS_PER_STAGE + 1;    // босс = 8-й бой
const BATTLES = BOSS_LEVEL;                 // всего боёв в этапе

const SAVE_KEY = "wordDuelSave";
const ENEMIES = ["👹", "🐲", "🧟", "👻", "🦇", "🤖", "👽"];
const BOSS_EMOJI = "🐉";

// Этапы изучения темы. ready: false = этап ещё не сделан (показывается "Скоро")
const STAGES = [
  { id: "choose", name: "Выбор",  title: "Выбор ответа",   icon: "🎯", ready: true },
  { id: "build",  name: "Сборка", title: "Сборка слова",   icon: "🔤", ready: true },
  { id: "type",   name: "Ввод",   title: "Ввод вручную",   icon: "⌨️", ready: true },
];

// Для тестирования: true = все этапы и уровни открыты сразу
const DEBUG_UNLOCK_ALL = false;

// Слова вводятся порциями: уровни 1-2 = первая треть слов набора,
// 3-4 = две трети, 5-7 и босс = все слова. false = всегда все слова.
const USE_WORD_PORTIONS = true;

// Подписка в будущем: true = все темы открыты сразу, без выбора
const PREMIUM_MODE = false;

// Сколько тем предлагается на выбор
const OFFER_COUNT = 3;

// Звёзды: доля здоровья игрока, оставшаяся к концу боя
const STAR3_MIN_HP = 0.7;
const STAR2_MIN_HP = 0.4;

// Трудность слов (влияет на то, как часто слово выпадает)
const SCORE_WRONG = 1;
const SCORE_SLOW = 0.5;
const SCORE_CORRECT = -0.5;
const SCORE_MAX = 6;
const WEIGHT_PER_SCORE = 1.5;

// Заучивание: этап по слову засчитан, когда ответов правильно подряд
// не меньше MASTER_STREAK и они были минимум в MASTER_DAYS разных дней.
// Для быстрой проверки поставь MASTER_DAYS = 1.
const MASTER_STREAK = 3;
const MASTER_DAYS = 2;

// Сборка слова: добавка ко времени на вопрос за каждую букву (мс)
const BUILD_TIME_PER_LETTER = 800;

// Сборка: сколько в среднем бот тратит на ОДНУ букву (мс).
// На 1-м уровне бот медленный, к боссу плавно ускоряется.
const BUILD_BOT_PER_LETTER_FIRST = 1700;
const BUILD_BOT_PER_LETTER_BOSS = 1000;

// Сборка: бот ошибается чаще, чем в других режимах.
// 1 = как обычно, 0.85 = точность ниже на 15%. Меньше число = бот чаще ошибается.
const BUILD_BOT_ACCURACY_FACTOR = 0.85;

// Ввод вручную: добавка ко времени за каждую букву (мс)
const TYPE_TIME_PER_LETTER = 1000;

// Опечатка в одну букву прощается в словах не короче этой длины.
// Чтобы выключить, поставь 99.
const TYPO_MIN_LENGTH = 7;

// ---------- Режим "Повторение" ----------
const REVIEW_ROUNDS = 12;       // вопросов в одном сеансе (для теста поставь 3)
const REVIEW_MIN_WORDS = 6;     // сколько слов нужно увидеть, чтобы режим открылся
const REVIEW_LEVEL = 3;         // "уровень сложности" заданий (влияет на подсказки и ловушки)

// Параметры боя в повторении. Урон подобран так, чтобы выиграть или проиграть
// было нельзя: 12 раундов * 8 < 100 и 12 * 6 < 100. Если меняешь REVIEW_ROUNDS
// или урон, следи, чтобы это условие сохранялось.
const REVIEW_CONFIG = {
  playerHp: 100,
  enemyHp: 100,
  playerDamage: 8,
  enemyDamage: 6,
  questionTime: 7000,
  botMinTime: 2500,
  botMaxTime: 5500,
  botAccuracy: 0.55,
  nextRoundDelay: 1200
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Параметры БОССА: меняй числа, чтобы настроить
const BOSS_CONFIG = {
  playerHp: 150,
  enemyHp: 300,        // для быстрого теста поставь 50
  playerDamage: 25,
  enemyDamage: 25,
  questionTime: 5000,
  botMinTime: 1000,
  botMaxTime: 3000,
  botAccuracy: 0.9,
  nextRoundDelay: 1200
};

// Параметры обычного уровня n (1-7). Меняй числа, чтобы настроить сложность.
function getLevelConfig(n) {
  if (n === BOSS_LEVEL) return BOSS_CONFIG;
  const t = (n - 1) / (LEVELS_PER_STAGE - 1);
  return {
    playerHp: 100,
    enemyHp: Math.round(lerp(100, 180, t)),
    playerDamage: 25,
    enemyDamage: Math.round(lerp(15, 22, t)),
    questionTime: Math.round(lerp(7000, 5200, t)),
    botMinTime: Math.round(lerp(2500, 1100, t)),
    botMaxTime: Math.round(lerp(5500, 3200, t)),
    botAccuracy: lerp(0.45, 0.88, t),
    nextRoundDelay: 1200
  };
}

// Какие слова набора участвуют в уровне n (порции)
function getLevelWords(set, n) {
  if (!USE_WORD_PORTIONS) return set.words;
  let fraction = 1;
  if (n <= 2) fraction = 1 / 3;
  else if (n <= 4) fraction = 2 / 3;
  return set.words.slice(0, Math.ceil(set.words.length * fraction));
}

// Проверка наборов слов: пишет предупреждения в консоль браузера
function validateWords() {
  const seen = {};
  WORD_SETS.forEach(set => {
    const ruSeen = {};
    if (set.words.length < 4) {
      console.warn("В наборе «" + set.id + "» меньше 4 слов");
    }
    set.words.forEach(w => {
      if (seen[w.en]) {
        console.warn("Слово «" + w.en + "» повторяется в наборах " + seen[w.en] + " и " + set.id);
      }
      seen[w.en] = set.id;
      if (ruSeen[w.ru]) {
        console.warn("Одинаковый перевод «" + w.ru + "» внутри набора " + set.id);
      }
      ruSeen[w.ru] = true;
    });
  });
}
validateWords();

// =========================================================
// ЭЛЕМЕНТЫ СТРАНИЦЫ
// =========================================================
const setsScreen   = document.getElementById("sets-screen");
const setsListEl   = document.getElementById("sets-list");
const modeButtons  = document.querySelectorAll(".mode-btn");
const resetBtn     = document.getElementById("reset-btn");

const mapScreen    = document.getElementById("map-screen");
const mapBackBtn   = document.getElementById("map-back-btn");
const mapTitleEl   = document.getElementById("map-title");
const mapSubtitle  = document.getElementById("map-subtitle");
const stageTabsEl  = document.getElementById("stage-tabs");
const progressBoxEl = document.getElementById("progress-box");
const levelsGrid   = document.getElementById("levels-grid");
const weakWordsEl  = document.getElementById("weak-words");

const gameScreen   = document.getElementById("game");
const backBtn      = document.getElementById("back-btn");
const levelLabelEl = document.getElementById("level-label");
const questionEl   = document.getElementById("question-word");
const modeLabelEl  = document.getElementById("mode-label");
const statusEl     = document.getElementById("status");
const timerFill    = document.getElementById("timer-fill");
const answersEl    = document.getElementById("answers");
const answerButtons = document.querySelectorAll(".answer-btn");

const buildAreaEl  = document.getElementById("build-area");
const slotsEl      = document.getElementById("slots");
const tilesEl      = document.getElementById("tiles");

const typeAreaEl   = document.getElementById("type-area");
const typeHintEl   = document.getElementById("type-hint");
const typeInputEl  = document.getElementById("type-input");
const typeSubmitBtn = document.getElementById("type-submit");

const playerHpEl   = document.getElementById("player-hp");
const enemyHpEl    = document.getElementById("enemy-hp");
const playerCharEl = document.getElementById("player-char");
const enemyCharEl  = document.getElementById("enemy-char");
const enemyNameEl  = document.getElementById("enemy-name");

const overlayEl      = document.getElementById("overlay");
const overlayTitleEl = document.getElementById("overlay-title");
const overlayStarsEl = document.getElementById("overlay-stars");
const overlayTextEl  = document.getElementById("overlay-text");
const restartBtn     = document.getElementById("restart-btn");
const menuBtn        = document.getElementById("menu-btn");

// =========================================================
// СОХРАНЕНИЕ ПРОГРЕССА
// =========================================================
// save.stars:    { basic: { choose: { "1": 3, "8": 2 }, build: {...} }, food: {...} }
// save.stats:    { "apple": { score: 2.5 } }  трудность слов
// save.mastery:  { "apple": { choose: { streak: 2, days: ["2026-11-12"] } } }
// save.last:     { "apple": 1731400000000 }  когда слово встречалось в последний раз
// save.mode:     "en-ru" или "ru-en"
// save.unlocked: ["food", "animals"]  открытые темы (basic открыт всегда)
// save.offers:   ["home", "body", "colors"]  текущая тройка на выбор
// save.picks:    сколько выборов новой темы доступно
// save.claimed:  наборы, за которые выбор уже получен

// Перенос старых форматов сохранения в новый
function migrateStars(oldStars) {
  const out = {};
  const keys = Object.keys(oldStars);
  if (keys.length === 0) return out;

  const allNumeric = keys.every(k => !isNaN(Number(k)));
  const source = allNumeric ? { basic: oldStars } : oldStars;

  Object.keys(source).forEach(setId => {
    const entry = source[setId];
    const entryKeys = Object.keys(entry);
    const isOldLevels = entryKeys.length > 0 && entryKeys.every(k => !isNaN(Number(k)));

    if (isOldLevels) {
      const stage = {};
      for (let n = 1; n <= LEVELS_PER_STAGE; n++) {
        if (entry[n]) stage[n] = entry[n];
      }
      if (entry[9] >= 1) {
        stage[BOSS_LEVEL] = entry[9];
        for (let n = 1; n <= LEVELS_PER_STAGE; n++) {
          if (!stage[n]) stage[n] = 1;
        }
      }
      out[setId] = { choose: stage };
    } else {
      out[setId] = entry;
    }
  });
  return out;
}

function loadSave() {
  const result = {
    stars: {}, stats: {}, mastery: {}, last: {}, mode: "en-ru",
    unlocked: [], offers: [], picks: 0, claimed: []
  };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      result.stats = data.stats || {};
      result.mastery = data.mastery || {};
      result.last = data.last || {};
      if (data.mode === "ru-en") result.mode = "ru-en";
      if (Array.isArray(data.unlocked)) result.unlocked = data.unlocked;
      if (Array.isArray(data.offers)) result.offers = data.offers;
      if (typeof data.picks === "number") result.picks = data.picks;
      if (Array.isArray(data.claimed)) result.claimed = data.claimed;

      if (data.stars) {
        result.stars = migrateStars(data.stars);
      } else if (data.completed) {
        const stage = {};
        for (let n = 1; n <= Math.min(data.completed, LEVELS_PER_STAGE); n++) stage[n] = 1;
        result.stars.basic = { choose: stage };
      }

      // Темы, в которых уже есть звёзды, считаем открытыми
      Object.keys(result.stars).forEach(setId => {
        if (setId === "basic") return;
        const hasStars = Object.values(result.stars[setId]).some(stage =>
          Object.values(stage).some(v => v > 0)
        );
        if (hasStars && !result.unlocked.includes(setId)) {
          result.unlocked.push(setId);
        }
      });
    }
  } catch (e) {}
  return result;
}

function writeSave() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (e) {}
}

let save = loadSave();
let mode = save.mode;

function getStars(setId, stageId, n) {
  return (save.stars[setId] &&
          save.stars[setId][stageId] &&
          save.stars[setId][stageId][n]) || 0;
}

function setStars(setId, stageId, n, value) {
  if (!save.stars[setId]) save.stars[setId] = {};
  if (!save.stars[setId][stageId]) save.stars[setId][stageId] = {};
  save.stars[setId][stageId][n] = value;
}

function isStageBossDone(setId, stageId) {
  return getStars(setId, stageId, BOSS_LEVEL) >= 1;
}

function isStageUnlocked(setId, stageIndex) {
  if (DEBUG_UNLOCK_ALL) return true;
  if (stageIndex === 0) return true;
  return isStageBossDone(setId, STAGES[stageIndex - 1].id);
}

function isLevelUnlocked(setId, stage, n) {
  if (DEBUG_UNLOCK_ALL) return true;
  if (!isStageUnlocked(setId, STAGES.indexOf(stage))) return false;
  return n === 1 || getStars(setId, stage.id, n - 1) >= 1;
}

// Набор "пройден" (даёт выбор новой темы), когда побеждён босс первого этапа
function isSetCompleted(setId) {
  return isStageBossDone(setId, STAGES[0].id);
}

function totalStars(setId) {
  let sum = 0;
  STAGES.filter(s => s.ready).forEach(stage => {
    for (let n = 1; n <= BATTLES; n++) sum += getStars(setId, stage.id, n);
  });
  return sum;
}

function maxStars() {
  return STAGES.filter(s => s.ready).length * BATTLES * 3;
}

// ---------- Трудность слова (частота выпадения) ----------
function getScore(en) {
  return save.stats[en] ? save.stats[en].score : 0;
}

// kind: "correct" | "wrong" | "slow"
function recordResult(en, kind) {
  const change =
    kind === "wrong" ? SCORE_WRONG :
    kind === "slow"  ? SCORE_SLOW  : SCORE_CORRECT;
  const newScore = Math.min(SCORE_MAX, Math.max(0, getScore(en) + change));
  save.stats[en] = { score: newScore };
  save.last[en] = Date.now();               // запоминаем, когда видели слово
  if (reviewActive && kind === "correct") reviewCorrect++;
  writeSave();
}

// ---------- Заучивание слов ----------
function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}

function getMastery(en, stageId) {
  const m = save.mastery[en] && save.mastery[en][stageId];
  return m || { streak: 0, days: [] };
}

// Записываем результат ответа игрока на конкретном этапе
function recordMastery(en, stageId, correct) {
  if (!save.mastery[en]) save.mastery[en] = {};
  const m = getMastery(en, stageId);

  if (correct) {
    m.streak += 1;
    const today = todayStr();
    if (!m.days.includes(today)) m.days.push(today);
  } else {
    m.streak = 0;
    m.days = [];
  }

  save.mastery[en][stageId] = m;
  writeSave();
}

function isStageMastered(en, stageId) {
  const m = getMastery(en, stageId);
  return m.streak >= MASTER_STREAK && m.days.length >= MASTER_DAYS;
}

// Слово выучено, когда засчитаны все готовые этапы
function isWordLearned(en) {
  return STAGES.filter(s => s.ready).every(s => isStageMastered(en, s.id));
}

function isWordStarted(en) {
  return STAGES.filter(s => s.ready).some(s => getMastery(en, s.id).streak > 0);
}

function learnedCount(set) {
  return set.words.filter(w => isWordLearned(w.en)).length;
}

// =========================================================
// ОТКРЫТИЕ ТЕМ
// =========================================================
function isSetUnlocked(set) {
  if (PREMIUM_MODE) return true;
  return set.id === "basic" || save.unlocked.includes(set.id);
}

function availablePicks() {
  if (PREMIUM_MODE) return 0;
  return save.picks;
}

function lockedSets() {
  return WORD_SETS.filter(s => !isSetUnlocked(s));
}

function generateOffers() {
  const locked = lockedSets();
  const tiers = [...new Set(locked.map(s => s.tier))].sort((a, b) => a - b);
  let pool = [];
  for (const t of tiers) {
    pool = pool.concat(shuffle(locked.filter(s => s.tier === t)));
    if (pool.length >= OFFER_COUNT) break;
  }
  return pool.slice(0, OFFER_COUNT).map(s => s.id);
}

function getOffers() {
  if (availablePicks() <= 0 || lockedSets().length === 0) return [];

  const valid = save.offers.filter(id => {
    const s = WORD_SETS.find(x => x.id === id);
    return s && !isSetUnlocked(s);
  });

  if (valid.length === 0) {
    save.offers = generateOffers();
    writeSave();
  } else {
    save.offers = valid;
  }
  return save.offers;
}

function pickTopic(setId) {
  const set = WORD_SETS.find(s => s.id === setId);
  if (!set || availablePicks() <= 0) return;
  if (!save.unlocked.includes(setId)) save.unlocked.push(setId);
  save.picks = Math.max(0, save.picks - 1);
  save.offers = [];
  writeSave();
  showLevels(set);
}

// =========================================================
// СОСТОЯНИЕ ИГРЫ
// =========================================================
let currentSet = WORD_SETS[0];
let currentStage = STAGES[0];
let levelWords = WORD_SETS[0].words;   // слова текущего уровня (порция)
let cfg = getLevelConfig(1);
let currentLevel = 1;
let playerHp = 0;
let enemyHp = 0;
let roundActive = false;
let currentWord = null;
let lastWordEn = "";
let currentCorrectText = "";
let botTimer = null;
let timeoutTimer = null;
let nextStepTimer = null;
let overlayAction = null;
let showWordList = false;   // раскрыт ли список слов на карте
let build = null;           // состояние сборки слова
let typeLockedValue = "";   // что показывается в поле ввода после ответа

// Режим "Повторение"
let reviewActive = false;   // идёт ли сейчас повторение
let reviewRound = 0;        // сколько вопросов уже было
let reviewCorrect = 0;      // сколько ответов верно

// =========================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =========================================================
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function starsHtml(count) {
  let html = "";
  for (let i = 1; i <= 3; i++) {
    html += '<span class="star ' + (i <= count ? "on" : "off") + '">★</span>';
  }
  return html;
}

function clearAllTimers() {
  clearTimeout(botTimer);
  clearTimeout(timeoutTimer);
  clearTimeout(nextStepTimer);
}

function pickWord() {
  const words = levelWords;
  const weights = words.map(w => {
    if (w.en === lastWordEn) return 0;
    return 1 + getScore(w.en) * WEIGHT_PER_SCORE;
  });
  const total = weights.reduce((sum, x) => sum + x, 0);
  let r = Math.random() * total;
  for (let i = 0; i < words.length; i++) {
    r -= weights[i];
    if (r <= 0) return words[i];
  }
  return words[0];
}

function updateHpBars() {
  playerHpEl.style.width = Math.max(0, playerHp) / cfg.playerHp * 100 + "%";
  enemyHpEl.style.width  = Math.max(0, enemyHp)  / cfg.enemyHp  * 100 + "%";
}

function playHit(el) {
  el.classList.remove("hit");
  void el.offsetWidth;
  el.classList.add("hit");
}

function startTimerBar(ms) {
  timerFill.style.transition = "none";
  timerFill.style.width = "100%";
  void timerFill.offsetWidth;
  timerFill.style.transition = "width " + ms + "ms linear";
  timerFill.style.width = "0%";
}

function freezeTimerBar() {
  const currentWidth = getComputedStyle(timerFill).width;
  timerFill.style.transition = "none";
  timerFill.style.width = currentWidth;
}

function showCorrectButton() {
  answerButtons.forEach(btn => {
    if (btn.textContent === currentCorrectText) {
      btn.classList.add("correct");
    }
  });
}

// Подгоняем высоту экрана боя под видимую область, когда открыта клавиатура
function fitToViewport() {
  const vv = window.visualViewport;
  const typing = gameScreen.classList.contains("typing") &&
                 !gameScreen.classList.contains("hidden");
  if (typing && vv) {
    gameScreen.style.height = vv.height + "px";
    gameScreen.style.transform = "translateY(" + vv.offsetTop + "px)";
  } else {
    gameScreen.style.height = "";
    gameScreen.style.transform = "";
  }
}

// =========================================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// =========================================================
function hideAllScreens() {
  clearAllTimers();
  roundActive = false;
  typeInputEl.blur();
  gameScreen.classList.remove("typing");
  fitToViewport();
  overlayEl.classList.add("hidden");
  setsScreen.classList.add("hidden");
  mapScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
}

function showSets() {
  reviewActive = false;
  hideAllScreens();
  setsScreen.classList.remove("hidden");
  renderSets();
}

function defaultStage(setId) {
  const idx = STAGES.findIndex((s, i) =>
    s.ready && isStageUnlocked(setId, i) && !isStageBossDone(setId, s.id)
  );
  return idx >= 0 ? STAGES[idx] : STAGES[0];
}

// Если передан набор: входим в него и выбираем этап по умолчанию.
// Если нет (возврат из боя): остаёмся на том же наборе и этапе.
function showLevels(set) {
  reviewActive = false;
  if (set) {
    currentSet = set;
    currentStage = defaultStage(set.id);
    showWordList = false;
  }
  hideAllScreens();
  mapScreen.classList.remove("hidden");
  renderMap();
}

function showGame() {
  hideAllScreens();
  gameScreen.classList.remove("hidden");
}

// =========================================================
// ЭКРАН НАБОРОВ
// =========================================================
function renderSets() {
  modeButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  setsListEl.innerHTML = "";

  // 1. Блок выбора новой темы
  const offers = getOffers();
  if (offers.length > 0) {
    const box = document.createElement("div");
    box.className = "offer-box";
    box.innerHTML =
      '<div class="offer-title">🎁 Новая тема!</div>' +
      '<div class="offer-sub">Выбери одну из ' + offers.length + "</div>";

    const row = document.createElement("div");
    row.className = "offer-row";

    offers.forEach(id => {
      const set = WORD_SETS.find(s => s.id === id);
      const card = document.createElement("button");
      card.className = "offer-card";
      card.innerHTML =
        '<span class="offer-icon">' + set.icon + "</span>" +
        '<span class="offer-info">' +
          '<div class="offer-name">' + set.name + "</div>" +
          '<div class="offer-count">' + set.words.length + " слов</div>" +
        "</span>";
      card.addEventListener("click", () => pickTopic(id));
      row.appendChild(card);
    });

    box.appendChild(row);
    setsListEl.appendChild(box);
  }

  // 2. Карточка "Повторение"
  const reviewCount = reviewCandidates().length;
  const reviewReady = reviewCount >= REVIEW_MIN_WORDS;
  const reviewCard = document.createElement("button");
  reviewCard.className = "set-card review-card" + (reviewReady ? "" : " locked");
  reviewCard.innerHTML =
    '<span class="set-icon">🔁</span>' +
    '<span class="set-info">' +
      '<div class="set-name">Повторение</div>' +
      '<div class="set-progress">' +
        (reviewReady
          ? "Слов в повторении: " + reviewCount + " · " + REVIEW_ROUNDS + " вопросов"
          : "🔒 Поиграй в наборах: нужно минимум " + REVIEW_MIN_WORDS +
            " слов (сейчас " + reviewCount + ")") +
      "</div>" +
    "</span>";
  if (reviewReady) {
    reviewCard.addEventListener("click", startReview);
  }
  setsListEl.appendChild(reviewCard);

  // 3. Открытые наборы
  WORD_SETS.filter(isSetUnlocked).forEach(set => {
    const card = document.createElement("button");
    card.className = "set-card";

    const progress =
      "✅ " + learnedCount(set) + " / " + set.words.length +
      " · ⭐ " + totalStars(set.id) + " / " + maxStars();

    card.innerHTML =
      '<span class="set-icon">' + set.icon + "</span>" +
      '<span class="set-info">' +
        '<div class="set-name">' + set.name + "</div>" +
        '<div class="set-progress">' + progress + "</div>" +
      "</span>";

    card.addEventListener("click", () => showLevels(set));
    setsListEl.appendChild(card);
  });

  // 4. Подпись про закрытые темы
  const lockedCount = lockedSets().length;
  if (lockedCount > 0) {
    const info = document.createElement("div");
    info.className = "locked-info";
    info.innerHTML =
      "🔒 Ещё не открыто тем: " + lockedCount +
      (offers.length === 0
        ? "<br>Победи босса в любом наборе, чтобы выбрать новую тему."
        : "");
    setsListEl.appendChild(info);
  }
}

// =========================================================
// КАРТА УРОВНЕЙ
// =========================================================
function renderStageTabs() {
  const id = currentSet.id;
  stageTabsEl.innerHTML = "";

  STAGES.forEach((stage, i) => {
    const unlocked = isStageUnlocked(id, i);
    const done = isStageBossDone(id, stage.id);

    const btn = document.createElement("button");
    btn.className = "stage-tab" +
      (stage === currentStage ? " active" : "") +
      (unlocked ? "" : " locked");
    btn.innerHTML =
      '<span class="tab-icon">' + (unlocked ? stage.icon : "🔒") + "</span>" +
      "<span>" + stage.name + (done ? " ✓" : "") + "</span>";

    if (unlocked) {
      btn.addEventListener("click", () => {
        currentStage = stage;
        renderMap();
      });
    }
    stageTabsEl.appendChild(btn);
  });
}

// Блок "Выучено X / N" со списком слов
function renderProgress() {
  const words = currentSet.words;
  const learned = learnedCount(currentSet);
  const learning = words.filter(w => !isWordLearned(w.en) && isWordStarted(w.en)).length;
  const pct = Math.round(learned / words.length * 100);
  const readyStages = STAGES.filter(s => s.ready);

  let html =
    '<div class="progress-head">' +
      '<span class="progress-title">Выучено: ' + learned + " / " + words.length + "</span>" +
      '<span class="progress-sub">В процессе: ' + learning + "</span>" +
    "</div>" +
    '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    '<button id="words-toggle">' + (showWordList ? "Скрыть слова" : "Показать слова") + "</button>";

  if (showWordList) {
    html += '<div class="words-list">';
    words.forEach(w => {
      const learnedWord = isWordLearned(w.en);

      const marks = readyStages.map(s =>
        '<span class="mark ' + (isStageMastered(w.en, s.id) ? "on" : "off") + '">' + s.icon + "</span>"
      ).join("");

      const m = getMastery(w.en, currentStage.id);
      const streakInfo = (!learnedWord && currentStage.ready && m.streak > 0)
        ? '<span class="streak">' + Math.min(m.streak, MASTER_STREAK) + "/" + MASTER_STREAK + "</span>"
        : "";

      html +=
        '<div class="word-row' + (learnedWord ? " learned" : "") + '">' +
          '<span class="word-text"><b>' + w.en + "</b> — " + w.ru + "</span>" +
          '<span class="word-marks">' + streakInfo + marks + "</span>" +
        "</div>";
    });
    html += "</div>";
  }

  progressBoxEl.innerHTML = html;

  document.getElementById("words-toggle").addEventListener("click", () => {
    showWordList = !showWordList;
    renderProgress();
  });
}

function renderMap() {
  mapTitleEl.textContent = currentSet.icon + " " + currentSet.name;
  mapSubtitle.textContent =
    "Слов: " + currentSet.words.length + " · " + currentStage.title;
  levelsGrid.innerHTML = "";

  renderStageTabs();
  renderProgress();

  // Этап ещё не сделан: показываем заглушку
  if (!currentStage.ready) {
    levelsGrid.innerHTML =
      '<div class="stage-soon">🛠 Этап «' + currentStage.title + '» скоро появится.</div>';
    renderWeakWords();
    return;
  }

  const id = currentSet.id;
  const sid = currentStage.id;

  let currentNum = 0;
  for (let n = 1; n <= BATTLES; n++) {
    if (isLevelUnlocked(id, currentStage, n) && getStars(id, sid, n) === 0) {
      currentNum = n;
      break;
    }
  }

  for (let n = 1; n <= BATTLES; n++) {
    const isBoss = n === BOSS_LEVEL;
    const unlocked = isLevelUnlocked(id, currentStage, n);

    const btn = document.createElement("button");
    btn.className = "level-btn";
    if (isBoss) btn.classList.add("boss");
    if (n === currentNum) btn.classList.add("current");
    if (!unlocked) btn.classList.add("locked");

    const label = isBoss ? "👑" : n;
    const bottom = unlocked
      ? '<span class="level-stars">' + starsHtml(getStars(id, sid, n)) + "</span>"
      : '<span class="level-stars">🔒</span>';

    btn.innerHTML = '<span class="level-num">' + label + "</span>" + bottom;

    if (unlocked) {
      btn.addEventListener("click", () => startLevel(n));
    }
    levelsGrid.appendChild(btn);
  }

  renderWeakWords();
}

function renderWeakWords() {
  const weak = currentSet.words
    .map(w => ({ word: w, score: getScore(w.en) }))
    .filter(x => x.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (weak.length === 0) {
    weakWordsEl.innerHTML = "Здесь появятся слова этого набора, в которых ты чаще всего ошибаешься.";
    return;
  }

  weakWordsEl.innerHTML =
    "Сложные слова:<br>" +
    weak.map(x => "<b>" + x.word.en + "</b> — " + x.word.ru).join("<br>");
}

// =========================================================
// РЕЖИМ "ПОВТОРЕНИЕ"
// =========================================================
// Слово считается увиденным, если по нему есть хоть какая-то статистика
function isWordSeen(en) {
  return !!(save.last[en] || save.stats[en] || save.mastery[en]);
}

// Сколько дней прошло с последней встречи со словом
// (если дата неизвестна, считаем, что прошло 2 дня)
function daysSince(en) {
  const t = save.last[en];
  if (!t) return 2;
  return (Date.now() - t) / 86400000;
}

// Все увиденные слова из открытых тем
function reviewCandidates() {
  const out = [];
  WORD_SETS.filter(isSetUnlocked).forEach(set => {
    set.words.forEach(w => {
      if (isWordSeen(w.en)) out.push({ word: w, set: set });
    });
  });
  return out;
}

// Чем выше вес, тем чаще слово попадает в повторение
function reviewWeight(en) {
  let w = 1 + getScore(en) * WEIGHT_PER_SCORE;   // трудные слова чаще
  w += Math.min(daysSince(en), 7) * 0.8;         // давно не видел: чаще
  if (isWordLearned(en)) w *= 0.5;               // выученные реже
  return w;
}

function pickReviewItem() {
  const pool = reviewCandidates().filter(x => x.word.en !== lastWordEn);
  const list = pool.length > 0 ? pool : reviewCandidates();
  const weights = list.map(x => reviewWeight(x.word.en));
  const total = weights.reduce((sum, x) => sum + x, 0);
  let r = Math.random() * total;
  for (let i = 0; i < list.length; i++) {
    r -= weights[i];
    if (r <= 0) return list[i];
  }
  return list[0];
}

// Тип задания: среди этапов, уже открытых в теме слова.
// Этапы, где слово ещё не засчитано, выпадают втрое чаще.
function pickReviewStage(set, word) {
  const options = [];
  STAGES.forEach((st, idx) => {
    if (!st.ready || !isStageUnlocked(set.id, idx)) return;
    options.push({ stage: st, weight: isStageMastered(word.en, st.id) ? 1 : 3 });
  });
  if (options.length === 0) return STAGES[0];

  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let r = Math.random() * total;
  for (const o of options) {
    r -= o.weight;
    if (r <= 0) return o.stage;
  }
  return options[0].stage;
}

function startReview() {
  if (reviewCandidates().length < REVIEW_MIN_WORDS) return;

  reviewActive = true;
  reviewRound = 0;
  reviewCorrect = 0;
  currentLevel = REVIEW_LEVEL;
  cfg = REVIEW_CONFIG;
  playerHp = cfg.playerHp;
  enemyHp = cfg.enemyHp;
  lastWordEn = "";

  enemyCharEl.textContent = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
  enemyNameEl.textContent = "Противник";
  backBtn.textContent = "← Наборы";
  updateHpBars();

  showGame();
  startRound();
}

function endReview() {
  typeInputEl.blur();

  overlayTitleEl.textContent = "Повторение завершено 🔁";
  overlayStarsEl.innerHTML = "";
  overlayStarsEl.style.display = "none";
  overlayTextEl.textContent =
    "Верно: " + reviewCorrect + " из " + REVIEW_ROUNDS +
    ". Слова, в которых ты ошибся, будут попадаться чаще.";
  restartBtn.textContent = "Повторить ещё";
  menuBtn.textContent = "К наборам";
  overlayAction = startReview;

  overlayEl.classList.remove("hidden");
}

// =========================================================
// ХОД БОЯ
// =========================================================
function startLevel(n) {
  const isBoss = n === BOSS_LEVEL;

  reviewActive = false;
  currentLevel = n;
  cfg = getLevelConfig(n);
  levelWords = getLevelWords(currentSet, n);
  playerHp = cfg.playerHp;
  enemyHp = cfg.enemyHp;
  lastWordEn = "";

  enemyCharEl.textContent = isBoss ? BOSS_EMOJI : ENEMIES[(n - 1) % ENEMIES.length];
  enemyNameEl.textContent = isBoss ? "Босс" : "Противник";
  backBtn.textContent = "← Карта";
  levelLabelEl.textContent =
    currentSet.name + " · " + (isBoss ? "Босс 👑" : "Уровень " + n);
  updateHpBars();

  showGame();
  startRound();
}

// Количество букв в слове (без пробелов)
function letterCount(en) {
  return en.replace(/ /g, "").length;
}

// Время на вопрос и время ответа бота. Скорость бота настраивается ТОЛЬКО здесь.
function calcRoundTimes(len) {
  const base = randomBetween(cfg.botMinTime, cfg.botMaxTime);

  if (currentStage.id === "build") {
    const t = (currentLevel - 1) / (BOSS_LEVEL - 1);
    const perLetter = lerp(BUILD_BOT_PER_LETTER_FIRST, BUILD_BOT_PER_LETTER_BOSS, t);
    return {
      questionTime: cfg.questionTime + len * BUILD_TIME_PER_LETTER,
      botTime: len * perLetter * randomBetween(0.8, 1.3)
    };
  }

  if (currentStage.id === "type") {
    return {
      questionTime: cfg.questionTime + len * TYPE_TIME_PER_LETTER,
      botTime: base * (0.6 + 0.15 * len)
    };
  }

  return { questionTime: cfg.questionTime, botTime: base };
}

function startRound() {
  let correct;

  if (reviewActive) {
    // В повторении слово, набор и тип задания выбираются на каждый раунд
    const item = pickReviewItem();
    correct = item.word;
    currentSet = item.set;
    currentStage = pickReviewStage(item.set, item.word);
    levelLabelEl.textContent =
      "Повторение 🔁 · " + (reviewRound + 1) + "/" + REVIEW_ROUNDS;
  } else {
    correct = pickWord();
  }

  currentWord = correct;
  lastWordEn = correct.en;
  statusEl.textContent = "";

  // Поле ввода прячем только вне этапа "Ввод", чтобы клавиатура не закрывалась
  if (currentStage.id !== "type") {
    typeAreaEl.classList.add("hidden");
    gameScreen.classList.remove("typing");
  }

  if (currentStage.id === "build") setupBuildRound(correct);
  else if (currentStage.id === "type") setupTypeRound(correct);
  else setupChooseRound(correct);

  fitToViewport();

  const times = calcRoundTimes(letterCount(correct.en));
  roundActive = true;
  startTimerBar(times.questionTime);

  botTimer = setTimeout(botAnswer, times.botTime);
  timeoutTimer = setTimeout(timeIsUp, times.questionTime);
}

// ---------- Этап "Выбор": 4 варианта ----------
function setupChooseRound(correct) {
  answersEl.classList.remove("hidden");
  buildAreaEl.classList.add("hidden");

  // Неправильные варианты берём из всего набора
  const wrong = shuffle(currentSet.words.filter(w => w !== correct)).slice(0, 3);
  const options = shuffle([correct, ...wrong]);

  const from = mode === "en-ru" ? "en" : "ru";
  const to   = mode === "en-ru" ? "ru" : "en";

  modeLabelEl.textContent =
    mode === "en-ru" ? "Переведи на русский" : "Переведи на английский";
  questionEl.textContent = correct[from];
  questionEl.classList.toggle("long", correct[from].length > 12);
  currentCorrectText = correct[to];

  answerButtons.forEach((btn, i) => {
    btn.textContent = options[i][to];
    btn.classList.remove("correct", "wrong");
  });
}

// ---------- Этап "Сборка": собрать слово из букв ----------
function setupBuildRound(word) {
  const target = word.en.toLowerCase();
  const letters = target.replace(/ /g, "").split("");

  // Лишние буквы-ловушки: 0 на 1-м уровне, до 3 на старших и у босса
  const extra = Math.min(3, Math.floor(currentLevel / 2));
  const decoys = shuffle(
    "abcdefghijklmnopqrstuvwxyz".split("").filter(c => !target.includes(c))
  ).slice(0, extra);

  // Перемешиваем так, чтобы буквы не стояли сразу в правильном порядке
  let order = shuffle([...letters, ...decoys]);
  let tries = 0;
  while (extra === 0 && order.join("") === letters.join("") && tries < 10) {
    order = shuffle(order);
    tries++;
  }

  build = {
    target: target,
    tiles: order.map(ch => ({ ch: ch, used: false })),
    // пробел в слове ставится сам, остальные ячейки пустые
    slots: target.split("").map(ch =>
      ch === " " ? { fixed: true } : { ch: null, tile: null }
    )
  };

  modeLabelEl.textContent = "Собери слово на английском";
  questionEl.textContent = word.ru;
  questionEl.classList.toggle("long", word.ru.length > 12);

  answersEl.classList.add("hidden");
  buildAreaEl.classList.remove("hidden");
  slotsEl.className = "";
  renderBuild();
}

function renderBuild() {
  slotsEl.innerHTML = "";
  build.slots.forEach((slot, i) => {
    const el = document.createElement("div");
    if (slot.fixed) {
      el.className = "slot space";
    } else {
      el.className = "slot" + (slot.ch ? " filled" : "");
      el.textContent = slot.ch || "";
      el.addEventListener("click", () => removeSlot(i));
    }
    slotsEl.appendChild(el);
  });

  tilesEl.innerHTML = "";
  build.tiles.forEach((tile, i) => {
    const btn = document.createElement("button");
    btn.className = "tile" + (tile.used ? " used" : "");
    btn.textContent = tile.ch;
    btn.addEventListener("click", () => placeTile(i));
    tilesEl.appendChild(btn);
  });

  const erase = document.createElement("button");
  erase.className = "tile erase";
  erase.textContent = "⌫";
  erase.addEventListener("click", eraseLast);
  tilesEl.appendChild(erase);
}

// Нажали на букву внизу: она встаёт в первую пустую ячейку
function placeTile(i) {
  if (!roundActive || !build) return;
  const tile = build.tiles[i];
  if (tile.used) return;

  const slotIndex = build.slots.findIndex(s => !s.fixed && !s.ch);
  if (slotIndex === -1) return;

  build.slots[slotIndex].ch = tile.ch;
  build.slots[slotIndex].tile = i;
  tile.used = true;
  renderBuild();

  // Все ячейки заполнены: проверяем ответ
  if (build.slots.every(s => s.fixed || s.ch)) {
    checkBuildGuess();
  }
}

// Нажали на букву в ячейке: она возвращается вниз
function removeSlot(i) {
  if (!roundActive || !build) return;
  const slot = build.slots[i];
  if (slot.fixed || !slot.ch) return;

  build.tiles[slot.tile].used = false;
  slot.ch = null;
  slot.tile = null;
  renderBuild();
}

// Кнопка ⌫: убрать последнюю поставленную букву
function eraseLast() {
  if (!roundActive || !build) return;
  for (let i = build.slots.length - 1; i >= 0; i--) {
    if (!build.slots[i].fixed && build.slots[i].ch) {
      removeSlot(i);
      return;
    }
  }
}

function checkBuildGuess() {
  const guess = build.slots.map(s => (s.fixed ? " " : s.ch)).join("");

  if (guess === build.target) {
    slotsEl.classList.add("correct");
    statusEl.textContent = "Попал!";
    recordResult(currentWord.en, "correct");
    recordMastery(currentWord.en, currentStage.id, true);
    damageEnemy();
  } else {
    slotsEl.classList.add("wrong");
    statusEl.textContent = "Ошибка! Правильно: " + currentWord.en;
    recordResult(currentWord.en, "wrong");
    recordMastery(currentWord.en, currentStage.id, false);
    damagePlayer();
  }
  endRound();
}

// ---------- Этап "Ввод": написать слово ----------
// Подсказка: уровни 1-2 = первая буква + длина, 3-5 = только длина, дальше пусто
function getTypeHint(word) {
  if (currentLevel > 5) return "";
  const showFirst = currentLevel <= 2;
  return word.en.split("").map((ch, i) => {
    if (ch === " ") return "\u00A0\u00A0";
    if (i === 0 && showFirst) return ch.toUpperCase();
    return "_";
  }).join(" ");
}

function setupTypeRound(word) {
  answersEl.classList.add("hidden");
  buildAreaEl.classList.add("hidden");
  typeAreaEl.classList.remove("hidden");
  gameScreen.classList.add("typing");

  modeLabelEl.textContent = "Напиши слово на английском";
  questionEl.textContent = word.ru;
  questionEl.classList.toggle("long", word.ru.length > 12);

  typeHintEl.textContent = getTypeHint(word);
  typeLockedValue = "";
  typeInputEl.value = "";
  typeInputEl.classList.remove("correct", "wrong");
  typeInputEl.focus();
}

// Показать значение в поле и закрасить (после ответа)
function lockType(value, cls) {
  typeLockedValue = value;
  typeInputEl.value = value;
  typeInputEl.classList.remove("correct", "wrong");
  typeInputEl.classList.add(cls);
}

function normalizeAnswer(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

// Сколько правок (вставка, удаление, замена буквы) отделяет одно слово от другого
function editDistance(a, b) {
  const dp = [];
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function submitTypeGuess() {
  if (!roundActive || currentStage.id !== "type") return;

  const guess = normalizeAnswer(typeInputEl.value);
  if (!guess) return;
  const target = currentWord.en.toLowerCase();

  if (guess === target) {
    lockType(currentWord.en, "correct");
    statusEl.textContent = "Попал!";
    recordResult(currentWord.en, "correct");
    recordMastery(currentWord.en, currentStage.id, true);
    damageEnemy();
  } else if (target.length >= TYPO_MIN_LENGTH && editDistance(guess, target) === 1) {
    // Опечатка в одну букву: бьём противника, но серия заучивания не растёт
    lockType(currentWord.en, "correct");
    statusEl.textContent = "Почти! Пишется: " + currentWord.en;
    recordResult(currentWord.en, "slow");
    damageEnemy();
  } else {
    lockType(typeInputEl.value.trim(), "wrong");
    statusEl.textContent = "Ошибка! Правильно: " + currentWord.en;
    recordResult(currentWord.en, "wrong");
    recordMastery(currentWord.en, currentStage.id, false);
    damagePlayer();
  }
  endRound();
}

// Показать правильный ответ (когда ответил бот или вышло время)
function revealCorrect() {
  if (currentStage.id === "build") {
    build.slots.forEach((s, i) => {
      if (!s.fixed) s.ch = build.target[i];
    });
    build.tiles.forEach(t => (t.used = true));
    renderBuild();
    slotsEl.classList.add("correct");
  } else if (currentStage.id === "type") {
    lockType(currentWord.en, "correct");
  } else {
    showCorrectButton();
  }
}

function endRound() {
  roundActive = false;
  clearTimeout(botTimer);
  clearTimeout(timeoutTimer);
  freezeTimerBar();

  // Повторение: бой идёт фиксированное число раундов
  if (reviewActive) {
    reviewRound++;
    nextStepTimer = setTimeout(
      reviewRound >= REVIEW_ROUNDS ? endReview : startRound,
      cfg.nextRoundDelay
    );
    return;
  }

  if (playerHp <= 0 || enemyHp <= 0) {
    nextStepTimer = setTimeout(endGame, cfg.nextRoundDelay);
  } else {
    nextStepTimer = setTimeout(startRound, cfg.nextRoundDelay);
  }
}

function damageEnemy() {
  enemyHp -= cfg.playerDamage;
  updateHpBars();
  playHit(enemyCharEl);
}

function damagePlayer() {
  playerHp -= cfg.enemyDamage;
  updateHpBars();
  playHit(playerCharEl);
}

// Ответ игрока на этапе "Выбор"
function handlePlayerAnswer(clickedBtn) {
  if (!roundActive || currentStage.id !== "choose") return;

  const isCorrect = clickedBtn.textContent === currentCorrectText;

  if (isCorrect) {
    clickedBtn.classList.add("correct");
    statusEl.textContent = "Попал!";
    recordResult(currentWord.en, "correct");
    recordMastery(currentWord.en, currentStage.id, true);
    damageEnemy();
  } else {
    clickedBtn.classList.add("wrong");
    showCorrectButton();
    statusEl.textContent = "Ошибка!";
    recordResult(currentWord.en, "wrong");
    recordMastery(currentWord.en, currentStage.id, false);
    damagePlayer();
  }
  endRound();
}

function botAnswer() {
  if (!roundActive) return;

  const accuracy = currentStage.id === "build"
    ? cfg.botAccuracy * BUILD_BOT_ACCURACY_FACTOR
    : cfg.botAccuracy;
  const botIsCorrect = Math.random() < accuracy;

  if (botIsCorrect) {
    revealCorrect();
    statusEl.textContent = "Противник ответил быстрее!";
    recordResult(currentWord.en, "slow");
    // для заучивания это нейтральный исход: серия не меняется
    damagePlayer();
    endRound();
  } else {
    statusEl.textContent = "Противник ошибся!";
  }
}

function timeIsUp() {
  if (!roundActive) return;
  revealCorrect();
  statusEl.textContent =
    currentStage.id !== "choose"
      ? "Время вышло! Правильно: " + currentWord.en
      : "Время вышло!";
  recordResult(currentWord.en, "wrong");
  recordMastery(currentWord.en, currentStage.id, false);
  endRound();
}

function calcStars() {
  const ratio = Math.max(0, playerHp) / cfg.playerHp;
  if (ratio >= STAR3_MIN_HP) return 3;
  if (ratio >= STAR2_MIN_HP) return 2;
  return 1;
}

function endGame() {
  typeInputEl.blur();
  menuBtn.textContent = "К уровням";

  const playerWon = enemyHp <= 0;
  const isBoss = currentLevel === BOSS_LEVEL;

  if (playerWon) {
    const stars = calcStars();
    if (stars > getStars(currentSet.id, currentStage.id, currentLevel)) {
      setStars(currentSet.id, currentStage.id, currentLevel, stars);
      writeSave();
    }

    overlayTitleEl.textContent = isBoss ? "Босс повержен! 👑" : "Победа! 🎉";
    overlayStarsEl.innerHTML = starsHtml(stars);
    overlayStarsEl.style.display = "block";

    if (isBoss) {
      const stageIdx = STAGES.indexOf(currentStage);

      // Первая победа над боссом первого этапа в наборе даёт один выбор темы
      if (stageIdx === 0 && !save.claimed.includes(currentSet.id)) {
        save.claimed.push(currentSet.id);
        save.picks += 1;
        writeSave();
      }

      const hasPick = stageIdx === 0 && availablePicks() > 0 && lockedSets().length > 0;
      const next = STAGES[stageIdx + 1];

      let text = "Этап «" + currentStage.title + "» темы «" + currentSet.name + "» пройден!";
      if (hasPick) text += " Тебя ждёт выбор новой темы.";
      if (next) text += " Открылся следующий этап: «" + next.title + "».";
      overlayTextEl.textContent = text;

      if (hasPick) {
        restartBtn.textContent = "К наборам";
        overlayAction = showSets;
      } else {
        restartBtn.textContent = "К уровням";
        overlayAction = () => showLevels();
      }
    } else if (currentLevel === LEVELS_PER_STAGE) {
      overlayTextEl.textContent = "Уровень " + currentLevel + " пройден. Впереди босс!";
      restartBtn.textContent = "Сразиться с боссом";
      overlayAction = () => startLevel(BOSS_LEVEL);
    } else {
      overlayTextEl.textContent = "Уровень " + currentLevel + " пройден.";
      restartBtn.textContent = "Следующий уровень";
      overlayAction = () => startLevel(currentLevel + 1);
    }
  } else {
    overlayTitleEl.textContent = "Поражение 💀";
    overlayStarsEl.innerHTML = "";
    overlayStarsEl.style.display = "none";
    overlayTextEl.textContent =
      "Слова, в которых ты ошибся, теперь будут попадаться чаще.";
    restartBtn.textContent = "Ещё раз";
    overlayAction = () => startLevel(currentLevel);
  }

  overlayEl.classList.remove("hidden");
}

// =========================================================
// ЗАПУСК
// =========================================================
answerButtons.forEach(btn => {
  btn.addEventListener("click", () => handlePlayerAnswer(btn));
});

restartBtn.addEventListener("click", () => overlayAction && overlayAction());
menuBtn.addEventListener("click", () => (reviewActive ? showSets() : showLevels()));
backBtn.addEventListener("click", () => (reviewActive ? showSets() : showLevels()));
mapBackBtn.addEventListener("click", showSets);

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    mode = btn.dataset.mode;
    save.mode = mode;
    writeSave();
    renderSets();
  });
});

resetBtn.addEventListener("click", () => {
  if (confirm("Сбросить весь прогресс и статистику слов?")) {
    save = {
      stars: {}, stats: {}, mastery: {}, last: {}, mode: mode,
      unlocked: [], offers: [], picks: 0, claimed: []
    };
    writeSave();
    renderSets();
  }
});

typeSubmitBtn.addEventListener("pointerdown", e => e.preventDefault()); // не закрывать клавиатуру
typeSubmitBtn.addEventListener("click", submitTypeGuess);

typeInputEl.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    submitTypeGuess();
  }
});

// Пока идёт пауза между раундами, текст в поле менять нельзя
typeInputEl.addEventListener("input", () => {
  if (!roundActive) typeInputEl.value = typeLockedValue;
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", fitToViewport);
  window.visualViewport.addEventListener("scroll", fitToViewport);
}

showSets();