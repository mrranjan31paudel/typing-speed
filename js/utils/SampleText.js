"use strict";

class SampleText {
  constructor() {
    this.element = document.getElementById('sample-text');
    this.stateElems = {
      totalWords: document.getElementById('total-words'),
      totalChars: document.getElementById('total-chars')
    }

    this.sampleText = '';
    this.stats = {
      totalWords: 0,
      totalChars: 0
    }

    this.loadText = this.loadText.bind(this);
    this.setSampleText = this.setSampleText.bind(this);
    this.setStats = this.setStats.bind(this);
    this.writeSampleText = this.writeSampleText.bind(this);
    this.writeStats = this.writeStats.bind(this);
  }

  setSampleText(text) {
    this.sampleText = text;
  }

  setStats() {
    let nWords = this.sampleText.split(' ').length;
    let nChars = this.sampleText.length;

    let newStats = {
      totalWords: nWords,
      totalChars: nChars
    }

    this.stats = { ...newStats }
  }

  writeSampleText() {
    this.element.innerHTML = this.sampleText;
  }

  writeStats() {
    Object.keys(this.stats).forEach(key => {
      this.stateElems[key].innerText = this.stats[key];
    })
  }

  loadText(setInputElemMaxLength) {
    let that = this;

    this.setSampleText('Loading...')
    this.writeSampleText();
    this.writeStats();

    setTimeout(function () {
      let sampleText = SAMPLE_TEXT; // Later scrape from a web page;

      that.setSampleText(sampleText);
      setInputElemMaxLength();
      that.setStats();
      that.writeSampleText();
      that.writeStats();
    }, 2000)
  }

  reset() {
    this.element.innerHTML = this.sampleText;
  }
}
