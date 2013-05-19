Template.photoOverlay.helpers({
    "photo": function(){
        return Session.get("currentPhoto");
    }
});

Template.photoOverlay.events({
    "click": function(){
        Session.set("currentPhoto", null);
    },

    "click .mt-photo-overlay-content": function(event){
        event.stopPropagation();
    }
});

Template.photoOverlay.rendered = function () {
    var photo = Session.get("currentPhoto");
    $(this.firstNode)[photo ? "show" : "hide"]();
};