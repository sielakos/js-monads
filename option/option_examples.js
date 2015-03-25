function checkNumbers(list) {
  return list.reduce(((acc, elem) => acc.filter(status => typeof elem === 'number')), Option.some('ok'));
}

function divide(a, b) {
  return checkNumbers([a, b]).flatMap(status => {
    if (b == 0) {
      return Option.none();
    }

    return Option.some(a / b);
  });
}

function multiply(a, b) {
  return checkNumbers([a, b]).map(status => a * b);
}

function add(a, b) {
  return checkNumbers([a, b]).map(status => a + b);
}

function subtract(a, b) {
  return checkNumbers([a, b]).map(status => a - b);
}

function calculateExpression(list) {
  var opMapping = {
    '/': divide,
    '*': multiply,
    '+': add,
    '-': subtract
  };

  return list.reduce(calculate, Option.some([]))
      .filter(stack => stack.length == 1)
      .map(stack => stack[0]);

  function calculate(acc, current) {
    return acc.flatMap(stack => {
      if (opMapping[current] && stack.length >= 2) {
        var b = stack.pop();
        var a = stack.pop();

        return opMapping[current](a, b).map(result => {
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
  var createUserFromOptions = Option.lift((name, surname, passHash) => {
    return {
      name,
      surname,
      passHash
    };
  });

  return createUserFromOptions(checkString(name), checkString(surname), checkString(passHash));

  function checkString(value) {
    if (typeof value === 'string' && value.length >= 4) {
      return Option.some(value);
    }

    return Option.none();
  }
}




