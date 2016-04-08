var angular = require('angular');

angular
  .module('map')
  .controller('MapController', function($scope,uiGmapGoogleMapApi, $state){
    vm = this;
    console.log("this works too");
    uiGmapGoogleMapApi.then(function(map){
      console.log("map", map);
      vm.gMap = {
        "center": {
          lat: 32,
          lng: -79
        },
        "zoom": 1,
        "dragging": true,
      }
    })

  })
