(function(){
    Template.galleryList.helpers({
        galleries: function(){
            return MAG.Galleries.find();
        }
    });

    Template.gallery.helpers({
        creator: function(){
            return Meteor.users.findOne({_id: this.userId}).profile.name;
        },

        sample: function(){
            return MAG.Pictures.findOne({galleryId: this._id}, {sort: {createdAt: 1}});
        }
    });
}());