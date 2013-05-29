Template.galleryList.helpers({
    galleries: function(){
        return MAG.Galleries.find();
    }
});

Template.bestOfGalleryThumb.helpers({
    _id: function(){
        return MAG.bestOfGalleryId;
    },

    sample: function(){
        return MAG.Pictures.findOne({}, {sort: {starred: -1}});
    }
});

Template.galleryThumb.helpers({
    creator: function(){
        return Meteor.users.findOne({_id: this.userId}).profile.name;
    },

    size: function(){
        return MAG.Pictures.find({galleryId: this._id}).count();
    },

    sample: function(){
        return MAG.Pictures.findOne({galleryId: this._id}, {sort: {starred: -1}});
    }
});
