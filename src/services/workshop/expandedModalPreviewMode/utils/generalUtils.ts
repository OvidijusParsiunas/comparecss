import {
  INITIAL_EXPANDED_MODAL_TRANSITION_VALUES, UNSET, ADD_CLASS,
  REMOVE_CLASS, POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE,
} from './sharedConsts';
import { ElementStyleProperties } from '../../../../interfaces/elementStyleProperties';
import { expandedModalPreviewModeState } from '../expandedModalPreviewModeState';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';

export default class GeneralUtils {

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

  public static toggleModalStaticPosition(modalElement: HTMLElement, modalOverlayElement: HTMLElement, toggleName: typeof ADD_CLASS | typeof REMOVE_CLASS): void {
    modalElement.classList[toggleName](STATIC_POSITION_CLASS);
    modalOverlayElement.classList[toggleName](STATIC_POSITION_CLASS);
  }

  public static getNewTransitionDuration(): string {
    return `${expandedModalPreviewModeState.getElapsedTransitionTime() / 1000}s`;
  }

  public static setModalPropertiesBackToDefault(modalElement: HTMLElement): void {
    const defaultModalProperties = expandedModalPreviewModeState.getCurrentExitTransitionModalDefaultPropertiesState();
    GeneralUtils.setModalProperties(modalElement, defaultModalProperties);
  }

  public static cancelAllPendingTransitionFunctionality(modalElement: HTMLElement): void {
    expandedModalPreviewModeState.cancelPendingModalTransitionFunctionality();
    expandedModalPreviewModeState.cancelPendingToolbarTransitionFunctionality();
    GeneralUtils.setModalPropertiesBackToDefault(modalElement);
  }

  public static setModalProperties(modalElement: HTMLElement, modalProperties: ElementStyleProperties) {
    Object.keys(modalProperties).forEach((propertyKey: string) => {
      modalElement.style[propertyKey] = modalProperties[propertyKey];
    });
  }

  public static setToolbarContainerPointerEvents(toolbarContainerElement: HTMLElement, pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE): void {
    toolbarContainerElement.style.pointerEvents = pointerEvents;
  }
}
