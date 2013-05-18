Meteor.subscribe("userData");
Meteor.subscribe("allUserData");

Meteor.subscribe("galleries");
Meteor.subscribe("pictures");


Meteor.Router.add({
    "/": "galleryList",

    "/:id": function(id){
        Session.set("currentGalleryId", id);
        return "gallery";
    },

    "*": "not_found"
});
