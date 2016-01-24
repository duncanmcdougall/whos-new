app.factory('LevelService', function () {
    var service = {};

    var packs = [
        {
            name: 'animals',
            items: 24
        }
    ];

    service.PreloadImages = function () {
        images = new Array();
        for(var i = 0; i < packs.length; i++) {
            for(var j = 1; j <= packs[i].items; j++) {
                var src = "icons/" + packs[i].name + "/icon (" + j + ").png";
                var image = new Image();
                image.src = src;
                images.push(image);
            }
        }
    };

    service.getPack = function () {
        var packIdx = _.random(0, packs.length-1);
        var pack = packs[packIdx];
        return pack;
    };

    return service;
});