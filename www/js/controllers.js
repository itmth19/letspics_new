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
			if($scope.user["sex"] == "female") {
			  $scope.user["icon_gender"] = "woman" }
			  else{
			    $scope.user["icon_gender"] = "man";
			  }
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
  
  $scope.senderPicture = function(message){
    if (message["sender"] == 0)  {
      return "img/profile.jpg";
    }else{
      return '';
    }
  };
  
  $scope.sendMessage = function(){
    
    $scope.messages.push({content:$scope.mess_box,sender:0});
  }
})


.controller('SearchCtrl', function($scope, Searchlist) {
  $scope.searchlist = Searchlist.all();
  $scope.getSearchItemIcon = function(searchitem){
    if (searchitem.gender == 'male') {
      return 'ion-man';
    }else{
      return 'ion-woman';
    }
  };
})

.controller('SearchDetailCtrl', function($scope,$stateParams,$http,Searchlist) {
  $scope.searchitem = Searchlist.get($stateParams.searchId);
  $scope.formData = {};
  
  $scope.processForm = function(){
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "http://localhost:8888/user/send/pic";
        $scope.uploadFileToUrl(file, uploadUrl);

  };
  
  $scope.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
	fd.append('user_id','1');
	fd.append('reply_id',0);
	
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data){
	  console.log(data);
        })
        .error(function(data){
	  console.log(data);
        });
    }
  
})

.controller('SearchDetailUploadCtrl', function($scope,$stateParams,Searchlist) {
  //upload to server here
})




