angular.module('vault.controllers', [])

.controller('DashCtrl', function($scope, Photos, Videos) {
  // just testing some access to data
  console.log('Photos: ', Photos, 'Videos: ', Videos);

  $scope.listVideos = function() {
    console.log("listing videos...");
    var videos = Videos.all();
    videos.forEach(function(video) {
      console.log(video.uri);
    })
  }
})


.controller('VideoUploadCtrl', function($scope, $cordovaCapture, Videos) {
  console.log("loading VideoUploadCtrl...");

  $scope.uploadVideo = function() {
    console.log("uploading video...");

    var options = {
      limit: 1,
      duration: 15
    };

    var captureSuccess = function(mediaFiles) {
      console.log('captureSuccess()...');

      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.log('mediaFiles: ', mediaFiles[i], 'path: ', path);

          Videos.add({id: null, thumbnail: null, uri: path});

          var videos = Videos.all();
          videos.forEach(function(video) {
            console.log(video.uri);
          })
      }
    };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
      console.log("Successfully captured video ----> Firing callback!");
      captureSuccess(videoData);
    }, function(err) {
      console.log("Error capturing video");
      // An error occurred. Show a message to the user
    });

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