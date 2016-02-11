"use strict";

var app = angular.module('stickable', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'LocalStorageModule',
    'angularModalService',
    'ngAnimate',
    'angularMoment',
    'ngCkeditor',
    'markdown',
    'masonry'
]);

app.config(function ($httpProvider,
                     $locationProvider,
                     $stateProvider,
                     $urlRouterProvider,
                     localStorageServiceProvider) {

    $locationProvider.html5Mode(true);

    localStorageServiceProvider
        .setPrefix('stickable')
        .setStorageType('localStorage')
        .setStorageCookie(0, '/');

    /**
     * States
     */
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/pages/home.html",
            controller: 'HomeController'
        })

        .state('help', {
            url: "/help",
            templateUrl: "views/pages/help.html",
        })

        .state('browse', {
            url: "/browse",
            templateUrl: "views/pages/browse.html",
            controller: 'BrowseController'
        })

        .state('bot', {
            url: "/bot",
            templateUrl: "views/pages/bot.html",
            controller: 'BotController'
        })

        .state('signup', {
            url: "/signup",
            templateUrl: "views/pages/auth/signup.html",
            controller: 'SignupController'
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/pages/auth/login.html",
            controller: 'LoginController',
            params: {
                loginFormData: null,
                response: null
            },
        })

        .state('forgot', {
            url: "/forgot",
            templateUrl: "views/pages/auth/forgot.html",
            controller: 'ForgotController'
        })

        .state('reset', {
            url: "/reset/{token:string}",
            templateUrl: "views/pages/auth/reset.html",
            controller: 'ResetController'
        })

        .state('settings', {
            url: "/settings",
            templateUrl: "views/pages/settings/index.html",
            controller: 'SettingsController'
        })

        .state('user', {
            url: "/user/{username:string}",
            templateUrl: "views/pages/user/view.html",
            controller: 'UserProfileController'
        })

        .state('user-todo', {
            url: "/user/{username:string}/todo",
            templateUrl: "views/pages/user/todo.html",
            controller: 'UserToDoController'
        })

        .state('user-stickers', {
            url: "/user/{username:string}/stickers",
            templateUrl: "views/pages/user/stickers.html",
            controller: 'UserStickersController'
        })

        .state('category', {
            url: "/category/{slug:string}",
            templateUrl: "views/pages/category/view.html",
            controller: 'CategoryController'
        })

        .state('sticker', {
            url: "/sticker/{slug:string}",
            templateUrl: "views/pages/sticker/view.html",
            controller: 'StickerController'
        })

        .state('task', {
            url: "/task/{slug:string}",
            templateUrl: "views/pages/task/view.html",
            controller: 'TaskController'
        })

        .state('post', {
            url: "/task/{slug:string}/{postSlug:string}",
            templateUrl: "views/pages/task/view.html",
            controller: 'TaskController'
        });

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

});

app.run(function ($rootScope, $state, AuthService, UserNotificationsResource) {

    FastClick.attach(document.body);

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: false,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });

    Dropzone.autoDiscover = false;

    $rootScope.dropzoneConfig = {
        options: {
            autoProcessQueue: false,
            uploadMultiple: true,
            addRemoveLinks: true,
            url: '/api/images'
        },
        'eventHandlers': {
            'sending': function (file, xhr, formData) {
            },
            'success': function (file, response) {
            }
        }
    };

    $rootScope.$state = $state;
    $rootScope.pageTitle = '';

    AuthService.checkSession();

    $rootScope.currentUser = AuthService.getUser();
    $rootScope.notifications = [];

    $rootScope.$on('login', function (event, args) {
        $rootScope.currentUser = args.user;

        // Fetch notifications
        $rootScope.notifications = UserNotificationsResource.query({username: args.user.username});
    });

    $rootScope.$on('logout', function () {
        $rootScope.currentUser = false;
    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
        $('body').removeClass('navbar-visible').attr('data-previous', from.name);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});

$(document).on('click', 'body:not(.navbar-visible) .navbar-toggle', function (e) {
    console.log(e);
    e.preventDefault();
    $('body').addClass('navbar-visible');
});

$(document).on('click', 'body.navbar-visible .navbar-toggle', function (e) {
    e.preventDefault();
    $('body').removeClass('navbar-visible');
});

$(document).on('click', 'body.navbar-visible', function (e) {
    if ($(e.target).closest('#top-bar-nav').length > 0) {
        // Ignore clicks on the nav itself

    } else if (
        !$(e.target).closest('button').hasClass('navbar-toggle')
        && !$(e.target).hasClass('navbar-toggle')
    ) {
        e.preventDefault();
        $('body').removeClass('navbar-visible');
    }
});
