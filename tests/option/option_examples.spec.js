describe('option examples', function () {

  describe('checkNumbers', function () {
    it('return Option.some("ok") if list has only numbers', function () {
      expect(checkNumbers([1, 2, 3, 4]).get()).toBe('ok');
      expect(checkNumbers([1, 2, 'ala', 4]).hasValue()).toBeFalsy();
    });
  });

  describe('divide', function () {
    it('return a/b if possible', function () {
      expect(divide(12, 6).get()).toBe(2);
      expect(divide('x', 6).getOrElse('error')).toBe('error');
      expect(divide(12, 0).getOrElse('error')).toBe('error');
    });
  });

  describe('calculateExpression', function () {
    it('handles expression in Reverse Polish notation', function () {
      expect(calculateExpression([1, 2, '+']).getOrElse('error')).toBe(3);
      expect(calculateExpression([1, 2, '+', 4, '*']).getOrElse('error')).toBe(12);
      expect(calculateExpression([1, 2, '+', 4, '*', 2, '/']).getOrElse('error')).toBe(6);

      expect(calculateExpression([1, 2, '+', 4, '*', 0, '/']).getOrElse('error')).toBe('error');
      expect(calculateExpression([1, 2, '+', 4,  2, '/']).getOrElse('error')).toBe('error');
      expect(calculateExpression([1, 2, '+', 'd', '*', 2, '/']).getOrElse('error')).toBe('error');
    });
  });

  describe('createUser', function () {
    it('creates user if input is correct', function () {
      expect(createUser('alan', 'bartkowiak', 'pasds3f').getOrElse('error')).toEqual({
        name: 'alan',
        surname: 'bartkowiak',
        passHash: 'pasds3f'
      });

      expect(createUser('ala', 'bartk', 'pasd').getOrElse('error')).toBe('error');
    });
  });
});