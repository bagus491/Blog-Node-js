const {addSchema,getPost} = require('../utils/flowdb')

//verify
const {checkToken} = require('../utils/verify')

const doAddPost = async (req,res) =>{
    try{
        const token = req.cookies.token
        const ImageUrl = req.file.path
        const {Title,Paragraf,Author} = req.body
        const DatePosts = new Date()

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

        const Preparagraf = splitParagraf.slice(0,50)


        //slug
        const TitleSplit = Title.split('')

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

                const submitPost = await addSchema(verify,Title,Preparagraf,Paragraf,Author,DatePosts,Slug)

                const savePost = await submitPost()

                if(!savePost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess add Post')
                return res.redirect('/dasbord/listpost')

        }

             const submitPost = addSchema(verify,Title,Preparagraf,Paragraf,Avatar = ImageUrl,DatePosts,Author,Slug = Title)

                const savePost = await submitPost()

                if(!savePost)
                {
                    req.flash('msg','unpecxted Post')
                    return res.status(401)
                }

                req.flash('msg','sucess add Post')
                res.redirect('/dasbord/listpost')


    }catch(error){
        res.status(500).send({msg:'internal Server Error'})
    }
}




module.exports = {doAddPost}