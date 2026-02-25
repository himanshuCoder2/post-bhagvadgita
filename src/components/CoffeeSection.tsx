import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Photo {
  file: string;
}

export function CoffeeSection() {
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState(
    `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/500`
  );
  const [loading, setLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(1);

  const handleNewPhoto = () => {
    setLoading(true);
    const newSrc = `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/800/500`;
    setImgSrc(newSrc);
    setFetchCount(c => c + 1);
  };

  return (
    <div className="section">
      {/* Header */}
      <div className="coffee-top-header">
        <div>
          <h2>📸 Photo Gallery</h2>
        </div>
        <div className="fetch-counter">
          <span className="fetch-num">{fetchCount}</span>
          <span className="fetch-label">fetches</span>
        </div>
      </div>

      <div className="coffee-layout">
        {/* Image */}
        <div className="coffee-img-wrapper">
          {loading && (
            <div className="img-loading-overlay">
              <div className="spinner" />
            </div>
          )}
          <img
            key={imgSrc}
            src={imgSrc}
            alt="Random photo"
            className="coffee-img"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          <div className="img-overlay-badge">📸 Random · Picsum Photos</div>
        </div>

        {/* Right Panel */}
        <div className="coffee-right">

          {/* Cache Info Cards */}
          <div className="cache-info-grid">
            <div className="cache-info-card red">
              <span className="ci-icon">⏱</span>
              <div>
                <span className="ci-title">staleTime</span>
                <span className="ci-value">0ms</span>
                <span className="ci-desc">Turant stale ho jaata hai</span>
              </div>
            </div>
            <div className="cache-info-card red">
              <span className="ci-icon">🗑</span>
              <div>
                <span className="ci-title">gcTime</span>
                <span className="ci-value">0ms</span>
                <span className="ci-desc">Cache memory mein nahi rahega</span>
              </div>
            </div>
            <div className="cache-info-card green">
              <span className="ci-icon">🔄</span>
              <div>
                <span className="ci-title">Total Fetches</span>
                <span className="ci-value">{fetchCount}x</span>
                <span className="ci-desc">Each click on fresh request</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            className="btn btn-primary coffee-new-btn"
            onClick={handleNewPhoto}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔀 Generate Photo '}
          </button>

        </div>
      </div>
    </div>
  );
}