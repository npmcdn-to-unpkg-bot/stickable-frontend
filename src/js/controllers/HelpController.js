app.controller(
    'HelpController',
    function ($scope, $rootScope, CategoryResource) {
        $rootScope.pageTitle = '';
        $.backstretch('/assets/img/bg/about.jpg');
    }
);
