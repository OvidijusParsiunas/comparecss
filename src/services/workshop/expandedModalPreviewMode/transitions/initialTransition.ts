export interface TransitionAnimation {
  transitionDuration: string;
  transitionProperty: string;
  transitionTimingFunction: string;
}

export default class InitialTransition {
  
  // TO-DO these values will probably need to be placed in a const area as they will be used to set everything back to normal
  private static HIDE_OPACITY_DEFAULT = '0';
  private static BACKGROUND_ELEMENT_DEFAULT_CLASS = 'component-preview-container-default';
  private static BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS = 'component-preview-container-modal';
  private static TOOLBAR_ELEMENT_DEFAULT_CLASS = 'toolbar-container-default';
  private static TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-modal';
  private static TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS = 'toolbar-container-inner-modal';
  private static REVEAL_OPACITY_DEFAULT = '1';
  private static INITIAL_EXPANDED_MODAL_TRANSITION_DURATION_MILLISECONDS = 150;
  private static INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES: TransitionAnimation = {
    transitionDuration: `${InitialTransition.INITIAL_EXPANDED_MODAL_TRANSITION_DURATION_MILLISECONDS / 1000}s`,
    transitionProperty: 'opacity',
    transitionTimingFunction: 'linear',
  };

  private static fadeOutElements(...elements: HTMLElement[]): void {
    const { transitionDuration, transitionProperty, transitionTimingFunction } = InitialTransition.INTIIAL_EXPANDED_MODAL_TRANSITION_VALUES;
    elements.forEach((element) => {
      element.style.transitionDuration = transitionDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = InitialTransition.HIDE_OPACITY_DEFAULT;
    })
  }

  // TO-DO instead of passing down the function, might need to enforce passing of a static function from EntranceTransitions class
  public static startPreview(backgroundElement: HTMLElement, modalElement: HTMLElement, entranceTransition: any): void {
    InitialTransition.fadeOutElements(backgroundElement, modalElement);
    setTimeout(() => {
      backgroundElement.classList.replace(InitialTransition.BACKGROUND_ELEMENT_DEFAULT_CLASS, InitialTransition.BACKGROUND_ELEMENT_ACTIVE_MODE_CLASS);
      entranceTransition(backgroundElement, modalElement);
    }, InitialTransition.INITIAL_EXPANDED_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }

  public static startToolbar(toolbarElement: HTMLElement, innerToolbarElement: HTMLElement): void {
    InitialTransition.fadeOutElements(toolbarElement);
    setTimeout(() => {
      innerToolbarElement.classList.add(InitialTransition.TOOLBAR_CONTAINER_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarElement.classList.replace(InitialTransition.TOOLBAR_ELEMENT_DEFAULT_CLASS, InitialTransition.TOOLBAR_ELEMENT_ACTIVE_MODE_CLASS);
      toolbarElement.style.opacity = InitialTransition.REVEAL_OPACITY_DEFAULT;
    }, InitialTransition.INITIAL_EXPANDED_MODAL_TRANSITION_DURATION_MILLISECONDS);
  }
}
