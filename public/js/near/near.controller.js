var angular = require('angular');
require('../gmaps.min.js');

angular
  .module('map')
  .controller('NearController', function($scope, $state, MapService){
    var vm = this;
    google.maps.event.addDomListener(window, 'load',
      MapService.getLocation().then(function(location){
        vm.map = new google.maps.Map(document.getElementById('near-map'), {
          center: {lat: location.coords.latitude, lng: location.coords.longitude},
          zoom: 18
        })
        vm.request = {
          location: {lat: location.coords.latitude, lng: location.coords.longitude},
          radius: '500',
          type: 'restaurant'
        }
        vm.infowindow = new google.maps.InfoWindow();
        console.log(vm.infowindow);
        vm.service = new google.maps.places.PlacesService(vm.map);
        vm.nearSearch = function(results, status){
          if(status === google.maps.places.PlacesServiceStatus.OK){
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              var marker = new google.maps.Marker({
                map: vm.map,
                position: place.geometry.location,
                placeId: place.place_id
              });
              google.maps.event.addListener(marker, 'click', vm.showInfo);
            }
          }
        };
        vm.showInfo = function(){
          var _this = this;
          vm.service.getDetails({placeId: this.placeId}, function(result, status){
            console.log(result);
            vm.infowindow.setContent('<div><strong>' + result.name + '</strong><br>' +
              'Place ID: ' + result.place_id + '<br>' +
              result.formatted_address + '</div>');
            vm.infowindow.open(vm.map, _this);
            vm.map.panTo(result.geometry.location);
          })
        }
        vm.service.radarSearch(vm.request, vm.nearSearch);
    })
  )
 });
