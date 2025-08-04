const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authTocken = (req, res, next) => {
    const token = req.cookies.jwt

    // check json web tocken is varified and exist
    if (token) {
        jwt.verify(token, 'my secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }

}

// check current user
const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,'my secret',async (err,decodedToken) =>{
            if(err){
                console.log(err.messaage);
                res.locals.user=null
                next()
            }
            else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user =user;
                next()
            }
        })
    }
    else{
        res.locals.user=null;
        next()
    }
}

module.exports = {authTocken,checkUser}