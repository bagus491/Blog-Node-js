//model post
const Posts = require('../model/Posts')

//model users
const Users = require('../model/Users')

//model Categoirs
const Categories = require('../model/Category')

const getCategories = async () => {
    try{
        return await Categories.find()
    }catch(error){
        return false
    }
}

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

const getPostById = async(_id) => {
    try{
        return await Posts.findOne({_id})
    }catch(error){
        return false
    }
}


const addSchema = (username,Title,Preparagraf,Paragraf,Avatar,DatePosts,Author,Slug,Category) => {
    try{
        return new Posts({
            username,
            Title,
            Preparagraf,
            Paragraf,
            Avatar,
            DatePosts,
            Author,
            Slug,
            Category
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


const updateSchema = async (_id,username,Title,Preparagraf,Paragraf,Avatar,DatePosts,Author,Slug,Category) => {
    try{
        return await Posts.updateOne(
                {
                    _id: _id
                },
                {
                    $set: {
                        username,
                        Title,
                        Preparagraf,
                        Paragraf,
                        Avatar,
                        DatePosts,
                        Author,
                        Slug,
                        Category
                    }
                }
        )
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

module.exports = {getPosts,getPost,addSchema,addUserSchema,getUser,deletePost,getUsers,updateSchema,getPostById,getCategories}