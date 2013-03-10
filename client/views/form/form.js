(function(){
  Template.form.events({
    "change" : function (event, template) {
      event.preventDefault();
      var files = template.find("input:file").files;
      uploadPictures(files, uploadToken());
    },

    "drop": function(event){
      event.preventDefault();
      $("#file-zone").removeClass("dropzone-hover");
      uploadPictures(event.dataTransfer.files, uploadToken());
    },

    "dragenter": function(event){
      $("#file-zone").addClass("dropzone-hover");
    },

    "dragleave": function(event){
      $("#file-zone").removeClass("dropzone-hover");
    },

    "dragover": function(event){
      event.preventDefault();
    }
  });

  function uploadToken(){
    return $("#upload-token").val();
  }

  function uploadPictures(files, uploadToken){
      var formData = new FormData();
      
      _.each(files, function(file, index){
        formData.append("file-"+index, file);
      });
      formData.append("upload_token", uploadToken);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);

      /*var progressBar = template.find('progress');
      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          progressBar.value = (e.loaded / e.total) * 100;
        }
      };
      xhr.onload = function(e) {
        if (this.status == 200) {
          progressBar.value = 0;
        }
      };*/
      
      xhr.send(formData);
  }

}());