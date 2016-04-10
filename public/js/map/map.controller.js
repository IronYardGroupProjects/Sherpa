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
        vm.watchID;
        vm.options = {timeout: 1000, enableHighAccuracy: true};
        vm.map = new GMaps({
          div: '#main-map',
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          zoom: 18
        })
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
        vm.rect1 = vm.map.drawPolygon({
          paths: [
            [
            32.824805, -80.042642
            ],
            [
            32.824780, -80.042641
            ],
            [
            32.824799, -80.042609
            ],
            [
            32.824761, -80.042607
            ],
          ],
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
        })
        Gmaps.on('click', vm.test, function(){
          vm.overlay = vm.map.drawOverlay({
            content: "<div class='overlay'><h1>Window</h1><p>This is an info window</p></div>"
          })
        })
        vm.test = vm.map.addMarker({
          lat: 32.778619,
          lng: -79.931985
        })
        // vm.tour.forEach(function(el){
        //   vm.map.addMarker({
        //     lat: el.lat,
        //     lng: el.lng,
        //     fences: [el.fence]
        //   })
        // })
        function updateMarker(position){
          vm.user.setMap(null);
          vm.user = vm.map.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            })
          if(vm.map.checkGeofence(position.coords.latitude, position.coords.longitude, vm.rect1)){
            console.log("geofence!");
            alert("This worked!");
          }
        }
        function errHandler(error){
          console.log(err.code);
        }
        vm.user = vm.map.addMarker({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
        vm.watchID = navigator.geolocation.watchPosition(updateMarker, errHandler, vm.options);
      })
    )


    // google.maps.event.addDomListener(window, 'load',
    //   MapService.getLocation().then(function(location){
    //     vm.mapOptions.center = {lat: location.coords.latitude, lng: location.coords.longitude};
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
        // vm.map = new GMaps({
        //   div: '#main-map',
        //   lat: 32.778515,
        //   lng: -79.931657,
        //   zoom: 18
        // })
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
        // vm.rect = vm.map.drawPolygon({
        //   paths: [
        //     [
        //     32.778619, -79.931985
        //     ],
        //     [
        //     32.778667, -79.931516
        //     ],
        //     [
        //     32.778418, -79.931489
        //     ],
        //     [
        //     32.778376, -79.931961
        //     ],
        //   ],
        //   strokeColor: '#FF0000',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#FF0000',
        //   fillOpacity: 0.35,
        // })
        // vm.marker = vm.map.addMarker({
        //   lat: location.coords.latitude,
        //   lng: location.coords.longitude,
        //   draggable: true,
          // fences: [vm.circle],
          // outside: function(marker, fence) {
          //   alert('This marker has been moved outside of its fence');
          // }
    //     })
    //     vm.test = vm.map.addMarker({
    //       lat: 32.778515,
    //       lng: -79.931657,
    //       fences: [vm.rect]
    //     })
    //     console.log(vm.test.position.lat());
    //     if(vm.map.checkGeofence(
    //       32.778515,
    //       -79.931657,
    //       vm.rect
    //     )){
    //       console.log("yes!");
    //     } else {
    //       console.log("nope");
    //     }
    //   })
    // )
  });
