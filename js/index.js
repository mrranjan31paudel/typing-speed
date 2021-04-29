"use strict";

(function () {
  let timer = new Timer;
  let sampleText = new SampleText;
  let textInputArea = new TextArea(sampleText, timer);

  function main() {
    sampleText.loadText(function () {
      textInputArea.prepareTextArea();
    });
  }

  function reset() {
    timer.reset();
    sampleText.reset();
    textInputArea.reset();
  }

  let resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', reset);

  main();
})();