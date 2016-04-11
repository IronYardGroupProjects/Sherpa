var angular = require('angular');
require('angular-ui-router');

angular
  .module('near', [
    'ui.router'
  ])
  .config(function($stateProvider) {
      $stateProvider
        .state('home.near',{
          url: '/near',
          views: {
            'container': {
              templateUrl: './js/near/templates/near.html',
              controller: 'NearController as NearCtrl'
            }
          },
        })
  })
