const Courses = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');
const { mongooseToObject} = require('../../util/mongoose');
class SiteController {
  index(req,res){
      const page = parseInt(req.query.page) || 1;
      const perPage = 6;
      const start =(page -1) * perPage;
      const end = page * perPage;
       Courses.find({}).then(courses=>{
         if(req.query.search){
           Courses.where({$or:[{name:req.query.search},{price:req.query.search}]}).then(courses=>{
            res.render('home',{
              courses:multipleMongooseToObject(courses)
             })
           })
         }else{
          res.render('home',{
            courses:multipleMongooseToObject(courses).slice(start,end),page
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
