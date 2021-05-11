import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { STATIC_POSITION_CLASS } from '../../../../../../../consts/sharedClasses';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import {
  POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE, CLASSLIST_METHODS,
  INITIAL_EXPANDED_MODAL_ANIMATION_PROPERTIES, UNSET,
} from '../consts/sharedConsts';

export default class GeneralUtils {

  public static secondsStringToMillisecondsNumber(seconds: string): number {
    return Number.parseFloat(seconds) * 1000;
  }

  public static unsetAnimationProperties(...elements: HTMLElement[]): void {
    elements.forEach((element) => {
      if (!element) return;
      element.style.transitionDuration = UNSET;
      element.style.transitionProperty = UNSET;
      element.style.transitionTimingFunction = UNSET;
    });
  }

  public static opacityFadeAnimation(opacity: string, animationDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = INITIAL_EXPANDED_MODAL_ANIMATION_PROPERTIES;
    elements.forEach((element) => {
      element.style.transitionDuration = animationDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = opacity;
    });
  }

  public static toggleModalStaticPosition(modalElement: HTMLElement, modalOverlayElement: HTMLElement, toggleName: CLASSLIST_METHODS): void {
    modalElement.classList[toggleName](STATIC_POSITION_CLASS);
    modalOverlayElement.classList[toggleName](STATIC_POSITION_CLASS);
  }

  public static getNewAnimationDuration(): string {
    return `${expandedModalPreviewModeState.getElapsedAnimationTime() / 1000}s`;
  }

  public static setModalPropertiesBackToDefault(modalElement: HTMLElement): void {
    const defaultModalProperties = expandedModalPreviewModeState.setIsPreviewAnimationInProgressState();
    GeneralUtils.setModalProperties(modalElement, defaultModalProperties);
  }

  public static startModalAndBackdropAnimationWithFadeOut(modalElement: HTMLElement): void {
    expandedModalPreviewModeState.cancelPendingModalAnimationFunctionality();
    expandedModalPreviewModeState.cancelPendingToolbarAnimationFunctionality();
    GeneralUtils.setModalPropertiesBackToDefault(modalElement);
  }

  public static setModalProperties(modalElement: HTMLElement, modalProperties: ElementStyleProperties): void {
    Object.keys(modalProperties).forEach((propertyKey: string) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  public static setToolbarContainerPointerEvents(toolbarContainerElement: HTMLElement, pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE): void {
    toolbarContainerElement.style.pointerEvents = pointerEvents;
  }
}
