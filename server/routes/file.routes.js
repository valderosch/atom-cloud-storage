const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controllers/fileController');

const router = new Router();

router.post('', authMiddleware, fileController.createDirectory);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('', authMiddleware, fileController.fetchFile);

module.exports = router;