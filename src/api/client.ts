const API_BASE = 'http://localhost:5000/api';

export async function fetchGuilds(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/guilds`);
  return res.json();
}

export async function fetchConfig(guildId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/config/${guildId}`);
  return res.json();
}

export async function saveConfig(guildId: string, config: any): Promise<void> {
  await fetch(`${API_BASE}/config/${guildId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
}