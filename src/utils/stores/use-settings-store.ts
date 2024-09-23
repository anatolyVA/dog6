import { create } from "zustand/index";
import {
  defaultSettings,
  getSettings,
  ISettings,
  saveSettings,
  SoundValue,
  updateSetting,
  VideoQualityValue,
  VideoValue,
} from "../settings.ts";

type State = {
  userSettings: ISettings;
};

type Action = {
  saveSettings: (settings: ISettings) => void;
  updateSetting: (
    key: keyof ISettings,
    value: SoundValue | VideoValue | VideoQualityValue,
  ) => void;
};

export const useSettingsStore = create<State & Action>((set) => ({
  userSettings: defaultSettings,
  saveSettings: (settings) => {
    set({ userSettings: settings });
    saveSettings(settings);
  },
  updateSetting: (key, value) => {
    const settings = getSettings();
    settings[key] = value;
    updateSetting(key, value);
    set({ userSettings: settings });
  },
}));
