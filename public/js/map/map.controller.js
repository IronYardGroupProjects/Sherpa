var angular = require('angular');
require('../gmaps.min.js');

angular
  .module('map')
  .controller('MapController', function($scope, $state, MapService){
    var vm = this;
    vm.mapOptions = {
      center: {},
      zoom: 15
    }
    vm.tour = [];
    google.maps.event.addDomListener(window, 'load',
      MapService.getLocation().then(function(location){
        console.log(location);
        vm.mapOptions.center = {lat: location.coords.latitude, lng: location.coords.longitude};
        // vm.map = new google.maps.Map(document.getElementById('main-map'), vm.mapOptions);
        // vm.marker = new google.maps.Marker({
        //   position: vm.mapOptions.center,
        //   map: vm.map,
        //   title: 'This Works!'
        // })
        // vm.circle = new google.maps.Circle({
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        //   map: vm.map,
        //   center: vm.mapOptions.center,
        //   radius: 25
        // })
        // vm.marker.addListener(vm.marker, drag, function(){
        //   latLngCenter = new google.maps.LatLng(markerCenter.position.lat(), markerCenter.position.lng());
        //   bounds = vm.circle.getBounds();
        //   if(bounds.contains(latLngCenter)){
        //     console.log("it does!");
        //   }
        // })
        vm.map = new GMaps({
          div: '#main-map',
          lat: 32.778515,
          lng: -79.931657,
          zoom: 18
        })
        // vm.circle = vm.map.drawCircle({
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        //   center: vm.mapOptions.center,
        //   radius: 25
        // })
        // vm.circle1 = vm.map.drawCircle({
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        //   center: {lat: 32.778515, lng: -79.931657},
        //   radius: 25
        // })
        vm.rect = vm.map.drawPolygon({
          paths: [
            [
            32.778619, -79.931985
            ],
            [
            32.778667, -79.931516
            ],
            [
            32.778418, -79.931489
            ],
            [
            32.778376, -79.931961
            ],
          ],
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
        })
        console.log(vm.circle1);
        vm.marker = vm.map.addMarker({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          draggable: true,
          // fences: [vm.circle],
          // outside: function(marker, fence) {
          //   alert('This marker has been moved outside of its fence');
          // }
        })
        vm.map.addMarker({
          lat: 32.778515,
          lng: -79.931657,
          fences: [vm.rect]
        })
        console.log(vm.map.checkGeofence(
          location.coords.latitude,
          location.coords.longitude,
          vm.rect
        ));
        if(vm.map.checkGeofence(
          12,
          -75,
          vm.rect
        )){
          console.log("yes!");
        } else {
          console.log("nope");
        }
      })
    )
  });
