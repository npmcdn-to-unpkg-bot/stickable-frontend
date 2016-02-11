(function (angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'ckeditor'], function (angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(angular || null, function (angular) {

    var app = angular.module('ngCkeditor', []);
    var $defer, loaded = false;

    app.run(['$q', '$timeout', function ($q, $timeout) {
        $defer = $q.defer();

        if (angular.isUndefined(CKEDITOR)) {
            throw new Error('CKEDITOR not found');
        }

        CKEDITOR.disableAutoInline = true;

        function checkLoaded() {
            if (CKEDITOR.status == 'loaded') {

                var localPlugins = [
                    'uploadimage',
                    'uploadwidget',
                    'widget',
                    'filetools',
                    'notificationaggregator',
                    'lineutils',
                    'notification'
                ];
                for (var i = 0; i < localPlugins.length; i++) {
                    CKEDITOR.plugins.addExternal(localPlugins[i],
                        '/assets/bower_components/ckeditor/plugins/' + localPlugins[i] + '/');
                }
                CKEDITOR.plugins.addExternal('markdown', '/assets/bower_components/ckeditor-markdown-plugin/markdown/');
                CKEDITOR.plugins.addExternal('imagebutton', '/assets/bower_components/ckeditor-image-button/');

                loaded = true;
                $defer.resolve();
            } else {
                checkLoaded();
            }
        }

        CKEDITOR.on('loaded', checkLoaded);

        /**
         * Make link dialog nicer
         */
        CKEDITOR.on('dialogDefinition', function (e) {
            // NOTE: this is an instance of CKEDITOR.dialog.definitionObject
            var dd = e.data.definition;

            if (e.data.name === 'link') {
                dd.minHeight = 30;

                // remove the unwanted tabs
                dd.removeContents('advanced');
                dd.removeContents('target');
                dd.removeContents('upload');

                // remove all elements from the 'info' tab
                var tabInfo = dd.getContents('info');
                while (tabInfo.elements.length > 0) {
                    tabInfo.remove(tabInfo.elements[0].id);
                }

                // add a simple URL text field
                tabInfo.add({
                    type: 'text',
                    id: 'urlNew',
                    label: 'URL',
                    setup: function (data) {
                        var value = '';
                        if (data.url) {
                            if (data.url.protocol) {
                                value += data.url.protocol;
                            }
                            if (data.url.url) {
                                value += data.url.url;
                            }
                        } else if (data.email && data.email.address) {
                            value = 'mailto:' + data.email.address;
                        }
                        this.setValue(value);
                    },
                    commit: function (data) {
                        data.url = {protocol: '', url: this.getValue()};
                    }
                });
            }
        });

        $timeout(checkLoaded, 100);
    }]);

    app.directive('ckeditor', ['$timeout', '$q', function ($timeout, $q) {
        'use strict';

        return {
            restrict: 'AC',
            require: ['ngModel', '^?form'],
            scope: false,
            link: function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0];
                var form = ctrls[1] || null;
                var EMPTY_HTML = '<p></p>',
                    isTextarea = element[0].tagName.toLowerCase() == 'textarea',
                    data = [],
                    isReady = false;

                if (!isTextarea) {
                    element.attr('contenteditable', true);
                }

                var onLoad = function () {
                    var options = {
                        contentsCss: [
                            'https://fonts.googleapis.com/css?family=Roboto+Slab|Roboto:300|Rancho',
                            '/assets/build/' + assetVersion + '/css/stickable.min.css',
                        ],
                        extraPlugins: 'uploadimage,markdown,imagebutton', //uploadimage,markdown', //simpleuploads',
                        disableObjectResizing: true,
                        linkShowAdvancedTab: false,
                        linkShowTargetTab: false,
                        selectMultiple: true,
                        imageUploadUrl: '/api/images',
                        removePlugins: 'elementspath,magicline,contextmenu,liststyle,tabletools',
                        resize_enabled: false,
                        height: 300,
                        width: '100%',
                        toolbar: [
                            {items: ['Bold', 'Italic', 'Strike', 'Underline']},
                            {items: ['BulletedList', 'NumberedList']},
                            {items: ['Link', 'Image', 'imagebutton']},
                            {items: ['Markdown']}
                        ],
                        disableNativeSpellChecker: false,
                        uiColor: '#FAFAFA',
                    };
                    if (attrs.ckeditor) {
                        options = angular.extend(options, scope[attrs.ckeditor]);
                    }

                    var instance = (isTextarea)
                            ? CKEDITOR.replace(element[0], options)
                            : CKEDITOR.inline(element[0], options),
                        configLoaderDef = $q.defer();

                    element.bind('$destroy', function () {
                        console.log('destroy');

                        instance.removeAllListeners();
                        CKEDITOR.remove(instance);

                        /*instance.destroy(
                            false //If the instance is replacing a DOM element, this parameter indicates whether or not to update the element with the instance contents.
                        );*/
                    });

                    var setModelData = function (setPristine) {
                        var data = instance.getData();
                        data = data ? toMarkdown(data) : null;

                        $timeout(function () { // for key up event
                            (setPristine !== true || data != ngModel.$viewValue) && ngModel.$setViewValue(data);
                            (setPristine === true && form) && form.$setPristine();
                        }, 0);
                    };

                    var onUpdateModelData = function (setPristine) {
                        if (!data.length) {
                            return;
                        }

                        var item = data.pop() || EMPTY_HTML;
                        isReady = false;
                        instance.setData(item, function () {
                            setModelData(setPristine);
                            isReady = true;
                        });
                    };

                    //instance.on('pasteState',   setModelData);
                    instance.on('change', setModelData);
                    instance.on('blur', setModelData);
                    //instance.on('key', setModelData); // for source view

                    instance.on('instanceReady', function () {
                        scope.$broadcast("ckeditor.ready");
                        scope.$apply(function () {
                            onUpdateModelData(true);
                        });

                        instance.document.on("keyup", setModelData);
                    });

                    instance.on('customConfigLoaded', function () {
                        configLoaderDef.resolve();
                    });

                    ngModel.$render = function () {
                        data.push(ngModel.$viewValue);
                        if (isReady) {
                            onUpdateModelData();
                        }
                    };
                };

                if (CKEDITOR.status == 'loaded') {
                    loaded = true;
                }

                if (loaded) {
                    onLoad();
                } else {
                    $defer.promise.then(onLoad);
                }
            }
        };
    }]);

    return app;
}));
