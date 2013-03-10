(function(){
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");

    Meteor.subscribe("galleries");
    Meteor.subscribe("pictures");
}());