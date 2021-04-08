import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { expandedModalPreviewModeState } from '../utils/expandedModalPreviewMode/expandedModalPreviewModeState';
import { CustomCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[CSS_PSEUDO_CLASSES.DEFAULT]).forEach((key) => {
      if (customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'inherit' ||
        (typeof customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'string' && customCss[CSS_PSEUDO_CLASSES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[CSS_PSEUDO_CLASSES.DEFAULT][key] === 'inherit'
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  const subcomponentMouseEnter = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByHover = { hasBeenSet: true, css: { ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], transition } };
      customCss[CSS_PSEUDO_CLASSES.DEFAULT] = {
        ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[CSS_PSEUDO_CLASSES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseLeave = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT && overwrittenDefaultPropertiesByHover.hasBeenSet) {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByHover.css };
      overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const subcomponentMouseDown = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT) {
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], transition } };
      customCss[CSS_PSEUDO_CLASSES.DEFAULT] = {
        ...customCss[CSS_PSEUDO_CLASSES.DEFAULT], ...customCss[CSS_PSEUDO_CLASSES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseUp = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCssPseudoClass } = subcomponentProperties;
    if (activeCssPseudoClass === CSS_PSEUDO_CLASSES.DEFAULT && overwrittenDefaultPropertiesByClick.hasBeenSet) {
      customCss[CSS_PSEUDO_CLASSES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
      overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
    }
  }
  
  return {
    subcomponentMouseEnter,
    subcomponentMouseLeave,
    subcomponentMouseDown,
    subcomponentMouseUp,
  };
}
