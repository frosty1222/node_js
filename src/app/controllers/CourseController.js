const Course = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');
const { mongooseToObject} = require('../../util/mongoose');
const path = require('path');
const multer = require('multer');
const fs = require("fs");
const { check, validationResult, validationErrors } = require('express-validator');
const {updateData} = require('../../util/updatemodel');
class CourseController {
    //[GET]/courses/:slug
   //[GET]/courses/create
  create(req,res,next){
     res.render('courses/create');
  }
 store(req,res,next){
   var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'src/public/uploads/')
      },
      filename: function (req, file, cb) {
      cb(null,file.originalname )
      }
  })
  var upload = multer({ storage: storage })
     upload.single("image")(req,res,(error)=>{
        if(error){
          return next(error);
        }else{
         //   console.log(Date.now())
           const formData = req.body
           formData.image =req.file.originalname ;
           const course = new Course(formData);
           course.save();
           res.redirect('/')
        }
     })
 }
 edit(req,res,next){
    Course.where({slug:req.params.slug}).then(course=>{
       res.render('courses/edit',{course:multipleMongooseToObject(course)})
    }).catch(next)
    
 }
 update(req,res,next){
   const option = {new:true}
      Course.findByIdAndUpdate(req.params.id,req.body,option,function(err){
         if(err){
           res.status(404).send(err);
         }else{
             res.redirect('/')
         }
        
      })
 }
 delete(req,res,next){
    const id  = req.params.id;
   Course.findByIdAndDelete(id,function(err){
      if(err){
         res.status(404).send(err);
       }else{
           res.redirect('/')
       }
   })
 }
 tablelist(req,res,next){
    const page = parseInt(req.query.page) || 1;
    const perPage = 4;
    const start =(page -1) * perPage;
    const end = page * perPage;
    if(req.query.sort =='asc'){
      Course.find({}).sort({name: 1}).then(course=>{
      res.render('courses/tablelist',{course:multipleMongooseToObject(course).slice(start,end),page})
      }).catch(next); 
    }else if(req.query.sort=='desc'){
      Course.find({}).sort({name: -1}).then(course=>{
         res.render('courses/tablelist',{course:multipleMongooseToObject(course).slice(start,end),page})
         }).catch(next); 
    }
    Course.find({}).then(course=>{
      res.render('courses/tablelist',{course:multipleMongooseToObject(course).slice(start,end),page})
      }).catch(next); 
 }
  //[POST]/courses/store
}
module.exports = new CourseController();
