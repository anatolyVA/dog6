export type SoundValue = "on" | "off";
export type VideoValue = "on" | "off";
export type VideoQualityValue = "auto" | "high" | "low";

export interface ISettings {
  sound: SoundValue;
  video: VideoValue;
  videoQuality: VideoQualityValue;
}

export const defaultSettings: ISettings = {
  sound: "on",
  video: "off",
  videoQuality: "auto",
};

export function saveSettings(settings: ISettings) {
  localStorage.setItem("userSettings", JSON.stringify(settings));
}

export function getSettings() {
  const settings = localStorage.getItem("userSettings");
  return settings ? JSON.parse(settings) : defaultSettings;
}

export function updateSetting(
  key: keyof ISettings,
  value: SoundValue | VideoValue | VideoQualityValue,
) {
  const settings = getSettings();
  settings[key] = value;
  saveSettings(settings);
}
