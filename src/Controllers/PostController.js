const {addSchema,getPost,deletePost,updateSchema,getPostById} = require('../utils/flowdb')

//verify
const {checkToken} = require('../utils/verify')

const doAddPost = async (req,res) =>{
    try{

        
        const token = req.cookies.auth_token
        const ImageUrl = req.file.path
        const {Title,Paragraf,Category,Author} = req.body
        const DatePosts = new Date()

      
        if(!token)
        {
            return res.status(401).redirect('/login')
        }

        const verify =  checkToken(token)

        if(!verify)
        {
            return res.status(401).redirect('/login')
        }

        //make paragraf array
        const splitParagraf = Paragraf.split('')

        let  Preparagraf = splitParagraf.slice(0,50)

        let newpreparagraf = Preparagraf.join('')




        //slug
        const TitleSplit = Title.split(' ')

        if(TitleSplit.length > 0)
        {
            const splitmap = TitleSplit.map((e) => {
                return e += '-'
                
        })
            
                let getLast = splitmap[splitmap.length - 1]
                let polaLast = getLast.split('')
                delete polaLast[polaLast.length - 1]
                console.log(polaLast)
                
                let beforeSlug = splitmap.filter((e) => e !== getLast)
                
                let Slug = beforeSlug.join('') + polaLast.join('')


                const submitPost = await addSchema(verify,Title,newpreparagraf,Paragraf,Avatar = ImageUrl,DatePosts,Author,Slug,Category)

                const savePost = await submitPost.save()

                if(!savePost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess add Post')
                return res.redirect('/dasbord/myposts')

        }

             const submitPost = await addSchema(verify,Title,newpreparagraf,Paragraf,Avatar = ImageUrl,DatePosts,Author,Slug,Category)

                const savePost = await submitPost.save()

                if(!savePost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess add Post')
                res.redirect('/dasbord/myposts')


    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
}

//deletePost
const doDeletePost = async(req,res) =>{
    try{
        const {_id} = req.body

        const deleted = await deletePost(_id)

        if(!deleted)
        {
            res.redirect('/dasbord/myposts')
            return res.status(401)
        }

        req.flash('msg','success delete')
        res.redirect('/dasbord/myposts')
    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
}


//update
const doUpdatePost = async (req,res) =>{
    try{
        const token = req.cookies.auth_token
        const {_id,Title,Paragraf,Author} = req.body
        const DatePosts = new Date()
        
        const Post = await getPostById(_id)

        const ImageUrl = req.file ? req.file.path  : Post.Avatar
    
      
        if(!token)
        {
            return res.status(401).redirect('/login')
        }

        const verify = checkToken(token)

        if(!verify)
        {
            return res.status(401).redirect('/login')
        }

    

        //make paragraf array
        const splitParagraf = Paragraf.split('')

        let  Preparagraf = splitParagraf.slice(0,50)

        let newpreparagraf = Preparagraf.join('')
        

        //slug
        const TitleSplit = Title.split(' ')

     

        if(TitleSplit.length > 0)
        {
            const splitmap = TitleSplit.map((e) => {
                return e += '-'
                
        })

     
            
                let getLast = splitmap[splitmap.length - 1]
                let polaLast = getLast.split('')
                delete polaLast[polaLast.length - 1]
                
                
                let beforeSlug = splitmap.filter((e) => e !== getLast)
                
                let Slug = beforeSlug.join('') + polaLast.join('')
                

                const submitPost = await updateSchema(_id,verify,Title,newpreparagraf,Paragraf,Avatar = ImageUrl,DatePosts,Author,Slug,Category)

                if(!submitPost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess update Post')
                return res.redirect('/dasbord/myposts')

        }

             const submitPost = await updateSchema(_id,verify,Title,newpreparagraf,Paragraf,Avatar = ImageUrl,DatePosts,Author,Slug,Category)


                if(!submitPost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess update Post')
                res.redirect('/dasbord/myposts')


    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
}



module.exports = {doAddPost,doDeletePost,doUpdatePost}