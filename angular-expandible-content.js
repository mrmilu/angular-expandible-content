var app = angular.module('angular-expandible-content', []);

app.directive('expandibleContent', function($window) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      scope.initialSize = {
        height: element.outerHeight(),
        width: element.outerWidth()
      };

      scope.$window = angular.element($window);
      scope.expandHeight = function() {
        var minHeight = scope.$window .height();
        angular.element('[expandible-content-header], [expandible-content-footer]').each(function() {
          minHeight -= angular.element(this).outerHeight();
        });
        if (minHeight > scope.initialSize.height) {
          element.outerHeight(minHeight);
        }
        else {
          element.outerHeight('auto');
        }
      };

      scope.expandWidth = function() {
        var minWidth = scope.$window.width();
        angular.element('[expandible-content-aside]').each(function() {
          minWidth -= angular.element(this).outerHeight();
        });
        if (minWidth > scope.initialSize.width) {
          element.outerWidth(minWidth);
        }
        else {
          element.outerWidth('auto');
        }
      };

      scope.expand = function() {
        if (attrs.expandHeight != undefined) {
          scope.expandHeight();
        }
        if (attrs.expandWidth != undefined) {
          scope.expandWidth();
        }
      };

      scope.expand();
      scope.$window.resize(function() {
        scope.expand();
      });
    }
  };
});

