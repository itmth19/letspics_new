angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$stateParams,$http) {
  $scope.items = [];
  $scope.items =  [
    { id: 0, likes: '', img:''},
  ];
  
  
  
  user_id = 1;//for testing
  
  var request =  $http({
                        method: "get",
                        url: "http://localhost:8888/user",
                        params: {
                            user_id: user_id
                        }
                    });
   request.success(
                    function( html ) {
                        $scope.user = html
                    }
                );
   
  console.log($scope.user);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams,$timeout,$http, Friends) {
  //get friend from server
  $scope.friend = Friends.get($stateParams.friendId);
  //get messages
  $scope.messages = [];//get messages from the server
  
  $scope.loadMore = function(){
    //get more message from the server
  };  
})


.controller('SearchCtrl', function($scope, Searchlist) {
  $scope.searchlist = Searchlist.all();
  $scope.getSearchItemImageLink = function(searchitem){
    if (searchitem.gender == 'male') {
      return 'icon_male.jpg';
    }else{
      return 'icon_female.jpg';
    }
  };
})

.controller('SearchDetailCtrl', function($scope,$stateParams,$http,Searchlist) {
  $scope.searchitem = Searchlist.get($stateParams.searchId);
  $scope.formData = {};
  
  $scope.processForm = function() {
	$http({
        method  : 'POST',
        url     : 'http://localhost:8888/user/send/pic',
        data    : $scope.formData,  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);
            if (!data.success) {
	      
            } else {
              
            }
        });
    };

  
  
})

.controller('SearchDetailUploadCtrl', function($scope,$stateParams,Searchlist) {
  //upload to server here
})


