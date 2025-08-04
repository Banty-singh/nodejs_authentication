const mongoose = require("mongoose");
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required :[true,'email must enter'],
        validate:[isEmail,'please enter a valid email'],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'please enter  password'],
        minlength:[3,'password must be 3 character']
    }
})

// Hashing password before saving to database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('User', userSchema);

module.exports = User;