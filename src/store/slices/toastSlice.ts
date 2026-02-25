import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = { toasts: [] };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<Omit<Toast, 'id'>>) {
      state.toasts.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;