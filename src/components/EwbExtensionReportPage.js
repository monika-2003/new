import React from 'react';
import '../App.css';
import EwbExtensionReport from './EwbExtensionReport';

function EwbExtensionReportPage({ sessionObject }) {
  return (
    <div className="page-mr">
      <EwbExtensionReport sessionObject={sessionObject}/>
    </div>
  );
}

export default EwbExtensionReportPage;