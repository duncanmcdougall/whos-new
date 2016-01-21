app.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseFloat(n);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        return num.toFixed(len);
    };
});
