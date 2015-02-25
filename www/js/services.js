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
});
