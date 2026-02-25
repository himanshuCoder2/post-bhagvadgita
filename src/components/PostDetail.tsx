//  PostDetail — Single post + Dependent Query

import { useState } from 'react';
import { usePost, useUsers } from '../hooks/usePosts';

export function PostDetail() {
  const [postId, setPostId] = useState(1);

  // Query 1: Post fetch 
  const { data: post, isLoading: postLoading } = usePost(postId);

  // Query 2: Users fetch  (post along with  they not dependent , parallel work)
  const { data: users } = useUsers();

  // Post  owner Find
  const postAuthor = users?.find((u) => u.id === post?.userId);

  return (
    <div className="section">
      <h2>🔍 Post Detail (Single Query)</h2>

      {/* ID Selector */}
      <div className="id-selector">
        <span>Post ID chuno:</span>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            className={`btn btn-id ${postId === id ? 'active' : ''}`}
            onClick={() => setPostId(id)}
          >
            #{id}
          </button>
        ))}
      </div>

      {postLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Post load ho rahi hai...</p>
        </div>
      ) : (
        <div className="detail-card">
          <div className="detail-header">
            <h3>{post?.title}</h3>
            {postAuthor && (
              <div className="author-badge">
                👤 {postAuthor.name} ({postAuthor.email})
              </div>
            )}
          </div>
          <p className="detail-body">{post?.body}</p>
          <div className="detail-meta">
            <span>Post ID: #{post?.id}</span>
            <span>User ID: #{post?.userId}</span>
          </div>
        </div>
      )}
    </div>
  );
}
