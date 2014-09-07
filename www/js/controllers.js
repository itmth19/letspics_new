angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
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

.controller('SearchDetailCtrl', function($scope,$stateParams,Searchlist) {
  $scope.searchitem = Searchlist.get($stateParams.searchId);
})

.controller('SearchDetailUploadCtrl', function($scope,$stateParams,Searchlist) {
  //upload to server here
})


