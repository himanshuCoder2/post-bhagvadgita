// ============================================
// 📋 PostsList Component
// ============================================

import { useState } from 'react';
import { usePosts, useDeletePost, useUpdatePost } from '../hooks/usePosts';
import type { Post } from '../types';

export function PostsList() {
  const { data: posts, isLoading, isError, error, isFetching, refetch } = usePosts();
  const deleteMutation = useDeletePost();
  const updateMutation = useUpdatePost();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Posts load ho rahi hain...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-box">
        <h3>❌ Error aaya!</h3>
        <p>{(error as Error).message}</p>
        <button onClick={() => refetch()}>Dobara Try Karo</button>
      </div>
    );
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title);
  };

  const handleUpdate = () => {
    if (!editingPost) return;
    updateMutation.mutate(
      { ...editingPost, title: editTitle },
      { onSuccess: () => setEditingPost(null) }
    );
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>📋 Posts List</h2>
        <div className="badges">
          {isFetching && <span className="badge fetching">🔄 Refreshing...</span>}
          <span className="badge count">{posts?.length} posts</span>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✏️ Post Edit Karo</h3>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input"
              placeholder="Naya title likho..."
            />
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? 'Update ho raha...' : '✅ Update Karo'}
              </button>
              <button className="btn btn-secondary" onClick={() => setEditingPost(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="posts-grid">
        {posts?.map((post) => (
          <div key={post.id} className="post-card">
            <span className="post-id">#{post.id}</span>
            <h4 className="post-title">{post.title}</h4>
            <p className="post-body">{post.body.substring(0, 80)}...</p>
            <div className="post-actions">
              <button
                className="btn btn-edit"
                onClick={() => handleEdit(post)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={deleteMutation.isPending}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
