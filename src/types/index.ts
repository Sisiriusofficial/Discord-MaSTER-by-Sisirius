export interface Guild {
  id: string;
  name: string;
  icon?: string;
}

export interface WelcomeConfig {
  enabled: boolean;
  channel_id: string;
  color: string;
  banner_url?: string;
  thumbnail: boolean;
  sections: WelcomeSection[];
}

export interface WelcomeSection {
  id: string;
  type: 'title' | 'description' | 'field' | 'separator' | 'footer';
  content: {
    text?: string;
    name?: string;
    value?: string;
    inline?: boolean;
  };
}

export interface AutoModConfig {
  enabled: boolean;
  badwords_enabled: boolean;
  badwords_list: string[];
  antispam_enabled: boolean;
  antispam_threshold: number;
  link_filter_enabled: boolean;
  allowed_links: string[];
  invite_filter_enabled: boolean;
}

export interface ServerConfig {
  welcome: WelcomeConfig;
  automod: AutoModConfig;
  logging: any;
  tickets: any;
  temp_voice: any;
}