import { BackdropProperties } from './workshopComponent';

export type ModalEntranceTransition = (transitionDuration: string, modalElement: HTMLElement,
  unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backgroundElement?: HTMLElement) => void;

export type ModalExitTransition = (transitionDuration: string, modalElement: HTMLElement,
  exitTransitionCallback: ExitTransitionCallback, backgroundElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, modalOverlayElement?: HTMLElement,
  toolbarPositionToggleElement?: HTMLElement, wasPreviousTransitionInterrupted?: boolean) => void;

export type ExitTransitionCallback = (modalElement: HTMLElement, backgroundElement?: HTMLElement, backdropProperties?: BackdropProperties,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement, modalOverlayElement?: HTMLElement) => void;
