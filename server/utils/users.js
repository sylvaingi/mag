MAG.users = {};

MAG.users.generateUploadToken = function(user){
    Meteor.users.update(user, {$set:{uploadToken: Random.id()}});
};

MAG.users.getUserFromUploadToken = function(token){
    return Meteor.users.findOne({uploadToken: token});
};

Accounts.onCreateUser(function(options, user) {
    user.uploadToken = Random.id();

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;

    return user;
});
