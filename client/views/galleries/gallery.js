Template.gallery.helpers({
    creator: function(){
        var gallery = MAG.Galleries.findOne({_id: Session.get("currentGalleryId")});
        return Meteor.users.findOne({_id: gallery.userId}).profile.name;
    },

    pictures: function(){
        return MAG.Pictures.find({galleryId: Session.get("currentGalleryId")});
    }
});
