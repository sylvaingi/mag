Template.form.created = function(){
  if(!("FormData"in window)){
    alert("L'envoi d'images n'est pas supporté par votre navigateur.\nVeuillez réessayer avec un navigateur moderne, Google Chrome par exemple :)");
  }
};

Template.form.events({
  "click #mt-upload-zone": function(event,template){
    event.preventDefault();
    template.find("#mt-upload-files").click();
  },

  "change" : function (event, template) {
    event.preventDefault();
    var files = template.find("input:file").files;
    uploadPictures(files, uploadToken());
  },

  "drop": function(event, template){
    event.preventDefault();
    $("#mt-upload-zone").removeClass("drag-hover");
    uploadPictures(event.dataTransfer.files, uploadToken());
  },

  "dragenter": function(event){
    $("#mt-upload-zone").addClass("drag-hover");
  },

  "dragleave": function(event){
    $("#mt-upload-zone").removeClass("drag-hover");
  },

  "dragover": function(event){
    event.preventDefault();
  }
});

function uploadToken(){
  return $("#upload-token").val();
}

function uploadPictures(files, uploadToken){
    var uploadSize = 0;
    var formData = new FormData();

    _.each(files, function(file, index){
      uploadSize += file.size;
      formData.append("file-"+index, file);
    });

    if(uploadSize > 104857600){
      alert("Veuillez n'envoyer pas plus de 100 Mo de photos a la fois.\nRéessayez avec moins de photos.");
      return;
    }

    formData.append("upload_token", uploadToken);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    var $uZone = $("#mt-upload-zone").hide();
    var $uProg = $("#mt-upload-progress").show();
    var $uProgPercent = $("#mt-upload-progress-percent").text(0);

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var progression = (e.loaded / e.total) * 100;
        $uProgPercent.text(Math.floor(progression));
      }
    };

    xhr.onload = function(e) {
      $uZone.show();
      $uProg.hide();
    };

    xhr.send(formData);
}
