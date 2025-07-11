import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { useThemeStore } from './stores/useThemeStore';
// // import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeNew } from './pages/HomeNew';
import { TarotPage } from './pages/TarotPage';
import { BloodTypePage } from './pages/BloodTypePage';
import { PalmistryPage } from './pages/PalmistryPage';
import { IChingPage } from './pages/IChingPage';
import { AIMasterPage } from './pages/AIMasterPage';
import { MeditationPage } from './pages/MeditationPage';
// import { Login } from './pages/Login';
// import { AstrologyPage } from './pages/AstrologyPage';
import { RegisterSimple } from './pages/RegisterSimple';
// import { ForgotPassword } from './pages/ForgotPassword';
// import { PrivacyPolicy } from './pages/PrivacyPolicy';
// import { TermsOfService } from './pages/TermsOfService';
// import { ProfileSetup } from './pages/ProfileSetup';
// import { NotificationContainer } from './components/ui/NotificationContainer';

// 最简测试组件
const TestPage = ({ title, color }: { title: string; color: string }) => {
  return (
    <div className={`min-h-screen ${color} p-8`}>
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="text-lg text-white/80 mt-4">页面正常加载</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/login" element={<TestPage title="登录页" color="bg-green-600" />} />
          <Route path="/register" element={<RegisterSimple />} />
          <Route path="/mbti" element={<TestPage title="MBTI测试" color="bg-purple-600" />} />
          <Route path="/astrology" element={<TestPage title="星座分析" color="bg-pink-600" />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/bloodtype" element={<BloodTypePage />} />
          <Route path="/palmistry" element={<PalmistryPage />} />
          <Route path="/iching" element={<IChingPage />} />
          <Route path="/ai-master" element={<AIMasterPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/test" element={<TestPage title="测试页" color="bg-orange-600" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;