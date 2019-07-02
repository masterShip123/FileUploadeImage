const express = require('express')
var fs = require('fs')
var imageDir = 'D:/back/Uploade/cc/HHhQtudyrnsGbJsqsf5PJxT0.jpg'
var path = 'D:/back/Uploade/cc/';
var jpeg = require('jpeg-js');
var png = require("upng-js");
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: path });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/upload", function(request, response, next){
    next();
});
  
app.get('/api/upload/:id', (req, res)=>{
    // res.json({'message':'hello'});
    // console.log(req)
    var sp = req.params['id'].split(".");
    console.log(sp);
    if(sp[1] == 'jpg' || sp[1] == 'jpeg'){
        var jpegData = fs.readFileSync(path+""+req.params['id']);
        // var jpegData = fs.readFileSync(imageDir);
        var raw = jpeg.decode(jpegData);
        res.setHeader("Content-Type", "image/jpeg");
        res.send(jpegData);
        console.log(req.params['id']);
    }else{
        var pangData = fs.readFileSync(path+""+req.params['id']);
        // var jpegData = fs.readFileSync(imageDir);
        var raw = png.decode(pangData);
        res.setHeader("Content-Type", "image/png");
        res.send(pangData);
        console.log(req.params['id']);
    }
   
    // res.setHeader("Content-Type", "image/png");
   
//   fs.readFile(imageDir,function(err,data){
//       if(err){throw err;}
//       console.log("Reading file async");
//     //   console.log(data);
//       res.send(data);
//   });

});

app.post('/api/upload', multipartMiddleware, (req, res)=>{
    res.json({'message1':req.files});
});

app.use(function(err, req, res, next) {
    res.json({'error':err.message})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))