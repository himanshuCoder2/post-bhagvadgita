import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Tab = 'list' | 'create' | 'detail' | 'pagination' | 'gita' | 'coffee';
type Lang = 'en' | 'hi';

interface UiState {
  activeTab: Tab;
  gitaLang: Lang;
  selectedChapter: number;
  selectedVerse: number;
}

const initialState: UiState = {
  activeTab: 'list',
  gitaLang: 'en',
  selectedChapter: 1,
  selectedVerse: 1,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<Tab>) {
      state.activeTab = action.payload;
    },
    setGitaLang(state, action: PayloadAction<Lang>) {
      state.gitaLang = action.payload;
    },
    setSelectedChapter(state, action: PayloadAction<number>) {
      state.selectedChapter = action.payload;
      state.selectedVerse = 1; // chapter change after verse reset
    },
    setSelectedVerse(state, action: PayloadAction<number>) {
      state.selectedVerse = action.payload;
    },
  },
});

export const { setActiveTab, setGitaLang, setSelectedChapter, setSelectedVerse } = uiSlice.actions;
export default uiSlice.reducer;