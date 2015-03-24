var listTo10 = [1,2,3,4,5,6,7,8,9,10];

function addValueToElements(list, value) {//Imperative
  var resultList = [];
  var i, len;

  for (i = 0, len = list.length; i < len; i++) {
    resultList.push(list[i] + value);
  }

  return resultList;
}

function addValueToElements2(list, value) {//Functional - recursion
  if (!list.length) {
    return [];
  } else {
    return [list[0] + value].concat(addToElementsValueRecursive(list.slice(1), value))
  }
}

function addValueToElements3(list, value) {//Functional - monad
  return list.map(element => element + value);
}

function mod7andFilterEven(list) {
  return list
    .map(value => value % 7)
    .filter(value => value % 2 == 0);
}

//Promote array to monad
Array.prototype.flatMap = function (fn) {
  var resultList = [];
  var i, len;

  for (i = 0, len = this.length; i < len; i++) {
    resultList = resultList.concat(fn(this[i]));
  }

  return resultList;
};

function mod7andFilterEven2(list) {
  return list
    .flatMap(value => [value % 7])
    .flatMap(value => {
      if (value % 2 == 0) {
        return [value];
      } else {
        return [];
      }
    });
}

Array.prototype.map__ = function (fn) {
  return this.flatMap((x) => [fn(x)]);
};

Array.prototype.filter__ = function (fn) {
 return this.flatMap((x) => {
    if (fn(x)) {
      return [x];
    } else {
      return [];
    }
  });
};

function mod7andFilterEven3(list) {
  return list
    .map__(value => value % 7)
    .filter__(value => value % 2 == 0);
}

function ObseravbleExample1() {
  var source = mod7andFilterEven(Rx.Observable.interval(100).take(10));

  source.subscribe(value => console.log(value));
}