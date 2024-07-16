const wishlists = require('../Models/wishlistModel')

exports.addToWishlist = async (req, res) => {
    try {
        const { id, title, description, price, category, image, rating } = req.body
        const userId = req.payload

        const existingUser = await wishlists.findOne({ userId, id })
        if (existingUser) {
            res.status(406).json("Product already exist")
        }
        else {
            const newwish = new wishlists({
                id, title, description, price, category, image, rating, userId
            })
            await newwish.save()
            res.status(200).json(newwish)
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const userId = req.payload
        const result = await wishlists.find({ userId })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

exports.removeWishlistItem = async (req, res) => {
    try {
        const wId = req.params.id
        const result = await wishlists.findByIdAndDelete({ _id: wId })
        res.status(200).json("Item removed")
    }
    catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}