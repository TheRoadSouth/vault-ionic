angular.module('vault.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Media', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var media = [];


  return {
    all: function() {
      return media;
    },
    remove: function(mediaId) {
      media.splice(media.indexOf(mediaId), 1);
    },
    get: function(mediaId) {
      for (var i = 0; i < media.length; i++) {
        if (media[i].id === parseInt(mediaId)) {
          return media[i];
        }
      }
      return null;
    },
    add: function(inMedia){
      media.push(inMedia);
      return media;
    }
  }
});
