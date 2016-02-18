app.directive('avatar', function factory() {
    return {
        scope: {
            user: '='
        },
        template: function($scope) {
            return '<img ng-if="user && user.image" class="user-image" ng-src="{{user.image.thumbUrl}}" /><span ng-if="!user || !user.image" class="user-image default-user-image"></span>';
        }
    };
});
