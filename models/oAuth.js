const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    _id: String,
    id: {
        unique: true,
        type: String,
        required: true,

    },
    shop: {
        unique: true,
        type: String,
        required: true,
    },
    state: String,
    isOnline: Boolean,
    accessToken: String,
    scope: String
}
);
const OAuth = mongoose.model("OAuth", schema);

module.exports = { OAuth };