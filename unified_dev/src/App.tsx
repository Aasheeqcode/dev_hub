import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ProfilePage } from './pages/ProfilePage';
import MeetPage from './pages/MeetPage';
import  ContestPage  from './pages/ContestPage';
import { DevStudioPage } from './pages/DevStudioPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { PracticePage } from './pages/PracticePage';
import { ForumPage } from './pages/ForumPage';
import { MessagingPage } from './pages/MessagingPage';
import { UserProfilePage } from './pages/UserProfilePage';
import AuthPage from './pages/AuthPage';
import { SavedPage } from './pages/SavedPage';
export function App() {
  return <Router>
      <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-neon-violet selection:text-white">
        <Navbar />
        <Routes>
           <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/meet" element={<MeetPage />} />
          <Route path="/contests" element={<ContestPage />} />
          <Route path="/studio" element={<DevStudioPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </div>
    </Router>;
}