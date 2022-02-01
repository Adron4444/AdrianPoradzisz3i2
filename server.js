var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000;

var hbs = require('express-handlebars');
var formidable = require('formidable');
const path = require("path");

app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs({
  defaultLayout: 'main.hbs',
  helpers: {
    createFoto: function (type){
      let style = "background-image: url('";
      if(type == "image/jpeg")
        style += "../files/jpg.png')"
      else if(type == "application/x-zip-compressed")
      style += "../files/zip.png')"
      else if(type == "image/png")
      style += "../files/png.png')"
      else
      style += "../files/file.png')"

      return style
    },
  }
}));

app.get('/', function(req, res) {
  res.render('uploads.hbs');
});

let jsonFile = [];
let data = {
  uploads: [1, 2]
};
let index = 1;

app.post('/upload', function(req, res) {
  let form = formidable({});
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = __dirname + '/static/uploads/'
  form.parse(req, function(err, fields, files) {
    if (files.upload.length == undefined) {
      let obj = {
        id: index,
        name: files.upload.name,
        path: files.upload.path,
        size: files.upload.size,
        type: files.upload.type,
        lastModifiedDate: files.upload.lastModifiedDate
      }
      jsonFile.push(obj);
      index++;
    } else {
      files.upload.forEach(item => {
        let obj = {
          id: index,
          name: item.name,
          path: item.path,
          size: item.size,
          type: item.type,
          lastModifiedDate: item.lastModifiedDate
        }
        index++;
        jsonFile.push(obj);
      })
    }
    data.uploads = jsonFile;
    res.redirect('/filemanager');
  });
});

app.get('/filemanager', function(req, res) {
  res.render('filemanager.hbs', data);
});

app.get('/info/', function(req, res) {
  res.render('info.hbs', data.uploads[req.query.id]);
});

app.get('/download/', function(req, res) {
  res.download(data.uploads[req.query.id].path, data.uploads[req.query.id].name);
});

app.get('/reset', function(req, res) {
  index = 1;
  data.uploads.length = 0;
  res.redirect('/filemanager');
});

app.get('/delete/', function(req, res) {
  data.uploads.splice(req.query.id, 1);
  res.redirect('/filemanager');
});

app.use(express.static('static'))

app.listen(PORT, function() {
  console.log("start serwera na porcie " + PORT)
});
