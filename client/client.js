Meteor.subscribe("userData");
Meteor.subscribe("allUserData");

var gHandle = Meteor.subscribe("galleries");
Meteor.subscribe("pictures");


Meteor.Router.add({
    "/": "galleryList",

    "/addPicture": function(){
        if(!Meteor.userId()){
            Meteor.defer(function(){
                alert("Veuillez vous connecter via le bouton \"Sign in\"");
                Meteor.Router.to("/");
            });
        }

        return "form";
    },

    "/:id": function(id){
        if(!gHandle.ready()){
            return;
        }
        var gallery = MAG.Galleries.findOne({_id: id});
        Session.set("currentGallery", gallery);

        var user = Meteor.users.findOne({_id: gallery.userId});
        Session.set("currentGalleryCreator", user);

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
        touchbehavior : true,
        boxzoom: false,
        vertical: true,
        horizrailenabled: false,
        autohidemode: false
    });
});

Accounts.config({
    sendVerificationEmail: false
});
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});