import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './contexts/ThemeContext';
import TopBar from './components/TopBar';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';
import PujaGuide from './components/PujaGuide';
import LiveStreams from './components/LiveStreams';
import PujaPics from './components/PujaPics';
import UnifiedMusicPlayer from './components/UnifiedMusicPlayer';
import AddYouTubeModal from './components/AddYouTubeModal';
import AudioUpload from './components/AudioUpload';
import UpcomingEventsDialog from './components/UpcomingEventsDialog';
import { Toaster } from './components/ui/toaster';
import { featuredSongs } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAudioUpload, setShowAudioUpload] = useState(false);
  const [songs, setSongs] = useState(featuredSongs.map(song => ({...song, type: 'youtube'})));

  const handleAddSong = (newSong) => {
    setSongs([newSong, ...songs]);
  };

  const handleAddAudio = (newSong) => {
    setSongs([newSong, ...songs]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />;
      case 'search':
        return <SearchPage songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />;
      case 'library':
      case 'liked':
      case 'downloads':
        return <LibraryPage setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} onAddYouTube={() => setShowAddModal(true)} onUploadAudio={() => setShowAudioUpload(true)} />;
      case 'puja-guide':
        return <PujaGuide />;
      case 'live-streams':
        return <LiveStreams />;
      case 'puja-pics':
        return <PujaPics />;
      default:
        return <HomePage songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="App h-screen flex flex-col relative overflow-hidden">
      {/* Temple background image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 transition-all duration-500" style={{
          backgroundImage: `url('/images/${activeTab === 'home' ? 'temple1' : 'temple2'}.jpg')`,
          backgroundPosition: activeTab === 'home' ? 'center 30%' : 'center',
          backgroundSize: activeTab === 'home' ? '100% auto' : 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(1.1) contrast(1.1) saturate(1.05)',
          transformOrigin: 'center',
          transform: activeTab === 'home' ? 'scale(1.05)' : 'scale(1)',
        }}></div>
        {/* Light/Dark mode overlays */}
        <div className="absolute inset-0 transition-opacity duration-500 dark:opacity-80 opacity-0" style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.85))'
        }}></div>
        {/* Light mode overlays */}
        <div className="absolute inset-0 transition-opacity duration-500 dark:opacity-0 opacity-100">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(circle at center, 
                rgba(255, 255, 255, 0.1) 0%,
                transparent 40%,
                rgba(0, 0, 0, 0.1) 100%
              )
            `
          }}></div>
          <div className="absolute inset-0" style={{
            background: `linear-gradient(135deg, 
              rgba(255, 248, 240, 0.15) 0%, 
              rgba(255, 237, 213, 0.15) 50%, 
              rgba(251, 191, 36, 0.05) 100%)`
          }}></div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative z-30">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <TopBar setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} />
          {renderContent()}
        </div>
      </div>
      <UnifiedMusicPlayer 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
      />
      <AddYouTubeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddSong={handleAddSong}
      />
      <AudioUpload
        isOpen={showAudioUpload}
        onClose={() => setShowAudioUpload(false)}
        onAddSong={handleAddAudio}
      />
      <UpcomingEventsDialog />
      <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;