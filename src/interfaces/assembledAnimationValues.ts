import { EntranceAnimation, ExitAnimation } from './animations';
import { BackdropProperties } from './workshopComponent';

export interface AssembledModalEntranceAnimationValues {
  modalEntranceAnimation: EntranceAnimation;
  animationDuration: string;
  animationDelay: string;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
  componentPreviewContainerElement: HTMLElement;
}

export interface AssembledModalExitAnimationValues {
  modalExitAnimation: ExitAnimation;
  animationDuration: string;
  setOptionToDefaultCallback: () => void;
  componentPreviewContainerElement: HTMLElement;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement
}
