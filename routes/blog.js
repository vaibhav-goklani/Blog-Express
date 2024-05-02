const { Router, response } = require('express');
const multer = require('multer');
const path = require('path');
const { handleBlogUpload, getBlogWithId, handleCommentUpload } = require('../controllers/blog');

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: (req, file, cb) => { 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    });
});

router.get('/:id', getBlogWithId);

router.post('/', upload.single('coverImage'), handleBlogUpload);

router.post('/comment/:id', handleCommentUpload);

module.exports = router;