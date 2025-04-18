import React, { useState } from "react";
import "./Artifacts.css";

const Artifacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const artifacts = [
    {
      id: 1,
      name: "Presentation.pdf",
      type: "pdf",
      size: "2.4 MB",
      lastModified: "2024-04-17",
      icon: "📄"
    },
    {
      id: 2,
      name: "CustomerSummary.xlsx",
      type: "excel",
      size: "1.8 MB",
      lastModified: "2024-04-16",
      icon: "📊"
    },
    {
      id: 3,
      name: "Persona.png",
      type: "image",
      size: "756 KB",
      lastModified: "2024-04-15",
      icon: "🖼️"
    }
  ];

  const handleDownload = (artifact) => {
    // In a real application, this would trigger an actual file download
    // For now, we'll just simulate it with an alert
    alert(`Downloading ${artifact.name}`);
  };

  const filteredArtifacts = artifacts.filter(artifact =>
    artifact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artifacts-container">
      <div className="artifacts-header">
        <h2>Artifacts</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search artifacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="artifacts-description">
        <p>Access and download your sales resources, presentations, and data insights.</p>
      </div>

      <div className="artifacts-grid">
        {filteredArtifacts.map((artifact) => (
          <div key={artifact.id} className="artifact-card">
            <div className="artifact-icon">{artifact.icon}</div>
            <div className="artifact-info">
              <h3>{artifact.name}</h3>
              <p className="artifact-details">
                <span>{artifact.size}</span>
                <span>•</span>
                <span>{artifact.lastModified}</span>
              </p>
            </div>
            <button 
              className="download-button"
              onClick={() => handleDownload(artifact)}
            >
              ⬇️ Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artifacts;
