Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'uploadToken': 1}});
});

Meteor.publish("allUserData", function () {
  return Meteor.users.find({},
                           {fields: {'profile.name': 1, 'services.google.picture': 1}});
});

Meteor.publish("galleries", function(){
    return MAG.Galleries.find();
});

Meteor.publish("pictures", function(){
    return MAG.Pictures.find();
});