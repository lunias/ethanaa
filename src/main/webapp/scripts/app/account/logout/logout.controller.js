'use strict';

angular.module('ethanaaApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
