angular.module('vault.services', [])

.factory('Videos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var videos = [{
    id: 0,
    uri: 'path/to/video',
    thumb: 'path/to/thumb'
  }, {
    id: 1,
    uri: 'path/to/video',
    thumb: 'path/to/thumb'
  }, {
    id: 2,
    uri: 'path/to/video',
    thumb: 'path/to/thumb'
  }, {
    id: 3,
    uri: 'path/to/video',
    thumb: 'path/to/thumb'
  }, {
    id: 4,
    uri: 'path/to/video',
    thumb: 'path/to/thumb'
  }];

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
  var photos = [{
    id: 0,
    uri: 'file:///storage/emulated/0/Pictures/1424826349114.jpg'
  }, {
    id: 1,
    uri: 'path/to/photo'
  }, {
    id: 2,
    uri: 'path/to/photo'
  }, {
    id: 3,
    uri: 'path/to/photo'
  }, {
    id: 4,
    uri: 'path/to/photo'
  }];


  return {
    all: function() {
      return photos;
    },
    get: function(photoId) {
      // Simple index lookup
      return photos[photoId];
    }
  }
});
