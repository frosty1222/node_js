const Courses = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');
const { mongooseToObject} = require('../../util/mongoose');
class SiteController {
  //GET/home
  // call back function
  // index(req, res) {
  //   Courses.find({}, function(err,courses){
  //     if(!err){
  //       res.json(courses);
  //       return 
  //     }
  //       res.status(400).json({err:'ERROR!!!'})
  //   })
  // }
  //GET/search
  //promises function
  index(req,res){
       Courses.find({}).then(courses=>{
         res.render('home',{
           courses:multipleMongooseToObject(courses)
          })
       })
       .catch(error=>next(error))
  }
  appear(req,res,next){
    Courses.findOne({slug:req.params.slug}).then(course=>{
      res.render('appear',{course:mongooseToObject(course)})
    }).catch(next)
  }
  search(req, res) {
    res.render('search');
  }
}
module.exports = new SiteController();
