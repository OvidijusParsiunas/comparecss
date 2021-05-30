import { OpenAnimation, CloseAnimation } from './animations';
import { BackdropProperties } from './workshopComponent';

export interface AssembledModalOpenAnimationValues {
  modalOpenAnimation: OpenAnimation;
  animationDuration: string;
  animationDelay: string;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
  modalContainerElement: HTMLElement;
}

export interface AssembledModalCloseAnimationValues {
  modalCloseAnimation: CloseAnimation;
  animationDuration: string;
  setOptionToDefaultCallback: () => void;
  modalContainerElement: HTMLElement;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
}
