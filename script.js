/* ========================================
   MoFox Care Manual
   Interaction System
======================================== */

const STORAGE_KEY = "mofox-care-manual-v1";
const defaultState = {
  affection: 0,
  petCount: 0,
  chiliCount: 0,
  resonanceTriggered: false,
  pawTriggered: false,
  endingSeen: false,
  visits: 0,
  achievements: []
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...(saved || {}) };
  } catch (error) {
    return { ...defaultState };
  }
}

let state = loadState();
state.visits += 1;

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) {}
}

function clampAffection(value) { return Math.max(0, Math.min(100, value)); }

const achievementNames = {
  "first-meet": "初次見面",
  "careful-reader": "有在認真看欸",
  "fox-pet": "狐狸摸摸",
  "paw": "把爪子伸出去",
  "annoying-hand": "手很賤是不是",
  "chili-attempt": "辣椒謀殺未遂",
  "resonance": "RESONANCE!",
  "returning": "狐狸洞常客",
  "stay": "馴養失敗"
};

function showToast(name) {
  const toast = document.querySelector("#achievement-toast");
  if (!toast) return;
  toast.innerHTML = `🏆 Achievement unlocked：<strong>${name}</strong>`;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function unlockAchievement(id, silent = false) {
  if (state.achievements.includes(id)) return;
  state.achievements.push(id);
  saveState();
  renderAchievements();
  if (!silent) showToast(achievementNames[id] || id);
}

function renderAchievements() {
  document.querySelectorAll("[data-achievement]").forEach(card => {
    const id = card.dataset.achievement;
    if (state.achievements.includes(id)) {
      card.classList.add("unlocked");
      if (id === "stay") {
        card.querySelector(".achievement-icon").textContent = "🦊";
        card.querySelector("h3").textContent = "馴養失敗";
        card.querySelector("p").textContent = "但狐狸似乎願意待在你身邊。";
      }
    }
  });
  const count = document.querySelector("#achievement-count");
  const fill = document.querySelector("#achievement-progress-fill");
  if (count) count.textContent = state.achievements.length;
  if (fill) fill.style.width = `${(state.achievements.length / 9) * 100}%`;
}

const affectionDisplay = document.querySelector("#affection-display");
const affectionMeterFill = document.querySelector("#affection-meter-fill");
function renderAffection() {
  if (affectionDisplay) affectionDisplay.textContent = state.affection;
  if (affectionMeterFill) affectionMeterFill.style.width = state.affection + "%";
}
function updateAffection(amount) {
  state.affection = clampAffection(state.affection + amount);
  saveState();
  renderAffection();
}

/* Intro / pet fox */
const petFoxButton = document.querySelector("#pet-fox");
const foxResponse = document.querySelector(".fox-response");
if (petFoxButton && foxResponse) {
  petFoxButton.addEventListener("click", () => {
    state.petCount += 1;
    unlockAchievement("fox-pet");
    if (state.petCount === 1) {
      updateAffection(-1);
      foxResponse.innerHTML = `🦊「？」<br><span class="affection-change">Affection -1</span>`;
    } else if (state.petCount === 2) {
      foxResponse.innerHTML = `🦊「……你又摸？」`;
    } else if (state.petCount === 3) {
      foxResponse.innerHTML = `🦊「你是不是很閒？」`;
    } else if (state.petCount === 4) {
      foxResponse.innerHTML = `🦊「不要再戳了。」`;
    } else if (state.petCount === 5) {
      updateAffection(-5);
      unlockAchievement("annoying-hand");
      foxResponse.innerHTML = `🦊「……」<br><span class="affection-change">MoFox is annoyed.</span><br><span class="affection-change">Affection -5</span>`;
    } else {
      foxResponse.innerHTML = `🦊「你完了。」`;
    }
    saveState();
  });
}

/* Reading guide navigation */
const startReadingButton = document.querySelector("#start-reading");
const readingGuide = document.querySelector("#reading-guide");
if (startReadingButton && readingGuide) {
  startReadingButton.addEventListener("click", () => readingGuide.scrollIntoView({ behavior: "smooth" }));
}

const guideConfirmButton = document.querySelector("#guide-confirm");
const guideConfirmResponse = document.querySelector("#guide-confirm-response");
const file01 = document.querySelector("#file-01");
if (guideConfirmButton) {
  guideConfirmButton.addEventListener("click", () => {
    unlockAchievement("careful-reader");
    if (guideConfirmResponse) guideConfirmResponse.textContent = "Protocol acknowledged. 🦊　File 01 已開放。";
    if (file01) setTimeout(() => file01.scrollIntoView({ behavior: "smooth" }), 500);
  });
}

/* Chili experiment */
const chiliButton = document.querySelector("#chili-button");
const chiliResponse = document.querySelector("#chili-response");
if (chiliButton && chiliResponse) {
  chiliButton.addEventListener("click", () => {
    state.chiliCount += 1;
    if (state.chiliCount === 1) chiliResponse.innerHTML = `🦊「拿走。」`;
    else if (state.chiliCount === 2) chiliResponse.innerHTML = `🦊「趕快拿走啦！」`;
    else {
      chiliResponse.innerHTML = `🦊「……」<br><span class="affection-change">MoFox is angry.</span>`;
      chiliButton.textContent = "🌶️ 已被研究員沒收";
      chiliButton.disabled = true;
      unlockAchievement("chili-attempt");
    }
    saveState();
  });
}

/* Resonance */
const resonanceButton = document.querySelector("#resonance-button");
const resonanceResult = document.querySelector("#resonance-result");
if (resonanceButton) {
  if (state.resonanceTriggered) {
    resonanceButton.textContent = "✦ 共鳴已確認";
    resonanceButton.disabled = true;
    if (resonanceResult) resonanceResult.innerHTML = `✦ Resonance confirmed.<br><strong>Affection +20</strong>`;
  }
  resonanceButton.addEventListener("click", () => {
    if (state.resonanceTriggered) return;
    state.resonanceTriggered = true;
    updateAffection(20);
    unlockAchievement("resonance");
    if (resonanceResult) resonanceResult.innerHTML = `✦ Resonance confirmed.<br><strong>Affection +20</strong>`;
    resonanceButton.textContent = "✦ 共鳴已確認";
    resonanceButton.disabled = true;
    saveState();
  });
}

/* Feeding experiment */
const safeFoodButton = document.querySelector("#safe-food-button");
const dangerFoodButton = document.querySelector("#danger-food-button");
const feedingExperimentResult = document.querySelector("#feeding-experiment-result");
if (safeFoodButton && feedingExperimentResult) {
  safeFoodButton.addEventListener("click", () => {
    feedingExperimentResult.innerHTML = `<div class="feeding-success">Feeding successful.<br><strong>(狐狸大口咕嚕咕嚕)</strong></div>`;
  });
}
if (dangerFoodButton && feedingExperimentResult) {
  dangerFoodButton.addEventListener("click", () => {
    feedingExperimentResult.innerHTML = `<div class="feeding-failure">⚠️ Feeding failure.<br>Spice tolerance exceeded.<br><br><strong>MoFox has left the server.</strong><br>🦊💨</div>`;
  });
}

/* Paw interaction */
const pawButton = document.querySelector("#paw-button");
const pawResponse = document.querySelector("#paw-response");
if (pawButton) {
  if (state.pawTriggered && pawResponse) {
    pawResponse.textContent = "🦊 (貼貼";
  }
  pawButton.addEventListener("click", () => {
    if (!state.pawTriggered) {
      state.pawTriggered = true;
      unlockAchievement("paw");
      saveState();
    }
    if (pawResponse) pawResponse.textContent = "🦊 (貼貼";
  });
}

/* Ending — narrative, not an affection farming gate */
const endingButton = document.querySelector("#ending-button");
const endingResult = document.querySelector("#ending-result");
function renderEnding() {
  if (!endingResult || !state.endingSeen) return;
  endingResult.innerHTML = `
    <div class="ending-status">Affection Max<br>正在確認馴養狀態……<br>Domestication failed.</div>
    <div class="ending-fail">墨狐無法被馴服。</div>
    <div class="ending-stay">但牠似乎願意待在你身邊。</div>
    <div class="ending-reflection">
      <p>親近從來不是所有權。</p>
      <p><strong>真正珍貴的，是一個自由的生命仍然選擇留下。</strong></p>
      <p>謝謝你來到狐狸洞。</p>
      <p>下次再來的時候，也許狐狸又和今天不太一樣了。</p>
    </div>
    <div class="ending-fox">🦊</div>`;
  if (endingButton) endingButton.textContent = "再次查看研究結果";
}
if (endingButton) {
  endingButton.addEventListener("click", () => {
    const firstView = !state.endingSeen;
    state.endingSeen = true;
    if (firstView) unlockAchievement("stay");
    saveState();
    renderEnding();
  });
}

/* Visit memory */
unlockAchievement("first-meet", true);
if (state.visits >= 2) unlockAchievement("returning", true);
saveState();
renderAffection();
renderAchievements();
renderEnding();

if (state.visits >= 2 && foxResponse && state.petCount === 0) {
  foxResponse.innerHTML = `Identity detected...<br>🦊「你回來啦。我還記得你。」`;
}
