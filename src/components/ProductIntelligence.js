import React, { useState } from 'react';
import './ProductIntelligence.css';

const ProductIntelligence = () => {
  const [activeTab, setActiveTab] = useState({
    product: 'write',
    icp: 'write'
  });

  const [inputValues, setInputValues] = useState({
    product: '',
    icp: ''
  });

  const [loading, setLoading] = useState({
    product: false,
    icp: false
  });

  const [summaries, setSummaries] = useState({
    product: '',
    icp: ''
  });

  const [isEditing, setIsEditing] = useState({
    product: false,
    icp: false
  });

  const handleInputChange = (section, value) => {
    setInputValues(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSubmit = (section) => {
    if (!inputValues[section]) return;
    setLoading(prev => ({ ...prev, [section]: true }));

    setTimeout(() => {
      setSummaries(prev => ({
        ...prev,
        [section]: inputValues[section]
      }));
      setLoading(prev => ({ ...prev, [section]: false }));
    }, 1000);
  };

  const handleFileUpload = (section, file) => {
    if (!file) return;
    setLoading(prev => ({ ...prev, [section]: true }));

    setTimeout(() => {
      setSummaries(prev => ({
        ...prev,
        [section]: `Processed content from ${file.name}:\n• Key point 1\n• Key point 2\n• Key point 3`
      }));
      setLoading(prev => ({ ...prev, [section]: false }));
    }, 1500);
  };

  const renderSection = (section, title) => (
    <div className="section">
      <h3 className="section-title">{title}</h3>

      <div className="tabs">
        <button
          className={`tab ${activeTab[section] === 'write' ? 'active' : ''}`}
          onClick={() => setActiveTab(prev => ({ ...prev, [section]: 'write' }))}
        >
          Write
        </button>
        <button
          className={`tab ${activeTab[section] === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab(prev => ({ ...prev, [section]: 'upload' }))}
        >
          Upload Document
        </button>
        {section === 'product' && (
          <button
            className={`tab ${activeTab[section] === 'url' ? 'active' : ''}`}
            onClick={() => setActiveTab(prev => ({ ...prev, [section]: 'url' }))}
          >
            Provide URL
          </button>
        )}
      </div>

      <div className="tab-content">
        {activeTab[section] === 'write' && (
          <div className="write-section">
            <textarea
              value={inputValues[section]}
              onChange={(e) => handleInputChange(section, e.target.value)}
              placeholder={`Enter your ${title.toLowerCase()} here...`}
              className="input-textarea"
            />
            <button
              className="submit-button"
              onClick={() => handleSubmit(section)}
              disabled={!inputValues[section] || loading[section]}
            >
              {loading[section] ? 'Processing...' : 'Submit'}
            </button>
          </div>
        )}

        {activeTab[section] === 'upload' && (
          <div className="upload-section">
            <input
              type="file"
              id={`file-${section}`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(section, file);
              }}
              accept=".pdf,.doc,.docx,.txt"
              className="file-input"
            />
            <label htmlFor={`file-${section}`} className="upload-label">
              <div className="upload-icon">📎</div>
              <span>Click to upload or drag and drop</span>
              <span className="file-types">PDF, DOC, DOCX, TXT</span>
            </label>
          </div>
        )}

        {section === 'product' && activeTab[section] === 'url' && (
          <div className="url-section">
            <input
              type="url"
              value={inputValues[section]}
              onChange={(e) => handleInputChange(section, e.target.value)}
              placeholder="Enter URL here..."
              className="url-input"
            />
            <button
              className="url-button"
              onClick={() => handleSubmit(section)}
              disabled={!inputValues[section] || loading[section]}
            >
              {loading[section] ? 'Processing...' : 'Process URL'}
            </button>
          </div>
        )}

        {loading[section] && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Processing...</span>
          </div>
        )}

        {summaries[section] && (
          <div className="summary-section">
            <div className="summary-header">
              <h4>{title} Summary</h4>
              <div className="summary-actions">
                <button
                  className={`action-button ${isEditing[section] ? 'active' : ''}`}
                  onClick={() => setIsEditing(prev => ({
                    ...prev,
                    [section]: !prev[section]
                  }))}
                >
                  {isEditing[section] ? '👁️ View' : '✏️ Edit'}
                </button>
                <button
                  className="save-button"
                  onClick={() => setIsEditing(prev => ({
                    ...prev,
                    [section]: false
                  }))}
                >
                  💾 Save
                </button>
              </div>
            </div>
            <div className="summary-content">
              {isEditing[section] ? (
                <textarea
                  value={summaries[section]}
                  onChange={(e) => setSummaries(prev => ({
                    ...prev,
                    [section]: e.target.value
                  }))}
                  className="edit-textarea"
                />
              ) : (
                <div className="view-content">
                  {summaries[section].split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="product-intelligence">
      <div className="grid-container">
        {renderSection('product', 'Product Overview')}
        {renderSection('icp', 'Ideal Customer Profile')}
      </div>
    </div>
  );
};

export default ProductIntelligence;
