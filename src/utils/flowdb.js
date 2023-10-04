//model post
const Posts = require('../model/Posts')

//model users
const Users = require('../model/Users')


//Posts

const getPosts = async () => {
    try{
        return await Posts.find()
    }catch(error){
        return false
    }
}


const getPost = async (Slug) => {
    try{
        return await Posts.findOne({Slug})
    }catch(error){
        return false
    }
}


const addSchema = (username,Title,Preparagraf,Paragraf,Avatar,DatePosts,Author,Slug) => {
    try{
        return new Posts({
            username,
            Title,
            Preparagraf,
            Paragraf,
            Avatar,
            DatePosts,
            Author,
            Slug
        })
    }catch(error){
        return false
    }
}


const deletePost = async (_id) => {
    try{
        return await Posts.deleteOne({_id})
    }catch(error){
        return false
    }
}

// getUser

const getUser = async (username) =>{
    try{
        return await Users.findOne({username})
    }catch(error){
        return false
    }
}

//getUsers

const getUsers = async () => {
    try{
        return await Users.find()
    }catch(error){
        return false
    }
}

const addUserSchema = async(username,password,Email,Role) =>{
    try{
        return new Users({
            username,
            password,
            Email,
            Role
        })
    }catch(error){
        return false
    }
}

module.exports = {getPosts,getPost,addSchema,addUserSchema,getUser,deletePost,getUsers}