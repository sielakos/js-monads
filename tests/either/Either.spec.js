describe('Either', function () {
  it('constructor creates new either monad', function () {
    var either = new Either(1, true);

    expect(either instanceof EitherSideMonad).toBeTruthy();
  });

  it('isRight checks if value is on right side', function () {
    var either = new Either(1, true);
    expect(either.isRight()).toBeTruthy();

    either = new Either(1, false);
    expect(either.isRight()).toBeFalsy();
  });

  it('Either.right creates right side either', function () {
    var either = Either.right(1);

    expect(either.isRight()).toBeTruthy();
  });

  it('Either.left create left side either', function () {
    var either = Either.left(1);

    expect(either.isRight()).toBeFalsy();
  });

  it('swap changes side to reverse', function () {
    var either = Either.right(1);

    expect(either.swap().isRight()).toBeFalsy();
    expect(either.swap().swap().isRight()).toBeTruthy();
  });

  it('is right side monad', function () {
    expect(Either.left(1).useRight).toBeTruthy();
    expect(Either.right(1).useRight).toBeTruthy();
  });
});

describe('EitherSideMonad', function () {
  it('then transforms monad', function () {
    var monad = Either.left(2).leftMonad
      .then(function (value, rightFlag) {
        return new Either(value*2, rightFlag);
      });

    expect(monad.getOrElse('error')).toBe(4);
    expect(monad.getEither().isRight()).toBeFalsy();
  });

  it('getEither returns either', function () {
    var monad = Either.left(2).leftMonad;

    expect(monad.getEither().value).toBe(2);
    expect(monad.getEither().isRight()).toBeFalsy();
  });

  it('get returns value or throw other side as error', function () {
    var either = Either.right('value');

    expect(either.get()).toBe('value');
    expect(function () {
      either.leftMonad.get();
    }).toThrow('value');
  });

  it('getOrElse returns value or default', function () {
    expect(Either.left(1).getOrElse('left')).toBe('left');
    expect(Either.right('right').getOrElse('left')).toBe('right');
  });

  it('map transform value and keeps side', function () {
    var monad = Either.left(1).leftMonad.map(function (x) {
      return x + 13;
    });

    expect(monad.get()).toBe(14);
    expect(monad.getEither().isRight()).toBeFalsy();
  });

  it('filters transforms monad to other side if predicate fails with given error as value', function () {
    var monad = Either.right(2)
      .filter(function (x) {
        return x == 2;
      }, 'error');

    expect(monad.getOrElse(300)).toBe(2);

    monad = Either.right(3)
      .filter(function (x) {
        return x !== 3;
      }, 'error');

    expect(monad.getEither().value).toBe('error');
  });

  it('fail is called if value is on other side', function () {
    var failSpy = jasmine.createSpy('failSpy');
    Either.left(1).fail(failSpy);
    expect(failSpy).toHaveBeenCalledWith(1);
  });

  it('success is called if value is on same side', function () {
    var successSpy = jasmine.createSpy('successSpy');
    Either.right(2).success(successSpy);
    expect(successSpy).toHaveBeenCalledWith(2);
  });

  it('lift works on right', function () {
    function add(a, b) {
      return a + b;
    }

    var addLifted = Either.lift(add);

    expect(addLifted(Either.right(1), Either.right(2)).getOrElse('error')).toBe(3);
    expect(function () {
      addLifted(Either.right(1), Either.left('error')).get()
    }).toThrow('error');
  });
});