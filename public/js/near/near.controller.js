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
            var open = (function(){
              if(result.opening_hours && result.opening_hours.open_now){
                  return '<span class="status open"> Open Now</span>';
                } else if (result.opening_hours && !result.opening_hours.open_now) {
                    return '<span class="status closed"> Closed Now</span>';
                } else {
                  return '</span>';
                }
              })()
            var rating = (function(){
              if(result.rating) {
                return result.rating;
              } else {
                return "";
              }
            })()
            vm.infowindow.setContent(
              '<div class="info-window">'
                + '<div class="info-wrap">'
                + '<h3>'
                + result.name
                + '</h3>'
                + '<div class="special-info">'
                + open
                + '<span class="rating"> Rating '
                + rating
                + '/5</span>'
                + '</div>'
                + '<p>'
                + result.formatted_address
                + '</p>'
                + '</div>'
                + '<div class="info-action-links-wrap">'
                + '<a class="info-action-link" href="tel:'
                + result.formatted_phone_number
                + '"><span class="fa-stack fa-lg">'
                + '<i class="fa fa-circle fa-stack-2x"></i>'
                + '<i class="fa fa-phone fa-stack-1x fa-inverse"></i>'
                + '</span></a>'
                + '<a class="info-action-link" href="'
                + result.website
                + '" target="_blank"><span class="fa-stack fa-lg">'
                + '<i class="fa fa-circle fa-stack-2x"></i>'
                + '<i class="fa fa-link fa-stack-1x fa-inverse"></i>'
                + '</span></a>'
                + '</div>'
                + '</div>'
            );
            vm.infowindow.open(vm.map, _this);
            vm.map.panTo(result.geometry.location);
          })
        }
        vm.service.radarSearch(vm.request, vm.nearSearch);
    })
  )
 });
