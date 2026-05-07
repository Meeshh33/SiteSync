const express = require('express');
const router = express.Router();
const rfiController = require('../controllers/rfiController');
const auth = require('../middleware/auth');

router.post('/', auth, rfiController.createRFI);
router.get('/', auth, rfiController.getAllRFIs);
router.get('/:id', auth, rfiController.getRFIById);
router.put('/:id/status', auth, rfiController.updateRFIStatus);
router.post('/:id/comments', auth, rfiController.addComment);
router.get('/:id/history', auth, rfiController.getRFIHistory);
router.delete('/:id', auth, rfiController.deleteRFI);

module.exports = router;
