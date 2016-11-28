'use strict';

angular.module('ethanaaApp', ['ui.router', 'infinite-scroll'])

    .run(function ($rootScope, $location, $window, $state, ENV, VERSION) {

        $rootScope.ENV = ENV;
        $rootScope.VERSION = VERSION;

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {

            var titleKey = 'global.title' ;

            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            // Set the page title key to the one configured in state or use default one
            if (toState.data.pageTitle) {
                titleKey = toState.data.pageTitle;
            }                        
        });

        $rootScope.back = function() {

            // If previous state is 'activate' or do not exist go to 'home'
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            }
        });        
    });
