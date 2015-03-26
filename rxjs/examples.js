function rxFooBar(numberSource) {
  return numberSource
    .map(x => {
      if (x % 15 === 0) {
        return 'foobar';
      } else if (x % 3 === 0) {
        return 'foo';
      } else if (x % 5 === 0) {
        return 'bar';
      } else {
        return x;
      }
    });
}

function rxCombineExample(fooBarSource, numbersSource) {
  return Rx.Observable
    .zip(
      fooBarSource,
      numbersSource,
      (fooBar, number) => {
        return {
          fooBar,
          number
        };
      }
    )
    .filter((obj) => obj.number >= 20)
    .map((obj) => {
      obj.x = 'dd';
      return obj;
    });
}