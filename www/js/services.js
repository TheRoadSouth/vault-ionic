angular.module('vault.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Media', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var media = [];

  var fn = {};
  fn.loadSaved = function(){
    if(localStorage.hasOwnProperty("mediaList")){
      media = JSON.parse(localStorage.mediaList);
      console.log("loading saved:");
      console.log(media);
      return media;
    }
    return media;
  }
  fn.saveLocal = function(){
    localStorage['mediaList'] = JSON.stringify(media);
  }
  fn.add = function(inMedia){
    media.push(inMedia);
    fn.saveLocal();
    return media;
  }
  fn.all = function() {
    if(media.length < 1){
      return fn.loadSaved();
    }
    return media;
  }

  return {
    loadSaved: fn.loadSaved,
    saveLocal: fn.saveLocal,
    add: fn.add,
    all: fn.all,
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
    }
    
  }
});
