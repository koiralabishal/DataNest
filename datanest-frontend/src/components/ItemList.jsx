import React from 'react';
import digitalMediaStorage from '../assets/digital media storage_2279559063.jpg';

const ItemList = ({ items, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="list-container">
      <h2 className="list-title">Items</h2>
      {items.length === 0 ? (
        <p className="empty-state">No items found. Add this item!</p>
      ) : (
        <ul className="list">
          {items.map(item => (
            <li key={item._id} className="list-item">
              <div className="item-icon">
                <img
                  src={item.image || digitalMediaStorage}
                  alt="Item"
                  style={{
                    width: '2rem',
                    height: '2rem',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                  onError={(e) => {
                    e.target.src = digitalMediaStorage;
                  }}
                />
              </div>
              
              <div className="item-content">
                <div className="item-title">{item.title}</div>
                {item.description && (
                  <div className="item-description">{item.description}</div>
                )}
                <div className="item-date">
                  Created: {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              
              <div className="item-actions">
                <button onClick={() => onViewDetails(item)} className="btn-view">View Details</button>
                <button onClick={() => onEdit(item)} className="btn-edit">Edit</button>
                <button onClick={() => onDelete(item)} className="btn-delete">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList; 