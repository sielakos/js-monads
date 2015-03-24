class Option {
  constructor(value) {
    this.value = value;
  }

  static some(value) {
    var opt = new Option(value);
    if (!opt.hasValue()) {
      throw new Error('expected defined value that is not null');
    }
    return opt;
  }

  static none() {
    return new Option();
  }

  hasValue() {
    return this.value !== undefined && this.value !== null;
  }
}