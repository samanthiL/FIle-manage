const express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    ObjectId = require('mongodb').ObjectID,

    uuidv4 = require('uuid/v4'),
    router = express.Router();
    app = express();


// User model
const User = require('../models/User');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "text/csv" || file.mimetype == "application/pdf" || file.mimetype == "text/plain") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .csv, .pdf and .txt format allowed!'));
        }
    }
});

router.post('/upload-images', upload.array('imgCollection', 6), (req, res, next) => {


    console.log("sdsd",req.body.Customer_Name);
    const reqFiles = [];
    const cname = req.body.Customer_Name;
    const Duration = req.body.Duration;
    const Amount = req.body.Amount;
    const Repayment = req.body.Repayment;
    
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)

    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        imgCollection: reqFiles,
        Customer_Name:cname,
        Duration:Duration,
        Amount:Amount,
        Repayment:Repayment


    });

    user.save().then(result => {
        res.status(201).json({
            message: "Done upload!",
            userCreated: {
                _id: result._id,
                imgCollection: result.imgCollection,
                Customer_Name:result.Customer_Name,
                Duration:result.Duration,
                Amount:result.Amount,
                Repayment:result.Repayment
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get('/userlist', (req, res) => {
    User.find()
        .then(data =>{
            console.log(data)
            res.send(data)
        }).catch(err => {
          console.log(err)
      })
    

  })

 router.get('/list/:userId',(req, res) => {
//     User.findById(req.params.id, (err, doc) => {
    // User.find(ObjectId('62f0fb9d857bbc4e8ee237ca'))
    User.findById(req.params.userId )

    // User.find({"_id" : ObjectId("62f0fb9d857bbc4e8ee237ca")})
.then(data =>{
    console.log(data)
    res.send(data)
}).catch(err => {
  console.log(err)
})


        

//     res.send(doc)
    
//     });
});

module.exports = router;