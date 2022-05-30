const Course = require('../models/Course');
const Cart = require('../models/Cart');
const {multipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
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
           const quantity = 1
           Cart.findOne({slug:req.params.slug}).then(cartValue=>{
               if(cartValue.slug == req.params.slug){
                   const  newQuantity = quantity +1;
                   Cart.findOneAndUpdate({slug:req.params.slug},{quantity:newQuantity},function(err){
                     console.log(err);
                   })
               }else{
                Cart.create({
                      name:name,
                      description:description,
                      image:image,
                      slug:slug,
                      price:price,
                      quantity:quantity,
                  })
               }
           })
       }
        )
        .then(
            res.redirect('/carts/cartTable')
       ).catch(next)
  }
   async cartTable(req,res,next){
       try{
        Cart.find({}).then(cartValue=>{
        res.render('carts/cartTable',{cartValue:multipleMongooseToObject(cartValue)}) 
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