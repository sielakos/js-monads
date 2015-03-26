
class EitherSideMonad {
  constructor(either, useRight) {
    this.either = either;
    this.useRight = useRight;
  }

  getEither() {
    return this.either;
  }

  get() {
    if (this.isSameSide()) {
      return this.either.value;
    }
    throw this.either.value;
  }

  getOrElse(defaultValue) {
    if (this.isSameSide()) {
      return this.either.value;
    }
    return defaultValue;
  }

  flatMap(fn) {
    if (this.isSameSide()) {
      return fn(this.either.value, this.either.isRight());
    }
  }

  then(successFn, failFn) {
    if (this.isSameSide()) {
      var either = successFn(this.either.value, this.either.isRight());
      return new EitherSideMonad(either, this.useRight);
    } else if (failFn) {
      var either = successFn(this.either.value, this.either.isRight());
      return new EitherSideMonad(either, this.useRight);
    }
    return this;
  }

  map(fn) {
    return this.then((value, rightFlag) => new Either(fn(value), rightFlag));
  }

  filter(predicate, error) {
    error = error || new Error('filter failed');

    return this.then((value, rightFlag) => {
      if (predicate(value)) {
        return this;
      } else {
        return new Either(error, !rightFlag);
      }
    })
  }

  fail(callback) {
    if (!this.isSameSide()) {
      callback(this.either.value);
    }
  }

  success(callback) {
    if (this.isSameSide()) {
      callback(this.either.value);
    }
  }

  isSameSide() {
    return this.either.isRight() === this.useRight;
  }
}

class Either extends EitherSideMonad {
  constructor(value, rightFlag) {
    this.value = value;
    this.rightFlag = rightFlag;

    this.rightMonad = this;
    this.leftMonad = new EitherSideMonad(this, false);

    super(this, true);
  }

  static right(value) {
    return new Either(value, true);
  }

  static left(value) {
    return new Either(value, false);
  }

  isRight() {
    return this.rightFlag;
  }

  swap() {
    return new Either(this.value, !this.rightFlag);
  }

  static lift(fn) {
    return function () {
      var argsEither = Array.prototype.reduce.call(arguments, (argsEither, argEither) => {
        return argsEither.flatMap((args) => argEither.map((arg) => {
          args.push(arg);
          return args;
        }));
      }, Either.right([]));

      return argsEither.map(args => fn.apply(this, args))
    }
  }
}