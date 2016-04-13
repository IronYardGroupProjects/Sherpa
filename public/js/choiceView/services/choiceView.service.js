angular
  .module('choiceView')
  .service('choiceViewService', function($http, $q){

    // pulling in data for all tour categories to display to the user and allow the ability to build custom tour via selection
    function getTourCategories(){
      var defer = $q.defer();
      $http.get('/category')
        .then(function(data){
          defer.resolve(data)
        })
        return defer.promise;
    }
    return{
      getTourCategories:getTourCategories
    }
  })
