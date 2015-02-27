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

.controller('CallUploadCtrl', function($scope, Media, $ionicTabsDelegate, $http) {
    console.log("call upload controller");
    // Get the transcript text
    function getTranscript($http, url, auth, callback) {

      var req = {
        method: 'GET',
        url: url//,
        //withCredentials: true,
        //headers: {
        //  'Authorization': 'Basic ' + auth.user + ':' + auth.password
        //}
      };

      $http(req)
        .success(function(data, status) {
          // var x2js = new X2JS();
          // var json = x2js.xml_str2json(data);
          // callback(json, status);
          callback(data, status);
        })
        .error(function(data, status) {
          // send the converted data back
          // to the callback function
          callback(data, status);
        });

    };

    var url = 'https://AC4ca6db1e0ec309f1d6bf39f4c8847262:7c991639421c5dbbdf53ad6dd7ff83a3@api.twilio.com/2010-04-01/Accounts/'
        + "AC4ca6db1e0ec309f1d6bf39f4c8847262"
        + '/Calls/';
        // + recording.TranscriptionSid;

    getTranscript($http, url, 
      {
        username: 'AC4ca6db1e0ec309f1d6bf39f4c8847262', 
        password: '7c991639421c5dbbdf53ad6dd7ff83a3'
      }, 
        function(data, status) {
          // if (status == 200 && data.TwilioResponse.Transcription.Status == 'completed') {
          //   $scope.transcription = data.TwilioResponse.Transcription.TranscriptionText;
          // }   
          // else if (status == 200 && data.TwilioResponse.Transcription.Status == 'in-progress'){
          //   $scope.transcription = 'Transcription still in progress. Stay tuned for that sweet voice to turn into raw text.';
          // } else{
          //   $scope.transcription = 'Transcription failed. Your family members mumble too much.';
          // } 
          console.log(data);
    });        


});