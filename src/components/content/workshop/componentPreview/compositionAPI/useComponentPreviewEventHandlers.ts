import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export interface UseComponentPreviewEventHandlers {
  componentMouseEnter: () => void,
  componentMouseLeave: () => void,
  componentMouseDown: () => void,
  componentMouseUp: () => void
}

export default function useComponentPreviewEventHandlers(component: SubcomponentProperties | WorkshopComponent, componentsThatShouldNotBeAffected?: Set<SUB_COMPONENTS>): UseComponentPreviewEventHandlers {

  let overwrittenDefaultPropertiesByHover = {};
  let overwrittenDefaultPropertiesByClick = {};
  let isUnsetButtonDisplayedForColorInputs = {};

  function setDefaultUnsetButtonStatesForColorInputs(customCss: CustomCss): void {
    Object.keys(customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]).forEach((key) => {
      if (customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit' || customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key].charAt(0) === '#') {
        isUnsetButtonDisplayedForColorInputs[key + UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX] = customCss[SUB_COMPONENT_CSS_MODES.DEFAULT][key] === 'inherit'
          ?  UNSET_COLOR_BUTTON_DISPLAYED_STATE.DO_NOT_DISPLAY : UNSET_COLOR_BUTTON_DISPLAYED_STATE.DISPLAY;
      }
    });
  }

  function isComponentProperties(component: SubcomponentProperties | WorkshopComponent): component is SubcomponentProperties {
    return (component as SubcomponentProperties).customCss !== undefined;
  }

  const componentMouseEnter = (): void => {
    const componentProperties = isComponentProperties(component) ? component : component.subcomponents[component.subcomponentsActiveMode];
    if (!isComponentProperties(component) && componentsThatShouldNotBeAffected && componentsThatShouldNotBeAffected.has(component.subcomponentsActiveMode)) return;
    const { customCss, transition, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      overwrittenDefaultPropertiesByHover = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const componentMouseLeave = (): void => {
    const componentProperties = isComponentProperties(component) ? component : component.subcomponents[component.subcomponentsActiveMode];
    if (!isComponentProperties(component) && componentsThatShouldNotBeAffected && componentsThatShouldNotBeAffected.has(component.subcomponentsActiveMode)) return;
    const { customCss, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...overwrittenDefaultPropertiesByHover };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const componentMouseDown = (): void => {
    const componentProperties = isComponentProperties(component) ? component : component.subcomponents[component.subcomponentsActiveMode];
    if (!isComponentProperties(component) && componentsThatShouldNotBeAffected && componentsThatShouldNotBeAffected.has(component.subcomponentsActiveMode)) return;
    const { customCss, transition, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      overwrittenDefaultPropertiesByClick = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const componentMouseUp = (): void => {
    const componentProperties = isComponentProperties(component) ? component : component.subcomponents[component.subcomponentsActiveMode];
    if (!isComponentProperties(component) && componentsThatShouldNotBeAffected && componentsThatShouldNotBeAffected.has(component.subcomponentsActiveMode)) return;
    const { customCss, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...overwrittenDefaultPropertiesByClick };
    }
  }
  
  return {
    componentMouseEnter,
    componentMouseLeave,
    componentMouseDown,
    componentMouseUp,
  };
}
