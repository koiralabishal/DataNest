const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');

// GET /items - fetch all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /items - create a new item with optional image upload
router.post('/items', upload.single('image'), async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      priority, 
      category, 
      status, 
      dueDate, 
      notes, 
      assignedTo, 
      project, 
      budget, 
      location, 
      quantity, 
      warrantyInfo 
    } = req.body;
    
    let imageUrl = null;
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
          {
            resource_type: 'auto',
            folder: 'datanest-items',
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
              { quality: 'auto' }
            ]
          }
        );
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ message: 'Image upload failed' });
      }
    }
    
    const item = new Item({ 
      title, 
      description, 
      date, 
      image: imageUrl,
      priority, 
      category, 
      status, 
      dueDate, 
      notes, 
      assignedTo, 
      project, 
      budget, 
      location, 
      quantity, 
      warrantyInfo 
    });
    
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /items/:id - update an item by ID with optional image upload
router.put('/items/:id', upload.single('image'), async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      priority, 
      category, 
      status, 
      dueDate, 
      notes, 
      assignedTo, 
      project, 
      budget, 
      location, 
      quantity, 
      warrantyInfo 
    } = req.body;
    
    let imageUrl = null;
    
    // Upload new image to Cloudinary if provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
          {
            resource_type: 'auto',
            folder: 'datanest-items',
            transformation: [
              { width: 800, height: 600, crop: 'limit' },
              { quality: 'auto' }
            ]
          }
        );
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({ message: 'Image upload failed' });
      }
    }
    
    const updateData = {
      title, 
      description, 
      date, 
      priority, 
      category, 
      status, 
      dueDate, 
      notes, 
      assignedTo, 
      project, 
      budget, 
      location, 
      quantity, 
      warrantyInfo
    };
    
    // Only update image if a new one was uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }
    
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /items/:id - delete an item by ID
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 