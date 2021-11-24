import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { DisplayInFrontOfSiblings } from '../../utils/componentManipulation/displayInFrontOfSiblings/displayInFrontOfSiblingsUtils';
import { SubcomponentTypeToPropertiesUtils } from '../../utils/subcomponentTypeToProperties/subcomponentTypeToPropertiesUtils';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { subcomponentAndOverlayElementIdsState } from '../utils/elements/subcomponentAndOverlayElementIdsState';
import { SubcomponentMouseEventCallbacks } from '../../../../../interfaces/subcomponentMouseEventCallbacks';
import { CustomCss, CustomFeatures, Subcomponent } from '../../../../../interfaces/workshopComponent';
import { SubcomponentTypeToProperties } from '../../../../../interfaces/subcomponentTypeToProperties';
import { StationaryAnimations, FadeAnimation } from '../../../../../interfaces/animations';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import ComponentPreviewUtils from '../utils/componentPreviewUtils';
import { animationState } from '../utils/animations/state';

export default function useSubcomponentPreviewEventHandlers(subcomponent: Subcomponent,
    clickCallback: () => void): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};
  let unsetTransitionPropertyTimeout = null;

  function triggerSubcomponentMouseEventCallback(mouseEvent: keyof SubcomponentMouseEventCallbacks): void {
    subcomponent.customFeatures?.mouseEventCallbacks?.[mouseEvent]?.(subcomponent);
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
      || subcomponent.activeCssPseudoClassesDropdownItem === CSS_PSEUDO_CLASSES.CLICK
      || (subcomponent.subcomponentType === SUBCOMPONENT_TYPES.BASE
          && (animationState.getIsModeToggleAnimationInProgressState() || animationState.getIsAnimationPreviewInProgressState()));
  }

  function unsetStationaryAnimations(customCss: CustomCss, defaultCss: CustomCss, stationaryAnimations: StationaryAnimations): void {
    if (stationaryAnimations.fade?.duration) {
      unsetTransitionPropertyTimeout = window.setTimeout(() => {
        unsetTransitionPropertyTimeout = null;
        if (stationaryAnimations.fade.isTransitionCssPropertySet) return;
        customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = CSS_PROPERTY_VALUES.UNSET;
      }, Number.parseFloat(stationaryAnimations.fade.duration) * 1000);
      // this is used to prevent a bug where sibling components that share customCss have their transition property
      // unset by the timeout when the user moves their mouse from one component to another.
      stationaryAnimations.fade.isTransitionCssPropertySet = false;
    }
    if (stationaryAnimations.backgroundZoom?.zoomLevels) {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize = defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize;
    }
  }

  function buildTransitionCssProperty(customFeatures: string): string {
    return `all ${customFeatures} ease-out`;
  }

  function setTransitionCssProperty(customCss: CustomCss, fadeAnimation: FadeAnimation): void {
    if (fadeAnimation.duration) fadeAnimation.isTransitionCssPropertySet = true;
    const transition = fadeAnimation.duration ? buildTransitionCssProperty(fadeAnimation.duration) : CSS_PROPERTY_VALUES.UNSET;
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = transition;
  }

  function setZoomAnimation(customCss: CustomCss, zoomLevels: string): void {
    customCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize = zoomLevels;
  }

  function setStationaryCssProperty(customCss: CustomCss, stationaryAnimations: StationaryAnimations): void {
    if (stationaryAnimations.fade) setTransitionCssProperty(customCss, stationaryAnimations.fade);
    if (stationaryAnimations.backgroundZoom?.isOn) setZoomAnimation(customCss, stationaryAnimations.backgroundZoom.zoomLevels);
  }

  function setCustomCss(customCss: CustomCss, activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES): void {
    const newDefaultProperties = {
      ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[activeCssPseudoClassesDropdownItem], ...isUnsetButtonDisplayedForColorInputs,
      ...ComponentPreviewUtils.getInheritedValuesFromCustomCss(activeCssPseudoClassesDropdownItem, customCss),
    };
    subcomponent.overwrittenCustomCssObj = { [CSS_PSEUDO_CLASSES.DEFAULT]: newDefaultProperties };
  }

  function setMouseEnterProperties(customCss: CustomCss, customFeatures: CustomFeatures): void {
    if (unsetTransitionPropertyTimeout !== null) clearTimeout(unsetTransitionPropertyTimeout);
    if (customFeatures?.animations?.stationary) setStationaryCssProperty(customCss, customFeatures.animations.stationary);
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.HOVER);
  }

  const subcomponentMouseEnter = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, customFeatures, otherSubcomponentTriggers } = subcomponent;
    // even.isTrusted means that the event was triggered by a mouse instead of a dispatch
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    setDefaultUnsetButtonStatesForColorInputs(customCss);
    setMouseEnterProperties(customCss, customFeatures);
    triggerSubcomponentMouseEventCallback('mouseEnter');
    subcomponent.activeCssPseudoClassViaUserAction = CSS_PSEUDO_CLASSES.HOVER;
    DisplayInFrontOfSiblings.changeSubcomponentZIndex(true, subcomponent, CSS_PSEUDO_CLASSES.HOVER);
  }

  const subcomponentMouseLeave = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, defaultCss, customFeatures, otherSubcomponentTriggers } = subcomponent;
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    if (subcomponent.overwrittenCustomCssObj) {
      delete subcomponent.overwrittenCustomCssObj;
    }
    isUnsetButtonDisplayedForColorInputs = {};
    subcomponent.activeCssPseudoClassViaUserAction = CSS_PSEUDO_CLASSES.DEFAULT;
    DisplayInFrontOfSiblings.changeSubcomponentZIndex(false, subcomponent, CSS_PSEUDO_CLASSES.HOVER);
    if (customFeatures?.animations?.stationary) unsetStationaryAnimations(customCss, defaultCss, customFeatures.animations.stationary);
  }

  const subcomponentMouseDown = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { customCss, customFeatures, otherSubcomponentTriggers } = subcomponent;
    if (otherSubcomponentTriggers?.subcomponentThatTriggersThis && event.isTrusted) return;
    triggerOtherSubcomponentsMouseEvents(otherSubcomponentTriggers?.subcomponentsToTrigger, event.type);
    // this is a bug fix for when the user clicks a button without entering it (after subcomponent select mode)
    if (!subcomponent.overwrittenCustomCssObj) {
      setMouseEnterProperties(customCss, customFeatures);
    }
    overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...subcomponent.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] } };
    setCustomCss(customCss, CSS_PSEUDO_CLASSES.CLICK);
    subcomponent.activeCssPseudoClassViaUserAction = CSS_PSEUDO_CLASSES.CLICK;
    DisplayInFrontOfSiblings.changeSubcomponentZIndex(true, subcomponent, CSS_PSEUDO_CLASSES.CLICK);
  }

  const subcomponentMouseUp = (): void => {
    if (shoudMouseEventBePrevented()) return;
    const { subcomponentsToTrigger } = subcomponent.otherSubcomponentTriggers || {};
    triggerOtherSubcomponentsMouseEvents(subcomponentsToTrigger, event.type);
    if (overwrittenDefaultPropertiesByClick.hasBeenSet
        && subcomponent.overwrittenCustomCssObj) {
      subcomponent.overwrittenCustomCssObj[CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
      overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
    }
    subcomponent.activeCssPseudoClassViaUserAction = CSS_PSEUDO_CLASSES.HOVER;
    DisplayInFrontOfSiblings.changeSubcomponentZIndex(false, subcomponent, CSS_PSEUDO_CLASSES.CLICK);
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
