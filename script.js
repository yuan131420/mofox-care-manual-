/* ========================================
   MoFox Care Manual
   Interaction System
======================================== */

const petFoxButton = document.querySelector("#pet-fox");
const foxResponse = document.querySelector(".fox-response");

let affection = 0;
let petCount = 0;

petFoxButton.addEventListener("click", function () {

  petCount += 1;

  // 第一次摸才扣好感
  if (petCount === 1) {
    affection -= 1;

    foxResponse.innerHTML = `
      🦊「？」<br>
      <span class="affection-change">Affection -1</span>
    `;
  }

  // 第二次
  else if (petCount === 2) {
    foxResponse.innerHTML = `
      🦊「……你又摸？」
    `;
  }

  // 第三次
  else if (petCount === 3) {
    foxResponse.innerHTML = `
      🦊「你是不是很閒？」
    `;
  }

  // 第四次
  else if (petCount === 4) {
    foxResponse.innerHTML = `
      🦊「不要再戳了。」
    `;
  }

  // 第五次
  else if (petCount === 5) {
    affection -= 5;

    foxResponse.innerHTML = `
      🦊「……」<br>
      <span class="affection-change">MoFox is annoyed.</span><br>
      <span class="affection-change">Affection -5</span><br><br>
      🏆 Achievement unlocked：手很賤是不是
    `;
  }

  // 第六次以後
  else {
    foxResponse.innerHTML = `
      🦊「你完了。」
    `;
  }

});
/* ========================================
   Reading Guide Navigation
======================================== */

const startReadingButton = document.querySelector("#start-reading");
const readingGuide = document.querySelector("#reading-guide");

startReadingButton.addEventListener("click", function () {

  readingGuide.scrollIntoView({
    behavior: "smooth"
  });

   /* ========================================
   Reading Guide → File 01
======================================== */

const guideConfirmButton = document.querySelector("#guide-confirm");
const guideConfirmResponse = document.querySelector("#guide-confirm-response");
const file01 = document.querySelector("#file-01");

guideConfirmButton.addEventListener("click", function () {

  guideConfirmResponse.textContent =
    "Protocol acknowledged. 🦊　File 01 已開放。";

  setTimeout(function () {

    file01.scrollIntoView({
      behavior: "smooth"
    });

  }, 500);

});
});
/* ========================================
   Chili Experiment
======================================== */

const chiliButton = document.querySelector("#chili-button");
const chiliResponse = document.querySelector("#chili-response");

let chiliCount = 0;

chiliButton.addEventListener("click", function () {

  chiliCount += 1;

  // 第一次
  if (chiliCount === 1) {

    chiliResponse.innerHTML = `
      🦊「拿走。」
    `;

  }

  // 第二次
  else if (chiliCount === 2) {

    chiliResponse.innerHTML = `
      🦊「我說拿走。」
    `;

  }

  // 第三次
  else if (chiliCount === 3) {

    chiliResponse.innerHTML = `
      🦊「……」<br>
      <span class="affection-change">
        MoFox is angry.
      </span>
    `;

    chiliButton.textContent = "🌶️ 已被研究員沒收";
    chiliButton.disabled = true;

  }

});
/* ========================================
   Affection System
======================================== */

const affectionDisplay = document.querySelector("#affection-display");
const affectionMeterFill = document.querySelector("#affection-meter-fill");

function updateAffection(amount) {
  affection += amount;

  if (affection > 100) {
    affection = 100;
  }

  if (affection < 0) {
    affection = 0;
  }

  affectionDisplay.textContent = affection;
  affectionMeterFill.style.width = affection + "%";
}


/* ========================================
   Resonance Event
======================================== */

const resonanceButton = document.querySelector("#resonance-button");
const resonanceResult = document.querySelector("#resonance-result");

let resonanceTriggered = false;

resonanceButton.addEventListener("click", function () {

  if (resonanceTriggered) {
    return;
  }

  resonanceTriggered = true;

  updateAffection(20);

  resonanceResult.innerHTML = `
    ✦ Resonance confirmed.<br>
    <strong>Affection +20</strong>
  `;

  resonanceButton.textContent = "✦ 共鳴已確認";
  resonanceButton.disabled = true;

});
/* ========================================
   Feeding Experiment
======================================== */

const safeFoodButton = document.querySelector("#safe-food-button");
const dangerFoodButton = document.querySelector("#danger-food-button");
const feedingExperimentResult = document.querySelector("#feeding-experiment-result");


safeFoodButton.addEventListener("click", function () {

  feedingExperimentResult.innerHTML = `
    <div class="feeding-success">
      Feeding successful.<br>
      <strong>🦊「可以，這個留下。」</strong>
    </div>
  `;

});


dangerFoodButton.addEventListener("click", function () {

  feedingExperimentResult.innerHTML = `
    <div class="feeding-failure">
      ⚠️ Feeding failure.<br>
      Spice tolerance exceeded.<br><br>
      <strong>MoFox has left the server.</strong><br>
      🦊💨
    </div>
  `;

});
