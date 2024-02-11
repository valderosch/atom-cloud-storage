const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/avatar', authMiddleware, userController.uploadAvatar );
router.delete('/avatar', authMiddleware, userController.deleteAvatar);

module.exports = router;