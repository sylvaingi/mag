Template.photo.events({
    "click": function(event){
        Session.set("currentPhoto", this);
    }
});