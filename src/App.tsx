import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationContainer } from './components/ui/NotificationContainer';
import { PWAPrompt, PWABanner, OfflineIndicator, UpdatePrompt } from './components/pwa/PWAPrompt';

// Pages
import { HomeNew } from './pages/HomeNew';
import { Login } from './pages/Login';
import { RegisterSimple } from './pages/RegisterSimple';
import { MBTITestPage } from './pages/MBTITestPage';
import { AstrologyPage } from './pages/AstrologyPage';
import { AIMasterPage } from './pages/AIMasterPage';
import { BloodTypePage } from './pages/BloodTypePage';
import { TarotPage } from './pages/TarotPage';
import { PalmistryPage } from './pages/PalmistryPage';
import { IChingPage } from './pages/IChingPage';
import { MeditationPage } from './pages/MeditationPage';
import { AnalysisCenter } from './pages/AnalysisCenter';
import { ProfileSetup } from './pages/ProfileSetup';
import { ForgotPassword } from './pages/ForgotPassword';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { BaguaKnowledgePage } from './pages/BaguaKnowledgePage';
import { BaguaAIDivinationPage } from './pages/BaguaAIDivinationPage';
import { BaguaResultSharePage } from './pages/BaguaResultSharePage';

import './App.css';

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
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterSimple />} />
          <Route path="/mbti" element={<MBTITestPage />} />
          <Route path="/astrology" element={<AstrologyPage />} />
          <Route path="/tarot" element={<TarotPage />} />
          <Route path="/bloodtype" element={<BloodTypePage />} />
          <Route path="/palmistry" element={<PalmistryPage />} />
          <Route path="/iching" element={<IChingPage />} />
          <Route path="/ai-master" element={<AIMasterPage />} />
          <Route path="/meditation" element={<MeditationPage />} />
          <Route path="/analysis" element={<AnalysisCenter />} />
          <Route path="/test" element={<TestPage title="测试页" color="bg-orange-600" />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/bagua/knowledge" element={<BaguaKnowledgePage />} />
          <Route path="/bagua/ai-divination" element={<BaguaAIDivinationPage />} />
          <Route path="/bagua/result/:resultId" element={<BaguaResultSharePage />} />
        </Routes>
        <NotificationContainer />
        
        {/* PWA 功能组件 */}
        <PWAPrompt />
        <PWABanner />
        <OfflineIndicator />
        <UpdatePrompt />
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;