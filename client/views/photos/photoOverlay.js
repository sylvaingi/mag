Template.photoOverlay.helpers({
    "photo": function(){
        return MAG.Pictures.findOne({_id: Session.get("currentPhotoId")});
    },

    "nextPhoto": function(){
        return Session.get("nextPhotoId");
    },

    "previousPhoto": function(){
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

    "click .mt-photo-overlay-content": function(event){
        event.stopPropagation();
    },

    "click #mt-photo-overlay": function(){
        Session.set("currentPhotoId", null);
    }
});

Template.photoOverlay.preserve([".mt-photo-overlay-content"]);

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
    Session.set("currentPhotoId", Session.get("nextPhotoId"));
}

function previousPhoto(){
    Session.set("currentPhotoId", Session.get("previousPhotoId"));
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
    var photo = Session.get("currentPhotoId");
    if(photo){
        overlayActive = true;
        Session.set("nextPhotoId", MAG.Pictures.pictureAfter(photo));
        Session.set("previousPhotoId", MAG.Pictures.pictureBefore(photo));
    }
    else {
        overlayActive = false;
    }
});