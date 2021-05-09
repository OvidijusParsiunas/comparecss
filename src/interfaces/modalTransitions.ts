import { BackdropProperties } from './workshopComponent';

export type ModalEntranceTransition = (transitionDuration: string, modalElement: HTMLElement,
  unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, componentPreviewContainerElement?: HTMLElement, transitionDelay?: string) => void;

export type ModalExitTransition = (transitionDuration: string, modalElement: HTMLElement,
  exitTransitionCallback: ExitTransitionCallback, componentPreviewContainerElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, modalOverlayElement?: HTMLElement,
  toolbarPositionToggleElement?: HTMLElement, wasPreviousTransitionInterrupted?: boolean) => void;

export type ExitTransitionCallback = (modalElement: HTMLElement, componentPreviewContainerElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, modalOverlayElement?: HTMLElement) => void;
