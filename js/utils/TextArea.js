"use strict";

class TextArea {
  constructor(sampleTextObj, timerObj) {
    this.element = document.getElementById('text-input-area');
    this.resultElements = {
      speed: document.getElementById('result-speed'),
      hitWords: document.getElementById('result-avg-word'),
      hitChars: document.getElementById('result-char-hit'),
      missChars: document.getElementById('result-char-miss'),
      accuracy: document.getElementById('result-accuracy')
    }

    this.sampleTextObj = sampleTextObj;
    this.timerObj = timerObj;
    this.maxLength = 0;
    this.inputStats = {
      hitChars: 0
    }

    this.handlePaste = this.handlePaste.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSampleText = this.updateSampleText.bind(this);
    this.processResult = this.processResult.bind(this);
    this.stopDrill = this.stopDrill.bind(this);
    this.prepareTextArea = this.prepareTextArea.bind(this);
    this.reset = this.reset.bind(this);

    this.element.setAttribute('disabled', 'true');  // Initially disable the text area
    this.element.addEventListener('paste', this.handlePaste);
    this.element.addEventListener('input', this.handleChange);
  }

  handlePaste() {
    this.triedToPaste = true;
    alert("You are cheating yourself, please don't!");
  }

  handleChange(event) {
    let { value } = event.target;

    if (value.length > 0 && !this.timerObj.started) {
      this.timerObj.start();
    }

    this.updateSampleText(value);

    if (value.length >= this.maxLength) {
      this.stopDrill();
    }
  }

  prepareTextArea() {
    this.maxLength = this.sampleTextObj.sampleText.length;
    this.element.removeAttribute('disabled');
    this.element.focus();
  }

  updateSampleText(inputText) {
    const inputLen = inputText.length;
    const sampleText = this.sampleTextObj.sampleText;
    let htmlStr = '';

    let tempHit = '';
    let tempMiss = '';
    let hitChars = 0;

    for (let i = 0; i < inputLen; i++) {
      if (inputText.charAt(i) === sampleText.charAt(i)) {
        if (tempMiss) {
          htmlStr += `<span class="miss-text">${tempMiss}</span>`;
          tempMiss = '';
        }

        tempHit += sampleText.charAt(i);
        continue;
      }

      if (inputText.charAt(i) !== sampleText.charAt(i)) {
        if (tempHit) {
          htmlStr += `<span class="hit-text">${tempHit}</span>`;
          hitChars += tempHit.length;
          tempHit = '';
        }

        tempMiss += sampleText.charAt(i);
      }
    }

    if (tempHit) {
      htmlStr += `<span class="hit-text">${tempHit}</span>`;
      hitChars += tempHit.length;
      tempHit = '';
    }

    if (tempMiss) {
      htmlStr += `<span class="miss-text">${tempMiss}</span>`;
      tempMiss = '';
    }

    let remStr = sampleText.slice(inputLen);
    htmlStr += remStr;
    this.inputStats.hitChars = hitChars;

    this.sampleTextObj.element.innerHTML = htmlStr;
  }

  processResult() {
    if (!this.timerObj.time.min && this.timerObj.time.sec < 5) {
      return alert("You think I don't know anything? Only CTRL + V can type this fast!")
    }

    let totalTimeInMin = this.timerObj.time.min + this.timerObj.time.sec / 60;
    let hitWords = this.inputStats.hitChars / 5;

    let speed = hitWords / totalTimeInMin;
    let accuracy = this.inputStats.hitChars * 100 / this.sampleTextObj.stats.totalChars;

    this.resultElements.speed.innerText = `${speed.toFixed(2)} WPM`;
    this.resultElements.hitWords.innerText = `${hitWords.toFixed(2)}`;
    this.resultElements.hitChars.innerText = `${this.inputStats.hitChars}`;
    this.resultElements.missChars.innerText = `${this.sampleTextObj.stats.totalChars - this.inputStats.hitChars}`;
    this.resultElements.accuracy.innerText = `${accuracy.toFixed(2)}%`;
  }

  stopDrill() {
    this.timerObj.stop();
    this.element.setAttribute('disabled', 'true');

    this.processResult();
  }

  reset() {
    this.element.value = '';
    let isDisabled = this.element.getAttribute('disabled');

    if (isDisabled) {
      this.element.removeAttribute('disabled');
    }
  }
}
