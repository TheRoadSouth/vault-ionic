'use strict';

angular.module('angular-timeline').directive('timelineTitle', function() {
  return {
    require: '^timelineHeading',
    restrict: 'AE',
    transclude: true,
    template: '<h4 class="timeline-title" ng-transclude></h4>'
  };
});
