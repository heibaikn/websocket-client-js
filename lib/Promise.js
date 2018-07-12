module.exports = class {
  constructor() {
    this.resolve;
    this.reject;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
