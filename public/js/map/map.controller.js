var angular = require('angular');
require('../gmaps.min.js');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');

angular
  .module('map')
  .controller('MapController', function($scope, $state, MapService){
    var vm = this;
    vm.colors = ['#00EE6F','#102665','#E27820','#00A94F', '#1749D6', '#FFB358','#9DA3B3'];
    vm.routes = [];
    vm.tour = [
{
id: 1,
isVisited: false,
location: {
id: 3,
imageUrl: "http://www.charlestonharbortours.com/assets/img/tours/aquarium/1.jpg",
siteUrl: "http://www.scaquarium.org/",
description: "Massive aquarium with interactive exhibits & hundreds of creatures, including many native species. per www.scaquarium.org",
name: "The Aquarium",
streetAddress: "100 Aquarium Wharf, Charleston, SC 29401",
latitude: 32.790962,
longitude: -79.925485,
geoFence: {
id: 3,
point1Lat: 32.780017,
point1Long: -79.934372,
point2Lat: 32.780040,
point2Long: -79.934177,
point3Lat: 32.779919,
point3Long: -79.934154,
point4Lat: 32.779876,
point4Long: -79.934596
},
categories: [
{
id: 3,
category: {
id: 1,
categoryStr: "entertainment"
}
}
]
}
},
{
id: 2,
isVisited: false,
location: {
id: 5,
imageUrl: "https://s3.amazonaws.com/citybuzz/2015/12/goose-creek-real-estate/goose-creek-real-estate-3.jpg",
siteUrl: "http://www.charlestonparksconservancy.org/our_parks/view_park/waterfront_park/",
description: "Waterfront Park is one of the peninsula's most visited parks. Finished in 1990, Waterfront Park is a favorite of visitors and locals alike, offering fantastic views of the Charleston harbor. The park covers more than 1,000 feet along the coasts and allows visitors a chance to sit and relax after a long day of shopping and sightseeing. Visitors can watch sailboats cruising the waters and large ships heading in and out of the harbor. Old-fashioned park benches dot the park, and family-sized swings offer a fun way to spend a relaxing afternoon together. A large rectangular lawn provides a great spot for picnics and sunning. Walkways are ideal for strolling, and two large fountains make for fantastic places for children to play, splash and cool off. It is one of the parks that boasts floral displays throughout the year. The fountains light at night, offering a truly spectacular scene along the harbor's waterfront. The park is also centrally located near The Market and other great shopping and sightseeing areas. From http://www.charlestonparksconservancy.org/our_parks/view_park/waterfront_park/",
name: "Waterfront Park",
streetAddress: "1 Vendue Range, Charleston, SC 29401",
latitude: 32.778061,
longitude: -79.925759,
geoFence: {
id: 5,
point1Lat: 32.778138,
point1Long: -79.926115,
point2Lat: 32.777923,
point2Long: -79.926095,
point3Lat: 32.77795,
point3Long: -79.925529,
point4Lat: 32.778181,
point4Long: -79.925557
},
categories: [
{
id: 5,
category: {
id: 2,
categoryStr: "parks"
}
}
]
}
},
{
id: 3,
isVisited: false,
location: {
id: 6,
imageUrl: "http://www.sciway.net/sc-photos/wp-content/uploads/hampton-park.jpg",
siteUrl: "http://www.charlestonparksconservancy.org/our_parks/view_park/hampton_park/",
description: "Hampton Park is one of the City of Charleston's largest parks. It boasts the most extensive floral displays of any park in the city. An old rose collection and seasonal displays are planted by the staff and volunteers caring for the park. This neighborhood park has a rich history recently documented through a project of the Charleston Horticultural Society, an audio walking tour called Layers of the Landscape. This park is home to many activities year round. Weddings, family reunions and many Frisbee games are but a few of the diverse activites seen in this park. The physical fitness trail is a popular spot for The Citadel students who live next door to the park. The park is an arboretum of sorts with many interesting species of trees and shrubs that grow in the Lowcountry. It is one of the few City of Charleston parks with restrooms and on-site parking. From http://www.charlestonparksconservancy.org/our_parks/view_park/hampton_park/",
name: "Hampton Park",
streetAddress: "30 Mary Murray Drive, Charleston, South Carolina 29403",
latitude: 32.800613,
longitude: -79.953754,
geoFence: {
id: 6,
point1Lat: 32.797208,
point1Long: -79.957917,
point2Lat: 32.799553,
point2Long: -79.953539,
point3Lat: 32.801718,
point3Long: -79.954505,
point4Lat: 32.79977,
point4Long: -79.959247
},
categories: [
{
id: 6,
category: {
id: 2,
categoryStr: "parks"
}
}
]
}
}
];
    vm.fences = [];
    google.maps.event.addDomListener(window, 'load',
      MapService.getLocation().then(function(location){
        vm.watchID;
        vm.options = {timeout: 1000, enableHighAccuracy: true};
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
          vm.fences.push({fence: fence, id: el.id});
          var path = {
                        destination: [el.location.latitude, el.location.longitude],
                        travelMode: 'walking',
                        strokeColor: vm.colors[idx],
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                      }
          var marker = vm.map.addMarker({
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
          vm.map.drawRoute({
              origin: [vm.user.position.lat(), vm.user.position.lng()],
              destination: [el.location.latitude, el.location.longitude],
              travelMode: 'walking',
              strokeColor: vm.colors[idx],
              strokeOpacity: 0.6,
              strokeWeight: 6
            });
          });
        vm.map.fitZoom();
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
        function updateRoutes(){
          vm.map.cleanRoute();
          var locations = vm.map.markers.filter(function(el){
            return el.hasOwnProperty('location') && !el.location.isVisited;
          }).forEach(function(el){
            console.log(el);
            el.path.origin = [vm.user.position.lat(), vm.user.position.lng()];
            vm.map.drawRoute(el.path);
          });

        }

        function checkFences(){
          vm.fences.forEach(function(el){
            var id = el.id;
            var location = vm.map.markers.filter(function(el){
              return el.hasOwnProperty('location');
            }).filter(function(el){
              return el.location.id === id;
            });
            if(!location[0].location.isVisited && vm.map.checkGeofence(vm.user.position.lat(), vm.user.position.lng(), el.fence)) {
              var marker = location[0];
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
            } else {
              console.log("no fence");
            }
          })
        }
        vm.watchID = navigator.geolocation.watchPosition(vm.updateUserMarker, errHandler, vm.options);
      })
    )
  });
