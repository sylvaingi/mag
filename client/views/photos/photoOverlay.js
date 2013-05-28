Template.photoOverlay.helpers({
    "photo": function(){
        return Session.get("currentPhoto");
    },

    "nextPhoto": function(){
        return Session.get("nextPhoto");
    },

    "previousPhoto": function(){
        return Session.get("previousPhoto");
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
    var p = Session.get("nextPhoto");
    Session.set("currentPhotoId", p ? p._id : null );
}

function previousPhoto(){
    var p = Session.get("previousPhoto");
    Session.set("currentPhotoId", p ? p._id : null );
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
        var photo = MAG.Pictures.findOne({_id: photoId});
        Session.set("currentPhoto", photo);
        Session.set("nextPhoto", MAG.Pictures.pictureAfter(photo));
        Session.set("previousPhoto", MAG.Pictures.pictureBefore(photo));
    }
    else {
        overlayActive = false;
        Session.set("currentPhoto", null);
    }
});