import mongoose ,{ Schema } from "mongoose";
import bcrypt from 'bcrypt'
import config from "../config/config";


const userSchema:Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {timestamps: true})



userSchema.pre("save", async function (next) {
    let user = this
    if (!user.isModified("password")) return next()
    user.password = await bcrypt.hash(`${user.password}${config.secretPassword}`, config.saltRounds)
    next()
})

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)


export default User