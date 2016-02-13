app.filter('plural', function () {
    return function (word, count) {
        // TODO: localization. Also breaks for some English like 'category'
        return count === 1 ? word : word + 's';
    }
});
