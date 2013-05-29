var Pictures = new Meteor.Collection("pictures");

Pictures.getPicturePath = function(picture, size){
    if(!_.contains(Pictures.sizes, size)){
        throw new Meteor.Error(400, "Invalid picture size");
    }

    return MAG.imagesFolder + "/" +
        picture.galleryId + "/" +
        picture.hash +
        "-" + size +
        ".jpg";
};

Pictures.star = function(pictureId, userId){
    if(Pictures.hasStarred(pictureId, userId)){
        console.log("Invalid star, picture already starred");
    }

    Pictures.update({_id: pictureId}, {$inc: {starred: 1}, $push: {starredBy: userId}});
};

Pictures.unstar = function(pictureId, userId){
    if(!Pictures.hasStarred(pictureId, userId)){
        console.log("Invalid unstar, picture not starred");
    }

    Pictures.update({_id: pictureId}, {$inc: {starred: -1}, $pull: {starredBy: userId}});
};

Pictures.hasStarred = function(pictureId, userId){
    var picture = Pictures.findOne({_id: pictureId});
    return _.indexOf(picture.starredBy, userId) !== -1;
};

Pictures.thumbSize = 300;
Pictures.fullSize = 1000;
Pictures.sizes = [Pictures.thumbSize, Pictures.fullSize];

MAG.Pictures = Pictures;

