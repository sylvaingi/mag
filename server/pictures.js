(function(){
    var fs = MAG.require("fs");
    var glob = NodeModules.require("glob");

    MAG.Pictures.addPicture = function(name, hash, galleryId){
        if(MAG.Pictures.findOne({hash: hash, galleryId: galleryId})){
            console.log("Picture with hash "+hash+" already exists in gallery "+galleryId);
            return;
        }

        var destFolder = MAG.imagesFolder + "/" + galleryId + "/";

        var files = glob.sync(MAG.uploadsFolder + "/" + hash + "*");
        _.each(files, function(f){
            var newPath = f.replace(MAG.uploadsFolder, destFolder);
            fs.renameSync(f, newPath);
        });

        MAG.Pictures.insert({
            name: name,
            hash: hash,
            galleryId: galleryId,
            createdAt: new Date(), starred: 0
        });
    };
}());