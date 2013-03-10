(function(){
    var Galleries = new Meteor.Collection("galleries");
    Galleries.getUserGallery = function(userId){
        debugger;
        var galleryId;
        var gallery = Galleries.findOne({userId: userId});
        if(gallery){
            galleryId = gallery._id;
        }
        else {
            galleryId = Galleries.insert({userId:userId, createdAt: new Date()});
        }

        return galleryId;
    };

    MAG.Galleries = Galleries;
}());