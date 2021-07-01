export type ToggleFullPreviewModeEvent = [boolean, boolean, () => void, HTMLElement?, HTMLElement?, (() => void)?];

export type SwitchComponentsWithFadeOutCallback = (componentElement: HTMLElement, callback: () => void, temporaryComponentElement?: HTMLElement) => void;

type ToggleFullPreviewModeOffWorkshopComponentCallback = (
  switchComponentsWithFadeOut: SwitchComponentsWithFadeOutCallback,
  componentPreviewHTMLElement: HTMLElement,
) => void;

export interface ToggleFullPreviewModeOffCallbacks {
  toggleFullPreviewModeOptionsCallback: () => void;
  toggleFullPreviewModeOffWorkshopCallback: ToggleFullPreviewModeOffWorkshopComponentCallback;
};
