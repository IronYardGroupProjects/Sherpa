var angular = require('angular');

angular
  .module('map')
  .controller('MapController', function($scope,uiGmapGoogleMapApi, $state){
    vm = this;
    uiGmapGoogleMapApi.then(function(map){
      vm.gMap = {
        "center": {
          lat: 12,
          lng: 12
        },
        "zoom": 1,
        "dragging": true,
      }
    })

  })
