const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {  
    const posts = await loadPostsCollection();
    await posts.insertOne({
        wishname: req.body.wishname, 
        wishdesc: req.body.wishdesc,
        wishlink: req.body.wishlink, 
        createdAt: new Date()
    });
    res.status(201).send(); 
}); 

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(); 
});

// Update post 
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},  
        {$set: {wishname: req.body.wishname, wishdesc: req.body.wishdesc, wishlink: req.body.wishlink}}
    );
    res.status(201).send(); 
});

// MongoDB 
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbcssgeek:Timlinen9.@cluster0-pwdy9.mongodb.net/test?retryWrites=true&w=majority', {

        useNewUrlParser: true, 
        useUnifiedTopology: true
     }); 
    
     return client.db('test').collection('posts'); 
}

module.exports = router;