"use strict";

function rxFooBar(numberSource) {
  return numberSource.map(function (x) {
    if (x % 15 === 0) {
      return "foobar";
    } else if (x % 3 === 0) {
      return "foo";
    } else if (x % 5 === 0) {
      return "bar";
    } else {
      return x;
    }
  });
}

function rxCombineExample(fooBarSource, numbersSource) {
  return Rx.Observable.zip(fooBarSource, numbersSource, function (fooBar, number) {
    return {
      fooBar: fooBar,
      number: number
    };
  }).filter(function (obj) {
    return obj.number >= 20;
  }).map(function (obj) {
    obj.x = "dd";
    return obj;
  });
}