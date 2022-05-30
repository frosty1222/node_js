const Courses = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');
const { mongooseToObject} = require('../../util/mongoose');
class SiteController {
  index(req,res){
       Courses.find({}).then(courses=>{
         if(req.query.search){
           Courses.where({$or:[{name:req.query.search},{price:req.query.search}]}).then(courses=>{
            res.render('home',{
              courses:multipleMongooseToObject(courses)
             })
           })
         }else{
          res.render('home',{
            courses:multipleMongooseToObject(courses)
           })
         }
         
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
