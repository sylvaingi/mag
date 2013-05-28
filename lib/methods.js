Meteor.methods({
    "star": function(pictureId){
        MAG.Pictures.star(pictureId, this.userId);
    },

    "unstar": function(pictureId){
        MAG.Pictures.unstar(pictureId, this.userId);
    }
});