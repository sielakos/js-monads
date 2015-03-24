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
});