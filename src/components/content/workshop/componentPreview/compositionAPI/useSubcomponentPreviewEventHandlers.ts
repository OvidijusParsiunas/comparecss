import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { SubcomponentTypeToPropertiesUtils } from '../../utils/subcomponentTypeToProperties/subcomponentTypeToPropertiesUtils';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { subcomponentAndOverlayElementIdsState } from '../utils/elements/subcomponentAndOverlayElementIdsState';
import { CustomCss, CustomFeatures, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { SubcomponentMouseEventCallbacks } from '../../../../../interfaces/subcomponentMouseEventCallbacks';
import { SubcomponentTypeToProperties } from '../../../../../interfaces/subcomponentTypeToProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { StationaryAnimations } from '../../../../../interfaces/animations';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';
import { animationState } from '../utils/animations/state';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties,
    clickCallback: () => void): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};
  let unsetTransitionPropertyTimeout = null;
  // can be any value, using null for simplicity
  const transitionReadyToUnsetSignature = null;

  function displayInFrontOfSiblings(inFront: boolean, cssPseudoClass: CSS_PSEUDO_CLASSES): void {
    const { displayInFrontOfSiblingsState } = subcomponentProperties.seedComponent;
    if (displayInFrontOfSiblingsState) {
      if (!displayInFrontOfSiblingsState.conditionalFunc || displayInFrontOfSiblingsState.conditionalFunc(subcomponentProperties, cssPseudoClass)) {
        displayInFrontOfSiblingsState.isInFront = inFront;
      }
    }
  }

  function triggerSubcomponentMouseEventCallback(mouseEvent: keyof SubcomponentMouseEventCallbacks): void {
    subcomponentProperties.customFeatures?.mouseEventCallbacks?.[mouseEvent]?.(subcomponentProperties);
  }

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[CSS_PSEUDO_CLASSES.DEFAULT]).forEach((key) => {
      if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === CSS_PROPERTY_VALUES.INHERIT
          || (typeof customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'string' && customCss[CSS_PSEUDO_CLASSES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === CSS_PROPERTY_VALUES.INHERIT
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  function triggerOtherSubcomponentsMouseEvents(subcomponentsToTrigger: SubcomponentTypeToProperties, mouseEventType: string): void {
    SubcomponentTypeToPropertiesUtils.getTypesWithNonNullSubcomponents(subcomponentsToTrigger).forEach((subcomponentType) => {
      const subcomponent = subcomponentsToTrigger[subcomponentType];
      const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(subcomponent.name);
      const element = document.getElementById(subcomponentId);
      element.dispatchEvent(new MouseEvent(mouseEventType));
    });
  }

  // the following is used to prevent the modal animation from stopping when the user moves their mouse and triggers the modal's base mouse events
  function shoudMouseEventBePrevented(): boolean {
    return subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()
      || subcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
      || (subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BASE
          && (animationState.getIsModeToggleAnimationInProgressState() || animationState.getIsAnimationPreviewInProgressState()));
  }

  function unsetStationaryAnimations(customCss: CustomCss, defaultCss: CustomCss, stationaryAnimations: StationaryAnimations): void {
    if (stationaryAnimations.fade?.duration) {
      unsetTransitionPropertyTimeout = window.setTimeout(() => {
        unsetTransitionPropertyTimeout = null;
        if (customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition !== transitionReadyToUnsetSignature) return;
        customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = CSS_PROPERTY_VALUES.UNSET;
      }, Number.parseFloat(stationaryAnimations.fade.duration) * 1000);
    }
    if (stationaryAnimations.backgroundZoom?.zoomLevels) {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize = defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize;
    }
    // this is used to prevent a bug where sibling components that share customCss have their transition property
    // unset when the user moves their mouse from one component to another as the timeout unsets the reference.
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = transitionReadyToUnsetSignature;
  }

  function buildTransitionCssProperty(customFeatures: string): string {
    return `all ${customFeatures} ease-out`;
  }

  function setTransitionCssProperty(customCss: CustomCss, transitionDuration: string): void {
    const transition = transitionDuration ? buildTransitionCssProperty(transitionDuration) : CSS_PROPERTY_VALUES.UNSET;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = transition;
  }

  function setZoomAnimation(customCss: CustomCss, zoomLevels: string): void {
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize = zoomLevels;
  }

  function setStationaryCssProperty(customCss: CustomCss, stationaryAnimations: StationaryAnimations): void {
    if (stationaryAnimations.fade) setTransitionCssProperty(customCss, stationaryAnimations.fade.duration);
    if (stationaryAnimations.backgroundZoom?.isOn) setZoomAnimation(customCss, stationaryAnimations.backgroundZoom.zoomLevels);
  }

  function setCustomCss(customCss: CustomCss, activeCssPseudoClass: CSS_PSEUDO_CLASSES): void {
    const newDefaultProperties = {
      ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[activeCssPseudoClass], ...isUnsetButtonDisplayedForColorInputs,
      // WORK 2 - refactor
      backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'backgroundColor'),
      color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'color'),
      borderColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'borderColor'),
    };
    subcomponentProperties.overwrittenCustomCssObj = { [CSS_PSEUDO_CLASSES.DEFAULT]: newDefaultProperties };
  }

  function setMouseEnterProperties(customCss: CustomCss, customFeatures: CustomFeatures): void {
    if (unsetTransitionPropertyTimeout !== null) clearTimeout(unsetTransitionPropertyTimeout);
    if (customFeatures?.animations?.stationary) setStationaryCssProperty(customCss, customFeatures.animations.stationary);
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.HOVER);
  }

  const subcomponentMouseEnter = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, customFeatures, otherSubcomponentTriggers } = subcomponentProperties;
    // even.isTrusted means that the event was triggered by a mouse instead of a dispatch
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    setDefaultUnsetButtonStatesForColorInputs(customCss);
    setMouseEnterProperties(customCss, customFeatures);
    triggerSubcomponentMouseEventCallback('mouseEnter');
    displayInFrontOfSiblings(true, CSS_PSEUDO_CLASSES.HOVER);
  }

  const subcomponentMouseLeave = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, defaultCss, customFeatures, otherSubcomponentTriggers } = subcomponentProperties;
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    if (subcomponentProperties.overwrittenCustomCssObj) {
      delete subcomponentProperties.overwrittenCustomCssObj;
    }
    isUnsetButtonDisplayedForColorInputs = {};
    displayInFrontOfSiblings(false, CSS_PSEUDO_CLASSES.HOVER);
    if (customFeatures?.animations?.stationary) unsetStationaryAnimations(customCss, defaultCss, customFeatures.animations.stationary);
  }

  const subcomponentMouseDown = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, customFeatures, otherSubcomponentTriggers } = subcomponentProperties;
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    // this is a bug fix for when the user clicks a button without entering it (after subcomponent select mode)
    if (!subcomponentProperties.overwrittenCustomCssObj) {
      setMouseEnterProperties(customCss, customFeatures);
    }
    overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...subcomponentProperties.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] } };
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.CLICK);
    displayInFrontOfSiblings(true, CSS_PSEUDO_CLASSES.CLICK);
  }

  const subcomponentMouseUp = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { subcomponentsToTrigger } = subcomponentProperties.otherSubcomponentTriggers || {};
    triggerOtherSubcomponentsMouseEvents(subcomponentsToTrigger, event.type);
    if (overwrittenDefaultPropertiesByClick.hasBeenSet
        && subcomponentProperties.overwrittenCustomCssObj) {
      subcomponentProperties.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
      overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
    }
    displayInFrontOfSiblings(false, CSS_PSEUDO_CLASSES.CLICK);
  }

  const subcomponentClick = (): void => {
    triggerSubcomponentMouseEventCallback('click');
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
