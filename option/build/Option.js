"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Option = (function () {
  function Option(value) {
    _classCallCheck(this, Option);

    this.value = value;
  }

  _createClass(Option, {
    hasValue: {
      value: function hasValue() {
        return this.value !== undefined && this.value !== null;
      }
    },
    get: {
      value: function get() {
        if (this.hasValue()) {
          return this.value;
        }

        throw new Error("Option is none!");
      }
    },
    flatMap: {
      value: function flatMap(fn) {
        if (this.hasValue()) {
          return fn(this.value);
        } else {
          return this;
        }
      }
    },
    map: {
      value: function map(fn) {
        return this.flatMap(function (x) {
          return Option.some(fn(x));
        });
      }
    },
    filter: {
      value: function filter(predicate) {
        var _this = this;

        return this.flatMap(function (x) {
          if (predicate(x)) {
            return _this;
          } else {
            return Option.none();
          }
        });
      }
    },
    getOrElse: {
      value: function getOrElse(defaultValue) {
        if (this.hasValue()) {
          return this.value;
        }
        return defaultValue;
      }
    }
  }, {
    some: {
      value: function some(value) {
        var opt = new Option(value);
        if (!opt.hasValue()) {
          throw new Error("expected value that is not null or undefined");
        }
        return opt;
      }
    },
    none: {
      value: function none() {
        return new Option();
      }
    },
    lift: {
      value: function lift(fn) {
        return function () {
          var _this = this;

          var argsOption = Array.prototype.reduce.call(arguments, function (acc, arg) {
            return acc.flatMap(function (args) {
              return arg.map(function (arg) {
                args.push(arg);
                return args;
              });
            });
          }, Option.some([]));

          return argsOption.map(function (args) {
            return fn.apply(_this, args);
          });
        };
      }
    }
  });

  return Option;
})();