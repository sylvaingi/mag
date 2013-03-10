Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'uploadToken': 1}});
});