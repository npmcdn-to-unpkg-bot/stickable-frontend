app.filter('suppressZero', function () {
    return function (value) {
        if (parseInt(value)) {
            return value;
        }
    }
});
