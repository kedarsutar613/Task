// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onAddBooks }) => {
    return (
        <div className="sidebar">
            <button className="sidebar-item" onClick={onAddBooks}>Add Books</button>
            {/* Add more sidebar items here */}
        </div>
    );
};

export default Sidebar;
