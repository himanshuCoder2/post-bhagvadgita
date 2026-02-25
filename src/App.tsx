import { useAppDispatch, useAppSelector } from './store/hooks';
import { setActiveTab } from './store/slices/uiSlice';
import { PostsList } from './components/PostsList';
import { CreatePost } from './components/CreatePost';
import { PostDetail } from './components/PostDetail';
import { PaginatedPosts } from './components/PaginatedPosts';
import { GitaSection } from './components/GitaSection';
import { CoffeeSection } from './components/CoffeeSection';
import { ToastContainer } from './components/Toast';
import { useEffect, useRef, useState } from 'react';

type Tab = 'list' | 'create' | 'detail' | 'pagination' | 'gita' | 'coffee';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'list',       icon: '📋', label: 'Posts'      },
  { id: 'create',     icon: '✏️', label: 'Create'     },
  { id: 'detail',     icon: '🔍', label: 'Detail'     },
  { id: 'pagination', icon: '📃', label: 'Pagination' },
  { id: 'gita',       icon: '🕉️', label: 'Gita'       },
  { id: 'coffee',     icon: '📸', label: 'Photos'     },
];

const slides = [
  {
    icon: '⚡',
    title: 'useQuery',
    sub: 'Fetch + Cache',
    desc: 'Automatic caching, background refetch, stale-while-revalidate pattern.',
    color: 'slide-blue',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
  },
  {
    icon: '🔁',
    title: 'useMutation',
    sub: 'POST / PUT / DELETE',
    desc: 'Server data ko modify karo with onSuccess, onError callbacks.',
    color: 'slide-green',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
  },
  {
    icon: '🚀',
    title: 'Optimistic Update',
    sub: 'UI first, server second',
    desc: 'Pehle UI update karo turant, phir server confirm karega silently.',
    color: 'slide-purple',
    img: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80',
  },
  {
    icon: '📄',
    title: 'keepPreviousData',
    sub: 'Smooth Pagination',
    desc: 'Page change par blank screen nahi — purana data tab tak dikhta hai jab tak naya na aaye.',
    color: 'slide-orange',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  },
  {
    icon: '♾️',
    title: 'staleTime: Infinity',
    sub: 'Smart Caching',
    desc: 'Bhagavad Gita jaise stable data ko ek baar fetch karo — hamesha cache mein rahega.',
    color: 'slide-gold',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    icon: '🗑️',
    title: 'gcTime: 0',
    sub: 'No Cache',
    desc: 'Fresh photos ke liye — har baar naya fetch, koi purana data nahi.',
    color: 'slide-red',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
  },
];

function ConceptSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setCurrent(i);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const slide = slides[current];

  return (
    <div className="slider-wrap">
      <div className={`slider-card ${slide.color}`}>
        {/* Background image */}
        <div
          className="slider-bg"
          style={{ backgroundImage: `url(${slide.img})` }}
        />
        <div className="slider-overlay" />
     
      </div>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot ${current === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  return (
    <div className="app">

      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <span className="app-logo-icon">❤</span>
            <div>
              <h1 className="app-title">Post and Bhagavad Gita</h1>
            </div>
          </div>
          <div className="app-header-badges">
            <span className="hbadge">Post</span>
            <span className="hbadge">Photo</span>
            <span className="hbadge hbadge-accent">Bhagavad Gita</span>
          </div>
        </div>
      </header>

      {/* Concept Slider */}
      <ConceptSlider />

      {/* Tab Nav */}
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab(tab.id))}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              {activeTab === tab.id && <span className="tab-active-dot" />}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="app-main">
        {activeTab === 'list'       && <PostsList />}
        {activeTab === 'create'     && <CreatePost />}
        {activeTab === 'detail'     && <PostDetail />}
        {activeTab === 'pagination' && <PaginatedPosts />}
        {activeTab === 'gita'       && <GitaSection />}
        {activeTab === 'coffee'     && <CoffeeSection />}
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;