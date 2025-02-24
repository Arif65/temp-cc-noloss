const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        id:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema)
module.exports = User