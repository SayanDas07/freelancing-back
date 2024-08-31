import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        //we will do discriminator
        enum: ['employer', 'employee'],
        required: true
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true},{ discriminatorKey: 'role' })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            //payloads
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,

        },
        //secret key
        process.env.ACCESS_TOKEN_SECRET,

        {
            //expiry
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )



}

export const User = mongoose.model("User", userSchema)