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
    }
  }, {
    some: {
      value: function some(value) {
        var opt = new Option(value);
        if (!opt.hasValue()) {
          throw new Error("expected defined value that is not null");
        }
        return opt;
      }
    },
    none: {
      value: function none() {
        return new Option();
      }
    }
  });

  return Option;
})();