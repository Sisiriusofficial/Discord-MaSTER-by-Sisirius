import { WelcomeConfig } from '../types';

interface Props {
  config: WelcomeConfig;
}

export default function EmbedPreview({ config }: Props) {
  const color = config.color || '#ff6b35';

  return (
    <div style={{
      background: '#313338',
      borderRadius: '8px',
      maxWidth: '480px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      overflow: 'hidden',
    }}>
      {/* Avatar Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', fontWeight: 600 }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}, #ff8c42)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2em', color: 'white',
        }}>U</div>
        <span>Username</span>
      </div>

      {/* Embed */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{
          background: '#2b2d31',
          borderLeft: `4px solid ${color}`,
          borderRadius: '4px',
          padding: '16px',
          fontSize: '0.9em',
          lineHeight: 1.5,
        }}>
          {config.sections?.map((section, i) => {
            const text = (section.content.text || '')
              .replace('{user}', 'Username')
              .replace('{server}', 'OG Arena')
              .replace('{count}', '144');

            switch (section.type) {
              case 'title':
                return <h3 key={i} style={{ fontSize: '1em', marginBottom: '4px' }}>{text}</h3>;
              case 'description':
                return <p key={i} style={{ color: '#dbdee1' }}>{text}</p>;
              case 'field':
                return (
                  <div key={i} style={{ marginTop: '8px' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{section.content.name}</div>
                    <div style={{ color: '#dbdee1', fontSize: '0.9em' }}>{section.content.value}</div>
                  </div>
                );
              case 'separator':
                return <hr key={i} style={{ border: 'none', borderTop: '1px solid #3f4147', margin: '8px 0' }} />;
              default:
                return null;
            }
          })}
        </div>

        {/* Footer */}
        {config.sections?.some(s => s.type === 'footer') && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 0', fontSize: '0.75em', color: '#949ba4',
          }}>
            <img
              src={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="${color.replace('#', '%23')}"/></svg>`}
              alt=""
              style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            />
            {config.sections.find(s => s.type === 'footer')?.content.text
              ?.replace('{user_id}', '123456789')
              .replace('{time}', '8:23 AM') || 'Footer'}
          </div>
        )}

        {/* Banner */}
        {config.banner_url && (
          <img
            src={config.banner_url}
            alt="banner"
            style={{ width: '100%', borderRadius: '0 0 4px 4px', marginTop: '-1px' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>
    </div>
  );
}