Template.photo.events({
    "click": function(event){
        Session.set("currentPhotoId", this._id);
    }
});