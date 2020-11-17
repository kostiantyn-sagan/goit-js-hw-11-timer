class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = this.getRefs(selector);
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.start();
  }

  getRefs(selector) {
    const refs = {};

    refs.daysValue = document.querySelector(`${selector} [data-value="days"]`);
    refs.hoursValue = document.querySelector(
      `${selector} [data-value="hours"]`,
    );
    refs.minsValue = document.querySelector(`${selector} [data-value="mins"]`);
    refs.secsValue = document.querySelector(`${selector} [data-value="secs"]`);

    return refs;
  }

  start() {
    const startTime = this.targetDate.getTime();

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timeComponents = this.getTimeComponents(deltaTime);
      this.updateTimer(timeComponents);

      if (Math.floor(deltaTime / 1000) === 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.daysValue.textContent = days;
    this.refs.hoursValue.textContent = hours;
    this.refs.minsValue.textContent = mins;
    this.refs.secsValue.textContent = secs;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});
