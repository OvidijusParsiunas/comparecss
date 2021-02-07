export type ExitPreviewCallback = (backgroundElement: HTMLElement, modalElement: HTMLElement,
  toolbarElement: HTMLElement, innerToolbarElement: HTMLElement) => void;

export interface ModalTransitions {
  initiate: (backgroundElement: HTMLElement, modalElement: HTMLElement) => void; 
  exit: (backgroundElement: HTMLElement, modalElement: HTMLElement, toolbarElement: HTMLElement,
    innerToolbarElement: HTMLElement, exitPreviewCallback: ExitPreviewCallback) => void; 
}
