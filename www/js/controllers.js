angular.module('vault.controllers', [])

.controller('MainCtrl', ['$state', '$scope', 'Videos', function($state, $scope, Videos) {
  console.log('MainCtrl!!!');
}])

.controller('DashCtrl', function($scope, Photos, Videos) {
  console.log('Photos: ' + Photos.all() + ', Videos: ' + Videos);
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
.controller('VoiceUploadCtrl', function($scope, Calls, $cordovaMedia, $ionicTabsDelegate) {
  console.log("loading VoiceUploadCtrl...");
  var src = '';

  $scope.recordVoice = function() {
    console.log("recording audio...");

    // should probably call device ready here
    recordAudio();

    function recordAudio() {
      src = "myrecording.amr";
      var mediaRec = new Media(src, onSuccess, onError);

      // Record audio
      mediaRec.startRecord();

      // Stop recording after 10 sec
      var recTime = 0;
      var recInterval = setInterval(function() {
        recTime = recTime + 1;
        setAudioPosition(recTime + " sec");
        if (recTime >= 10) {
          clearInterval(recInterval);
          mediaRec.stopRecord();
          recording = mediaRec;
        }
      }, 1000);
    }

    function onSuccess() {
      console.log("audio recorded!");
    }

    // onError Callback
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    // Set audio position
    //
    function setAudioPosition(position) {
      document.getElementById('record-target').innerHTML = position;
    }

    // // media.play(options); // iOS only!
    // media.play(); // Android
    // media.pause();
    // media.stop();
    // media.release();
    // media.seekTo(5000); // milliseconds value
    // media.setVolume(0.5);
    // media.startRecord();
    // media.stopRecord();
    // media.getDuration(media); not working yet
    // media.getCurrentPosition().then(...); not working yet
  };

  $scope.playVoice = function() {
    console.log("playing back audio...");
    var mediaRec = new Media(src, onSuccess, onError);
    // just play it right away
    mediaRec.play();

    function onSuccess() {
      console.log("audio played!");
    }

    function onError(err) {
      console.log("something wen wrong with the playing!");
    }
  };

})



.controller('PhotoUploadCtrl', function($scope, $cordovaCamera, Photos, $ionicTabsDelegate) {
  console.log("loading PhotoUploadCtrl...");

  document.addEventListener("deviceready", function() {
    $scope.savePhoto = function() {
      console.log("savePhoto, photoTitle:" + $scope.photoTitle);
      Photos.push({
        id: Photos.all().length,
        uri: $scope.imagePath,
        title: $scope.photoTitle,
        description: $scope.photoDescription
      });
      for (photo in Photos.all()) {
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