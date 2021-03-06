import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

//find() is an asynchronous function, it takes time, so we add 'await'.
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");//i stands for ignore casing / Regular expression for easier DB search

        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});//match by title and/or tags
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;//this gathers data from the form and transfers it to the mongoose model to create a new post

    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    await PostMessage.findByIdAndRemove(id);

    res.json({message:'Post deleted'});
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    //Checking if the user is authenticated to like:
    if(!req.userId) return res.json({ message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    //finding the exact post that is being liked:
    const post = await PostMessage.findById(id);

    //Checking if the user's id is in the likes:
    const index = post.likes.findIndex((id) => id === String(req.userId)); //the user has already liked the post.

    if(index === -1) {
        //like the post:
        post.likes.push(req.userId);
    } else {
        //dislike a post:
        post.likes = post.likes.filter((id) => id !== String(req.userId));//returns an array of likes without the current user's like.
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}

export const updatePost = async (req, res) => {
    //expl. /posts/123, 123 is an id in the route and it gets automatically placed in this variable below.
    const {id: _id} = req.params;//renaming to _id
    const post = req.body;//sent from frontend (changed data)

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

export const commentPost = async(req, res) => {
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);

    // dodajem svakom komentaru id na backendu i tako cu vracati frontendu onda kao:
    // {
    //     id: 2,
    //     comment: 'neki komentar'
    // }
    const comment = {
        id: post.comments.length + 1,
        comment: value
    } 

    post.comments.push(comment);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}

export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const post = await PostMessage.findById(id);

    post.comments.forEach((el, index) => {
        //konvertuje string id u broj
        if (+el.id === +commentId) {
            post.comments.splice(index, 1);
        }
    })

    post.save();
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};