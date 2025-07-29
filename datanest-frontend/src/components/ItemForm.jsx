import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Medium',
    category: 'Other',
    status: 'Active',
    dueDate: '',
    notes: '',
    assignedTo: '',
    project: '',
    budget: '',
    location: '',
    quantity: 1,
    warrantyInfo: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        date: initialData.date ? initialData.date.slice(0, 10) : '',
        priority: initialData.priority || 'Medium',
        category: initialData.category || 'Other',
        status: initialData.status || 'Active',
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
        notes: initialData.notes || '',
        assignedTo: initialData.assignedTo || '',
        project: initialData.project || '',
        budget: initialData.budget || '',
        location: initialData.location || '',
        quantity: initialData.quantity || 1,
        warrantyInfo: initialData.warrantyInfo || ''
      });
      
      // Set preview for existing image
      if (initialData.image) {
        setPreviewUrl(initialData.image);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    
    setIsUploading(true);
    
    try {
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        if (key === 'budget') {
          submitData.append(key, formData[key] ? parseFloat(formData[key]) : '');
        } else if (key === 'quantity') {
          submitData.append(key, parseInt(formData[key]) || 1);
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Add file if selected
      if (selectedFile) {
        submitData.append('image', selectedFile);
      }
      
      await onSubmit(submitData);
      
      if (!isEditing) {
        setFormData({
          title: '',
          description: '',
          date: '',
          priority: 'Medium',
          category: 'Other',
          status: 'Active',
          dueDate: '',
          notes: '',
          assignedTo: '',
          project: '',
          budget: '',
          location: '',
          quantity: 1,
          warrantyInfo: ''
        });
        setSelectedFile(null);
        setPreviewUrl('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Basic Information */}
      <div className="form-section">
        <h4 className="section-title">Basic Information</h4>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="form-label">Title *</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Description</label>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="form-section">
        <h4 className="section-title">Item Image</h4>
        <div className="image-upload-container">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="image-upload" className="file-input-label">
              {selectedFile ? 'Change Image' : 'Choose Image'}
            </label>
          </div>
          
          {previewUrl && (
            <div className="image-preview">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="preview-image"
              />
              <button 
                type="button" 
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className="remove-image-btn"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Priority and Category */}
      <div className="form-section">
        <h4 className="section-title">Classification</h4>
        <div className="form-row">
          <div className="form-group">
            <select
              name="priority"
              className="form-input"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
              <option value="Critical">Critical Priority</option>
            </select>
            <label className="form-label">Priority</label>
          </div>
          <div className="form-group">
            <select
              name="category"
              className="form-input"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Finance">Finance</option>
              <option value="Home">Home</option>
              <option value="Other">Other</option>
            </select>
            <label className="form-label">Category</label>
          </div>
        </div>
      </div>

      {/* Status and Dates */}
      <div className="form-section">
        <h4 className="section-title">Status & Dates</h4>
        <div className="form-row">
          <div className="form-group">
            <select
              name="status"
              className="form-input"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
            <label className="form-label">Status</label>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="form-label">Created Date *</label>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Due Date</label>
          </div>
        </div>
      </div>

      {/* Assignment and Project */}
      <div className="form-section">
        <h4 className="section-title">Assignment</h4>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="assignedTo"
              className="form-input"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Assigned To</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="project"
              className="form-input"
              value={formData.project}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Project</label>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="form-section">
        <h4 className="section-title">Financial Details</h4>
        <div className="form-row">
          <div className="form-group">
            <input
              type="number"
              name="budget"
              className="form-input"
              value={formData.budget}
              onChange={handleChange}
              placeholder=" "
              step="0.01"
              min="0"
            />
            <label className="form-label">Budget ($)</label>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              className="form-input"
              value={formData.quantity}
              onChange={handleChange}
              placeholder=" "
              min="1"
            />
            <label className="form-label">Quantity</label>
          </div>
        </div>
      </div>

      {/* Location and Warranty */}
      <div className="form-section">
        <h4 className="section-title">Additional Details</h4>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Location</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="warrantyInfo"
              className="form-input"
              value={formData.warrantyInfo}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form-label">Warranty Info</label>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="form-section">
        <h4 className="section-title">Notes</h4>
        <div className="form-group">
          <textarea
            name="notes"
            className="form-input form-textarea"
            value={formData.notes}
            onChange={handleChange}
            placeholder=" "
            rows="4"
          />
          <label className="form-label">Notes</label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="button-group">
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? 'Uploading...' : (isEditing ? 'Update' : 'Add') + ' Item'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;