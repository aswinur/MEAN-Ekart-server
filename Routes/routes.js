const express=require('express')
const produceController=require('../Controllers/produceController')
const userController= require('../Controllers/userController')
const wishController=require('../Controllers/wishController')
const cartController=require('../Controllers/cartController')

const jwtMiddle=require('../Middlewares/jwtMiddleware')

const router=new express.Router()

router.get('/all-products',produceController.allProducts)
router.get('/get-product/:id',produceController.getProduct)
router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/addwish',jwtMiddle,wishController.addToWishlist)
router.get('/getwish',jwtMiddle,wishController.getWishlist)
router.delete('/remwish/:id',jwtMiddle,wishController.removeWishlistItem)
router.post('/addcart',jwtMiddle,cartController.addToCart)
router.get('/getcart',jwtMiddle,cartController.getCart)
router.delete('/remcart/:id',jwtMiddle,cartController.removeCart)
router.get('/inccart/:id',jwtMiddle,cartController.icnreaseQuantity)
router.get('/deccart/:id',jwtMiddle,cartController.decreaseQuantity)
router.delete('/emptycart',jwtMiddle,cartController.emptyCart)

module.exports=router
