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
            controller: 'HelpController'
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

        .state('notifications', {
            url: "/notifications",
            templateUrl: "views/pages/notifications/index.html",
            controller: 'NotificationsController'
        })

        .state('user', {
            url: "/user/{username:string}",
            templateUrl: "views/pages/user/view.html",
            controller: 'UserProfileController'
        })

        .state('user-planner', {
            url: "/user/{username:string}/planner",
            templateUrl: "views/pages/user/planner.html",
            controller: 'UserPlannerController'
        })

        .state('user-stickers', {
            url: "/user/{username:string}/stickers",
            templateUrl: "views/pages/user/stickers.html",
            controller: 'UserStickersController'
        })

        .state('user-submissions', {
            url: "/user/{username:string}/submissions",
            templateUrl: "views/pages/user/submissions.html",
            controller: 'UserSubmissionsController'
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

app.run(function ($rootScope, $state, AuthService, UserNotificationsResource, NotificationService, moment) {

    FastClick.attach(document.body);

    moment.locale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s",
            s:  "1s",
            m:  "1m",
            mm: "%dm",
            h:  "1h",
            hh: "%dh",
            d:  "1d",
            dd: "%dd",
            M:  "1mo",
            MM: "%dmo",
            y:  "1y",
            yy: "%dy"
        }
    });

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
    $rootScope.notificationsPreview = 0;
    $rootScope.notifications = [];

    $rootScope.$on('login', function (event, args) {
        $rootScope.currentUser = args.user;
        NotificationService.onLogin(args.user, args.token);
    });

    $rootScope.$on('logout', function () {
        $rootScope.currentUser = false;
    });

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from) {
        $('.splash').backstretch('destroy');
        $.backstretch('destroy');
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
