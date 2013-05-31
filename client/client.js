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

        Session.set("currentGalleryId", id);

        return "gallery";
    },


    "*": "not_found"
});

Accounts.config({
    sendVerificationEmail: false
});
