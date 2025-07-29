import React from 'react';

const DeleteDialog = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Confirm Deletion</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="warning-icon">⚠️</div>
          <p className="modal-message">
            Are you sure you want to delete <strong>"{itemTitle}"</strong>?
          </p>
          <p className="modal-subtitle">
            This action cannot be undone.
          </p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog; 