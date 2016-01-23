app.controller(
    'HomeController',
    function ($scope, $rootScope, CategoryResource, SubmissionResource) {

        $rootScope.pageTitle = '';

        /*var splashImages = [
            'aurora',
            'field',
            'girl',
            'hiking',
            'stars',
            'surfboard',
            'trees'
        ];
        splashImages.shuffle();
        $scope.splashImage = '/assets/img/splash/' + splashImages[0] + '.jpg';*/
        $scope.splashImage = 'http://img.ctrlv.in/img/16/01/21/56a06452057e0.png';

        $scope.categories = CategoryResource.query();

        $scope.submissions = SubmissionResource.query();

        /*$scope.posts = [];
        SubmissionResource.query(function(submissions) {
            for (var i = 0; i < submissions.length; i++) {
                $scope.posts.push(submissions[i].post);
            }
        });*/

        /*$scope.posts = [
            {
                title: 'Some photos from my trip to the great wall with a longer title la la hello world',
                sticker: 'Visit the Great Wall of China',
                username: 'Anthony',
                img: 'http://img.ctrlv.in/thumb/16/01/20/56a002c936d0a.png',
                date: '2 years ago',
                url: '#',
                likes: 123,
                comments: 2
            },
            {
                title: 'These were delicious',
                sticker: 'Bake Cookies',
                username: 'Totallynotanthony',
                img: 'http://img.ctrlv.in/thumb/16/01/20/56a0028acadff.png',
                date: '1 month ago',
                url: '#',
                likes: 456,
                comments: 2
            },
            {
                title: 'I drank a can of Monster!',
                sticker: 'Drink Something idk It\'s An Example',
                username: 'Maybeanthony',
                img: 'http://img.ctrlv.in/thumb/16/01/20/56a0033a9d14f.png',
                date: '5 minutes ago',
                url: '#',
                likes: 789,
                comments: 2
            }

        ];*/
    }
);
