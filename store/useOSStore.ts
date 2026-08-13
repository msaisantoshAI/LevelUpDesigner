import { create } from 'zustand';
import { OSMode, ThemeTokens, WINDOWS_THEME, MAC_THEME } from '../data/themeTokens';

export interface WindowState {
  id: string;
  title: string;
  iconType: 'folder' | 'text' | 'app' | 'pdf' | 'trash' | 'terminal' | 'mail' | 'case' | 'art' | 'browser' | 'settings';
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  data?: any;
}

export type ViewMode = 'desktop' | 'linear';

interface OSStore {
  osMode: OSMode;
  viewMode: ViewMode;
  mobileViewMode: 'springboard' | 'linear';
  isLocked: boolean;
  isBooting: boolean;
  wallpaper: string;
  motionMode: 'full' | 'reduced';
  windows: Record<string, WindowState>;
  highestZIndex: number;
  activeWindowId: string | null;
  soundEnabled: boolean;
  startMenuOpen: boolean;
  spotlightOpen: boolean;
  contextMenu: { x: number; y: number; iconId: string | null } | null;
  selectedDesktopIcon: string | null;

  // Actions
  setOSMode: (mode: OSMode) => void;
  toggleOSMode: () => void;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setLocked: (locked: boolean) => void;
  setBooting: (booting: boolean) => void;
  setWallpaper: (wp: string) => void;
  setMotionMode: (mode: 'full' | 'reduced') => void;
  openWindow: (id: string, customData?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
  toggleSound: () => void;
  setStartMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setSpotlightOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setContextMenu: (menu: { x: number; y: number; iconId: string | null } | null) => void;
  setSelectedDesktopIcon: (iconId: string | null) => void;
  getThemeTokens: () => ThemeTokens;
}

const DEFAULT_WINDOWS: Record<string, WindowState> = {
  about: {
    id: 'about',
    title: 'About Sai.app',
    iconType: 'text',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 90, y: 55 },
    size: { width: 780, height: 560 },
    zIndex: 20,
  },
  'case-studies': {
    id: 'case-studies',
    title: 'My Work — Finder',
    iconType: 'folder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 70 },
    size: { width: 840, height: 580 },
    zIndex: 10,
  },
  experiments: {
    id: 'experiments',
    title: 'Experiments & Prototypes.app',
    iconType: 'app',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 160, y: 85 },
    size: { width: 860, height: 590 },
    zIndex: 12,
  },
  'side-quests': {
    id: 'side-quests',
    title: 'SideQuests.app — Life & Adventures',
    iconType: 'app',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 95 },
    size: { width: 880, height: 600 },
    zIndex: 13,
  },
  art: {
    id: 'art',
    title: 'Art & Visuals.app — Gallery',
    iconType: 'art',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 80 },
    size: { width: 900, height: 620 },
    zIndex: 14,
  },
  resume: {
    id: 'resume',
    title: 'Sai_Santosh_Resume.pdf',
    iconType: 'pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 75 },
    size: { width: 840, height: 630 },
    zIndex: 15,
  },
  readme: {
    id: 'readme',
    title: 'Read Me.txt — Personal Note',
    iconType: 'text',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 110 },
    size: { width: 620, height: 460 },
    zIndex: 16,
  },
  contact: {
    id: 'contact',
    title: 'Contact Sai — Mail.app',
    iconType: 'mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 90 },
    size: { width: 760, height: 540 },
    zIndex: 17,
  },
  browser: {
    id: 'browser',
    title: 'Safari — Web & Portfolio Links',
    iconType: 'browser',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 65 },
    size: { width: 920, height: 610 },
    zIndex: 18,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — sai@macbook-pro',
    iconType: 'terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 270, y: 130 },
    size: { width: 680, height: 440 },
    zIndex: 19,
  },
  trash: {
    id: 'trash',
    title: 'Trash — Discarded Notes & Ideas',
    iconType: 'trash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 140 },
    size: { width: 660, height: 440 },
    zIndex: 11,
  },
  'about-mac': {
    id: 'about-mac',
    title: 'About This Mac',
    iconType: 'settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 340, y: 120 },
    size: { width: 520, height: 420 },
    zIndex: 25,
  },
  'control-center': {
    id: 'control-center',
    title: 'System Preferences & Settings',
    iconType: 'settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 280, y: 100 },
    size: { width: 720, height: 520 },
    zIndex: 24,
  },
  'case-ultimatix': {
    id: 'case-ultimatix',
    title: 'Ultimatix (TX Team) — Case Study',
    iconType: 'case',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 70 },
    size: { width: 880, height: 640 },
    zIndex: 21,
    data: { caseId: 'enterprise-search' },
  },
  'case-service': {
    id: 'case-service',
    title: 'Tech SW Service - Next Gen — Case Study',
    iconType: 'case',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 160, y: 90 },
    size: { width: 880, height: 640 },
    zIndex: 22,
    data: { caseId: 'service-portal' },
  },
  'case-ai': {
    id: 'case-ai',
    title: 'AI-Native UX Design System — Case Study',
    iconType: 'case',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 110 },
    size: { width: 880, height: 640 },
    zIndex: 23,
    data: { caseId: 'ai-workflow' },
  },
};

export const useOSStore = create<OSStore>((set, get) => ({
  osMode: 'mac',
  viewMode: 'desktop',
  mobileViewMode: 'springboard',
  isLocked: false,
  isBooting: true,
  wallpaper: '/wallpapers/macos.png',
  motionMode: 'full',
  windows: DEFAULT_WINDOWS,
  highestZIndex: 30,
  activeWindowId: 'about',
  soundEnabled: true,
  startMenuOpen: false,
  spotlightOpen: false,
  contextMenu: null,
  selectedDesktopIcon: null,

  setOSMode: (mode) => set({ osMode: mode }),
  toggleOSMode: () => set((state) => ({ osMode: state.osMode === 'windows' ? 'mac' : 'windows' })),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'desktop' ? 'linear' : 'desktop' })),
  setLocked: (locked) => set({ isLocked: locked }),
  setBooting: (booting) => set({ isBooting: booting }),
  setWallpaper: (wp) => set({ wallpaper: wp }),
  setMotionMode: (mode) => set({ motionMode: mode }),

  openWindow: (id, customData) =>
    set((state) => {
      const existing = state.windows[id];
      const newZIndex = state.highestZIndex + 1;

      if (!existing) {
        return state;
      }

      return {
        highestZIndex: newZIndex,
        activeWindowId: id,
        startMenuOpen: false,
        spotlightOpen: false,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isOpen: true,
            isMinimized: false,
            zIndex: newZIndex,
            data: customData ? { ...existing.data, ...customData } : existing.data,
          },
        },
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;

      const remainingOpen = Object.values(state.windows).filter((w) => w.id !== id && w.isOpen && !w.isMinimized);
      const nextActive = remainingOpen.length > 0 ? remainingOpen.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remainingOpen[0]).id : null;

      return {
        activeWindowId: nextActive,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
          },
        },
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;

      const remainingOpen = Object.values(state.windows).filter((w) => w.id !== id && w.isOpen && !w.isMinimized);
      const nextActive = remainingOpen.length > 0 ? remainingOpen.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), remainingOpen[0]).id : null;

      return {
        activeWindowId: nextActive,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isMinimized: true,
          },
        },
      };
    }),

  maximizeWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isMaximized: !existing.isMaximized,
          },
        },
      };
    }),

  restoreWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;
      const newZIndex = state.highestZIndex + 1;

      return {
        highestZIndex: newZIndex,
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isOpen: true,
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing || state.activeWindowId === id) return state;

      const newZIndex = state.highestZIndex + 1;

      return {
        highestZIndex: newZIndex,
        activeWindowId: id,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
      };
    }),

  updatePosition: (id, x, y) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            position: { x, y },
          },
        },
      };
    }),

  updateSize: (id, width, height) =>
    set((state) => {
      const existing = state.windows[id];
      if (!existing) return state;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            size: { width, height },
          },
        },
      };
    }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  setStartMenuOpen: (open) =>
    set((state) => ({
      startMenuOpen: typeof open === 'function' ? open(state.startMenuOpen) : open,
      spotlightOpen: false,
    })),

  setSpotlightOpen: (open) =>
    set((state) => ({
      spotlightOpen: typeof open === 'function' ? open(state.spotlightOpen) : open,
      startMenuOpen: false,
    })),

  setContextMenu: (menu) => set({ contextMenu: menu }),
  setSelectedDesktopIcon: (iconId) => set({ selectedDesktopIcon: iconId }),
  getThemeTokens: () => (get().osMode === 'windows' ? WINDOWS_THEME : MAC_THEME),
}));
