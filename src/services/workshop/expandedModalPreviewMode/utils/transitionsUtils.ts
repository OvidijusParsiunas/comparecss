import { INITIAL_EXPANDED_MODAL_TRANSITION_VALUES, OPACITY_VISIBLE, UNSET } from './sharedConsts';
import { ElementStyleProperties } from '../../../../interfaces/elementStyleProperties';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';

export default class TransitionsUtils {

  public static secondsStringToMillisecondsNumber(seconds: string): number {
    return Number.parseFloat(seconds) * 1000;
  }

  public static unsetTransitionProperties(...elements: HTMLElement[]): void {
    elements.forEach((element) => {
      if (!element) return;
      element.style.transitionDuration = UNSET;
      element.style.transitionProperty = UNSET;
      element.style.transitionTimingFunction = UNSET;
    });
  }

  public static opacityFadeTransition(opacity: string, transitionDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = INITIAL_EXPANDED_MODAL_TRANSITION_VALUES;
    elements.forEach((element) => {
      element.style.transitionDuration = transitionDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = opacity;
    });
  }

  public static toggleModalStaticPosition(modalElement: HTMLElement, toggleName: 'add' | 'remove'): void {
    modalElement.classList[toggleName](STATIC_POSITION_CLASS);
  }

  public static getNewTransitionDuration(): string {
    return `${expandedModalPreviewModeState.getElapsedAnimationTime() / 1000}s`;
  }

  private static setModalProperties(modalElement: HTMLElement, modalProperties: ElementStyleProperties) {
    Object.keys(modalProperties).forEach((propertyKey: string) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  private static setModalPropertiesBackToDefault(element: HTMLElement): void {
    const defaultModalProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    TransitionsUtils.setModalProperties(element, defaultModalProperties);
  }
  
  public static cancelModalTransitionPreview(modalElement: HTMLElement): void {
    if (expandedModalPreviewModeState.getIsTransitionPreviewInProgressState()) {
      TransitionsUtils.setModalPropertiesBackToDefault(modalElement);
      TransitionsUtils.unsetTransitionProperties(modalElement);
      expandedModalPreviewModeState.removePendingExitTransitions();
      expandedModalPreviewModeState.setIsPreviewTransitionInProgressState(false);
      modalElement.style.opacity = OPACITY_VISIBLE;
    }
  }
}
