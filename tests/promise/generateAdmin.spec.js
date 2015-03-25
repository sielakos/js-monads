describe('generateAdmin', function () {
  it('generatates admin user for proper name', function (done) {
    generateAdmin('adas').then(function (user) {
      expect(user.name).toBe('adas');
      expect(user.roles).toContain('admin');
      done();
    })
  });

  it('returns error for inproper name', function (done) {
    generateAdmin('error').fail(function (error) {
      expect(error).toBe('wrong name');
      done();
    })
  })
});