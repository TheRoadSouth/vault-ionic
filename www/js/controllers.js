angular.module('vault.controllers', [])

.controller('MainCtrl', ['$state', '$scope', 'Videos', function($state, $scope, Videos) {
  // console.log('MainCtrl!!!');
}])

.controller('DashCtrl', function($scope, Photos, Videos, FileIO) {
  // console.log('Photos: '+ Photos.all()+ ', Videos: '+ Videos);
  $scope.photoList = Photos.all();
  $scope.videoList = Videos.all();
  $scope.logfile = FileIO.read(cordova.file.dataDirectory);
})

.controller('VideoUploadCtrl', function($scope, $cordovaCapture, Videos, $ionicTabsDelegate) {
  // console.log("loading VideoUploadCtrl...");

  $scope.uploadVideo = function() {
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
      // console.log("Successfully captured video ----> Firing callback!");
      captureSuccess(videoData);
    }, function(err) {
      console.log("Error capturing video");
    });

  }
})


.controller('PhotoUploadCtrl', function($scope, $cordovaCamera, Photos, $ionicTabsDelegate, FileIO) {
  // console.log("loading PhotoUploadCtrl...");

  document.addEventListener("deviceready", function() {
    $scope.savePhoto = function(){
        // console.log("savePhoto, photoDate:" + $scope.photoDate);
        Photos.push({
            id: Photos.all().length,
            uri: $scope.imagePath,
            title: $scope.photoTitle,
            description: $scope.photoDescription,
            date: $scope.photoDate,
            datePretty: $scope.datePretty
        });

        // save new factories
        console.log(cordova.file.dataDirectory);
        FileIO.write(cordova.file.dataDirectory, "haoiwfhjoaiwh");
        FileIO.read(cordova.file.dataDirectory);

        // function writeLog(str) {
        //   if(!logOb) return;
        //   var log = str + " [" + (new Date()) + "]\n";
        //   console.log("going to log "+log);
        //   logOb.createWriter(function(fileWriter) {
            
        //     fileWriter.seek(fileWriter.length);
            
        //     var blob = new Blob([log], {type:'text/plain'});
        //     fileWriter.write(blob);
        //     console.log("ok, in theory i worked");

        //     justForTesting();
        //   }, function(err){
        //     console.log("error in createWriter");
        //   });
        // }
        // var logOb; // log object
        // window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
        //   console.log("got main dir",dir);
        //   dir.getFile("log.txt", {create:true}, function(file) {
        //     console.log("got the file", file);
        //     logOb = file;
        //     writeLog("App started");      
        //   });
        // });
        // function justForTesting() {
        //   logOb.file(function(file) {
        //     var reader = new FileReader();

        //     reader.onloadend = function(e) {
        //       console.log(this.result);
        //     };

        //     reader.readAsText(file);
        //   }, function(){console.log("read in failed"); });

        // }


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
        $scope.imagePath = imageData;
        var date = new Date();
        $scope.photoDate = date;
        $scope.datePretty = date.toLocaleTimeString();

      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

    

  }, false);
})