angular
  .module('choiceView')
  .service('choiceViewService', function($http, $q){
    function getTourCategories(){
      var defer = $q.defer();
      $http.get('/category')
        .then(function(data){
          defer.resolve(data)
          console.log("we've got data in the service", data);
        })
        return defer.promise;
    }
    return{
      getTourCategories:getTourCategories
    }
  })
