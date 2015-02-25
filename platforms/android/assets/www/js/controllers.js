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
        condole.log("image data:" + imageData);
        // var image = document.getElementById('myImage');
        // image.src = "data:image/jpeg;base64," + imageData;
        


function movePic(file){ 
    console.log("movepic" + file);
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "DCIM/Camera";
    console.log("resolveOnSuccess");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
    //The folder is created if doesn't exist
    fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        entry.moveTo(directory, newFileName,  successMove, resOnError);
                    },
                    resOnError);
                    },
    resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //I do my insert with "entry.fullPath" as for the path
}

function resOnError(error) {
    condole.log(error);
}

movePic(imageData);
      }, function(err) {
        console.log("something went wrong with the camera!" + err);
      });
    };

  }, false);
})