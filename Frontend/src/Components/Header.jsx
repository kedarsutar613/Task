// Header.js
import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Header.css';

const Header = ({ onLogout, onAddBooks }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-actions">
                    <Sidebar onAddBooks={onAddBooks} />
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
