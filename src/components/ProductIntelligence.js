import React, { useState, useRef } from "react";
import "./ProductIntelligence.css";

const ProductIntelligence = () => {
  const [activeSection, setActiveSection] = useState({
    product: "write",
    icp: "write"
  });

  const [inputData, setInputData] = useState({
    product: "",
    icp: ""
  });

  const [files, setFiles] = useState({
    product: null,
    icp: null
  });

  const [descriptions, setDescriptions] = useState({
    product: [],
    icp: []
  });

  const [loading, setLoading] = useState({
    product: false,
    icp: false
  });

  const [urlData, setUrlData] = useState({
    product: "",
    loading: false,
    error: null
  });

  const [documentAnalysis, setDocumentAnalysis] = useState({
    product: null,
    icp: null
  });

  const fileRefs = {
    product: useRef(null),
    icp: useRef(null)
  };

  const handleTextInput = (section, value) => {
    setInputData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleUrlFetch = async () => {
    if (!urlData.product) return;

    setUrlData(prev => ({ ...prev, loading: true, error: null }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const processedData = {
        title: "Product Information from URL",
        summary: [
          "• Extracted product features and specifications",
          "• Identified key benefits and use cases",
          "• Analyzed pricing information",
          "• Gathered technical specifications"
        ],
        metadata: {
          source: urlData.product,
          timestamp: new Date().toISOString()
        }
      };

      setDescriptions(prev => ({
        ...prev,
        product: processedData.summary
      }));
    } catch (error) {
      setUrlData(prev => ({ 
        ...prev, 
        error: "Failed to process URL. Please try again." 
      }));
    } finally {
      setUrlData(prev => ({ ...prev, loading: false }));
    }
  };

  const handleFileUpload = async (section, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = {
      'application/pdf': 'PDF',
      'text/plain': 'TXT',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
    };

    if (!allowedTypes[file.type]) {
      alert(`Please upload a valid ${Object.values(allowedTypes).join(', ')} file`);
      return;
    }

    setLoading(prev => ({ ...prev, [section]: true }));
    setFiles(prev => ({ ...prev, [section]: file }));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysis = {
        fileInfo: {
          name: file.name,
          type: allowedTypes[file.type],
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          lastModified: new Date(file.lastModified).toLocaleDateString()
        },
        content: {
          summary: [
            `📄 Analysis of ${file.name}:`,
            '• Key points extracted from document',
            '• Important features identified',
            '• Relevant specifications found'
          ],
          details: {
            keyPoints: ['Point 1', 'Point 2', 'Point 3'],
            recommendations: ['Rec 1', 'Rec 2', 'Rec 3'],
            metadata: {
              pageCount: 5,
              wordCount: 1500,
              created: new Date().toLocaleDateString()
            }
          }
        }
      };

      setDocumentAnalysis(prev => ({
        ...prev,
        [section]: analysis
      }));

      setDescriptions(prev => ({
        ...prev,
        [section]: analysis.content.summary
      }));

    } catch (error) {
      alert('Error processing document. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, [section]: false }));
    }
  };

  const handleSubmit = () => {
    // Process text inputs
    Object.keys(inputData).forEach(section => {
      if (inputData[section].trim()) {
        const lines = inputData[section]
          .split('\n')
          .filter(line => line.trim())
          .map(line => `• ${line.trim()}`);
        
        setDescriptions(prev => ({
          ...prev,
          [section]: lines
        }));
      }
    });

    // Clear inputs after processing
    setInputData({ product: "", icp: "" });
  };

  const renderInputSection = (section) => {
    const isProduct = section === 'product';
    const title = isProduct ? 'Product Overview' : 'Ideal Customer Profile (ICP)';
    const placeholder = isProduct 
      ? "Enter product information, features, and specifications..."
      : "Enter ideal customer profile details, preferences, and requirements...";

    return (
      <div className="section-card">
        <div className="card-header">
          <h2>{title}</h2>
          <div className="status-indicator">
            {loading[section] ? 'Processing...' : 'Ready'}
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeSection[section] === 'write' ? 'active' : ''}`}
              onClick={() => setActiveSection(prev => ({ ...prev, [section]: 'write' }))}
            >
              <span className="tab-icon">✏️</span>
              Write
            </button>
            <button 
              className={`tab ${activeSection[section] === 'upload' ? 'active' : ''}`}
              onClick={() => setActiveSection(prev => ({ ...prev, [section]: 'upload' }))}
            >
              <span className="tab-icon">📎</span>
              Upload Document
            </button>
            {isProduct && (
              <button 
                className={`tab ${activeSection[section] === 'url' ? 'active' : ''}`}
                onClick={() => setActiveSection(prev => ({ ...prev, [section]: 'url' }))}
              >
                <span className="tab-icon">🔗</span>
                Provide URL
              </button>
            )}
          </div>
        </div>

        <div className="input-content">
          {activeSection[section] === 'write' && (
            <div className="write-section">
              <textarea
                className="input-textarea"
                placeholder={placeholder}
                value={inputData[section]}
                onChange={(e) => handleTextInput(section, e.target.value)}
              />
            </div>
          )}

          {activeSection[section] === 'upload' && (
            <div 
              className={`upload-section ${loading[section] ? 'loading' : ''}`}
              onClick={() => fileRefs[section].current?.click()}
            >
              <input
                type="file"
                ref={fileRefs[section]}
                onChange={(e) => handleFileUpload(section, e)}
                accept=".pdf,.doc,.docx,.txt"
                hidden
              />
              
              {files[section] ? (
                <div className="file-preview">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{files[section].name}</span>
                  <button 
                    className="remove-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles(prev => ({ ...prev, [section]: null }));
                      setDescriptions(prev => ({ ...prev, [section]: [] }));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="upload-prompt">
                  <div className="upload-icon">📄</div>
                  <p>Drag and drop your file here or click to browse</p>
                  <p className="file-types">Supported: PDF, DOC, DOCX, TXT</p>
                </div>
              )}
            </div>
          )}

          {activeSection[section] === 'url' && isProduct && (
            <div className="url-section">
              <div className="url-input-group">
                <input 
                  type="url" 
                  placeholder="Enter URL to product documentation..."
                  value={urlData.product}
                  onChange={(e) => setUrlData(prev => ({ 
                    ...prev, 
                    product: e.target.value,
                    error: null 
                  }))}
                  className={`url-input ${urlData.error ? 'error' : ''}`}
                />
                <button 
                  className={`url-fetch-btn ${urlData.loading ? 'loading' : ''}`}
                  onClick={handleUrlFetch}
                  disabled={urlData.loading || !urlData.product}
                >
                  {urlData.loading ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Fetch</span>
                      <span className="btn-icon">→</span>
                    </>
                  )}
                </button>
              </div>
              {urlData.error && (
                <div className="url-error">{urlData.error}</div>
              )}
            </div>
          )}
        </div>

        <div className="description-section">
          <div className="description-header">
            <h3>{isProduct ? 'Product Description' : 'ICP Summary'}</h3>
            <div className="view-controls">
              <button className="view-btn">Edit</button>
              <button className="view-btn">View</button>
            </div>
          </div>
          
          <div className="description-content">
            {descriptions[section].length > 0 ? (
              descriptions[section].map((line, index) => (
                <div key={index} className="content-line">
                  {line}
                </div>
              ))
            ) : (
              <div className="placeholder-content">
                <div className="placeholder-line"></div>
                <div className="placeholder-line"></div>
                <div className="placeholder-line"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDocumentAnalysis = (section) => {
    const analysis = documentAnalysis[section];
    if (!analysis) return null;

    return (
      <div className="document-analysis">
        <div className="analysis-header">
          <h4>Document Analysis</h4>
          <span className="file-badge">{analysis.fileInfo.type}</span>
        </div>
        
        <div className="analysis-details">
          <div className="file-metadata">
            <div className="metadata-item">
              <span>Size:</span> {analysis.fileInfo.size}
            </div>
            <div className="metadata-item">
              <span>Modified:</span> {analysis.fileInfo.lastModified}
            </div>
            {analysis.content.details.metadata.pageCount && (
              <div className="metadata-item">
                <span>Pages:</span> {analysis.content.details.metadata.pageCount}
              </div>
            )}
          </div>

          <div className="analysis-sections">
            <div className="analysis-section">
              <h5>Key Points</h5>
              <ul>
                {analysis.content.details.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            
            <div className="analysis-section">
              <h5>Recommendations</h5>
              <ul>
                {analysis.content.details.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="product-intelligence">
      <div className="sections-grid">
        {renderInputSection('product')}
        {renderInputSection('icp')}
      </div>
      
      <div className="action-footer">
        <button 
          className="continue-btn"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProductIntelligence;
