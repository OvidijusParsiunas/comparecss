import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { subcomponentAndOverlayElementIdsState } from '../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { CustomCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { animationState } from '../utils/animations/state';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties,
    clickCallback: () => void): UseSubcomponentPreviewEventHandlers {

  const OVERWRITTEN_CUSTOM_CSS_OBJ_NAME = 'tempOverwrittenCustomCss';
  let overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[CSS_PSEUDO_CLASSES.DEFAULT]).forEach((key) => {
      if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'inherit'
          || (typeof customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'string' && customCss[CSS_PSEUDO_CLASSES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'inherit'
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  function triggerAnotherSubcomponentMouseEvent(triggerableSubcomponentName: string, mouseEventType: string): void {
    const subcomponentId = subcomponentAndOverlayElementIdsState.getSubcomponentIdViaSubcomponentName(triggerableSubcomponentName);
    const element = document.getElementById(subcomponentId);
    element.dispatchEvent(new MouseEvent(mouseEventType));
  }

  // the following is used to prevent the modal animation from stopping when the user moves their mouse and triggers the modal's base mouse events
  function shoudPreventMouseEvent(): boolean {
    return subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()
      || (subcomponentProperties.subcomponentType === SUBCOMPONENT_TYPES.BASE
          && (animationState.getIsModeToggleAnimationInProgressState() || animationState.getIsAnimationPreviewInProgressState()))
  }

  function setMouseEnterProperties(customCss: CustomCss, transition: string): void {
    overwrittenDefaultPropertiesByHover = { hasBeenSet: true, css: { ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], transition } };
    const newDefaultProperties = {
      ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[CSS_PSEUDO_CLASSES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    subcomponentProperties[OVERWRITTEN_CUSTOM_CSS_OBJ_NAME] = { [CSS_PSEUDO_CLASSES.DEFAULT]: newDefaultProperties };
    subcomponentProperties.overwrittenCustomCssObjName = OVERWRITTEN_CUSTOM_CSS_OBJ_NAME;
  }

  // adding properties via OVERWRITTEN_CUSTOM_CSS_OBJ_NAME instead of customCss because if couple components are in-sync they will edit each other
  const subcomponentMouseEnter = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { customCss, subcomponentPreviewTransition, activeCssPseudoClass, triggerableSubcomponentName } = subcomponentProperties;
    if (triggerableSubcomponentName) triggerAnotherSubcomponentMouseEvent(triggerableSubcomponentName, event.type);
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      const transition = subcomponentPreviewTransition || 'unset';
      setMouseEnterProperties(customCss, transition);
    }
  }
  
  const subcomponentMouseLeave = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { activeCssPseudoClass, triggerableSubcomponentName } = subcomponentProperties;
    if (triggerableSubcomponentName) triggerAnotherSubcomponentMouseEvent(triggerableSubcomponentName, event.type);
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT && overwrittenDefaultPropertiesByHover.hasBeenSet) {
      delete subcomponentProperties.overwrittenCustomCssObjName;
      overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const subcomponentMouseDown = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { customCss, subcomponentPreviewTransition, activeCssPseudoClass, triggerableSubcomponentName } = subcomponentProperties;
    if (triggerableSubcomponentName) triggerAnotherSubcomponentMouseEvent(triggerableSubcomponentName, event.type);
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      const transition = subcomponentPreviewTransition || 'unset';
      const newDefaultProperties = {
        ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[CSS_PSEUDO_CLASSES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
      // this is a bug fix for when the user clicks a button without entering it (after subcomponent select mode)
      if (!subcomponentProperties.overwrittenCustomCssObjName) {
        setMouseEnterProperties(customCss, transition);
      }
      overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...subcomponentProperties[OVERWRITTEN_CUSTOM_CSS_OBJ_NAME][CSS_PSEUDO_CLASSES.DEFAULT], transition } };
      subcomponentProperties[OVERWRITTEN_CUSTOM_CSS_OBJ_NAME][CSS_PSEUDO_CLASSES.DEFAULT] = { ...newDefaultProperties };
    }
  }

  const subcomponentMouseUp = (): void => {
    if (shoudPreventMouseEvent()) return;
    const { activeCssPseudoClass, triggerableSubcomponentName } = subcomponentProperties;
    if (triggerableSubcomponentName) triggerAnotherSubcomponentMouseEvent(triggerableSubcomponentName, event.type);
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT && overwrittenDefaultPropertiesByClick.hasBeenSet) {
      subcomponentProperties[OVERWRITTEN_CUSTOM_CSS_OBJ_NAME][CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
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
