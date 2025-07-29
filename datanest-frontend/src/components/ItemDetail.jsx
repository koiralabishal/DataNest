import React from 'react';
import digitalMediaStorage from '../assets/digital media storage_2279559063.jpg';

const ItemDetail = ({ item, onBack, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#ca8a04';
      case 'Low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#16a34a';
      case 'Pending': return '#ca8a04';
      case 'Completed': return '#2563eb';
      case 'Archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Work': return '💼';
      case 'Personal': return '👤';
      case 'Shopping': return '🛒';
      case 'Health': return '🏥';
      case 'Education': return '📚';
      case 'Finance': return '';
      case 'Home': return '🏠';
      default: return '📋';
    }
  };

  return (
    <div className="detail-container">
      {/* Header */}
      <div className="detail-header">
        <button onClick={onBack} className="btn-back">
          ← Back to List
        </button>
        <div className="detail-actions">
          <button onClick={() => onEdit(item)} className="btn-edit">Edit</button>
          <button onClick={() => onDelete(item)} className="btn-delete">Delete</button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="detail-layout">
        {/* Left Column - Item Information */}
        <div className="detail-left-column">
          <div className="detail-main">
            <div className="detail-icon">
              <img
                src={item.image || digitalMediaStorage}
                alt="Item"
                style={{
                  width: '4rem',
                  height: '4rem',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.src = digitalMediaStorage;
                }}
              />
            </div>
            
            <div className="detail-info">
              <h1 className="detail-title">{item.title}</h1>
              <div className="detail-badges">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(item.priority) }}
                >
                  {item.priority} Priority
                </span>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  {item.status}
                </span>
                <span className="category-badge">
                  {getCategoryIcon(item.category)} {item.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="detail-section">
              <h3 className="section-title">Description</h3>
              <p className="detail-description">{item.description}</p>
            </div>
          )}

          {/* Dates */}
          <div className="detail-section">
            <h3 className="section-title">Dates</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Created Date:</span>
                <span className="detail-value">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              {item.dueDate && (
                <div className="detail-item">
                  <span className="detail-label">Due Date:</span>
                  <span className="detail-value">{new Date(item.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          {(item.assignedTo || item.project) && (
            <div className="detail-section">
              <h3 className="section-title">Assignment</h3>
              <div className="detail-grid">
                {item.assignedTo && (
                  <div className="detail-item">
                    <span className="detail-label">Assigned To:</span>
                    <span className="detail-value">{item.assignedTo}</span>
                  </div>
                )}
                {item.project && (
                  <div className="detail-item">
                    <span className="detail-label">Project:</span>
                    <span className="detail-value">{item.project}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Financial */}
          {(item.budget || item.quantity > 1) && (
            <div className="detail-section">
              <h3 className="section-title">Financial Details</h3>
              <div className="detail-grid">
                {item.budget && (
                  <div className="detail-item">
                    <span className="detail-label">Budget:</span>
                    <span className="detail-value">${item.budget}</span>
                  </div>
                )}
                {item.quantity > 1 && (
                  <div className="detail-item">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">{item.quantity}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Details */}
          {(item.location || item.warrantyInfo) && (
            <div className="detail-section">
              <h3 className="section-title">Additional Details</h3>
              <div className="detail-grid">
                {item.location && (
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{item.location}</span>
                  </div>
                )}
                {item.warrantyInfo && (
                  <div className="detail-item">
                    <span className="detail-label">Warranty:</span>
                    <span className="detail-value">{item.warrantyInfo}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <div className="detail-section">
              <h3 className="section-title">Notes</h3>
              <div className="detail-notes">
                <p>{item.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - A4 Image */}
        <div className="detail-right-column">
          <div className="a4-image-section">
            <h3 className="section-title">Item Image</h3>
            <div className="a4-image-container">
              <img
                src={item.image || digitalMediaStorage}
                alt={item.title}
                className="a4-image"
                onError={(e) => {
                  e.target.src = digitalMediaStorage;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default ItemDetail; 