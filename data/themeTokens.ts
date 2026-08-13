export type OSMode = 'windows' | 'mac';

export interface ThemeTokens {
  fontFamily: string;
  codeFontFamily: string;
  wallpaperOverlay: string;
  windowChrome: {
    bg: string;
    border: string;
    shadow: string;
    headerBg: string;
    headerBorder: string;
    textColor: string;
    textSubtle: string;
    radius: string;
    controlsPosition: 'left' | 'right';
  };
  taskbar: {
    bg: string;
    border: string;
    height: string;
    position: 'bottom-full' | 'bottom-floating';
    radius: string;
  };
  card: {
    bg: string;
    border: string;
    shadow: string;
    radius: string;
  };
  accentColor: string;
  accentGradient: string;
  motionEasing: string;
  motionDuration: number;
}

export const WINDOWS_THEME: ThemeTokens = {
  fontFamily: '"Segoe UI Variable", "Segoe UI", system-ui, -apple-system, sans-serif',
  codeFontFamily: 'Consolas, "Cascadia Code", "Courier New", monospace',
  wallpaperOverlay: 'radial-gradient(circle at 50% 30%, rgba(0, 120, 212, 0.15), rgba(15, 23, 42, 0.85))',
  windowChrome: {
    bg: 'rgba(32, 32, 32, 0.88)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    shadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
    headerBg: 'rgba(25, 25, 25, 0.95)',
    headerBorder: '1px solid rgba(255, 255, 255, 0.08)',
    textColor: '#ffffff',
    textSubtle: '#9e9e9e',
    radius: '8px',
    controlsPosition: 'right',
  },
  taskbar: {
    bg: 'rgba(32, 32, 32, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    height: '48px',
    position: 'bottom-full',
    radius: '0px',
  },
  card: {
    bg: 'rgba(45, 45, 45, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    shadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    radius: '8px',
  },
  accentColor: '#0078d4',
  accentGradient: 'linear-gradient(135deg, #0078d4 0%, #00bcd4 100%)',
  motionEasing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
  motionDuration: 0.2,
};

export const MAC_THEME: ThemeTokens = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
  codeFontFamily: '"SF Mono", Monaco, Menlo, monospace',
  wallpaperOverlay: 'radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.18), rgba(15, 23, 42, 0.9))',
  windowChrome: {
    bg: 'rgba(30, 30, 35, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    headerBg: 'rgba(38, 38, 45, 0.75)',
    headerBorder: '1px solid rgba(255, 255, 255, 0.1)',
    textColor: '#ffffff',
    textSubtle: '#a1a1aa',
    radius: '14px',
    controlsPosition: 'left',
  },
  taskbar: {
    bg: 'rgba(255, 255, 255, 0.18)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    height: '64px',
    position: 'bottom-floating',
    radius: '20px',
  },
  card: {
    bg: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    radius: '16px',
  },
  accentColor: '#007aff',
  accentGradient: 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)',
  motionEasing: 'cubic-bezier(0.32, 0.72, 0, 1)',
  motionDuration: 0.35,
};
