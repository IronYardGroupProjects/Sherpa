var angular = require('angular');
require('../gmaps.min.js');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');

angular
  .module('map')
  .controller('MapController', function($scope, $rootScope, $state, MapService, location, tour){
    var vm = this;
    vm.colors = ['#00EE6F','#102665','#E27820','#00A94F', '#1749D6', '#FFB358','#9DA3B3'];
    vm.fences = [];
    vm.watchID;
    vm.options = {timeout: 5000, enableHighAccuracy: false};
    vm.tour = tour.data;

    //Initialize Map
    vm.map = new GMaps({
      div: '#main-map',
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
    //Initialize User marker
    vm.user = vm.map.addMarker({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      icon: '../../images/sherpaPin.png'
    });
    //Add zoom fit custom map control.
    vm.map.addControl({
      position: 'top_right',
      content: '<i class="fa fa-2x fa-crosshairs"></i>',
      style: {
        margin: '5px',
        padding: '1px 6px',
        color: 'black'
      },
      events: {
        click: function(){
          vm.map.fitZoom();
          vm.map.hideInfoWindows();
        }
      }
    });
    //Initialize Tour
    vm.tour.forEach(function(el, idx, arr){
      //Build fences for each point on the tour
      var fence = vm.map.drawPolygon({
        paths: [
          [
            el.location.geoFence.point1Lat,
            el.location.geoFence.point1Long
          ],
          [
            el.location.geoFence.point2Lat,
            el.location.geoFence.point2Long
          ],
          [
            el.location.geoFence.point3Lat,
            el.location.geoFence.point3Long
          ],
          [
            el.location.geoFence.point4Lat,
            el.location.geoFence.point4Long
          ]
        ],
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0,
      });
      //Push fences to an array in order to check them later
      vm.fences.push({fence: fence, id: el.id});
      //Build navigation path objects for each tour location
      var path = {
                    destination: [el.location.latitude, el.location.longitude],
                    travelMode: 'walking',
                    strokeColor: vm.colors[idx],
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                  }
      //Add a marker to the map for each location
      vm.map.addMarker({
        lat: el.location.latitude,
        lng: el.location.longitude,
        location: el,
        fence: fence,
        path: path,
        click: function(){
          vm.map.panTo({lat: el.location.latitude, lng: el.location.longitude});
          vm.map.setZoom(18);
        },
        infoWindow: {
          content: '<div class="info-window">'
                      + '<h2>'
                      + el.location.name
                      + '</h2>'
                      + '<p>'
                      + el.location.streetAddress
                      + '</p>'
                    +'</div>'
        }
      });
      //Draw each navigation route on the map
      vm.map.drawRoute({
          origin: [vm.user.position.lat(), vm.user.position.lng()],
          destination: [el.location.latitude, el.location.longitude],
          travelMode: 'walking',
          strokeColor: vm.colors[idx],
          strokeOpacity: 0.6,
          strokeWeight: 6
        });
      });
    //Fit the map zoom level for each location on the map
    vm.map.fitZoom();
    //Callback function each time the user's position is checked
    vm.updateUserMarker = function(position){
      vm.user.setMap(null);
      vm.user = vm.map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        icon: '../../images/sherpaPin.png',
        click: function(){
          vm.map.panTo({lat: vm.user.position.lat(), lng: vm.user.position.lng()});
          vm.map.setZoom(18);
        }
      });
      updateRoutes();
      checkFences();
    }
    function errHandler(error){
      console.log(error.code);
    }
    //Update the navigation routes
    function updateRoutes(){
      vm.map.cleanRoute();
      var locations = vm.map.markers.filter(function(el){
        return el.hasOwnProperty('location') && !el.location.isVisited;
      }).forEach(function(el){
        el.path.origin = [vm.user.position.lat(), vm.user.position.lng()];
        vm.map.drawRoute(el.path);
      });
    }
    //Check to see if user is inside a geofence
    function checkFences(){
      vm.fences.forEach(function(el){
        var id = el.id;
        var marker = getFenceLocation(id);
        if(!marker.location.isVisited && vm.map.checkGeofence(vm.user.position.lat(), vm.user.position.lng(), el.fence)) {
          geofenceTrigger(marker, id);
        } else {
          console.log("no fence");
        }
      })
    }
    //Get a location associated with a fence
    function getFenceLocation(id){
      var result = vm.map.markers.filter(function(item){
        return item.hasOwnProperty('location');
      }).filter(function(item){
        return item.location.id === id;
      });
      return result[0];
    }
    //Event that triggers when a geofence is tripped
    function geofenceTrigger(marker, id){
      marker.location.isVisited = true;
      MapService.updateLocation(id);
      var modal = '#' + id;
      $(modal).modal('show');
      marker.infoWindow.setContent(
        '<div class="info-window">'
        + '<h2>'
        + marker.location.location.name
        + '</h2>'
        + '<p>'
        + marker.location.location.streetAddress
        + '</p>'
        + '<button data-toggle="modal" data-target="'
        + modal
        + '">Details</button>'
        +'</div>'
      )
    }
    //Monitor User location and use updateUserMarker callback to move marker and trigger fences.
    vm.watchID = navigator.geolocation.watchPosition(vm.updateUserMarker, errHandler, vm.options);
    //Quit tour
    vm.quit = function(){
      MapService.quitTour().then(function(response){
        $('#quit').modal('hide');
        localStorage.removeItem('activeTour');
        $state.go('landing');
      })
    }
});
