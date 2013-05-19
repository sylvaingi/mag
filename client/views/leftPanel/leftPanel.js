Template.leftPanel.helpers({
    background: function(){
        return "img/bg1.jpg";
    },
    title: function(){
        var title;
        var page = Meteor.Router.page();

        if(page === "galleryList"){
            title = "maude & antoine";
        }
        else if (page === "form"){
            title = "Envoi de photos";
        }
        else if(page === "gallery"){
            title = "Photos de ";
            title += Session.get("currentGalleryCreator").profile.name;
        }

        return title;
    }
});