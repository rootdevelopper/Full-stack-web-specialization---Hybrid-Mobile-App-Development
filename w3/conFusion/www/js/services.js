
angular.module('conFusion.services',['ngResource'])
  .constant("baseURL","http://localhost:3000/")
  .factory('menuFactory', ['$resource','baseURL', function($resource, baseURL) {


      return $resource(baseURL + "dishes/:id",null,{'update':{method:'PUT'}});

  }])
  .factory('promotionFactory', ['$resource','baseURL', function($resource, baseURL) {

      return $resource(baseURL + "promotions/:id", null, {'update':{method:'PUT'}});

  }])

  .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

      return $resource(baseURL + 'leadership/:id',null,{'get': {method:'GET'}});


    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service

  }])
  .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    var feedback = {};

    feedback.getFeedback = function functionName() {
      return $resource(baseURL + 'feedback',null,{'save': {method: 'POST'}});
    };

    return feedback;

  }])
  .factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage', function ($resource, baseURL, $localStorage) {

    var favFac = {};
    var favorites = $localStorage.getObject('favLocal', '[]');


    /*favorite.getFavorites = function () {
      return $resource(baseURL + 'favorite',null,{'update': {method: 'PUT'}});
      // body...
    };
      */
    favFac.addToFavorites = function (index) {
      // body...
      for (var i = favorites.length - 1; i >= 0; i--) {
        if(favorites[i].id == index){
          return;
        }
      }
      favorites.push({id: index});

      $localStorage.storeObject('favLocal', favorites);

    };

    favFac.getFavorites = function () {
      return favorites;
    };

    favFac.deleteFromFavorites = function (index) {
      // body...
      for (var i = favorites.length - 1; i >= 0; i--) {
        if(favorites[i].id == index){
          favorites.splice(i,1);
        }
      }
      $localStorage.storeObject('favLocal', favorites);
    };

    return favFac;
  }])
  .factory('$localStorage',['$window', function($window){

    var localStorage = {};

    localStorage.store = function (key, value) {
      $window.localStorage[key] = value;
    };

    localStorage.get = function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    };

    localStorage.storeObject = function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    };

    localStorage.getObject = function (key, defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    };




    return localStorage;

  }]);