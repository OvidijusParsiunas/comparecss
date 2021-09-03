import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { subcomponentAndOverlayElementIdsState } from '../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { CoreSubcomponentRefsUtils } from '../../utils/componentManipulation/coreSubcomponentRefs/coreSubcomponentRefsUtils';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { CustomCss, CustomFeatures, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { SubcomponentMouseEventCallbacks } from '../../../../../interfaces/subcomponentMouseEventCallbacks';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { CoreSubcomponentRefs } from '../../../../../interfaces/coreSubcomponentRefs';
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

  function triggerOtherSubcomponentsMouseEvents(subcomponentsToTrigger: CoreSubcomponentRefs, mouseEventType: string): void {
    CoreSubcomponentRefsUtils.getActiveRefKeys(subcomponentsToTrigger).forEach((subcomponentType) => {
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
        customCss[CSS_PSEUDO_CLASSES.DEFAULT].transition = CSS_PROPERTY_VALUES.UNSET;
        unsetTransitionPropertyTimeout = null;
      }, Number.parseFloat(stationaryAnimations.fade.duration) * 1000);
    }
    if (stationaryAnimations.backgroundZoom?.zoomLevels) {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize = defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].backgroundSize;
    }
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
      backgroundColor: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'backgroundColor'),
      color: ComponentPreviewUtils.getInheritedCustomCssValue(activeCssPseudoClass, customCss, 'color')};
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
