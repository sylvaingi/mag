var fs = Npm.require("fs");
var Fiber = Npm.require('fibers');

var downloadRoute = new Meteor.Router.Route('/download/:id', null);

__meteor_bootstrap__.app.use(function(req, res, next){
    var params = [];
    if(!downloadRoute.match(req.url, req.method, params)){
        return next();
    }

    Fiber(function(){
        var picture = MAG.Pictures.findOne({_id: params.id});

        if(!picture){
            res.statusCode = 404;
            return res.end("POPOPOPOPO TU JOUES AVEC LES URL?");
        }

        var filePath = MAG.Pictures.getPicturePath(picture, "original");

        var stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Content-Length': stat.size,
            'Content-Disposition': 'attachment; filename=MA-' + picture.name + ';'
        });

        var readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }).run();
});
