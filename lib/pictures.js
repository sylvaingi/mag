(function(){
    var Pictures = new Meteor.Collection("pictures");
    Pictures.addPicture = function(name, hash, galleryId){
        if(Pictures.findOne({hash: hash})){
            console.log("Picture with hash "+hash+" already exists in gallery "+galleryId);
            return;
        }

        Pictures.insert({
            name: name,
            hash: hash,
            galleryId: galleryId,
            createdAt: new Date(), starred: 0
        });
    };

    MAG.Pictures = Pictures;
}());