Template.galleryList.helpers({
    galleries: function(){
        return MAG.Galleries.find();
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
        return MAG.Pictures.findOne({galleryId: this._id}, {sort: {createdAt: 1}});
    }
});
