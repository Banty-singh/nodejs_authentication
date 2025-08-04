const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const authroutes = require('./routes/authroutes')
const cookieParser = require('cookie-parser')
const {authTocken,checkUser} = require('./middleware/authMiddleware')



// middleware
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());

// mongodb connect 
mongoose.connect('mongodb://localhost:27017/auth-node',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// routes
app.use(checkUser)

  app.get('/', (req, res) => {
    res.render('home')
  })
  app.get('/private', authTocken,(req, res) => {
    res.render('private')
  })
  app.use(authroutes);

  app.listen(port, () => {
    console.log(`Example app{ listening on port http://localhost:3000`)
  })
  
// app.get('/set-cookies', (req, res) => {
//   // res.setHeaader('Set-Cookie','newUser =true)
//       res.cookie('newuser',false,{maxAge:1000*60*60*24,httpOnly:true})
//       res.cookie('myuser',true)
//       res.send("cookies created")
//     })
//     app.get('/read-cookies', (req, res) => {
//         const cookies =req.cookies;
//         console.log(cookies)
//         res.json(cookies)
//       })