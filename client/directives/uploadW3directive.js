myApp.directive('file', function() {

  function link(scope, element, attrs){

  }

  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){

        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();

        var reader = new FileReader();
        reader.onload = function(){
          var dataURL = reader.result;
          var output = document.getElementById('profile');
          output.src = dataURL;
        };
        reader.readAsDataURL(file);

        var creds = {
          bucket: 'meal-upload',
          access_key: 'sweet',
          secret_key: 'money'
        }
         
        var upload = function() {
          // Configure The S3 Object 
          AWS.config.update({ accessKeyId: creds.access_key, secretAccessKey: creds.secret_key });
          AWS.config.region = 'us-east-1';
          var bucket = new AWS.S3({ params: { Bucket: creds.bucket } });
         
          if(file) {
            var params = { Key: file.name, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };
         
            bucket.putObject(params, function(err, data) {
              if(err) {
                // There Was An Error With Your S3 Config
                alert(err.message);
                return false;
              }
              else {
                // Success!
                console.log(data)
                alert('Upload Done');
              }
            })
            .on('httpUploadProgress',function(progress) {
                  // Log Progress Information
                  console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
                });
          }
          else {
            // No File Selected
            alert('No File Selected');
          }
        }


        upload()
      });
    }
  };
});