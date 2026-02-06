class RateLimiter {
  constructor(intervalMs) {
    this.intervalMs = intervalMs;
    this.lastRun = 0;
  }

  async wait() {
    const now = Date.now();
    const elapsed = now - this.lastRun;

    if (elapsed < this.intervalMs) {
      const delay = this.intervalMs - elapsed;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    this.lastRun = Date.now();
  }
}

module.exports = RateLimiter;
