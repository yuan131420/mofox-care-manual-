/* ========================================
   MoFox Care Manual
   Interaction System
======================================== */

const petFoxButton = document.querySelector("#pet-fox");
const foxResponse = document.querySelector(".fox-response");

let affection = 0;

petFoxButton.addEventListener("click", function () {

  affection -= 1;

  foxResponse.innerHTML = `
    🦊「？」<br>
    <span class="affection-change">Affection -1</span>
  `;

});
