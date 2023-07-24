const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    header: {
        type: String,
        required: [true, "Header is required"]
    },
    body: {
        type: String,
        required: [true, "Body is required"]
    },
    postedDate: {
        type: Number,
        required: [true, "Posted Date is required"]
    },
    authorName: {
        type: String,
        required: [true, "Author is required"]
    },
})

module.exports = mongoose.model("Post", postSchema);