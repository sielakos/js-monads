"use strict";

function generateUser(name) {
  var deferred = Q.defer();

  setTimeout(function () {
    if (name === "error") {
      deferred.reject("wrong name");
    } else {
      deferred.resolve({ name: name, roles: [] });
    }
  }, 50);

  return deferred.promise;
}

function generateAdmin(name) {
  return generateUser(name).then(function (user) {
    user.roles.push("admin");
    return user;
  });
}