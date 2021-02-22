export type ModalEntranceTransition = (transitionDuration: string, modalElement: HTMLElement,
  unsetTransitionPropertiesCallback: (...params: HTMLElement[]) => void, backgroundElement?: HTMLElement) => void;

export type ModalExitTransition = (transitionDuration: string, modalElement: HTMLElement, exitCallback: ExitCallback, backgroundElement?: HTMLElement,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;

export type ExitCallback = (modalElement: HTMLElement, backgroundElement?: HTMLElement,
  toolbarElement?: HTMLElement, innerToolbarElement?: HTMLElement, toolbarPositionToggleElement?: HTMLElement) => void;
