const Course = require('../models/Course');
const Cart = require('../models/Cart');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
const { send } = require('express/lib/response');
const quantity = 0;
const total_quantity = 0;
const total_price = 0;
class CartController{
    index(res){
        res.send('index view')
    }
    cart(req,res,next){
       Course.findOne({slug:req.params.slug}).then(cart=>{
           const name = cart.name;
           const description = cart.description;
           const image = cart.image;
           const slug = cart.slug;
           const price = cart.price;
           const qty = 1
           const slugUrl = req.params.slug;
           Cart.findOne({slug:req.params.slug}).then(cartValue=>{
            if(cartValue.slug == req.params.slug){
              const newQ =cartValue.quantity;
              const  newQuantity = newQ;
                Cart.findOneAndUpdate({slug:req.params.slug},{quantity:newQuantity +1},{new:true,upsert:true},function(err,counter){
                 if(err){console.log(err) }
                })
           }
           }).catch(
             function(err){
               if(err){
                Cart.create({
                  name:name,
                  description:description,
                  image:image,
                  slug:req.params.slug,
                  price:price,
                  quantity:qty,
                 })
               }
             }
           );
           })
        .then(
            res.redirect('/carts/cartTable')
       ).catch(next)
  }
   async cartTable(req,res,next){
       try{
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start =(page -1) * perPage;
        const end = page * perPage;
        Cart.find({}).then(cartValue=>{
        res.render('carts/cartTable',{cartValue:multipleMongooseToObject(cartValue).slice(start, end),page}); 
    }).catch(next)
      }catch{
        res.send(next)
    }
    
  }
  cartDelete(req,res,next){
    const id  = req.params.id;
      Cart.findByIdAndDelete(id,function(err){
        if(err){
           res.status(404).send(err);
         }else{
             res.redirect('/carts/cartTable')
         }
        })
  }
  updateQ(req,res,next){
      Cart.findOneAndUpdate({slug:req.params.slug},{quantity:req.body.quantity},function(err){
         if(err){
           res.status(404).send(err);
         }else{
           res.redirect('/carts/cartTable');
         }
      })
  }
}
module.exports = new CartController();