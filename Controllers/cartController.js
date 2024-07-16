const carts = require('../Models/cartModel')

exports.addToCart = async (req, res) => {
    try {
        const userId = req.payload
        const { id, title, price, image } = req.body
        const existingProdect = await carts.findOne({ userId, id })
        if (existingProdect) {
            existingProdect.quantity += 1
            existingProdect.totalPrice = existingProdect.price * existingProdect.quantity
            await existingProdect.save()
            res.status(200).json("Product added again ")
        }
        else {
            const newcart = new carts({
                id, title, price, image, quantity: 1, totalPrice: price, userId
            })
            await newcart.save()
            res.status(200).json("Product added to cart")
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.payload
        const result = await carts.find({ userId })
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.removeCart = async (req, res) => {
    try {
        const id = req.params.id
        const result = await carts.findByIdAndDelete({ _id: id })
        res.status(200).json("Item removed from cart")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.icnreaseQuantity = async (req, res) => {
    try {
        const cid = req.params.id
        const cartItem = await carts.findById({ _id: cid })

        cartItem.quantity += 1
        cartItem.totalPrice = cartItem.quantity * cartItem.price
        await cartItem.save()
        res.status(200).json("Quantity Updated")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}
exports.decreaseQuantity = async (req, res) => {
    try {
        const cid = req.params.id
        const cartItem = await carts.findById({ _id: cid })

        if (cartItem.quantity == 1) {
            const result = await carts.findByIdAndDelete({ _id: cid })
            res.status(200).json("item removed from cart")
        }
        else {
            cartItem.quantity -= 1
            cartItem.totalPrice = cartItem.quantity * cartItem.price
            await cartItem.save()
            res.status(200).json("Quantity Updated")
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.emptyCart=async (req,res)=>{
    try{
        const userId=req.payload

        const result=await carts.deleteMany({userId})
        res.status(200).json(" Cart is empty")
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}