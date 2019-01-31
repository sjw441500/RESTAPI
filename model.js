const mongoose = require("mongoose");

var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var userSchema = new Schema({
    name:String,
    gender:String,
    location:String,
    bio:String
});

var postSchema = new Schema({
    content:String,
    created_at:Date,
    userId:ObjectId
});

var likeSchema = new Schema({
    userId:ObjectId,
    postId:ObjectId

});

var user = mongoose.model("user",userSchema,"user");
var post = mongoose.model("post",postSchema,"post");
var like = mongoose.model("like",likeSchema,"like");

module.exports.user=user;
module.exports.post=post;
module.exports.like=like;


