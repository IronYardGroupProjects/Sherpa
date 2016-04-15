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

    // gets all locations for a single category
    function getCategoryLoc(id){
      var defer = $q.defer();
      $http.get('/category/' + id)
        .then(function(data){
          defer.resolve(data)
        })
        return defer.promise;
    }

    // gets all locations for multiple categories
    function getAllCategoryLocs(ids){
      var promises = [];
      ids.forEach(function(el){
        promises.push(getCategoryLoc(el))
      })
      return $q.all(promises)
    }

    // starts the tour
    function startTour(ids){
      var defer = $q.defer();
      $http.post('/tour', {list: ids})
        .then(fuction(data){
          defer.resolve(data)
        })
        return defer.promise;
    }
    return{
      getTourCategories:getTourCategories,
      getCategoryLoc:getCategoryLoc,
      getAllCategoryLocs:getAllCategoryLocs,
      startTour: startTour
    }
  })
