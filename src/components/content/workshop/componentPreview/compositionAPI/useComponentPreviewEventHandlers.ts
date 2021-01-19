import { UNSET_COLOR_BUTTON_DISPLAYED_STATE, UNSET_COLOR_BUTTON_DISPLAYED_STATE_PROPERTY_POSTFIX } from '../../../../../consts/unsetColotButtonDisplayed';
import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { Ref } from 'vue';

export interface UseComponentPreviewEventHandlers {
  componentMouseEnter: () => void,
  componentMouseLeave: () => void,
  componentMouseDown: () => void,
  componentMouseUp: () => void
}

export default function useComponentPreviewEventHandlers(componentRef: Ref<SubcomponentProperties> | Ref<WorkshopComponent>, componentsThatShouldNotBeAffected?: Set<SUB_COMPONENTS>): UseComponentPreviewEventHandlers {

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

  // typescript requires componentRef to be passed in as an argument to this function to validate the type
  // and allow the next two functions to behave as required (also validated by the linter)
  function isComponentProperties(componentRef: Ref<SubcomponentProperties> | Ref<WorkshopComponent>): componentRef is Ref<SubcomponentProperties> {
    return (componentRef as Ref<SubcomponentProperties>).value.customCss !== undefined;
  }

  function parseComponentProperties(): SubcomponentProperties {
    return isComponentProperties(componentRef) ? componentRef.value : componentRef.value.subcomponents[componentRef.value.subcomponentsActiveMode];
  }

  function shouldThisComponentNotBeAffected(): boolean {
    return !isComponentProperties(componentRef) && componentsThatShouldNotBeAffected && componentsThatShouldNotBeAffected.has(componentRef.value.subcomponentsActiveMode);
  }

  const componentMouseEnter = (): void => {
    if (shouldThisComponentNotBeAffected()) return;
    const componentProperties = parseComponentProperties();
    const { customCss, subcomponentPreviewTransition, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      setDefaultUnsetButtonStatesForColorInputs(customCss);
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByHover = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.HOVER], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const componentMouseLeave = (): void => {
    if (shouldThisComponentNotBeAffected()) return;
    const componentProperties = parseComponentProperties();
    const { customCss, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...overwrittenDefaultPropertiesByHover };
    }
    isUnsetButtonDisplayedForColorInputs = {};
  }
  
  const componentMouseDown = (): void => {
    if (shouldThisComponentNotBeAffected()) return;
    const componentProperties = parseComponentProperties();
    const { customCss, subcomponentPreviewTransition, customCssActiveMode } = componentProperties;
    if (customCssActiveMode === SUB_COMPONENT_CSS_MODES.DEFAULT) {
      const transition = subcomponentPreviewTransition || 'unset';
      overwrittenDefaultPropertiesByClick = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], transition };
      customCss[SUB_COMPONENT_CSS_MODES.DEFAULT] = { ...customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], ...customCss[SUB_COMPONENT_CSS_MODES.CLICK], transition, ...isUnsetButtonDisplayedForColorInputs };
    }
  }
  
  const componentMouseUp = (): void => {
    if (shouldThisComponentNotBeAffected()) return;
    const componentProperties = parseComponentProperties();
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
