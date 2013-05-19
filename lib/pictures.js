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

Pictures.thumbSize = 300;
Pictures.fullSize = 1000;
Pictures.sizes = [Pictures.thumbSize, Pictures.fullSize];

MAG.Pictures = Pictures;

