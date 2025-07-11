import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationContainer } from './components/ui/NotificationContainer';
import { useThemeStore } from './stores/useThemeStore';

// Pages
import { HomeNew } from './pages/HomeNew';
import { Login } from './pages/Login';
import { RegisterSimple } from './pages/RegisterSimple';
import { MBTITestPage } from './pages/MBTITestPage';
import { AstrologyPage } from './pages/AstrologyPage';
import { ProfileSetup } from './pages/ProfileSetup';
import { ForgotPassword } from './pages/ForgotPassword';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterSimple />} />
          <Route path="/mbti" element={<MBTITestPage />} />
          <Route path="/astrology" element={<AstrologyPage />} />
          <Route path="/tarot" element={<TestPage title="塔罗牌" color="bg-purple-600" />} />
          <Route path="/bloodtype" element={<TestPage title="血型分析" color="bg-blue-600" />} />
          <Route path="/palmistry" element={<TestPage title="手相分析" color="bg-green-600" />} />
          <Route path="/iching" element={<TestPage title="易经" color="bg-red-600" />} />
          <Route path="/ai-master" element={<TestPage title="AI大师" color="bg-orange-600" />} />
          <Route path="/meditation" element={<TestPage title="冥想" color="bg-indigo-600" />} />
          <Route path="/test" element={<TestPage title="测试页" color="bg-orange-600" />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;