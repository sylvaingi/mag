Template.menu.helpers({
    gallery: function(){
        return MAG.Galleries.findOne({userId: Meteor.userId()});
    }
});

Template.menu.events({
    "click #login-buttons-logout": function(event){
        event.preventDefault();
        Meteor.logout();
    }
});