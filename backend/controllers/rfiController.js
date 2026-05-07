const RFI = require('../models/RFI');
const User = require('../models/User');

// Create RFI
exports.createRFI = async (req, res) => {
  try {
    const { projectName, subject, description, priority, dueDate, assignedTo } = req.body;

    const rfi = new RFI({
      projectName,
      subject,
      description,
      priority,
      dueDate,
      submittedBy: req.userId,
      assignedTo,
    });

    // Add history entry
    rfi.history.push({
      changedBy: req.userId,
      action: 'Created',
      newStatus: 'Submitted',
      notes: 'RFI created',
    });

    await rfi.save();
    await rfi.populate('submittedBy assignedTo');

    res.status(201).json({ message: 'RFI created successfully', rfi });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all RFIs
exports.getAllRFIs = async (req, res) => {
  try {
    const rfis = await RFI.find()
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(rfis);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get RFI by ID
exports.getRFIById = async (req, res) => {
  try {
    const rfi = await RFI.findById(req.params.id)
      .populate('submittedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('history.changedBy', 'name')
      .populate('comments.user', 'name');

    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    res.json(rfi);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update RFI Status
exports.updateRFIStatus = async (req, res) => {
  try {
    const { status, answer } = req.body;
    const rfi = await RFI.findById(req.params.id);

    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    const previousStatus = rfi.status;
    rfi.status = status;
    if (answer) rfi.answer = answer;
    rfi.updatedAt = Date.now();

    // Add history entry
    rfi.history.push({
      changedBy: req.userId,
      action: 'Status Updated',
      previousStatus,
      newStatus: status,
      notes: `Status changed from ${previousStatus} to ${status}`,
    });

    await rfi.save();
    await rfi.populate('submittedBy assignedTo');

    res.json({ message: 'RFI updated successfully', rfi });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add comment to RFI
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const rfi = await RFI.findById(req.params.id);

    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    const user = await User.findById(req.userId);

    rfi.comments.push({
      user: req.userId,
      userName: user.name,
      text,
    });

    await rfi.save();

    res.json({ message: 'Comment added successfully', rfi });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get RFI History
exports.getRFIHistory = async (req, res) => {
  try {
    const rfi = await RFI.findById(req.params.id)
      .populate('history.changedBy', 'name email');

    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    res.json(rfi.history);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete RFI
exports.deleteRFI = async (req, res) => {
  try {
    const rfi = await RFI.findByIdAndDelete(req.params.id);

    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }

    res.json({ message: 'RFI deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
