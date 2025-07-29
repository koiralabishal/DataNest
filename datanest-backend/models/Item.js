const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  image: { type: String }, // Cloudinary URL
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    default: 'Medium' 
  },
  category: { 
    type: String, 
    enum: ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Finance', 'Home', 'Other'], 
    default: 'Other' 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'Pending', 'Archived'], 
    default: 'Active' 
  },
  dueDate: { type: Date },
  notes: { type: String },
  assignedTo: { type: String },
  project: { type: String },
  budget: { type: Number },
  location: { type: String },
  quantity: { type: Number, default: 1 },
  warrantyInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Item', itemSchema); 