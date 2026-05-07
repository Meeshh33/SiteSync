const express = require('express');
const router = express.Router();
const coController = require('../controllers/changeOrderController');
const auth = require('../middleware/auth');

router.post('/', auth, coController.createChangeOrder);
router.get('/', auth, coController.getAllChangeOrders);
router.get('/:id', auth, coController.getChangeOrderById);
router.put('/:id/status', auth, coController.updateChangeOrderStatus);
router.post('/:id/comments', auth, coController.addComment);
router.get('/:id/history', auth, coController.getChangeOrderHistory);
router.delete('/:id', auth, coController.deleteChangeOrder);

module.exports = router;
