import React from 'react';
import './VirtualTourPage.css';

function VirtualTourPage() {
  return (
    <div className="vr-tour-page">
      <iframe
        src="/vr-tour/tour.html"
        title="PTIT Virtual Tour - Tham quan Học viện 360°"
        className="vr-tour-page__iframe"
        allowFullScreen
        allow="fullscreen; autoplay; xr-spatial-tracking"
      />
    </div>
  );
}

export default VirtualTourPage;
