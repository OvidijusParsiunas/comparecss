import { BackdropProperties } from './workshopComponent';

export type OpenAnimation = (animationDuration: string, componentElement: HTMLElement,
  unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentContainerElement?: HTMLElement, animationDelay?: string) => void;

export type CloseAnimation = (animationDuration: string, componentElement: HTMLElement, closeAnimationCallback: CloseAnimationCallback,
  componentContainerElement?: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
  innerToolbarElement?: HTMLElement, componentOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement,
  wasPreviousAnimationInterrupted?: boolean) => void;

export type CloseAnimationCallback = (componentElement: HTMLElement, componentContainerElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, componentOverlayElement?: HTMLElement) => void;
