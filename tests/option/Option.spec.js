describe('Option', function () {
  it('undefined is not value', function () {
    var opt = new Option();

    expect(opt.hasValue()).toBeFalsy();
  });

  it('null is not value', function () {
    var opt = new Option(null);
  });
});