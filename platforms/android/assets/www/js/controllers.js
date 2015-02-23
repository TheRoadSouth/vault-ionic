angular.module('vault.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('VideoUploadCtrl', function($scope, Chats) {
  $scope.uploadVideo = function(video) {
    console.log("uploading video...");
  }
})
