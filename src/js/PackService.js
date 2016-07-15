app.factory('PackService', function () {
    var service = {};

    var packs = [
        {
            name: 'animals',
            items: 24,
            easy: [
                2, 4, 5, 6, 7, 11, 12, 14, 16, 17, 19, 20, 22, 23
            ],
            hard: [
                1,2,3,4,8,9,10,18,19,21,22,23,24
            ]
        }
    ];

    service.getPack = function (level) {
        var packIdx = utils.random(0, packs.length-1);
        var pack = packs[packIdx];
        var ids = pack[level];
        var srcs = [];
        for(var i = 0; i < ids.length; i++) {
            srcs.push(pack.name + "-" + ids[i]);
        }
        return srcs;
    };

    return service;
});