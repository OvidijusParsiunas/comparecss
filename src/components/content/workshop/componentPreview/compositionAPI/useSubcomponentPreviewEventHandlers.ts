import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { expandedModalPreviewModeState } from '../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { CustomCss, SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';

export default function useSubcomponentPreviewEventHandlers(subcomponentProperties: SubcomponentProperties): UseSubcomponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
  let overwrittenDefaultPropertiesByClick = { hasBeenSet: false, css: {} };
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((key) => {
      if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit' ||
        (typeof customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'string' && customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key].charAt(0) === '#')) {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit'
          ? UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  const subcomponentMouseEnter = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCustomCssMode } = subcomponentProperties;
    if (activeCustomCssMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByHover = { hasBeenSet: true, css: { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition } };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = {
        ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseLeave = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    if (activeCustomCssMode === SUB_COMPONENT_CSS_MODES.DEFAULT && overwrittenDefaultPropertiesByHover.hasBeenSet) {
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...overwrittenDefaultPropertiesByHover.css };
      overwrittenDefaultPropertiesByHover = { hasBeenSet: false, css: {} };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const subcomponentMouseDown = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, subcomponentPreviewTransition, activeCustomCssMode } = subcomponentProperties;
    if (activeCustomCssMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByClick = { hasBeenSet: true, css: { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition } };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = {
        ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const subcomponentMouseUp = (): void => {
    if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customCss, activeCustomCssMode } = subcomponentProperties;
    if (activeCustomCssMode === SUB_COMPONENT_CSS_MODES.DEFAULT && overwrittenDefaultPropertiesByClick.hasBeenSet) {
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick.css };
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
