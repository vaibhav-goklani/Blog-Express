const Blog = require('../models/blog');
const Comment = require('../models/comment');

async function handleBlogUpload(req, res) {
    const { title, description, body } = req.body;
    const blog = await Blog.create({
        title,
        description,
        body,
        coverImageUrl: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    });
    return res.redirect(`/blog/${blog._id}`);
}

async function getBlogWithId(req, res) {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate('createdBy');
    const comments = await Comment.find({ blogId: id }).populate('createdBy');
    return res.render('blog', {
        blog,
        user: req.user,
        comments,
    });
}

async function handleCommentUpload(req, res) {
    const { content } = req.body;
    const id = req.params.id;
    await Comment.create({
        content,
        blogId: id,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${id}`);
}

module.exports = {
    handleBlogUpload,
    getBlogWithId,
    handleCommentUpload,
};