var _ = require('lodash');
var expect = chai.expect;
var should = chai.should();
require('../gmaps.min.js');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');

describe("When displaying the map", function(){

  beforeEach(function(){
    tour = [{
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
      }
    ];
    location = {
      coords: {
        latitude: 32.779940,
        longitude: -79.934197
      }
    }
  });

  it('should draw a map at the given coordinates', function(){

  })



})
