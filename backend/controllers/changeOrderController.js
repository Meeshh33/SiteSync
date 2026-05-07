const ChangeOrder = require('../models/ChangeOrder');
const User = require('../models/User');

// Create Change Order
exports.createChangeOrder = async (req, res) => {
  try {
    const { projectName, title, description, costImpact, scheduleImpact, delayDays, reason } = req.body;

    const co = new ChangeOrder({
      projectName,
      title,
      description,
      costImpact,
      scheduleImpact,
      delayDays,
      reason,
      submittedBy: req.userId,
    });

    // Add history entry
    co.history.push({
      changedBy: req.userId,
      action: 'Created',
      newStatus: 'Pending',
      notes: 'Change Order created',
    });

    await co.save();
    await co.populate('submittedBy');

    res.status(201).json({ message: 'Change Order created successfully', changeOrder: co });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all Change Orders
exports.getAllChangeOrders = async (req, res) => {
  try {
    const changeOrders = await ChangeOrder.find()
      .populate('submittedBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(changeOrders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Change Order by ID
exports.getChangeOrderById = async (req, res) => {
  try {
    const co = await ChangeOrder.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('approvedBy', 'name email')
      .populate('history.changedBy', 'name')
      .populate('comments.user', 'name');

    if (!co) {
      return res.status(404).json({ message: 'Change Order not found' });
    }

    res.json(co);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Change Order Status
exports.updateChangeOrderStatus = async (req, res) => {
  try {
    const { status, approvalNotes } = req.body;
    const co = await ChangeOrder.findById(req.params.id);

    if (!co) {
      return res.status(404).json({ message: 'Change Order not found' });
    }

    const previousStatus = co.status;
    co.status = status;
    if (approvalNotes) co.approvalNotes = approvalNotes;
    if (status === 'Approved') co.approvedBy = req.userId;
    co.updatedAt = Date.now();

    // Add history entry
    co.history.push({
      changedBy: req.userId,
      action: 'Status Updated',
      previousStatus,
      newStatus: status,
      notes: `Status changed from ${previousStatus} to ${status}`,
    });

    await co.save();
    await co.populate('submittedBy approvedBy');

    res.json({ message: 'Change Order updated successfully', changeOrder: co });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add comment to Change Order
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const co = await ChangeOrder.findById(req.params.id);

    if (!co) {
      return res.status(404).json({ message: 'Change Order not found' });
    }

    const user = await User.findById(req.userId);

    co.comments.push({
      user: req.userId,
      userName: user.name,
      text,
    });

    await co.save();

    res.json({ message: 'Comment added successfully', changeOrder: co });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Change Order History
exports.getChangeOrderHistory = async (req, res) => {
  try {
    const co = await ChangeOrder.findById(req.params.id)
      .populate('history.changedBy', 'name email');

    if (!co) {
      return res.status(404).json({ message: 'Change Order not found' });
    }

    res.json(co.history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Change Order
exports.deleteChangeOrder = async (req, res) => {
  try {
    const co = await ChangeOrder.findByIdAndDelete(req.params.id);

    if (!co) {
      return res.status(404).json({ message: 'Change Order not found' });
    }

    res.json({ message: 'Change Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
