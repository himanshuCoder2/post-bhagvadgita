import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setGitaLang, setSelectedChapter, setSelectedVerse } from '../store/slices/uiSlice';
import { useGitaChapters, useGitaSlok } from '../hooks/usePosts';

const PAGE_SIZE = 27;

function VerseSelector({
  maxVerses,
  selectedVerse,
  onSelect,
}: {
  maxVerses: number;
  selectedVerse: number;
  onSelect: (v: number) => void;
}) {
  const currentPage = Math.ceil(selectedVerse / PAGE_SIZE);
  const totalPages  = Math.ceil(maxVerses / PAGE_SIZE);

  const startVerse = (currentPage - 1) * PAGE_SIZE + 1;
  const endVerse   = Math.min(currentPage * PAGE_SIZE, maxVerses);

  const visibleVerses = Array.from(
    { length: endVerse - startVerse + 1 },
    (_, i) => startVerse + i
  );

  return (
    <div className="verse-selector-wrap">
      {totalPages > 1 && (
        <div className="verse-page-tabs">
          {Array.from({ length: totalPages }, (_, i) => {
            const from = i * PAGE_SIZE + 1;
            const to   = Math.min((i + 1) * PAGE_SIZE, maxVerses);
            return (
              <button
                key={i}
                className={`verse-page-tab ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => onSelect(from)}
              >
                {from}–{to}
              </button>
            );
          })}
        </div>
      )}
      <div className="verse-pills-row">
        {visibleVerses.map((v) => (
          <button
            key={v}
            className={`verse-pill ${selectedVerse === v ? 'active' : ''}`}
            onClick={() => onSelect(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

export function GitaSection() {
  const dispatch = useAppDispatch();
  const selectedChapter = useAppSelector((s) => s.ui.selectedChapter);
  const selectedVerse   = useAppSelector((s) => s.ui.selectedVerse);
  const lang            = useAppSelector((s) => s.ui.gitaLang);

  const { data: chapters, isLoading: chapLoading, isError: chapError } = useGitaChapters();
  const { data: slok, isLoading: slokLoading, isFetching: slokFetching } = useGitaSlok(
    selectedChapter, selectedVerse
  );

  const currentChapter = chapters?.find((c) => c.chapter_number === selectedChapter);
  const maxVerses = currentChapter?.verses_count ?? 1;

  const handlePrevVerse = () => {
    if (selectedVerse > 1) {
      dispatch(setSelectedVerse(selectedVerse - 1));
    } else if (selectedChapter > 1) {
      const prevCh = chapters?.find((c) => c.chapter_number === selectedChapter - 1);
      dispatch(setSelectedChapter(selectedChapter - 1));
      dispatch(setSelectedVerse(prevCh?.verses_count ?? 1));
    }
  };

  const handleNextVerse = () => {
    if (selectedVerse < maxVerses) {
      dispatch(setSelectedVerse(selectedVerse + 1));
    } else if (selectedChapter < 18) {
      dispatch(setSelectedChapter(selectedChapter + 1));
      dispatch(setSelectedVerse(1));
    }
  };

  return (
    <div className="gita-page">

      {/* Top Header */}
      <div className="gita-page-header">
        <div className="gita-header-left">
          <span className="gita-om">🕉️</span>
          <div>
            <h2 className="gita-page-title">Bhagavad Gita</h2>
          </div>
        </div>
        <div className="lang-pill-toggle">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => dispatch(setGitaLang('en'))}>EN</button>
          <button className={lang === 'hi' ? 'active' : ''} onClick={() => dispatch(setGitaLang('hi'))}>हि</button>
        </div>
      </div>

      {chapLoading ? (
        <div className="loading"><div className="spinner" /><p>Loading chapters...</p></div>
      ) : chapError ? (
        <div className="error-box"><p>❌ Could not load chapters.</p></div>
      ) : (
        <div className="gita-body">

          {/* Left Sidebar */}
          <div className="gita-sidebar">
            <p className="sidebar-label">CHAPTERS</p>
            <div className="sidebar-list">
              {chapters?.map((ch) => (
                <button
                  key={ch.chapter_number}
                  className={`sidebar-item ${selectedChapter === ch.chapter_number ? 'active' : ''}`}
                  onClick={() => dispatch(setSelectedChapter(ch.chapter_number))}
                >
                  <span className="sidebar-num">{ch.chapter_number}</span>
                  <div className="sidebar-text">
                    <span className="sidebar-name">{ch.translation}</span>
                    <span className="sidebar-verses">{ch.verses_count} verses</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="gita-main">

            {/* Chapter Hero Card */}
            {currentChapter && (
              <div className="gita-chapter-hero">
                <div className="gita-chapter-hero-top">
                  <div>
                    <h3 className="hero-sanskrit">{currentChapter.name}</h3>
                    <p className="hero-roman">{currentChapter.transliteration}</p>
                    <p className="hero-meaning">
                      {lang === 'en' ? currentChapter.meaning.en : currentChapter.meaning.hi}
                    </p>
                  </div>
                  <div className="hero-badge-col">
                    <span className="hero-ch-badge">Ch. {currentChapter.chapter_number}</span>
                    <span className="hero-v-badge">{currentChapter.verses_count} Verses</span>
                  </div>
                </div>
                <p className="hero-summary">
                  {lang === 'en' ? currentChapter.summary.en : currentChapter.summary.hi}
                </p>
              </div>
            )}

            {/* Verse Picker */}
            <div className="verse-picker-section">
              <p className="sidebar-label">SELECT VERSE</p>
              <VerseSelector
                maxVerses={maxVerses}
                selectedVerse={selectedVerse}
                onSelect={(v) => dispatch(setSelectedVerse(v))}
              />
            </div>

            {/* Slok Card */}
            {slokLoading ? (
              <div className="loading"><div className="spinner" /></div>
            ) : slok ? (
              <div className={`slok-full-card ${slokFetching ? 'fetching-blur' : ''}`}>

                {/* Card Header */}
                <div className="slok-card-header">
                  <div className="slok-location">
                    <span className="slok-ch-tag">Chapter {slok.chapter}</span>
                    <span className="slok-dot">·</span>
                    <span className="slok-v-tag">Verse {slok.verse}</span>
                  </div>
                  <span className="slok-author">
                    {lang === 'en' ? slok.siva?.author : slok.tej?.author}
                  </span>
                </div>

                {/* Sanskrit */}
                <div className="slok-sanskrit-section">
                  <p className="slok-devanagari">{slok.slok}</p>
                  <p className="slok-roman-text">{slok.transliteration}</p>
                </div>

                {/* Divider */}
                <div className="slok-sep" />

                {/* Translation */}
                <div className="slok-translation-section">
                  <p className="slok-trans-label">TRANSLATION</p>
                  <p className="slok-trans-text">
                    {lang === 'en' ? slok.siva?.et : slok.tej?.ht}
                  </p>
                </div>

                {/* Prev / Next Navigation */}
                <div className="slok-nav">
                  <button
                    className="slok-nav-btn"
                    onClick={handlePrevVerse}
                    disabled={selectedChapter === 1 && selectedVerse === 1}
                  >
                    ← Previous
                  </button>
                  <span className="slok-nav-pos">{selectedVerse} / {maxVerses}</span>
                  <button
                    className="slok-nav-btn"
                    onClick={handleNextVerse}
                    disabled={selectedChapter === 18 && selectedVerse === maxVerses}
                  >
                    Next →
                  </button>
                </div>

              </div>
            ) : null}

          </div>
        </div>
      )}
    </div>
  );
}