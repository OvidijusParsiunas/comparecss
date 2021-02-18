export type ModalEntranceTransition = (modalElement: HTMLElement, unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void,
  backgroundElement?: HTMLElement) => void;

export type ModalExitTransition = (backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarElement: HTMLElement,
  innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement, exitCallback: ExitCallback) => void;

export type ExitCallback = (backgroundElement: HTMLElement, modalElement: HTMLElement,
  toolbarElement: HTMLElement, innerToolbarElement: HTMLElement, toolbarPositionToggleElement: HTMLElement) => void;
