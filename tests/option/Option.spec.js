describe('Option', function () {
  it('undefined is not value', function () {
    var opt = new Option();

    expect(opt.hasValue()).toBeFalsy();
  });

  it('null is not value', function () {
    expect(new Option(null).hasValue()).toBeFalsy();
  });

  it('everything that is defined and is not null is an valid value', function () {
    expect(new Option(1).hasValue()).toBeTruthy();
    expect(new Option([1,2]).hasValue()).toBeTruthy();
    expect(new Option('ala').hasValue()).toBeTruthy();
    expect(new Option({a: 2}).hasValue()).toBeTruthy();
    expect(new Option(0).hasValue()).toBeTruthy();
    expect(new Option([]).hasValue()).toBeTruthy();
    expect(new Option('').hasValue()).toBeTruthy();
    expect(new Option({}).hasValue()).toBeTruthy();
  });

  it('Option.none() creates Option without value', function () {
    expect(Option.none().hasValue()).toBeFalsy();
  });

  it('Option.some() creates Option with value or throws error for empty values', function () {
    expect(Option.some(1).hasValue).toBeTruthy();

    expect(function () {
      Option.some();
    }).toThrow();

    expect(function () {
      Option.some(null);
    }).toThrow();
  });

  it('flatMap transforms value to new Option', function () {
    var opt = Option.some(3).flatMap(function (x) {
      return Option.some(x*3);
    });

    expect(opt.hasValue()).toBeTruthy();
    expect(opt.get()).toBe(9);

    opt = Option.some(3).flatMap(function () {
      return Option.none();
    });
  });

  it('get returns value is option has one or throws error', function () {
    expect(Option.some(3).get()).toBe(3);
    expect(function () {
      Option.none().get();
    }).toThrow();
  });

  it('map apply to transformation to defined value', function () {
    expect(Option.some(4).map(function (x) { return x + 10;}).get()).toBe(14);
  });

  it('filter change option to none if predicate fails', function () {
    expect(Option.some(4).filter(function (x) { return x % 2 == 0}).get()).toBe(4);
    expect(Option.some(3).filter(function (x) { return x % 2 == 0}).hasValue()).toBeFalsy();
  });

  it('getOrElse gets value or returns default', function () {
    expect(Option.some(3).getOrElse(5)).toBe(3);
    expect(Option.none().getOrElse(5)).toBe(5);
  });

  it('lift', function () {
    function add(a, b) {
      return a+b;
    }

    var addLifted = Option.lift(add);

    expect(addLifted(Option.some(1), Option.some(2)).getOrElse('error')).toBe(3);
    expect(addLifted(Option.some(1), Option.none()).getOrElse('error')).toBe('error');
  });
});