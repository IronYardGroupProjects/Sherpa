angular
  .module('sherpa')
  .factory('CacheService', function($http, $q, $cacheFactory){
      return $cacheFactory('SherpaService');
  });
