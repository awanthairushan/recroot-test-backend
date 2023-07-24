const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getCurrentUser} = require('../controllers/userController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/register').post(upload.single('file'), registerUser);
router.route('/login').post(loginUser);
router.route('/current/:id').get(getCurrentUser);

module.exports = router;