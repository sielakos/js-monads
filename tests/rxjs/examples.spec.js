describe('rx', function () {
  var onNext = Rx.ReactiveTest.onNext,
    onCompleted = Rx.ReactiveTest.onCompleted;

  describe('rxFooBar', function () {
    it('generates async foobar sequence', function () {
      var scheduler = new Rx.TestScheduler();

      var numberSource = scheduler.createColdObservable(
        onNext(150, 1),
        onNext(160, 3),
        onNext(170, 15),
        onNext(180, 10),
        onCompleted(200)
      );

      var source = rxFooBar(numberSource);

      var subSpy = jasmine.createSpy('subSpy');
      source.subscribe(subSpy);

      scheduler.advanceTo(150);
      expect(subSpy).toHaveBeenCalledWith(1);
      expect(subSpy).not.toHaveBeenCalledWith('foo');
      expect(subSpy).not.toHaveBeenCalledWith('foobar');
      expect(subSpy).not.toHaveBeenCalledWith('bar');

      scheduler.advanceTo(160);
      expect(subSpy).toHaveBeenCalledWith('foo');

      scheduler.advanceTo(170);
      expect(subSpy).toHaveBeenCalledWith('foobar');

      scheduler.advanceTo(180);
      expect(subSpy).toHaveBeenCalledWith('bar');
    });
  });

  describe('rxCombineExample', function () {
    it('combines sequences', function () {
      var scheduler = new Rx.TestScheduler();

      var numberSource1 = scheduler.createColdObservable(
        onNext(150, 1),
        onNext(160, 3),
        onNext(170, 15),
        onNext(180, 10),
        onCompleted(200)
      );
      var fooBarSource = rxFooBar(numberSource1);

      var numberSource2 = scheduler.createColdObservable(
        onNext(10, 10),
        onNext(20, 20),
        onNext(30, 30),
        onNext(40, 55),
        onCompleted(60)
      );

      var source = rxCombineExample(fooBarSource, numberSource2);

      var subSpy = jasmine.createSpy('subSpy');
      source.subscribe(subSpy);

      scheduler.advanceTo(100);
      expect(subSpy).not.toHaveBeenCalled();

      scheduler.advanceTo(150);
      expect(subSpy).not.toHaveBeenCalled();

      scheduler.advanceTo(160);
      expect(subSpy).toHaveBeenCalledWith({
        fooBar: 'foo',
        number: 20,
        x: 'dd'
      });

      scheduler.advanceTo(170);
      expect(subSpy).toHaveBeenCalledWith({
        fooBar: 'foobar',
        number: 30,
        x: 'dd'
      });

      scheduler.advanceTo(180);
      expect(subSpy).toHaveBeenCalledWith({
        fooBar: 'bar',
        number: 55,
        x: 'dd'
      });
    });
  });
});

