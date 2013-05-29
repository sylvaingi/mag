Meteor.subscribe("userData");
Meteor.subscribe("allUserData");

var gHandle = Meteor.subscribe("galleries");
Meteor.subscribe("pictures");


Meteor.Router.add({
    "/": "galleryList",

    "/addPicture": function(){
        if(!Meteor.userId()){
            Meteor.defer(function(){
                alert("Veuillez vous connecter au préalable");
                Meteor.Router.to("/");
            });
        }

        return "form";
    },

    "/:id": function(id){
        if(!gHandle.ready()){
            return;
        }

        Session.set("currentGalleryId", gallery);

        return "gallery";
    },


    "*": "not_found"
});

Meteor.startup(function(){
    $("body").niceScroll({
        cursorborder: "",
        cursorcolor: "#ca1974",
        cursorborderradius: 0,
        cursorwidth: 10,
        scrollspeed : 100,
        boxzoom: false,
        vertical: true,
        horizrailenabled: false,
        autohidemode: false
    });
});

Accounts.config({
    sendVerificationEmail: false
});
