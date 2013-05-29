Template.gallery.helpers({
    photos: function(){
        var gId = Session.get("currentGalleryId");
        var photos;

        if(gId === MAG.bestOfGalleryId){
            photos = MAG.Pictures.find({}, {sort: {starred: -1}, limit: 10}).fetch();
        }
        else {
            photos = MAG.Pictures.find({galleryId: gId}, {sort: {createdAt: 1}}).fetch();
        }

        Session.set("currentGalleryOrder", _.pluck(photos, "_id"));

        return photos;
    }
});
