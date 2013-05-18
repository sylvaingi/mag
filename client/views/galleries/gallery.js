Template.gallery.helpers({
    current: function(){
        return MAG.Galleries.findOne({_id: Session.get("currentGalleryId")});
    },

    pictures: function(){
        return MAG.Pictures.find({galleryId: Session.get("currentGalleryId")});
    }
});
