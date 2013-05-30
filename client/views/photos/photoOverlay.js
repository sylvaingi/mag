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
    "load .overlay-content>img": function(event){
        var img = event.target;

        var maxW = $("body").width() - 100;
        var maxH = $("body").height() - 100;
        var tW = maxW;
        var tH = maxH;

        var imgW = img.width;
        var imgH = img.height;
        var r = imgW / imgH;

        //landscape ok
        if(r > 1 && (tW / r) < maxH){
            tW = maxW;
            tH = tW / r;
        }
        //portrait
        else {
            tH = maxH;
            tW = tH * r;
        }

        $(".overlay-content").css({
            width: tW + "px",
            height: tH + "px",
            top: "50%",
            left: "50%",
            "margin-top": -(tH/2) + "px",
            "margin-left": -(tW/2) + "px"
        });
    },

    "click .prev": function(){
        previousPhoto();
    },

    "click .next": function(){
        nextPhoto();
    },

    "click .overlay-content": function(event){
        event.stopPropagation();
    },

    "click #overlay": function(){
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