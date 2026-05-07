const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  action: String,
  previousStatus: String,
  newStatus: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

const ChangeOrderSchema = new mongoose.Schema({
  coNumber: {
    type: String,
    unique: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Implemented'],
    default: 'Pending',
  },
  costImpact: {
    type: Number,
    required: true,
  },
  scheduleImpact: {
    type: String,
    enum: ['No Impact', 'Accelerate', 'Delay'],
    default: 'No Impact',
  },
  delayDays: Number,
  reason: String,
  attachments: [String],
  approvalNotes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  history: [HistorySchema],
  comments: [
    {
      user: mongoose.Schema.Types.ObjectId,
      userName: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
});

// Auto-increment CO Number
ChangeOrderSchema.pre('save', async function(next) {
  if (!this.coNumber) {
    const count = await mongoose.model('ChangeOrder').countDocuments();
    this.coNumber = `CO-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('ChangeOrder', ChangeOrderSchema);
