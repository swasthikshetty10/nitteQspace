export function uploadFile(file: any, onProgress: any) {
  var url = "https://api.cloudinary.com/v1_1/demo/auto/upload";
  var key = "docs_upload_example_us_preset";
  return new Promise(function (res, rej) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
      var resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = function (evt) {
      return rej(evt);
    };
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        var percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);
    xhr.send(formData);
  });
}
