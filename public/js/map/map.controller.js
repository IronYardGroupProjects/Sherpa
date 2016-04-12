var angular = require('angular');
require('../gmaps.min.js');

angular
  .module('map')
  .controller('MapController', function($scope, $state, MapService){
    var vm = this;
    vm.tour = [
{
id: 4,
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
point1Lat: -79.926256,
point1Long: 32.791044,
point2Lat: -79.925937,
point2Long: 32.790519,
point3Lat: -79.925376,
point3Long: 32.790652,
point4Lat: -79.925752,
point4Long: 32.791276
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
id: 5,
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
point1Lat: -79.926115,
point1Long: 32.778138,
point2Lat: -79.926095,
point2Long: 32.777923,
point3Lat: -79.925529,
point3Long: 32.77795,
point4Lat: -79.925557,
point4Long: 32.778181
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
id: 6,
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
point1Lat: -79.957917,
point1Long: 32.797208,
point2Lat: -79.953539,
point2Long: 32.799553,
point3Lat: -79.954505,
point3Long: 32.801718,
point4Lat: -79.959247,
point4Long: 32.79977
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
    google.maps.event.addDomListener(window, 'load',
      MapService.getLocation().then(function(location){
        vm.watchID;
        vm.options = {timeout: 1000, enableHighAccuracy: true};
        vm.infowindow = new google.maps.InfoWindow();
        //Initialize Map
        vm.map = new GMaps({
          div: '#main-map',
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          zoom: 18
        });
        //Initialize User marker
        vm.user = vm.map.addMarker({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        //Initialize Tour
        vm.tour.forEach(function(el){
          var fence = [
            el.location.geoFence.point1Lat,
            el.location.geoFence.point1Long,
            el.location.geoFence.point2Lat,
            el.location.geoFence.point2Long,
            el.location.geoFence.point3Lat,
            el.location.geoFence.point3Long,
            el.location.geoFence.point4Lat,
            el.location.geoFence.point4Long
          ];
          var marker = vm.map.addMarker({
            lat: el.location.latitude,
            lng: el.location.longitude,
            fences: [fence],
            location: el.location,
          })
          google.maps.event.addListener(marker, 'click', vm.showInfo)
        })
        //Show information for each point.
        vm.showInfo = function(){
          var _this = this;
          vm.infowindow.setContent({
            '<div class="infowindow">' +
              '<h2>' +
              _this.location.name +
              '</h2>' +
              '<p>' +
              _this.location.streetAddress + 
              '</p>' +
            '</div>'
          })
        }
        //Update User Marker Function
        vm.updateUserMarker = function(position){
          vm.user.setMap(null);
          vm.user = vm.map.addMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if(vm.map.checkGeofence(position.coords.latitude, position.coords.longitude, vm.rect)){
            console.log("geofence!");
            alert("This worked!");
          }
        }
        function errHandler(error){
          console.log(err.code);
        }
        function checkFence(lat, lng, fence, visited){
          if(vm.map.checkGeofence(lat, lng, fence) && !visited) {

          }
        }
        vm.watchID = navigator.geolocation.watchPosition(vm.updateUserMarker, errHandler, vm.options);


      })
    )
  });
