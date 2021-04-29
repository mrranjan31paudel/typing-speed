"use strict";

class Timer {
  constructor() {
    this.time = {
      min: 0,
      sec: 0
    };
    this.started = false;
    this._interval = null;

    this.minuteElem = document.getElementById('minute-elem');
    this.secondElem = document.getElementById('second-elem');

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.updateTimeDisplay = this.updateTimeDisplay.bind(this);
  }

  start() {
    let that = this;
    this.started = true;
    this._interval = setInterval(function () {
      that.time.sec++;

      if (that.time.sec === 60) {
        that.time.min++;
        that.time.sec = 0;
      }

      that.updateTimeDisplay();
    }, 1000)
  }

  stop() {
    if (this._interval) {
      this.started = false;
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  updateTimeDisplay() {
    let minuteStr = this.getPaddedTimeSegment(`${this.time.min}`);
    let secondStr = this.getPaddedTimeSegment(`${this.time.sec}`);

    this.minuteElem.innerText = minuteStr;
    this.secondElem.innerText = secondStr;
  }

  reset() {
    this.stop();
    this.time.min = 0;
    this.time.sec = 0;
    this.updateTimeDisplay();
  }

  getPaddedTimeSegment(timeSegment) {
    if (timeSegment.length === 2) {
      return timeSegment;
    }

    return '0' + timeSegment;
  }
}
