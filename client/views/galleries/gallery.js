Template.gallery.helpers({
    photos: function(){
        var photos = MAG.Pictures.find({galleryId: Session.get("currentGalleryId")}, {sort: {createdAt: 1}}).fetch();
        Session.set("currentGalleryOrder", _.pluck(photos, "_id"));
        return photos;
    }
});
