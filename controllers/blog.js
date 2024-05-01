const Blog = require('../models/blog');

async function handleBlogUpload(req, res) {
    const { title, description, body } = req.body;
    console.log("User: ", req.user);
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
    return res.render('blog', {
        blog,
        user: req.user,
    });
}

module.exports = {
    handleBlogUpload,
    getBlogWithId,
};