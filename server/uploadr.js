(function(){
  var require = __meteor_bootstrap__.require;

  var im = NodeModules.require("imagemagick");
  var fs = require("fs");
  var Future = require("fibers/future");

  var filer = new Filer({
    uploadDir: MAG.uploadsFolder,
    hash: "sha1"
  });

  filer.register("/upload");

  filer.events({
    "end": onUploadEnd
  });

  function onUploadEnd(data){
    var failedFiles = [];

    var files = data.files;
    var uploadToken = data.fields.upload_token;

    var user = MAG.users.getUserFromUploadToken(uploadToken);
    if(!user){
      console.log("Error, invalid token");
      deleteFiles(files);
      return {
        statusCode: 403,
        info: {
          error: "Invalid token"
        }
      };
    }

    //Immediately invalidate current token
    MAG.users.generateUploadToken(user);

    var userNameSlug = slugify(user.profile.name);
    var uploadFolder = MAG.imagesFolder + userNameSlug + "/";
    if(!fs.existsSync(uploadFolder)){
      fs.mkdirSync(uploadFolder, 0755);
    }

    _.each(files, function(file){
      try {
        processFileSync(file, uploadFolder);
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

    return {
      statusCode : statusCode,
      info: {
        failedUploads: _.pluck(failedFiles, "name")
      }
    };
  }

  function processFileSync(file, destFilePrefix){
    var baseName = destFilePrefix + file.hash + "-";
    var original = baseName + "original.jpg";

    fs.renameSync(file.path, original);

    var futures = [];
    var resize = Future.wrap(im.resize);

    _.each(MAG.imageWidths, function(w){
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