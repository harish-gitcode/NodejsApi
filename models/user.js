const mongoose = require('mongoose');
const uuid = require('uuid'); 
const crypto=require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    hashed_password: {
        type: String,
        require: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    salt: String,
    updated: Date
});

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuid.v4();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })

userSchema.methods={
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (err) {
            console.log(err);
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);