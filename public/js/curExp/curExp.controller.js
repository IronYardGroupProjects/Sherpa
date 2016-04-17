var angular = require('angular');
var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');
angular
    .module('curExp')
    .controller('curExpController', function($rootScope, $state, $scope, CurExpService) {
        var vm = this;
        CurExpService.getTours()
            .then(function(data) {
                vm.tours = data.data;
            });

        vm.sendTour = function (id) {
          CurExpService.sendSelectedTour(id).then(function(data){;
            localStorage.setItem('activeTour', JSON.stringify(data));
            var modal = '#' + id;
            $state.go('home.map');
            $(modal).modal('hide');
          });
        }
    });

//Updated tourID confirmation to send to Alex??
