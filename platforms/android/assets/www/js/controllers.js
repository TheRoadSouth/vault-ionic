angular.module('vault.controllers', [])

.controller('MainCtrl', ['$state', '$scope', 'Videos', function($state, $scope, Videos) {
  console.log('MainCtrl!!!');

  $scope.listVideos = function() {
    console.log("listing videos...");
    var videos = Videos.all();
    videos.forEach(function(video) {
      console.log(video.uri);
    })
  };
}])


.controller('DashCtrl', function($scope, Photos, Videos) {
  
  // just testing some access to data
  console.log('Photos: '+ Photos.all()+ ', Videos: '+ Videos);
  console.log(Photos.all().length);
  $scope.photoList = Photos.all();
  $scope.videoList = Videos.all();

})


.controller('VideoUploadCtrl', function($scope, $cordovaCapture, Videos) {
  console.log("loading VideoUploadCtrl...");

  $scope.onTabSelected = function() {
    console.log("fired when uploading...");
  };

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


.controller('PhotoUploadCtrl', function($scope, $cordovaCamera, Photos) {
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
        $scope.photofactoryuri = Photos.get(0).uri;
        Photos.push({id: Photos.all().length, uri:imageData});
        console.log(Photos.get(0).uri);
        

      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

  }, false);
})