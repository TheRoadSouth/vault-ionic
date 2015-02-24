angular.module('vault.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('VideoUploadCtrl', function($scope, Chats) {
  console.log("loading VideoUploadCtrl...");

  $scope.uploadVideo = function(video) {
    console.log("uploading video...");
  }
})


.controller('PhotoUploadCtrl', function($scope, $cordovaCamera) {
  console.log("loading PhotoUploadCtrl...");


  document.addEventListener("deviceready", function() {

    $scope.uploadPhoto = function(photo) {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

  }, false);
})