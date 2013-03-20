(function(){
  var fs = MAG.require("fs");
  var Future = MAG.require("fibers/future");
  var im = NodeModules.require("imagemagick");

  Meteor.Router.start({
    bodyParser: {
      uploadDir: MAG.uploadsFolder,
      hash: "sha1"
    }
  });

  Meteor.Router.add('/upload', function() {
    var files = this.request.files;
    var uploadToken = this.request.body.upload_token;
    var failedFiles = [];

    var user = MAG.users.getUserFromUploadToken(uploadToken);
    if(!user){
      console.log("Error, invalid token");
      deleteFiles(files);
      return [
        403,
        "Invalid token"
      ];
    }

    //Immediately invalidate current token
    MAG.users.generateUploadToken(user);

    _.each(files, function(file){
      try {
        processFileSync(file, MAG.uploadsFolder);
        addPictureToUserGallery(file, user._id);
      } catch(e){
        console.log("Error while processing file ", file.path, e);
        failedFiles.push(file);
      }
    });

    var statusCode = 200;

    if(failedFiles.length === _.size(files)){
      console.log("Error, unable to process any of the files uploaded");
      statusCode = 500;
    }

    deleteFiles(failedFiles);

    return [
      statusCode,
      JSON.stringify({
        failedUploads: _.pluck(failedFiles, "name")
      })
    ];
  });

  function processFileSync(file, destFolder){
    var baseName = destFolder + "/" + file.hash + "-";
    var original = baseName + "original.jpg";

    fs.renameSync(file.path, original);

    var futures = [];
    var resize = Future.wrap(im.resize);

    _.each(MAG.imagesWidths, function(w){
      futures.push(resize({
        srcPath: original,
        dstPath: baseName + w + ".jpg",
        width: w
      }));
    });

    Future.wait(futures);

    //Make failed future throw
    _.each(futures, function(future){
      future.get();
    });
  }

  function addPictureToUserGallery(file, userId){
    console.log("Adding picture "+file.name+" from user "+userId);
    var galleryId = MAG.Galleries.getUserGallery(userId);
    MAG.Pictures.addPicture(file.name, file.hash, galleryId);
  }

  function slugify(str) {
    var from  = "ąàáäâãåæćęèéëêìíïîłńòóöôõøśùúüûñçżź",
        to    = "aaaaaaaaceeeeeiiiilnoooooosuuuunczz",
        regex = new RegExp(from, 'g');

    str = String(str).toLowerCase().replace(regex, function(c){
      var index = from.indexOf(c);
      return to.charAt(index) || '-';
    });

    return str.replace(/[\s-]/g, '.');
  }

  function deleteFiles(files){
    _.each(files, function(file){
      fs.unlink(file.path);
    });
  }
}());