angular.module('vault.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('VideoUploadCtrl', function($scope, Chats) {
  console.log("loading VideoUploadCtrl...");

  $scope.uploadVideo = function(video) {
    console.log("uploading video...");
  }
})


.controller('PhotoUploadCtrl', function($scope, Chats) {
  console.log("loading VideoUploadCtrl...");

  $scope.uploadPhoto = function(photo) {
    console.log("uploading photo...");
  }
})
