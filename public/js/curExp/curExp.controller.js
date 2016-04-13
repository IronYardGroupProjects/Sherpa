var angular = require('angular');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
angular
    .module('curExp')
    .controller('curExpController', function($rootScope, $scope, CurExpService) {
        var vm = this;
        // vm.tours = CurExpService.showTours();
        // vm.tour = CurExpService.showTour();

        CurExpService.getTours()
            .then(function(data) {
                console.log("try it", data);
                // $window.localStorage.setItem('tourId', response);
                vm.tours = data.data;
                // window.glob=data.data;

            });

        vm.sendTour = function (id) {
        CurExpService.sendSelectedTour(id)
        console.log("yay!!!");
        }
    });

//Updated tourID confirmation to send to Alex??
