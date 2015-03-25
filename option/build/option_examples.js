"use strict";

function checkNumbers(list) {
  return list.reduce(function (acc, elem) {
    return acc.filter(function (status) {
      return typeof elem === "number";
    });
  }, Option.some("ok"));
}

function divide(a, b) {
  return checkNumbers([a, b]).flatMap(function (status) {
    if (b == 0) {
      return Option.none();
    }

    return Option.some(a / b);
  });
}

function multiply(a, b) {
  return checkNumbers([a, b]).map(function (status) {
    return a * b;
  });
}

function add(a, b) {
  return checkNumbers([a, b]).map(function (status) {
    return a + b;
  });
}

function subtract(a, b) {
  return checkNumbers([a, b]).map(function (status) {
    return a - b;
  });
}

function calculateExpression(list) {
  var opMapping = {
    "/": divide,
    "*": multiply,
    "+": add,
    "-": subtract
  };

  return list.reduce(calculate, Option.some([])).filter(function (stack) {
    return stack.length == 1;
  }).map(function (stack) {
    return stack[0];
  });

  function calculate(acc, current) {
    return acc.flatMap(function (stack) {
      if (opMapping[current] && stack.length >= 2) {
        var b = stack.pop();
        var a = stack.pop();

        return opMapping[current](a, b).map(function (result) {
          stack.push(result); //Yes, state is used here
          return stack;
        });
      } else {
        stack.push(current); //and here, but it doesn't matter
        return Option.some(stack);
      }
    });
  }
}

function createUser(name, surname, passHash) {
  var createUserFromOptions = Option.lift(function (name, surname, passHash) {
    return {
      name: name,
      surname: surname,
      passHash: passHash
    };
  });

  return createUserFromOptions(checkString(name), checkString(surname), checkString(passHash));

  function checkString(value) {
    if (typeof value === "string" && value.length >= 4) {
      return Option.some(value);
    }

    return Option.none();
  }
}