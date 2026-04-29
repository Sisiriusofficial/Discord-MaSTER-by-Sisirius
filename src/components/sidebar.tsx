import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Shield, ScrollText, Ticket, Mic, Settings } from 'lucide-react';

const navItems = [
  { path: 'welcome', label: 'Welcome', icon: Home },
  { path: 'automod', label: 'Auto-Mod', icon: Shield },
  { path: 'logging', label: 'Logging', icon: ScrollText },
  { path: 'tickets', label: 'Tickets', icon: Ticket },
  { path: 'temp-voice', label: 'Temp VC', icon: Mic },
];

interface Props {
  guildId: string;
}

export default function Sidebar({ guildId }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'var(--accent)', fontSize: '1.3em', fontWeight: 700 }}>🏆 OG Arena</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8em', marginTop: '4px' }}>Dashboard</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const fullPath = `/dashboard/${guildId}/${path}`;
          const isActive = location.pathname === fullPath;
          
          return (
            <button
              key={path}
              onClick={() => navigate(fullPath)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9em',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s',
                textAlign: 'left',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-card)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      <div style={{
        padding: '12px',
        background: 'var(--bg-card)',
        borderRadius: '8px',
        fontSize: '0.8em',
        color: 'var(--text-secondary)',
      }}>
        <p>Server ID:</p>
        <p style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{guildId}</p>
      </div>
    </aside>
  );
}