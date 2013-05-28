Template.gallery.helpers({
    photos: function(){
        return MAG.Pictures.find({galleryId: Session.get("currentGallery")._id}, {sort: {createdAt: 1}});
    }
});
