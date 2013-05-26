var signup = false;

Template.login.events({
    "click .login-button": function(event){
        switch(event.target.id){
            case "facebook":
                Meteor.loginWithFacebook();
                break;
            case "google":
                Meteor.loginWithGoogle();
                break;
            case "twitter":
                Meteor.loginWithTwitter();
                break;
        }
    },

    "click #signup-link": function(event){
        $("#login-password-confirm-label-and-input").show();
        signup = true;
    },

    "click #login-buttons-password": function(event){
        var username = $("#login-username").val();
        var password = $("#login-password").val();

        if(signup){
            var passwordConfirm = $("#login-password-confirm").val();
            if(password !== passwordConfirm){
                alert("Les mots de passe ne correspondent pas.");
            }

            Accounts.createUser({
                username: username,
                password: password,
                profile: {
                    name: username
                }
            }, function(err){
                if(err){
                    alert("Veuillez remplir le formulaire correctement.");
                }
            });
        }
        else {
            Meteor.loginWithPassword(username, password, function(err){
                if(err){
                    alert("Mauvais nom d'utilisateur/mot de passe");
                }
            });
        }
    }
});