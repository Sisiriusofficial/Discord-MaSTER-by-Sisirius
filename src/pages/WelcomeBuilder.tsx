import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Eye, Plus, Trash2, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { fetchConfig, saveConfig } from '../api/client';
import { WelcomeConfig, WelcomeSection } from '../types';
import EmbedPreview from '../components/EmbedPreview';

export default function WelcomeBuilder() {
  const { guildId } = useParams<{ guildId: string }>();
  const [config, setConfig] = useState<WelcomeConfig>({
    enabled: false,
    channel_id: '',
    color: '#ff6b35',
    banner_url: '',
    thumbnail: true,
    sections: [],
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (guildId) {
      fetchConfig(guildId).then(data => {
        if (data.welcome) setConfig(data.welcome);
      });
    }
  }, [guildId]);

  const addSection = (type: WelcomeSection['type']) => {
    const newSection: WelcomeSection = {
      id: Date.now().toString(),
      type,
      content: type === 'field'
        ? { name: 'Field Name', value: 'Field Value', inline: false }
        : { text: type === 'title' ? 'Welcome {user}!' : type === 'description' ? 'You are member #{count}!' : 'Footer text' },
    };
    setConfig({ ...config, sections: [...config.sections, newSection] });
  };

  const updateSection = (id: string, updates: Partial<WelcomeSection>) => {
    setConfig({
      ...config,
      sections: config.sections.map(s => s.id === id ? { ...s, ...updates } : s),
    });
  };

  const removeSection = (id: string) => {
    setConfig({ ...config, sections: config.sections.filter(s => s.id !== id) });
  };

  const moveSection = (id: string, direction: -1 | 1) => {
    const index = config.sections.findIndex(s => s.id === id);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= config.sections.length) return;
    const newSections = [...config.sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setConfig({ ...config, sections: newSections });
  };

  const handleSave = async () => {
    if (!guildId) return;
    await saveConfig(guildId, { welcome: config });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const typeColors: Record<string, string> = {
    title: '#3b82f6',
    description: '#8b5cf6',
    field: '#22c55e',
    separator: '#71717a',
    footer: '#f59e0b',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5em' }}>👋 Welcome Builder</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', background: saved ? 'var(--success)' : 'var(--accent)',
              color: 'white', border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 600, fontSize: '0.9em',
            }}
          >
            <Save size={16} />
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Editor */}
        <div>
          {/* Enable Toggle */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '16px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={e => setConfig({ ...config, enabled: e.target.checked })}
              style={{ width: '44px', height: '24px', accentColor: 'var(--accent)' }}
            />
            <span>Enable Welcome Messages</span>
          </div>

          {/* Color */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '16px', marginBottom: '16px',
          }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85em', color: 'var(--text-secondary)' }}>
              Embed Color
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="color"
                value={config.color}
                onChange={e => setConfig({ ...config, color: e.target.value })}
                style={{ width: '40px', height: '40px', border: '2px solid var(--border)', borderRadius: '8px', cursor: 'pointer', background: 'none', padding: '2px' }}
              />
              <input
                type="text"
                value={config.color}
                onChange={e => setConfig({ ...config, color: e.target.value })}
                style={{
                  flex: 1, padding: '10px', background: 'var(--bg-input)',
                  border: '1px solid var(--border)', color: 'var(--text-primary)',
                  borderRadius: '6px', fontSize: '0.9em',
                }}
              />
            </div>
          </div>

          {/* Banner URL */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '16px', marginBottom: '16px',
          }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85em', color: 'var(--text-secondary)' }}>
              Banner Image URL
            </label>
            <input
              type="text"
              value={config.banner_url || ''}
              onChange={e => setConfig({ ...config, banner_url: e.target.value })}
              placeholder="https://example.com/banner.png"
              style={{
                width: '100%', padding: '10px', background: 'var(--bg-input)',
                border: '1px solid var(--border)', color: 'var(--text-primary)',
                borderRadius: '6px', fontSize: '0.9em',
              }}
            />
          </div>

          {/* Sections */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '16px', marginBottom: '16px',
          }}>
            <h3 style={{ marginBottom: '12px', fontSize: '0.9em' }}>Sections</h3>
            
            {config.sections.map((section, index) => (
              <div key={section.id} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px', background: 'var(--bg-input)',
                borderRadius: '6px', marginBottom: '8px',
              }}>
                <span style={{
                  padding: '2px 8px', borderRadius: '4px', fontSize: '0.7em',
                  fontWeight: 600, textTransform: 'uppercase',
                  background: typeColors[section.type], color: 'white',
                }}>
                  {section.type}
                </span>
                
                <input
                  type="text"
                  value={section.content.text || section.content.name || ''}
                  onChange={e => {
                    if (section.type === 'field') {
                      updateSection(section.id, { content: { ...section.content, name: e.target.value } });
                    } else {
                      updateSection(section.id, { content: { text: e.target.value } });
                    }
                  }}
                  style={{
                    flex: 1, padding: '6px 8px', background: 'transparent',
                    border: '1px solid var(--border)', color: 'var(--text-primary)',
                    borderRadius: '4px', fontSize: '0.85em',
                  }}
                  placeholder={section.type === 'field' ? 'Field name' : 'Text...'}
                />
                
                <button onClick={() => moveSection(section.id, -1)} disabled={index === 0}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                  <ArrowUp size={14} />
                </button>
                <button onClick={() => moveSection(section.id, 1)} disabled={index === config.sections.length - 1}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', opacity: index === config.sections.length - 1 ? 0.3 : 1 }}>
                  <ArrowDown size={14} />
                </button>
                <button onClick={() => removeSection(section.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
              {(['title', 'description', 'field', 'separator', 'footer'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  style={{
                    padding: '6px 12px', fontSize: '0.8em',
                    background: typeColors[type], color: 'white',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                    fontWeight: 600, textTransform: 'uppercase',
                  }}
                >
                  + {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '0.9em', color: 'var(--text-secondary)' }}>
            <Eye size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Live Preview
          </h3>
          <EmbedPreview config={config} />
        </div>
      </div>
    </div>
  );
}