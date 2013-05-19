Meteor.subscribe("userData");
Meteor.subscribe("allUserData");

var gHandle = Meteor.subscribe("galleries");
Meteor.subscribe("pictures");


Meteor.Router.add({
    "/": "galleryList",

    "/form": "form",

    "/:id": function(id){
        if(!gHandle.ready()){
            return;
        }

        Session.set("currentGalleryId", id);
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
        vertical: true
    });
});