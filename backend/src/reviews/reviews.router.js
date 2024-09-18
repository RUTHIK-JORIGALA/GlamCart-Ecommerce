const express = require('express');
const Reviews = require('./reviews.model');
const Products = require('../products/products.model');
const router = express.Router();

// post a new review
router.post("/post-review", async (req, res) => {
    try {
        const { comment, rating, productId, userId} = req.body;

        if(!comment || !rating || !productId || !userId) {
            return res.status(400).send({message: "All fields are required"})
        }

        const existingReview = await Reviews.findOne({ productId, userId});

        if(existingReview) {
            // update reviews
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            // create new review
            const newReview = new Reviews({
                comment, rating, productId, userId
            })
            await newReview.save();
        }

        // calculate the average rating

        const reviews = await Reviews.find({ productId });
        if(reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            const product = await Products.findById(productId);
            if(product){
                product.rating = averageRating;
                await product.save();
            } else {
                return res.status(404).send({message: 'Product not found'})
            }
        }

        res.status(200).send({message: 'Review processed successfully', reviews: reviews})
        
    } catch (error) {
        console.error("Error posting review", error);
        res.status(500).send({message: "failed to post review" })
    }
})

// total reviews count
router.get("/total-reviews", async (req, res) => {
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({totalReviews})

    } catch (error) {
        console.error("Error getting total review", error);
        res.status(500).send({message: "failed to get review count" })
    }
})

// get reviews by userId
router.get("/:userId", async (req, res) => {
    const {userId} = req.params;
    if(!userId){
        return res.status(400).send({ message: "User Id is required"});
    }
    try {
        const reviews = await Reviews.find({ userId: userId }).sort({ createdAt: -1 })
        if(reviews.length === 0) {
            return res.status(404).send({ message: "No reviews found"})
        }
        res.status(200).send(reviews);
    } catch (error) {
        console.error("Error fetching reviews by user", error);
        res.status(500).send({message: "No reviews found" })
    }
})

module.exports = router