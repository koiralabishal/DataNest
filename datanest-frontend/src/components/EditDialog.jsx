import React from 'react';
import ItemForm from './ItemForm';

const EditDialog = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditing ? 'Edit Item' : 'Add New Item'}
          </h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <ItemForm
            onSubmit={onSubmit}
            initialData={initialData}
            isEditing={isEditing}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDialog; 