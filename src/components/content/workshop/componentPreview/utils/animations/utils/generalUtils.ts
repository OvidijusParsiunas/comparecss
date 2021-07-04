import { POINTER_EVENTS_NONE, POINTER_EVENTS_REMOVE, CLASSLIST_METHODS, INITIAL_ANIMATION_PROPERTIES } from '../consts/sharedConsts';
import { ElementStyleProperties } from '../../../../../../../interfaces/elementStyleProperties';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { STATIC_POSITION_CLASS } from '../../../../../../../consts/sharedClasses';
import { animationState } from '../state';

export default class GeneralUtils {

  public static secondsStringToMillisecondsNumber(seconds: string): number {
    return Number.parseFloat(seconds) * 1000;
  }

  public static unsetAnimationProperties(...elements: HTMLElement[]): void {
    elements.forEach((element) => {
      if (!element) return;
      element.style.transitionDuration = CSS_PROPERTY_VALUES.UNSET;
      element.style.transitionProperty = CSS_PROPERTY_VALUES.UNSET;
      element.style.transitionTimingFunction = CSS_PROPERTY_VALUES.UNSET;
    });
  }

  public static opacityFadeAnimation(opacity: string, animationDuration: string, ...elements: HTMLElement[]): void {
    const { transitionProperty, transitionTimingFunction } = INITIAL_ANIMATION_PROPERTIES;
    elements.forEach((element) => {
      if (!element) return;
      element.style.transitionDuration = animationDuration;
      element.style.transitionProperty = transitionProperty;
      element.style.transitionTimingFunction = transitionTimingFunction;
      element.style.opacity = opacity;
    });
  }

  public static toggleModalStaticPosition(componentElement: HTMLElement, modalOverlayElement: HTMLElement, toggleName: CLASSLIST_METHODS): void {
    componentElement.classList[toggleName](STATIC_POSITION_CLASS);
    modalOverlayElement.classList[toggleName](STATIC_POSITION_CLASS);
  }

  public static getNewAnimationDuration(): string {
    return `${animationState.getElapsedAnimationTime() / 1000}s`;
  }

  public static setComponentPropertiesBackToDefault(componentElement: HTMLElement): void {
    const defaultproperties = animationState.setIsPreviewAnimationInProgressState();
    GeneralUtils.setComponentElementProperties(componentElement, defaultproperties);
  }

  public static startModalAndToolbarAnimationWithFadeOut(componentElement: HTMLElement): void {
    animationState.cancelPendingAnimationFunctionality();
    animationState.cancelPendingToolbarAnimationFunctionality();
    GeneralUtils.setComponentPropertiesBackToDefault(componentElement);
  }

  public static setComponentElementProperties(componentElement: HTMLElement, properties: ElementStyleProperties): void {
    Object.keys(properties).forEach((propertyKey: string) => {
      componentElement.style[propertyKey] = properties[propertyKey];
    });
  }

  public static setToolbarContainerPointerEvents(toolbarContainerElement: HTMLElement, pointerEvents: typeof POINTER_EVENTS_NONE | typeof POINTER_EVENTS_REMOVE): void {
    toolbarContainerElement.style.pointerEvents = pointerEvents;
  }
}
