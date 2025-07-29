import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import DeleteDialog from './components/DeleteDialog';
import EditDialog from './components/EditDialog';
import ItemForm from './components/ItemForm';
import datanestLogo from './assets/datanestlogo.png';
import './App.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = 'http://localhost:5000/api/items';

const Sidebar = ({ section, setSection }) => (
  <aside className="sidebar">
    <img src={datanestLogo} alt="Logo" className="sidebar-logo" />
    <nav className="sidebar-nav">
      <a className={`sidebar-link${section === 'overview' ? ' active' : ''}`} onClick={() => setSection('overview')}>
        <span role="img" aria-label="overview">📊</span> Overview
      </a>
      <a className={`sidebar-link${section === 'add' ? ' active' : ''}`} onClick={() => setSection('add')}>
        <span role="img" aria-label="add">➕</span> Add Items
      </a>
      <a className={`sidebar-link${section === 'items' ? ' active' : ''}`} onClick={() => setSection('items')}>
        <span role="img" aria-label="items">📦</span> Items
      </a>
    </nav>
  </aside>
);

const Topbar = () => (
  <header className="topbar">
    <h1 className="dashboard-title" style={{margin: 0}}>DataNest Dashboard</h1>
    <div className="topbar-profile">
      <img src={datanestLogo} alt="User" className="topbar-avatar" />
      <span style={{fontWeight: 600}}>User</span>
    </div>
  </header>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6F91', '#2a5298'];

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [section, setSection] = useState('overview');

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (formData) => {
    await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    fetchItems();
    setSection('items');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditing(true);
    setShowEditDialog(true);
  };

  const handleUpdate = async (formData) => {
    await axios.put(`${API_URL}/${editingItem._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setIsEditing(false);
    setEditingItem(null);
    setShowEditDialog(false);
    fetchItems();
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      await axios.delete(`${API_URL}/${itemToDelete._id}`);
      setShowDeleteDialog(false);
      setItemToDelete(null);
      fetchItems();
      if (viewMode === 'detail' && selectedItem && selectedItem._id === itemToDelete._id) {
        setViewMode('list');
        setSelectedItem(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingItem(null);
    setShowEditDialog(false);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedItem(null);
  };

  // --- Statistics for Overview ---
  const getStats = () => {
    const totalItems = items.length;
    const thisMonth = items.filter(item => {
      const itemDate = new Date(item.date);
      const now = new Date();
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }).length;
    const recentItems = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    // Pie chart data by status
    const statusCounts = items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const pieData = Object.keys(statusCounts).map((status) => ({ name: status, value: statusCounts[status] }));
    // Overdue: only items with status 'Pending', dueDate in the past, and createdAt after dueDate
    const overdue = items.filter(item => {
      const isPending = (item.status || '').toLowerCase() === 'pending';
      const dueDate = item.dueDate ? new Date(item.dueDate) : null;
      const createdAt = item.createdAt ? new Date(item.createdAt) : null;
      const now = new Date();
      // Overdue if dueDate in the past and status is pending
      // Also count if created after dueDate (i.e., item was created after it was already overdue)
      if (!isPending || !dueDate) return false;
      if (dueDate < now) return true;
      if (createdAt && createdAt > dueDate) return true;
      return false;
    }).length;
    return { totalItems, thisMonth, recentItems, pieData, statusCounts, overdue };
  };

  const stats = getStats();

  return (
    <div>
      <Sidebar section={section} setSection={setSection} />
      <Topbar />
      <main className="dashboard-main">
        {section === 'overview' && (
          <div>
            <div className="stat-cards">
              <div className="stat-card">
                <div className="stat-label">Total Items</div>
                <div className="stat-value">{stats.totalItems}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">This Month</div>
                <div className="stat-value">{stats.thisMonth}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Overdue Items</div>
                <div className="stat-value">{stats.overdue}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 32 }}>
              <div style={{ flex: 1, minWidth: 320, maxWidth: 400, background: 'rgba(255,255,255,0.8)', borderRadius: 18, boxShadow: '0 4px 24px rgba(30,60,114,0.10)', padding: 24 }}>
                <h3 style={{ color: '#2a5298', marginBottom: 16 }}>Items by Status</h3>
                {stats.pieData.length === 0 ? (
                  <div style={{ color: '#222', background: '#fff', borderRadius: 8, padding: '32px 0', textAlign: 'center', fontStyle: 'italic', fontWeight: 400 }}>
                    No data available for chart. Please add items to see statistics.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={stats.pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {stats.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 320, maxWidth: 400, background: 'rgba(255,255,255,0.8)', borderRadius: 18, boxShadow: '0 4px 24px rgba(30,60,114,0.10)', padding: 24 }}>
                <h3 style={{ color: '#2a5298', marginBottom: 16 }}>Recent Activity</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {stats.recentItems.length === 0 && <li>No recent activity.</li>}
                  {stats.recentItems.map(item => (
                    <li key={item._id} style={{ marginBottom: 18, borderBottom: '1px solid #eee', paddingBottom: 10 }}>
                      <div style={{ fontWeight: 600, color: '#1e3c72' }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#888' }}>{new Date(item.createdAt).toLocaleString()}</div>
                      <div style={{ fontSize: 14, color: '#444', marginTop: 2 }}>{item.description?.slice(0, 60)}{item.description && item.description.length > 60 ? '...' : ''}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {section === 'add' && (
          <>
            <h2>Add New Item</h2>
            <ItemForm onSubmit={handleAdd} isEditing={false} />
          </>
        )}
        {section === 'items' && (
          <>
            {viewMode === 'detail' && selectedItem ? (
              <ItemDetail
                item={selectedItem}
                onBack={handleBackToList}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ) : (
              <ItemList
                items={items}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onViewDetails={handleViewDetails}
              />
            )}
          </>
        )}
      </main>
      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemTitle={itemToDelete?.title || ''}
      />
      <EditDialog
        isOpen={showEditDialog}
        onClose={handleEditCancel}
        onSubmit={isEditing ? handleUpdate : handleAdd}
        initialData={editingItem}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
