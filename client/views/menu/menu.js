Template.menu.helpers({
    gallery: function(){
        return MAG.Galleries.findOne({userId: Meteor.userId()});
    }
});