angular.module('vault.controllers', [])

.controller('MainCtrl', ['$state', '$scope', 'Media', function($state, $scope, Media) {
  // console.log('MainCtrl!!!');
}])

.controller('DashCtrl', function($scope, Media) {
  // console.log('Photos: '+ Photos.all()+ ', Videos: '+ Videos);

  $scope.mediaList = Media.all();

})

.controller('VideoUploadCtrl', function($scope, $cordovaCapture, Media, $ionicTabsDelegate) {
  // console.log("loading VideoUploadCtrl...");
  $scope.saveVideo = function() {
    console.log('saveVideo()...');
    console.log($scope);
    var date = new Date();

    Media.add({
      id: Media.all().length,
      thumbnail: null,
      uri: $scope.path,
      title: $scope.videoTitle,
      description: $scope.videoDescription,
      date: date,
      datePretty: date.toLocaleTimeString(),
      mediaType: "movie"
    });
    console.log(Media.all());

    $ionicTabsDelegate.select(0);
  };
  $scope.takeVideo = function() {
    // console.log("uploading video...");
    var options = {
      limit: 1,
      duration: 15
    };

    var captureSuccess = function(mediaFiles) {
      console.log('captureSuccess()...');
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          $scope.path = mediaFiles[i].fullPath;
      }
    };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // console.log("Successfully captured video ----> Firing callback!");
      captureSuccess(videoData);
    }, function(err) {
      console.log("Error capturing video");
    });

  };

})


.controller('PhotoUploadCtrl', function($scope, $cordovaCamera, Media, $ionicTabsDelegate) {
  // console.log("loading PhotoUploadCtrl...");

  document.addEventListener("deviceready", function() {
    $scope.savePhoto = function(){
        // console.log("savePhoto, photoDate:" + $scope.photoDate);

        var date = new Date();

        Media.add({
            id: Media.all().length,
            thumbnail: null,
            uri: $scope.path,
            title: $scope.photoTitle,
            description: $scope.photoDescription,
            date: date,
            datePretty: date.toLocaleTimeString(),
            mediaType: "picture"
         });

        // select display view
        $ionicTabsDelegate.select(0);
    };

    $scope.takePhoto = function() {
      // console.log("loading takePhoto...");
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.path = imageData;
        

      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

    

  }, false);
})