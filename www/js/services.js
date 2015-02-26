angular.module('vault.services', [])

.factory('Calls', function() {
  var calls = [];

  return {
    all: function() {
      return calls;
    },
    remove: function(call) {
      calls.splice(calls.indexOf(call), 1);
    },
    get: function(callId) {
      for (var i = 0; i < calls.length; i++) {
        if (calls[i].id === parseInt(callId)) {
          return calls[i];
        }
      }
      return null;
    },
    add: function(call) {
      calls.push(call);
    }
  }
})

.factory('Videos', function() {
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

.factory('Photos', function() {
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
