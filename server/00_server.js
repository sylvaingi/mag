(function(){
    MAG.require = __meteor_bootstrap__.require;

    MAG.uploadsFolder = "uploads/";

    MAG.Pictures._ensureIndex({hash: 1}, {unique: true});

    var fs = MAG.require('fs');
    fs.symlinkSync('../../../../images', '.meteor/local/build/static/images'); 
}());