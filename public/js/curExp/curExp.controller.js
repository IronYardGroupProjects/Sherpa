var angular = require('angular');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
angular
    .module('curExp')
    .controller('curExpController', function($rootScope, $state, $scope, CurExpService) {
        var vm = this;
        // vm.tours = CurExpService.showTours();
        // vm.tour = CurExpService.showTour();

        CurExpService.getTours()
            .then(function(data) {
                // $window.localStorage.setItem('tourId', response);
                vm.tours = data.data;
                // window.glob=data.data;

            });

        vm.sendTour = function (id) {
          CurExpService.sendSelectedTour(id).then(function(data){;
            localStorage.setItem('activeTour', JSON.stringify(data));
            var modal = '#' + id;
            $(modal).modal('hide');
            $state.go('home.map');
          });
        }
    });

//Updated tourID confirmation to send to Alex??
