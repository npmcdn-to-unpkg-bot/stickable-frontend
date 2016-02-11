'use strict';

angular.module('markdown', [])
    .filter(
        'markdown',
        function () {
            return function (text) {

                console.log('text', text);
                console.log('output', marked(text || ''));

                return marked(text || '');
            };
        }
    );
