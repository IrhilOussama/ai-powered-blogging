const express = require('express');
const BlogController = require('../controllers/blogController');

const router = express.Router();
const blogController = new BlogController();

router.get('/', blogController.getBlogs.bind(blogController));
router.get('/:id', blogController.getBlogById.bind(blogController));
router.post('/', blogController.createBlog.bind(blogController));
router.put('/:id', blogController.updateBlog.bind(blogController));
router.delete('/:id', blogController.deleteBlog.bind(blogController));

module.exports = router;