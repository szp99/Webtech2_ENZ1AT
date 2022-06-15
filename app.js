const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Plant = require('./models/plant');


const router = require('express').Router();


//db

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb");


mongoose.connection.on('connected',()=>{
  console.log('connected to db');
});

mongoose.connection.on('error',(err)=>{
  if(err){
    console.log('error in db connection ' + err);
  }

});



router.post('/addUser', (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(req.body, (error, data) => {

    if (error) {
      console.log(error)


    } else {
      res.json(data)
    }
  });
});

router.get('/getAllusers', (req,res) => {
  User.find({})
    .exec(function (err, users){
      if(err){
        console.log("error retrieving users");
      }else{
        res.json(users);
      }
    });

});

router.get('/getAllplants', (req,res,next) => {
  Plant.find({})
    .exec(function (err, plants){
      if(err){
        console.log("error retrieving plants");
      }else{
        res.json(plants);
      }
    });


});

router.post('/addPlant', (req, res) => {

  const plant = new Plant();
  plant.name = req.body.name;
  plant.latinname = req.body.latinname;
  plant.type = req.body.type;
  plant.quantity = req.body.quantity;
  

  plant.save(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  });
});

router.delete('/delete/:id',function(req,res){

  console.log(req.params.id)
  Plant.findOneAndRemove({_id:req.params.id},function(err,plant){
      if(err){
          res.send("error deleting");
      }else{
          console.log(plant);
          res.json(plant);
      }
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('', router);


app.listen(port, () => {
  console.log("Server listening on port " + port);
});
