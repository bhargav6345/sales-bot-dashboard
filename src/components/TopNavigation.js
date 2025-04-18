import React from "react";
import "./TopNavigation.css";

const TopNavigation = ({ activeSection, onNavigate }) => {
  return (
    <div className="top-nav">
      <div className="nav-items">
        <button 
          className={`nav-item ${activeSection === 'Product Intelligence' ? 'active' : ''}`}
          onClick={() => onNavigate('Product Intelligence')}
        >
          <span className="nav-icon">📊</span>
          Product Intelligence
        </button>
        <button 
          className={`nav-item ${activeSection === 'ChatBot' ? 'active' : ''}`}
          onClick={() => onNavigate('ChatBot')}
        >
          <span className="nav-icon">💬</span>
          ChatBot
        </button>
        <button 
          className={`nav-item ${activeSection === 'Artifacts' ? 'active' : ''}`}
          onClick={() => onNavigate('Artifacts')}
        >
          <span className="nav-icon">📁</span>
          Artifacts
        </button>
      </div>
    </div>
  );
};

export default TopNavigation; 