'use strict';

angular.module('markdown', [])
    .filter(
        'markdown',
        function () {
            return function (text) {
                return marked(text || '');
            };
        }
    );
