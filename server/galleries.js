(function(){
    var fs = MAG.require("fs");
   
    MAG.Galleries.getUserGallery = function(userId){
        var galleryId;
        var gallery = MAG.Galleries.findOne({userId: userId});
        if(gallery){
            galleryId = gallery._id;
        }
        else {
            galleryId = MAG.Galleries.insert({userId:userId, createdAt: new Date()});
            fs.mkdirSync(MAG.imagesFolder + "/" + galleryId , 0755);
        }

        return galleryId;
    };
}());