import React, { useState } from "react";
import TopNavigation from "./components/TopNavigation";
import Sidebar from "./components/Sidebar";
import ProductIntelligence from "./components/ProductIntelligence";
import ChatBot from "./components/ChatBot";
import Artifacts from "./components/Artifacts";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState({
    section: "Product Intelligence",
    product: null
  });

  const handleNavigation = (section) => {
    setActiveView({ section, product: activeView.product });
  };

  const handleProductSelect = (product) => {
    setActiveView({ ...activeView, product });
  };

  const renderContent = () => {
    switch (activeView.section) {
      case "Product Intelligence":
        return <ProductIntelligence selectedProduct={activeView.product} />;
      case "ChatBot":
        return <ChatBot />;
      case "Artifacts":
        return <Artifacts />;
      default:
        return <ProductIntelligence />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar onProductSelect={handleProductSelect} />
      <div className="main-content">
        <TopNavigation 
          activeSection={activeView.section}
          onNavigate={handleNavigation}
        />
        <div className="content-wrapper">
          <div className="content-header">
            {activeView.product && (
              <div className="selected-product">
                <span className="product-label">Selected Product:</span>
                <span className="product-name">{activeView.product}</span>
              </div>
            )}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
