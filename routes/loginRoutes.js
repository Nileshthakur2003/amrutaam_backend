const express = require('express');
const router = express.Router();
const { createUser, getUser, deleteUser, verifyUser , verifyAndLoginUser, getUserByUsername} = require('../controllers/loginController');

router.post('/createUser', createUser);
router.post('/getUser', getUser);
router.post('/deleteUser', deleteUser);
router.post('/verifyUser', verifyUser);
router.post('/verifyAndLoginUser', verifyAndLoginUser);
router.post('/getUserByUsername', getUserByUsername);
module.exports = router;
