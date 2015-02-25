angular.module('vault.controllers', [])

.controller('DashCtrl', function($scope, Photos, Videos) {
  // just testing some access to data
  console.log('Photos: ', Photos, 'Videos: ', Videos);

  var photos = Photos.all();
  console.log(photos[0].uri);
})


.controller('VideoUploadCtrl', function($scope, $cordovaCapture) {
  console.log("loading VideoUploadCtrl...");

  $scope.uploadVideo = function(video) {
    console.log("uploading video...");

    var options = {
      limit: 3,
      duration: 15
    };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
})


.controller('PhotoUploadCtrl', function($scope, $cordovaCamera) {
  console.log("loading PhotoUploadCtrl...");

  document.addEventListener("deviceready", function() {

    $scope.uploadPhoto = function(photo) {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log("image data:" + imageData);
        // var image = document.getElementById('myImage');
        // image.src = "data:image/jpeg;base64," + imageData;
        $scope.photomessage = imageData;
        $scope.imagepath = imageData;

      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

  }, false);
})