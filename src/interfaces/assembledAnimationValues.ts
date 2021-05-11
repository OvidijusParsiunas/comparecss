import { ModalEntranceAnimation, ModalExitAnimation } from './modalAnimations';
import { BackdropProperties } from './workshopComponent';

export interface AssembledModalEntranceAnimationValues {
  modalEntranceAnimation: ModalEntranceAnimation;
  animationDuration: string;
  animationDelay: string;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement;
  componentPreviewContainerElement: HTMLElement;
}

export interface AssembledModalExitAnimationValues {
  modalExitAnimation: ModalExitAnimation;
  animationDuration: string;
  setOptionToDefaultCallback: () => void;
  componentPreviewContainerElement: HTMLElement;
  backdropProperties: BackdropProperties;
  modalElement: HTMLElement;
  modalOverlayElement: HTMLElement
}
