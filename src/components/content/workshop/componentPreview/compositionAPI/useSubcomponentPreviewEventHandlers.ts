import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { subcomponentAndOverlayElementIdsState } from '../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { CustomCss, CustomFeatures, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';
import { animationState } from '../utils/animations/state';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties,
    clickCallback: () => void): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[CSS_PSEUDO_CLASSES.DEFAULT]).forEach((key) => {
      if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === CSS_PROPERTY_VALUES.INHERIT
          || (typeof customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'string' && customCss[CSS_PSEUDO_CLASSES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === CSS_PROPERTY_VALUES.INHERIT
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  function triggerAnotherSubcomponentMouseEvent(nameOfAnotherSubcomponetToTrigger: string, mouseEventType: string): void {
    const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(nameOfAnotherSubcomponetToTrigger);
    const element = document.getElementById(subcomponentId);
    element.dispatchEvent(new MouseEvent(mouseEventType));
  }

  // the following is used to prevent the modal animation from stopping when the user moves their mouse and triggers the modal's base mouse events
  function shoudPreventMouseEvent(): boolean {
    return subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()
      || (subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BASE
          && (animationState.getIsModeToggleAnimationInProgressState() || animationState.getIsAnimationPreviewInProgressState()))
  }

  function unsetTransitionProperty(customCss: CustomCss, customFeatures: CustomFeatures): void {
    const transitionDuration = customFeatures?.animations?.stationary?.fade?.duration;
    if (!transitionDuration) return;
    setTimeout(() => {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = CSS_PROPERTY_VALUES.UNSET;
    }, Number.parseFloat(transitionDuration) * 1000);
  }

  function buildTransitionCssProperty(customFeatures: string): string {
    return `all ${customFeatures} ease-out`;
  }

  function setTransitionCssProperty(customCss: CustomCss, transitionDuration: string): void {
    const transition = transitionDuration ? buildTransitionCssProperty(transitionDuration) : CSS_PROPERTY_VALUES.UNSET;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = transition;
  }

  function setCustomCss(customCss: CustomCss, activeCssPseudoClass: CSS_PSEUDO_CLASSES): void {
    const newDefaultProperties = {
      ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[activeCssPseudoClass], ...isUnsetButtonDisplayedForColorInputs,
      backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'backgroundColor'),
      color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'color')};
    subcomponentProperties.overwrittenCustomCssObj = { [CSS_PSEUDO_CLASSES.DEFAULT]: newDefaultProperties };
  }

  function setMouseEnterProperties(customCss: CustomCss, customFeatures: CustomFeatures): void {
    if (customFeatures?.animations?.stationary?.fade) setTransitionCssProperty(customCss, customFeatures.animations.stationary.fade.duration);
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.HOVER);
  }

  const subcomponentMouseEnter = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { customCss, customFeatures, nameOfAnotherSubcomponetToTrigger, isTriggeredByAnotherSubcomponent } = subcomponentProperties;
    // even.isTrusted means that the event was triggered by a mouse instead of a dispatch
    if (isTriggeredByAnotherSubcomponent && event.isTrusted) return;
    if (nameOfAnotherSubcomponetToTrigger) triggerAnotherSubcomponentMouseEvent(nameOfAnotherSubcomponetToTrigger, event.type);
    setDefaultUnsetButtonStatesForColorInputs(customCss);
    setMouseEnterProperties(customCss, customFeatures);
  }

  const subcomponentMouseLeave = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { customCss, customFeatures, nameOfAnotherSubcomponetToTrigger, isTriggeredByAnotherSubcomponent } = subcomponentProperties;
    if (isTriggeredByAnotherSubcomponent && event.isTrusted) return;
    if (nameOfAnotherSubcomponetToTrigger) triggerAnotherSubcomponentMouseEvent(nameOfAnotherSubcomponetToTrigger, event.type);
    if (subcomponentProperties.overwrittenCustomCssObj) {
      delete subcomponentProperties.overwrittenCustomCssObj;
    }
    isUnsetButtonDisplayedForColorInputs = {};
    if (customFeatures) unsetTransitionProperty(customCss, customFeatures); 
  }

  const subcomponentMouseDown = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { customCss, customFeatures, nameOfAnotherSubcomponetToTrigger, isTriggeredByAnotherSubcomponent } = subcomponentProperties;
    if (isTriggeredByAnotherSubcomponent && event.isTrusted) return;
    if (nameOfAnotherSubcomponetToTrigger) triggerAnotherSubcomponentMouseEvent(nameOfAnotherSubcomponetToTrigger, event.type);
    // this is a bug fix for when the user clicks a button without entering it (after subcomponent select mode)
    if (!subcomponentProperties.overwrittenCustomCssObj) {
      setMouseEnterProperties(customCss, customFeatures);
    }
    overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...subcomponentProperties.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] } };
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.CLICK);
  }

  const subcomponentMouseUp = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { nameOfAnotherSubcomponetToTrigger } = subcomponentProperties;
    if (nameOfAnotherSubcomponetToTrigger) triggerAnotherSubcomponentMouseEvent(nameOfAnotherSubcomponetToTrigger, event.type);
    if (overwrittenDefaultPropertiesByClick.hasBeenSet
        && subcomponentProperties.overwrittenCustomCssObj) {
      subcomponentProperties.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
      overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} }; 
    }
  }

  const subcomponentClick = (): void => {
    if (clickCallback) clickCallback();
  }

  return {
    subcomponentMouseEnter,
    subcomponentMouseLeave,
    subcomponentMouseDown,
    subcomponentMouseUp,
    subcomponentClick,
  };
}
