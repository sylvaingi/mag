(function(){
  Meteor.users.find().observe({
    added: function(user){
      generateUploadToken(user);
    }
  });

  function generateUploadToken(user){
    Meteor.users.update(user, {$set:{upload_token: Random.id()}});
  }

  function invalidateUploadToken(token){
    debugger;
    var user = Meteor.users.findOne({upload_token: token});
    generateUploadToken(user);
    return user;
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

  var im = NodeModules.require('imagemagick');
  var fs = __meteor_bootstrap__.require("fs");
  var childproc = require('child_process');

  var baseFolder = "public/images~/";

  var filer = new Filer({
    uploadDir: "uploads/",
    hash: "sha1"
  });

  filer.register("/upload", onUpload);

  function onUpload(err, fields, files){
    if(err){
      console.log(err);
    }
    
    var uploadToken = fields.upload_token;
    if(!uploadToken){
      console.log("Error, no upload_token in request");
    }
    var user = invalidateUploadToken(uploadToken);

    var userNameSlug = slugify(user.profile.name);
    var uploadFolder = baseFolder + userNameSlug + "/";
    if(!fs.existsSync(uploadFolder)){
      fs.mkdirSync(uploadFolder, 0755);
    }

    _.each(files, function(file){
      processFile(file, uploadFolder);
    });
  }

  function processFile(file, uploadFolder){
    var baseName =  uploadFolder + file.hash + "-";
    var original =  baseName + "original.jpg";
    fs.renameSync(file.path, original);

    var widths = [1000, 300];
    _.each(widths, function(w){
      im.resize({
        srcPath: original,
        dstPath: baseName+w+".jpg",
        width: w
      }, 
      function(err){
        if(err){
          console.log(err);
        }
      });
    });
  }
  filer.allow(function(){
    return true;
  });

  //childproc.spawn("zip", ["-r", "public/all-"+new Date().valueOf()+".zip", "images"]);
}());
  