Template.photoOverlay.rendered = function(){
    var img = this.find("img");
    if(!img){
        return;
    }

    var imgWidth = img.width;
    var imgHeight = img.height;

};

Template.photoOverlay.helpers({
    "photo": function(){
        return MAG.Pictures.findOne({_id: Session.get("currentPhotoId")});
    },

    "nextPhotoId": function(){
        return Session.get("nextPhotoId");
    },

    "previousPhotoId": function(){
        return Session.get("previousPhotoId");
    }
});

Template.photoOverlay.events({
    "click .prev": function(){
        previousPhoto();
    },

    "click .next": function(){
        nextPhoto();
    },

    "click .photo-overlay-content": function(event){
        event.stopPropagation();
    },

    "click #photo-overlay": function(){
        Session.set("currentPhotoId", null);
    }
});

Template.photoOverlayBar.helpers({
    "hasStarred": function(){
        return MAG.Pictures.hasStarred(Session.get("currentPhotoId"), Meteor.userId());
    }
});

Template.photoOverlayBar.events({
    "click .star": function(event){
        event.preventDefault();
        Meteor.call("star", Session.get("currentPhotoId"));
    },

    "click .unstar": function(event){
        event.preventDefault();
        Meteor.call("unstar", Session.get("currentPhotoId"));
    }
});

var overlayActive = false;

function nextPhoto(){
    var id = Session.get("nextPhotoId");
    if(id){
        Session.set("currentPhotoId", id);
    }
}

function previousPhoto(){
    var id = Session.get("previousPhotoId");
    if(id){
        Session.set("currentPhotoId", id);
    }
}

$(document).on("keydown", function(event){
    if(overlayActive){
        if(event.keyCode === 39){
            nextPhoto();
        }
        else if(event.keyCode === 37){
            previousPhoto();
        }
    }
});

Deps.autorun(function () {
    var photoId = Session.get("currentPhotoId");
    if(photoId){
        overlayActive = true;
        var order = Session.get("currentGalleryOrder");

        var idx = _.indexOf(order, photoId);
        Session.set("nextPhotoId", order[idx+1]);
        Session.set("previousPhotoId", order[idx-1]);
    }
    else {
        overlayActive = false;
    }
});