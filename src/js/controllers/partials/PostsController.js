app.controller(
    'PostsController',
    function ($scope, $state, PostResource) {

        console.log('PostsController', $scope);

        $scope.likePost = function($event, post) {
            preventDefault($event);

            post.liked = post.liked ? false : true;
            post.likeClicked = true;

            if (post.liked) {
                PostResource.likePost({id: post.id});
                post.likeCount = parseInt(post.likeCount) + 1;
            } else {
                PostResource.unlikePost({id: post.id});
                post.likeCount = parseInt(post.likeCount) - 1;
            }
        };

        $scope.goToPost = function($event, post) {
            /*try {
                if ($scope.$parent.$parent.hasOwnProperty('post')) {
                    preventDefault($event);
                    $scope.$parent.$parent.post = post;
                }
            } catch (e) {
                console.log(e);
            }*/
        };

    }
);
