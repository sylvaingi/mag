MAG.require = __meteor_bootstrap__.require;
MAG.uploadsFolder = "./uploads";

Meteor.startup(function(){
    var fs = MAG.require('fs');

    //Create needed directories
    _.each([ MAG.imagesFolder , MAG.uploadsFolder ], function(d){
        if(!fs.existsSync("./" + d)){
            fs.mkdirSync(d, 0755);
        }
    });

    //Symlink MAG.imagesFolder into static_cacheable folder, in dev or prod env
    //Dev env 
    if(fs.existsSync(".meteor")){
        fs.symlinkSync('../../../../images', '.meteor/local/build/static_cacheable/images');
    }
    //Prod env
    else if(!fs.existsSync('static_cacheable/images')){
        fs.symlinkSync('../images', 'static_cacheable/images');
    }

});
