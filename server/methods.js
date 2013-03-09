Meteor.methods({
    addPictures: function(upload_token, files){
        if(!upload_token){
            throw new Meteor.Error(401, "Need authentication for uploads");
        }
        console.log()
    } 
});