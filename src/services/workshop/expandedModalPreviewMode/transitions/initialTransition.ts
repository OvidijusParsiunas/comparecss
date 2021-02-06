import ExpandedModalPreviewMode from '../expandedModalPreviewMode';

export default class InitialTransition {
  
  private static HIDE_OPACITY_DEFAULT = '0';

  // TO-DO instead of passing down the function, might need to enforce passing of a static function from ExpandedModalPreviewMode class
  public static start(backgroundElement: HTMLElement, modalElement: HTMLElement, entranceTransition: any): void {
    backgroundElement.style.opacity = InitialTransition.HIDE_OPACITY_DEFAULT;
    modalElement.style.opacity = InitialTransition.HIDE_OPACITY_DEFAULT;
    setTimeout(() => {
      backgroundElement.classList.replace('component-preview-container-default', 'component-preview-container-modal');
      entranceTransition(backgroundElement, modalElement);
    }, ExpandedModalPreviewMode.expandedModalInitialFadeOutAnimationDurationMilliseconds);
  }
}
