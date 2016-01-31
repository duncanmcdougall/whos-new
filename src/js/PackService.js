app.factory('PackService', function () {
    var service = {};

    var packs = [
        {
            name: 'animals',
            items: 24,
            easy: [
                2, 5, 6, 7, 11, 12, 14, 16, 17, 19, 20, 22, 23
            ],
            hard: [
                1,2,3,4,8,9,10,18,19,21,22,23,24
            ]
        }
    ];

    service.PreloadImages = function () {
        images = new Array();
        for(var i = 0; i < packs.length; i++) {
            for(var j = 1; j <= packs[i].items; j++) {
                var src = "icons/" + packs[i].name + "/" + j + ".png";
                var image = new Image();
                image.src = src;
                images.push(image);
            }
        }
    };

    service.getPack = function (level) {
        var packIdx = _.random(0, packs.length-1);
        var pack = packs[packIdx];
        var ids = pack[level];
        var srcs = [];
        for(var i = 0; i < ids.length; i++) {
            srcs.push("icons/" + pack.name + "/" + ids[i] + ".png");
        }
        return srcs;
    };

    return service;
});