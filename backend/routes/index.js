var express = require('express');
var mongoose=require('mongoose');
var Data=require('../contacts'); //contacts schema
var multer=require('multer'); //multer for image uploading
var path=require('path'); 
var fs=require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
 res.render('index')
});

/* Post table page */
router.post('/',function(req,res){
  res.render('table',{req:req});
});

/* Multer storage definiton */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images') //image upload destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //image name to be stored
  }
});

/* Multer upload function */
var upload=multer({
  storage:storage,
  limits:{fileSize:2000000}
}).single("file")

/* Database connection */
const dbRoute='mongodb://localhost:27017/contact_db';
mongoose.connect(dbRoute,{useNewUrlParser:true});
let db=mongoose.connection;
db.once('open',()=>console.log('Database connected successfully'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Adding new contacts to the db */
router.post('/addContact',(req, res) => {
  upload(req,res,function(err){
    if(!req.file)
    {
      defaultImage={  //set default image 
        fieldname: 'file',
        originalname: 'user.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'public/images',
        filename: 'user.png',
        path: 'public/images/user.png',
        size: 5306
      }
      req.file=defaultImage;
    }
    //console.log("Req body:",req.body);
    //console.log("Req file:",req.file);
    //console.log("Req file path:",req.file.path);
    let data=new Data(); //object to contacts schema
    data.image=req.file.path;
    data.name=req.body.name;
    data.phno=req.body.phno;
    data.email=req.body.email;

    data.save((err)=>{
      if (err)
      {
        return res.json({ success: false, error: err ,message:"Error while saving contact"});
      }
      return res.json({ success: true, message:"Contact saved successfully" });
    })
    /*if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } 
    else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file) */
  })
});

/*Fetch all contacts from db */
router.get('/contactList',(req,res)=>{
  Data.find((err, data) => {
    //console.log("Get contacts:",data);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data});
  });
})

/*Update contact based on name*/
router.post('/updateContact',(req,res)=>{
  upload(req,res,err=>{
  //console.log("new values to be updated:",req.body);
  const delPreviousImage=req.body.previousImage.replace('http://localhost:7000/','./public/');
  //console.log("previous image",delPreviousImage);
  if(delPreviousImage!=='./public/images/user.png'){ //automatically delete unused images from /public/images
    fs.unlink(delPreviousImage,(err)=>{
      if(err) return console.log("Error while deleting file");
      return console.log("File deleted successfully");
    });
  }
  let setImage=""; 
  if(!req.file)
  {
    setImage=req.body.previousImage.replace('http://localhost:7000/','public/');
    //set previous contact picture if user not change previous display picture
  }
  else{
    setImage=req.file.path; //set new contact picture if user changes previous display picture
  }
 Data.update({"name":req.body.previousName},{$set:{"name":req.body.name,"phno":req.body.phno,"email":req.body.email,"image":setImage}},{multi:false},(err)=>{
    if(err)
    {
      return res.json({success:false,error:err,message:"Contact update failed"})
    }
    return res.json({success:true,message:"Contact updated successfully"});
  });
})
});


module.exports = router;
