angular.module('conFusion.controllers', [])



.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage) {

  // initiate log in
   $scope.loginData = $localStorage.getObject('userinfo','{}');

  // call template log in
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // close modal
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // log in function
 $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
   $scope.reservation = {};

  // reserve template
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  //Close modal
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  // Open reservation modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };    
  
})

.controller('MenuController', ['$scope', 'dishes', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', function ($scope, dishes, menuFactory, favoriteFactory, baseURL, $ionicListDelegate) {

            $scope.baseURL = baseURL;
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            //menuFactory.getDishes().query(
         
            //resolve is calling the dishes so just attach the scope
             $scope.dishes = dishes;
    
    //        $scope.dishes = menuFactory.query(
      //      function(response) {
        //            $scope.dishes = response;
          //          $scope.showMenu = true;
            //    },
             //   function(response) {
               //     $scope.message = "Error: "+response.status + " " + response.statusText;
        //        });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
			
			$scope.addFavorite = function (index) {
				console.log("index is " + index);
				favoriteFactory.addToFavorites(index);
				$ionicListDelegate.closeOptionButtons();
			}
			
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

      .controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', function 
                                             ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal) {

    $scope.baseURL = baseURL;
    $scope.dish ={};
    $scope.dish = dish;
            //similar to favorites controller, some of the code can be omited
            
           // $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                                                 /*
            $scope.dish = menuFactory.get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            */

			$ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
			  scope: $scope
		   }).then(function(popover) {
			  $scope.popover = popover;
		   });

		   $scope.openPopover = function($event) {
			  $scope.popover.show($event);
		   };

		   $scope.closePopover = function() {
			  $scope.popover.hide();
		   };

            
			$scope.addFavorite = function (index) {
				console.log("index is " + index);
				favoriteFactory.addToFavorites(index);
				$ionicListDelegate.closeOptionButtons();
			}
	
			$scope.AddComments =function($event){};
			
			// Create the reserve modal that we will use later
			  $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
				scope: $scope
			  }).then(function(modal) {
				$scope.commentform = modal;
			  });

			  // Triggered in the reserve modal to close it
			  $scope.closeComment = function() {
				$scope.commentform.hide();
			  };

			  // Open the reserve modal
			  $scope.Comment = function() {
				$scope.commentform.show();
			  };

			  // Perform the reserve action when the user submits the reserve form
			  $scope.mycomment = {author:"",rating:5,comment:""};
			  $scope.doComment = function() {
				console.log('Doing comment', $scope.comment);
				
				$scope.dish.comments.push($scope.mycomment);
				menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

				// Simulate a reservation delay. Remove this and replace with your reservation
				// code if using a server system
				$timeout(function() {
				  $scope.closeComment();
				}, 1000);
			  }; 
			
        }])
		
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here

.controller('IndexController', ['$scope', 'menuFactory', 'promotionFactory', 'corporateFactory', 'baseURL', function ($scope, menuFactory, promotionFactory, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leader = corporateFactory.get({
        id: 3
    });

    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({
            id: 0
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.promotion = promotionFactory.get({
        id: 0
    });

}])

        .controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function($scope, corporateFactory, baseURL) {
            
					$scope.baseURL = baseURL;
                    $scope.leaders = corporateFactory.query();
                    console.log($scope.leaders);
            
                    }])
					
	.controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favorites = favorites;

    $scope.dishes = dishes;

			//$ionicLoading.show({ template: '<ion-spinner></ion-spinner> Loading...' });

			//$scope.favorites = favoriteFactory.getFavorites();

			//$scope.dishes = menuFactory.getDishes().query(
            //by adding resolve on the index we can eliminate the need for all  this code
        /*
                $scope.dishes = menuFactory.query(
				function (response) {
					$scope.dishes = response;
					$timeout(function () {
						$ionicLoading.hide();
					}, 1000);
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
					$timeout(function () {
						$ionicLoading.hide();
					}, 120);
				});
                */
        
			console.log($scope.dishes, $scope.favorites);

			$scope.toggleDelete = function () {
				$scope.shouldShowDelete = !$scope.shouldShowDelete;
				console.log($scope.shouldShowDelete);
			}

			$scope.deleteFavorite = function (index) {

				var confirmPopup = $ionicPopup.confirm({
					title: 'Confirm Delete',
					template: 'Are you sure you want to delete this item?'
				});

				confirmPopup.then(function (res) {
					if (res) {
						console.log('Ok to delete');
						favoriteFactory.deleteFromFavorites(index);
					} else {
						console.log('Canceled delete');
					}
				});

				$scope.shouldShowDelete = false;

			}
			}])

            .filter('favoriteFilter', function () {
                return function (dishes, favorites) {
                    var out = [];
                    for (var i = 0; i < favorites.length; i++) {
                        for (var j = 0; j < dishes.length; j++) {
                            if (dishes[j].id === favorites[i].id)
                                out.push(dishes[j]);
                        }
                    }
                    return out;

                }})

;