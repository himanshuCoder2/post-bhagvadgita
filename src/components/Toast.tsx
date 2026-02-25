import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeToast } from '../store/slices/toastSlice';

export function ToastContainer() {
  const toasts = useAppSelector((s) => s.toast.toasts);
  const dispatch = useAppDispatch();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onRemove={(id) => dispatch(removeToast(id))}
        />
      ))}
    </div>
  );
}

function ToastItem({ id, message, type, onRemove }: {
  id: string; message: string; type: string; onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 3000); // 3 sec after auto hide
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`toast toast-${type}`} onClick={() => onRemove(id)}>
      {message}
    </div>
  );
}