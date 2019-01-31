const express= require('express');
const model = require('./model');
const mongoose   = require('mongoose');
const router= express.Router();

mongoose.connect('mongodb://localhost:27017/wechat');

const user = model.user;
const post = model.post;
const like = model.like;
router.get('/users',(req,res) =>{

    user.find({},(err,users)=>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(users);
    })
});

router.get('/users/:user_id',(req,res) =>{
    var user_id = req.params.user_id;
    user.findById(user_id,(err,result) =>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(result);
    })
});

router.post('/users',(req,res)=>{

    var newuser = new user();
    newuser.name = req.body.name;
    newuser.gender = req.body.gender;
    newuser.location = req.body.location;
    newuser.bio = req.body.bio;

    newuser.save(err =>{

        if(err)
        res.status(501).send(err);
        res.status(200).json({message:"user created!"});
    });
    
});

router.put('/users/:userId',(req,res)=>{
    user.findById(req.params.userId,(err,result)=>{
        if(err)
        res.send(err);

        result.name =req.body.name;
        result.gender = req.body.gender;
        result.location = req.body.location;

        result.bio = req.body.bio;

        result.save(err=>{
            if(err)
            res.send(err);

            res.json({message:"user Updated!"});
        })
    })
});

router.delete('/users/:userId' , (req,res) =>{

    user.remove({_id:req.params.userId},err=>{
        if(err)
        res.send(err);

        res.json({message:`delete user!`});
    })
});









router.get('/posts',(req,res) =>{

    post.find({},(err,posts)=>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(posts);
    })
});

router.get('/posts/:postId',(req,res) =>{
    var postId = req.params.postId;
    post.findById(user_id,(err,result) =>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(result);
    })
});

router.post('/posts',(req,res)=>{

    var newpost = new post();
    newpost.content = req.body.content;
    newpost.created_at = req.body.created_at;
    newpost.userId = mongoose.Types.ObjectId(req.body.userId);

    newpost.save(err =>{
        if(err)
        res.status(501).send(err);
        res.status(200).json({message:"post created!"});
    });
    
});

router.put('/posts/:postId',(req,res)=>{
    post.findById(req.params.postId,(err,result)=>{
        if(err)
        res.send(err);

        result.cotent =req.body.content;
        result.created_at = req.body.created_at;
        result.userId = req.body.userId;

        result.save(err=>{
            if(err)
            res.send(err);

            res.json({message:"post Updated!"});
        })
    })
});

router.delete('/posts/:postId' , (req,res) =>{

    post.remove({_id:req.params.postId},err=>{
        if(err)
        res.send(err);

        res.json({message:`delete post!`});
    })
});







router.get('/likes',(req,res) =>{

    like.find((err,users)=>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(users);
    })
});

router.get('/likes/:like_id',(req,res) =>{
    var like_id = req.params.like_id;
    like.findById(like_id,(err,result) =>{
        if(err)
        res.status(500).send(err);
        res.status(200).json(result);
    })
});

router.post('/likes',(req,res)=>{

    var newlike = new like();
    newlike.userId = mongoose.Types.ObjectId(req.body.userId);
    newlike.postId = mongoose.Types.ObjectId(req.body.postId);

    newlike.save(err =>{

        if(err)
        res.status(501).send(err);
        res.status(200).json({message:"like created!"});
    });
    
});

router.put('/likes/:likeId',(req,res)=>{
    like.findById(req.params.likeId,(err,result)=>{
        if(err)
        res.send(err);
        result.userId = req.body.userId;
        result.postId = req.body.postId;

        result.save(err=>{
            if(err)
            res.send(err);

            res.json({message:"like Updated!"});
        })
    })
});

router.delete('/likes/:likeId' , (req,res) =>{

    like.remove({_id:req.params.likeId},err=>{
        if(err)
        res.send(err);

        res.json({message:`delete like!`});
    })
})


module.exports = router;