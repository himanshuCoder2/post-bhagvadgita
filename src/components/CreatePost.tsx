// ============================================
// ✏️ CreatePost Component — useMutation demo
import { useState, type FormEvent } from 'react';
import { useCreatePost } from '../hooks/usePosts';
import { useAppDispatch } from '../store/hooks';
import { addToast } from '../store/slices/toastSlice';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
const dispatch = useAppDispatch();
  const { mutate, isPending, isError, error } = useCreatePost();


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    mutate(
      { title, body, userId: 1 },
      {
        onSuccess: () => {
          setTitle('');
          setBody('');
         dispatch(addToast({ message: '✅ Post created!', type: 'success' }));
        },
         onError: () => {
        dispatch(addToast({ message: '❌ Post not created!', type: 'error' }));
      },
      }
    );
  };

  return (
    <div className="section">
      <h2>✏️ Create New Post </h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post ka title likho..."
            className="input"
            disabled={isPending}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post ka content likho..."
            className="textarea"
            rows={3}
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isPending || !title.trim() || !body.trim()}
        >
          {isPending ? (
            <span>⏳ In Progress...</span>
          ) : (
            <span>🚀 Create Prost</span>
          )}
        </button>
      </form>
    </div>
  );
}
