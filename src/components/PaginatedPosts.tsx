// 📃 Pagination Component

import { useState } from 'react';
import { usePagedPosts } from '../hooks/usePosts';

export function PaginatedPosts() {
  const [page, setPage] = useState(1);
  const TOTAL_PAGES = 20;

  const { data: posts, isLoading, isFetching, isPlaceholderData } = usePagedPosts(page);

  return (
    <div className="section">
      <h2>📃 Pagination Demo</h2>

      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className={`posts-list ${isFetching ? 'fetching-blur' : ''}`}>
            {posts?.map((post) => (
              <div key={post.id} className="list-item">
                <span className="post-id">#{post.id}</span>
                <span className="list-title">{post.title}</span>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="btn btn-nav"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ◀ Previous
            </button>

            <span className="page-info">
              Page {page} / {TOTAL_PAGES}
              {isFetching && <span className="fetching-badge"> 🔄</span>}
            </span>

            <button
              className="btn btn-nav"
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={isPlaceholderData || page === TOTAL_PAGES}
            >
              Next ▶
            </button>
          </div>
        </>
      )}

    </div>
  );
}
