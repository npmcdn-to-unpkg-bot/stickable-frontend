app.directive('avatar', function factory() {
    return {
        scope: {
            img: '='
        },
        template: function($scope) {
            return '<img ng-if="img" class="user-image" ng-src="{{img.thumbUrl}}" /><span ng-if="!img" class="user-image default-user-image"></span>';
        }
    };
});
