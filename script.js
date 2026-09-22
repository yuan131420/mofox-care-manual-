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
