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

        samples: function(){
            return MAG.Pictures.find({galleryId: this._id});
        }
    });
}());