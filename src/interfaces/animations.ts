import { GENERAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_CLOSE_TYPES, MODAL_ANIMATION_OPEN_TYPES } from '../consts/animationTypes.enum';
import { BackdropProperties } from './workshopComponent';

export type OpenAnimation = (animationDuration: string, componentElement: HTMLElement,
  unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement, animationDelay?: string) => void;

export type CloseAnimation = (animationDuration: string, componentElement: HTMLElement, closeAnimationCallback: CloseAnimationCallback,
  componentContainerElement?: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
  innerToolbarElement?: HTMLElement, componentOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement,
  wasPreviousAnimationInterrupted?: boolean) => void;

export type CloseAnimationCallback = (componentElement: HTMLElement, componentContainerElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, componentOverlayElement?: HTMLElement) => void;

interface DisplayAnimations {
  open?: {
    type: MODAL_ANIMATION_OPEN_TYPES;
    duration: string;
    delay: string;
  };
  close: {
    type: MODAL_ANIMATION_CLOSE_TYPES | GENERAL_ANIMATION_CLOSE_TYPES;
    duration: string;
  };
}

interface StationaryAnimations {
  fade?: {
    duration: string;
  }
}

export interface Animations {
  display?: DisplayAnimations;
  stationary?: StationaryAnimations;
}
