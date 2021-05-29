import { BackdropProperties } from './workshopComponent';

export type EntranceAnimation = (animationDuration: string, modalElement: HTMLElement,
  unsetAnimationPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement, animationDelay?: string) => void;

export type ExitAnimation = (animationDuration: string, modalElement: HTMLElement, exitAnimationCallback: ExitAnimationCallback,
  componentPreviewContainerElement?: HTMLElement, backdropProperties?: BackdropProperties, toolbarElement?: HTMLElement,
  innerToolbarElement?: HTMLElement, modalOverlayElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement,
  wasPreviousAnimationInterrupted?: boolean) => void;

export type ExitAnimationCallback = (modalElement: HTMLElement, componentPreviewContainerElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, modalOverlayElement?: HTMLElement) => void;
