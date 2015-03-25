class Option {
  constructor(value) {
    this.value = value;
  }

  static some(value) {
    var opt = new Option(value);
    if (!opt.hasValue()) {
      throw new Error('expected value that is not null or undefined');
    }
    return opt;
  }

  static none() {
    return new Option();
  }

  hasValue() {
    return this.value !== undefined && this.value !== null;
  }

  get() {
    if (this.hasValue()) {
      return this.value;
    }

    throw new Error('Option is none!');
  }

  flatMap(fn) {
    if (this.hasValue()) {
      return fn(this.value);
    } else {
      return this;
    }
  }

  map(fn) {
    return this.flatMap((x) => Option.some(fn(x)));
  }

  filter(predicate) {
    return this.flatMap((x) => {
      if (predicate(x)) {
        return this;
      } else {
        return Option.none();
      }
    });
  }

  getOrElse(defaultValue) {
    if (this.hasValue()) {
      return this.value;
    }
    return defaultValue;
  }

  static lift(fn) {
    return function () {
      var argsOption = Array.prototype.reduce.call(arguments, (acc, arg) => {
        return acc.flatMap((args) => arg.map(arg => {
          args.push(arg);
          return args;
        }));
      }, Option.some([]));

      return argsOption.map(args => fn.apply(this, args));
    }
  }
}