var Pictures = new Meteor.Collection("pictures");

Pictures.getPicturePath = function(picture, size){
    if(!_.contains(["original", "1000", "200"], size)){
        throw new Meteor.Error(400, "Invalid picture size");
    }

    return MAG.imagesFolder + "/" +
        picture.galleryId + "/" +
        picture.hash +
        "-" + size +
        ".jpg";
};

MAG.Pictures = Pictures;
