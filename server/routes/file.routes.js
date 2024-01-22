const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const fileController = require('../controllers/fileController');

const router = new Router();

router.post('', authMiddleware, fileController.createDirectory);
router.post('/upload', authMiddleware, fileController.uploadFile);
router.get('', authMiddleware, fileController.fetchFile);
router.get('/download', authMiddleware, fileController.downloadFile);
router.get('/search', authMiddleware, fileController.searchFile);
router.delete('/', authMiddleware, fileController.deleteFIle);

module.exports = router;