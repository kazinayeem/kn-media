const express = require('express');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Multer for file uploads
const router = express.Router();

// Get all posts
router.get('/',protect, getAllPosts);

// Get post by ID
router.get('/:id', getPostById);

// Create a new post (with image upload)
router.post('/', protect, upload.single('image'), createPost);

// Update a post (only author can update)
router.put('/:id', protect, upload.single('image'), updatePost);

// Delete a post (only author can delete)
router.delete('/:id', protect, deletePost);

module.exports = router;
