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

const RFISchema = new mongoose.Schema({
  rfiNumber: {
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
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Answered', 'Closed'],
    default: 'Submitted',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  answer: String,
  attachments: [String],
  dueDate: Date,
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

// Auto-increment RFI Number
RFISchema.pre('save', async function(next) {
  if (!this.rfiNumber) {
    const count = await mongoose.model('RFI').countDocuments();
    this.rfiNumber = `RFI-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('RFI', RFISchema);
