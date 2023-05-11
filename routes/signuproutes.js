const express = require('express');
const mongoose = require('mongoose');
const Signup = require('../models/schema');
const router = express.Router();

const app = express();
//express is an backend web application framework for nodejs

//Get all todos
router.get('/getsignup', async (req, res) => {  //// async makes a function return a Promise
    try {
        const signup = await Signup.find({})  
        //await makes a function wait for a Promise
        res.status(200).json({ signup })
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})

//get id by todo
// 

router.post('/logindetails',async(req,res,next)=>{
  var Email = req.body.Email ;
  const typedPassword = req.body.typedPassword;
  console.log(Email)
   Signup.findOne({Email:Email}).select().exec().then( doc =>{
    console.log(doc)
    
    // var em = req.body.Email;
    console.log(typedPassword)
    console.log(doc.Password)

    if(typedPassword === doc.Password){
      res.status(200).json({
        message:"success",
      })
    }
    else{
      res.status(400).json({
        message:"failed"
      });
    }
   })
})

//post a new todo
router.post('/signup', async (req, res) => {
    const newSignup = new Signup({
      Username:req.body.Username,
      Email:req.body.Email,
      Password:req.body.Password,
      Confirmpassword:req.body.Confirmpassword
    });
    
    //first check if user already existed
      await Signup.findOne({Email:req.body.Email}).select().exec().then(doc =>{
       if(doc == null){  //if no user found then create new user
        newSignup.save().then( result=> {

          res.status(200).json({
            message:"user signuped successfully",
            status:"success",
            Email: result.Email
          });

        }).catch(err => {
          console.log(err);
          res.status(500).json({
            error:err,
            ststus:"failed"
          });
        })
       }else{
        res.status(500).json({
          message:"user already exist",
          status:"failed"
        })
       }
    })
  });

  //ddelete a todo
router.delete('/deletetodos/:id', (req, res) => {
  Signup.findByIdAndDelete(req.params.id)  //params means parameter value
      .then(() => res.json('user deleted'))
      .catch(err => res.status(400).json(`Error: ${err}`));

})

  module.exports = router;

  // try {
  //   await newSignup.save();
  //   res.status(200).json({ message: 'user added' });
  // } catch (error) {
  //   res.status(400).json({ error });
  // }