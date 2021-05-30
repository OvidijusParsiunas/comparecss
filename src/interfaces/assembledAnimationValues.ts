import { EntranceAnimation, ExitAnimation } from './animations';
import { BackdropProperties } from './workshopComponent';

export interface AssembledModalEntranceAnimationValues {
  modalEntranceAnimation: EntranceAnimation;
  animationDuration: string;
  animationDelay: string;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
  modalContainerElement: HTMLElement;
}

export interface AssembledModalExitAnimationValues {
  modalExitAnimation: ExitAnimation;
  animationDuration: string;
  setOptionToDefaultCallback: () => void;
  modalContainerElement: HTMLElement;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
}
