Template.leftPanel.helpers({
    gallery: function(){
        return MAG.Galleries.findOne({userId: Meteor.userId()});
    }
});