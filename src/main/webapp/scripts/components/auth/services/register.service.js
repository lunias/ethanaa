'use strict';

angular.module('ethanaaApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


