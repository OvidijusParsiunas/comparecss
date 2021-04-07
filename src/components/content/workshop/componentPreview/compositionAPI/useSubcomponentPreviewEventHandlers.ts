import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { expandedModalPreviewModeState } from '../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { CustomCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { CSS_STATES } from '../../../../../consts/subcomponentCssStates.enum';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[CSS_STATES.DEFAULT]).forEach((key) => {
      if (customCss[CSS_STATES.DEFAULT][key] === 'inherit' ||
        (typeof customCss[CSS_STATES.DEFAULT][key] === 'string' && customCss[CSS_STATES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[CSS_STATES.DEFAULT][key] === 'inherit'
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  const subcomponentMouseEnter = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCssState } = subcomponentProperties;
    if (activeCssState === CSS_STATES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByHover = { hasBeenSet: true, css: { ...customCss[CSS_STATES.DEFAULT], transition } };
      customCss[CSS_STATES.DEFAULT] = {
        ...customCss[CSS_STATES.DEFAULT], ...customCss[CSS_STATES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseLeave = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCssState } = subcomponentProperties;
    if (activeCssState === CSS_STATES.DEFAULT && overwrittenDefaultPropertiesByHover.hasBeenSet) {
      customCss[CSS_STATES.DEFAULT] = { ...overwrittenDefaultPropertiesByHover.css };
      overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const subcomponentMouseDown = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCssState } = subcomponentProperties;
    if (activeCssState === CSS_STATES.DEFAULT) {
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...customCss[CSS_STATES.DEFAULT], transition } };
      customCss[CSS_STATES.DEFAULT] = {
        ...customCss[CSS_STATES.DEFAULT], ...customCss[CSS_STATES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseUp = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCssState } = subcomponentProperties;
    if (activeCssState === CSS_STATES.DEFAULT && overwrittenDefaultPropertiesByClick.hasBeenSet) {
      customCss[CSS_STATES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
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
