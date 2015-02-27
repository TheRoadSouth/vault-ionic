angular.module('vault.services', [])

.factory('Videos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var videos = [];

  return {
    all: function() {
      return videos;
    },
    remove: function(video) {
      videos.splice(videos.indexOf(video), 1);
    },
    get: function(videoId) {
      for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === parseInt(videoId)) {
          return videos[i];
        }
      }
      return null;
    },
    add: function(video) {
      videos.push(video);
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Photos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var photos = [];


  return {
    all: function() {
      return photos;
    },
    get: function(photoId) {
      // Simple index lookup
      return photos[photoId];
    },
    push: function(photo){
      photos.push(photo);
      return photos;
    }
  }
})
/**
 * Save and read a file
 */
.factory('FileIO', function(Photos) {
  var logOb; // log object


  var writeLog = function (cordovaDir, str) {
    // if(!logOb) return;
    var log = str + " [" + (new Date()) + "]\n";
    console.log("going to log "+log);

    getLogOb(cordovaDir).createWriter(function(fileWriter) {
      
      fileWriter.seek(fileWriter.length);
      
      var blob = new Blob([log], {type:'text/plain'});
      fileWriter.write(blob);
      console.log("ok, in theory i worked");

      readLog();

    }, function(err){
      console.log("error in createWriter");
    });
  }
  var getLogOb = function(cordovaDir){
    window.resolveLocalFileSystemURL(cordovaDir, function(dir) {
      console.log("got main dir",dir);
      dir.getFile("log.txt", {create:true}, function(file) {
        console.log("got the file", file);
        // logOb = file;
        return file;
      });
    });
  }

  var writeLog = function (cordovaDir, str) {
    window.resolveLocalFileSystemURL(cordovaDir, function(dir) {
      console.log("got main dir",dir);

      dir.getFile("log.txt", {create:true}, function(fileEntry) {
        console.log("got the file", fileEntry);

        // Get a File object representing the file,
        // then use FileReader to read its contents.

        fileEntry.createWriter(function(fileWriter) {
          
          fileWriter.onwriteend = function(e) {
            console.log("write completed");
          };
          fileWriter.onwriteerror = function(e) {
            console.log("write failed" + e.toString());
          };

          //
          fileWriter.seek(fileWriter.length);
      
          var blob = new Blob(['stuff'], {type:'text/plain'});
          fileWriter.write(blob);
          console.log("ok, in theory i worked");

        }, function(){
          console.log("couldn't read in file to write to it"); 
        });
      });
    }); 

  };
  

  var readLog = function (cordovaDir) {
    window.resolveLocalFileSystemURL(cordovaDir, function(dir) {
      console.log("got main dir",dir);

      dir.getFile("log.txt", {create:true}, function(fileEntry) {
        console.log("got the file", fileEntry);

        // Get a File object representing the file,
        // then use FileReader to read its contents.

        fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
            console.log(this.result.toJSON());
            return this.result.toJSON();
          };

        }, function(){
          console.log("read in failed"); 
        });
      });
    }); 

  };

  return {
    write: writeLog,
    read: readLog
  }
});
