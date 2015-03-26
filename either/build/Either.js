"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EitherSideMonad = (function () {
  function EitherSideMonad(either, useRight) {
    _classCallCheck(this, EitherSideMonad);

    this.either = either;
    this.useRight = useRight;
  }

  _createClass(EitherSideMonad, {
    getEither: {
      value: function getEither() {
        return this.either;
      }
    },
    get: {
      value: function get() {
        if (this.isSameSide()) {
          return this.either.value;
        }
        throw this.either.value;
      }
    },
    getOrElse: {
      value: function getOrElse(defaultValue) {
        if (this.isSameSide()) {
          return this.either.value;
        }
        return defaultValue;
      }
    },
    flatMap: {
      value: function flatMap(fn) {
        if (this.isSameSide()) {
          return fn(this.either.value, this.either.isRight());
        }
      }
    },
    then: {
      value: function then(successFn, failFn) {
        if (this.isSameSide()) {
          var either = successFn(this.either.value, this.either.isRight());
          return this.createMonad(either);
        } else if (failFn) {
          var either = successFn(this.either.value, this.either.isRight());
          return this.createMonad(either);
        }
        return this;
      }
    },
    createMonad: {
      value: function createMonad(either) {
        if (either.isRight()) {
          return either;
        } else {
          return new EitherSideMonad(either, this.useRight);
        }
      }
    },
    map: {
      value: function map(fn) {
        return this.then(function (value, rightFlag) {
          return new Either(fn(value), rightFlag);
        });
      }
    },
    filter: {
      value: function filter(predicate, error) {
        var _this = this;

        error = error || new Error("filter failed");

        return this.then(function (value, rightFlag) {
          if (predicate(value)) {
            return _this;
          } else {
            return new Either(error, !rightFlag);
          }
        });
      }
    },
    fail: {
      value: function fail(callback) {
        if (!this.isSameSide()) {
          callback(this.either.value);
        }
      }
    },
    success: {
      value: function success(callback) {
        if (this.isSameSide()) {
          callback(this.either.value);
        }
      }
    },
    isSameSide: {
      value: function isSameSide() {
        return this.either.isRight() === this.useRight;
      }
    }
  });

  return EitherSideMonad;
})();

var Either = (function (_EitherSideMonad) {
  function Either(value, rightFlag) {
    _classCallCheck(this, Either);

    this.value = value;
    this.rightFlag = rightFlag;

    this.rightMonad = this;
    this.leftMonad = new EitherSideMonad(this, false);

    _get(Object.getPrototypeOf(Either.prototype), "constructor", this).call(this, this, true);
  }

  _inherits(Either, _EitherSideMonad);

  _createClass(Either, {
    isRight: {
      value: function isRight() {
        return this.rightFlag;
      }
    },
    swap: {
      value: function swap() {
        return new Either(this.value, !this.rightFlag);
      }
    }
  }, {
    right: {
      value: function right(value) {
        return new Either(value, true);
      }
    },
    left: {
      value: function left(value) {
        return new Either(value, false);
      }
    },
    lift: {
      value: function lift(fn) {
        return function () {
          var _this = this;

          var argsEither = Array.prototype.reduce.call(arguments, function (argsEither, argEither) {
            return argsEither.flatMap(function (args) {
              return argEither.map(function (arg) {
                args.push(arg);
                return args;
              });
            });
          }, Either.right([]));

          return argsEither.map(function (args) {
            return fn.apply(_this, args);
          });
        };
      }
    }
  });

  return Either;
})(EitherSideMonad);