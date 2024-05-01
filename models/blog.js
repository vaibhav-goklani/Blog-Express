const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        default: '/images/user_avatar.png',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true });

const Blog = model('blog', blogSchema);

module.exports = Blog;