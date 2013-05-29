Template.gallery.helpers({
    photos: function(){
        return MAG.Pictures.find({galleryId: Session.get("currentGalleryId")}, {sort: {createdAt: 1}});
    }
});
