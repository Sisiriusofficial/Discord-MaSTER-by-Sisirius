import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WelcomeBuilder from './pages/WelcomeBuilder';
import AutoMod from './pages/AutoMod';
import Logging from './pages/Logging';
import Tickets from './pages/Tickets';
import TempVoice from './pages/TempVoice';

export default function App() {
  // For now, hardcode a guild ID - later add auth
  const GUILD_ID = '1015152179230801940';

  return (
    <>
      <Sidebar guildId={GUILD_ID} />
      <main style={{ flex: 1, overflow: 'auto', padding: '30px' }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/dashboard/${GUILD_ID}/welcome`} />} />
          <Route path="/dashboard/:guildId/welcome" element={<WelcomeBuilder />} />
          <Route path="/dashboard/:guildId/automod" element={<AutoMod />} />
          <Route path="/dashboard/:guildId/logging" element={<Logging />} />
          <Route path="/dashboard/:guildId/tickets" element={<Tickets />} />
          <Route path="/dashboard/:guildId/temp-voice" element={<TempVoice />} />
        </Routes>
      </main>
    </>
  );
}