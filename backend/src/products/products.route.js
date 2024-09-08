const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// post a product
router.post("/create-product", async (req, res)=>{
    try {
        const newProduct = new Products({
            ...req.body
        })

        const savedProduct = await newProduct.save();

        // calculate review
        const reviews = await Reviews.find({ productId: savedProduct._id});
        if(reviews.length > 0){
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
        }
        res.status(201).send(savedProduct);
    } catch (error) {
        console.log('Error creating new product', error);
        res.status(500).send({message: "Failed to create new product"});
    }
});

// get all products
router.get("/", async (req, res) => {
    try {
        const {category, color, minPrice, maxPrice, page = 1, limit = 10} = req.query;

        let filter = {};
        if(category && category !== "all") {
            filter.category = category;
        }
        if(color && color !== "all") {
            filter.color = color;
        }
        if(minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Products.find(filter)
                                .skip(skip)
                                .limit(parseInt(limit))
                                .populate("author", "email")
                                .sort({ createdAt: -1 })
        res.status(200).send({ products, totalPages, totalProducts})
    } catch (error) {
        console.log('Error fetching product', error);
        res.status(500).send({message: "error fetching product"});
    }
})

// get single product
router.get("/:id", async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId).populate("author", "email username");
        if(!product){
            return res.status(404).send({ message: "Product not found"})
        }
        const reviews = await Reviews.find({productId}).populate("userId", "username email");
        res.status(200).send({product, reviews})
    } catch (error) {
        console.log('Error fetching product', error);
        res.status(500).send({message: "Failed fetch product"});
    }
})

// update a product
router.patch("/update-product/:id", verifyToken, verifyAdmin ,async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body}, {new: true})
        if(!updatedProduct){
            res.status(404).send({ message: "Product not found"});
        }

        res.status(200).send({
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.log('Error updating product', error);
        res.status(500).send({message: "Failed update product"});
    }
})

// delete product
router.delete('/:id', async( req, res) =>{
    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndDelete(productId);

        if(!deletedProduct) {
            return res.status(404).send({message: "Product not found"});
        }

        // delete reviews related to the product
        await Reviews.deleteMany({productId: productId})

        res.status(200).send({
            message: "Product deleted sucessfully"
        })

    } catch (error) {
        console.log('Error deleting product', error);
        res.status(500).send({message: "Failed to delete product"});
    }
})

// get related products
router.get("/related/:id", async(req, res) =>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).send({ message: "product Id is required"});
        }

        const product = await Products.findById(id);
        if(!product){
            return res.status(400).send({message: "product not found"})
        } 

        const titleRegex = new RegExp(
            product.name
                .split(" ")
                .filter((word) => word.length > 1)
                .join("|"),
                "i"
        )

        const relatedProducts = await Products.find({
            _id: { $ne: id},
            $or: [
                {name: { $regex: titleRegex}}, // Match similar  names
                {category: product.category}, // match the same category
            ]
        })
        res.status(200).send(relatedProducts)
    } catch (error) {
        console.log('Error fetching related products', error);
        res.status(500).send({message: "Failed to fetch related products"});
    }
})

module.exports = router;