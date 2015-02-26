angular.module('vault.controllers', [])

.controller('MainCtrl', ['$state', '$scope', 'Videos', function($state, $scope, Videos) {
  console.log('MainCtrl!!!');
}])

.controller('DashCtrl', function($scope, Photos, Videos) {
  console.log('Photos: '+ Photos.all()+ ', Videos: '+ Videos);
  $scope.photoList = Photos.all();
  $scope.videoList = Videos.all();
})

.controller('VideoUploadCtrl', function($scope, $cordovaCapture, Videos, $ionicTabsDelegate) {
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
          $scope.path = mediaFiles[i].fullPath;
      }
    };

    $scope.saveVideo = function() {
      console.log('saveVideo()...');
      Videos.add({
        id: Videos.all().length,
        thumbnail: null,
        uri: $scope.path,
        title: $scope.videoTitle,
        description: $scope.videoDescription
      });

      var videos = Videos.all();
      videos.forEach(function(video) {
        console.log('video.uri: ', video.uri);
      });
      // select display view
      $ionicTabsDelegate.select(0);
    };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      console.log("Successfully captured video ----> Firing callback!");
      captureSuccess(videoData);
    }, function(err) {
      console.log("Error capturing video");
    });

  }
})


// IMPORTANT: It's necessary to have an app installed that can handle the "recording intent"
// e.g. http://stackoverflow.com/questions/21968455/cordova-media-capture-android-error-no-3-issue
.controller('VoiceUploadCtrl', function($scope, $cordovaCapture, Calls, $ionicTabsDelegate) {
  console.log("loading VoiceUploadCtrl...");

  $scope.recordVoice = function() {
    console.log("recording call...");

    document.location.href = 'tel:+15104652278';

  }

  $scope.recordVoice = function() {
    console.log("recording call...");

    // document.location.href = 'tel:+15104652278';

    var options = {
      limit: 1,
      duration: 2
    };

    var captureSuccess = function(mediaFiles) {
      console.log('captureSuccess()...');
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          $scope.path = mediaFiles[i].fullPath;
      }
    };

    $scope.saveCall = function() {
      console.log('saveCall()...');
      Calls.add({
        id: Calls.all().length,
        uri: $scope.path
      });

      var calls = Calls.all();
      calls.forEach(function(call) {
        console.log('call.uri: ', call.uri);
      });
      // select display view
      // $ionicTabsDelegate.select(0);
    };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      console.log("Successfully captured call ----> Firing callback!");
      captureSuccess(audioData);
    }, function(err) {
      console.log("Error capturing call" + err);
    });

  // }
})









.controller('PhotoUploadCtrl', function($scope, $cordovaCamera, Photos, $ionicTabsDelegate) {
  console.log("loading PhotoUploadCtrl...");

  document.addEventListener("deviceready", function() {
    $scope.savePhoto = function(){
        console.log("savePhoto, photoTitle:" + $scope.photoTitle);
        Photos.push({
            id: Photos.all().length,
            uri: $scope.imagePath,
            title: $scope.photoTitle,
            description: $scope.photoDescription
         });
        for(photo in Photos.all()){
          console.log(photo);
        }
        // select display view
        $ionicTabsDelegate.select(0);
    };
    $scope.takePhoto = function() {
         console.log("loading takePhoto...");
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

        $scope.imagePath = imageData;        
        

      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

    

  }, false);
})