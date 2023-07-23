const express = require('express')
const router = express.Router();
const {addPost, getPosts, deletePost, updatePost} = require('../controllers/postController')

router.route('/').post(addPost)
router.route('/').get(getPosts)
router.route('/:id').delete(deletePost)
router.route('/:id').put(updatePost)

module.exports = router;