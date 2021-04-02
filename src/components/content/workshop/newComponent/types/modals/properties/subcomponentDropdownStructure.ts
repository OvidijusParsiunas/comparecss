import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent';
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export default function createModalSubcomponentDropdownStructure(
    button1Component: SubcomponentProperties, button2Component: SubcomponentProperties, closeComponent: SubcomponentProperties,
    textSubcomponent1: SubcomponentProperties, textSubcomponent2: SubcomponentProperties): NestedDropdownStructure {
  return {
    [SUB_COMPONENTS.BASE]: {
      [SUB_COMPONENTS.LAYER_1]: {
        [SUB_COMPONENTS.TEXT_1]: textSubcomponent1.optionalSubcomponent,
        [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
      },
      [SUB_COMPONENTS.LAYER_2]: { 
        [SUB_COMPONENTS.TEXT_2]: textSubcomponent2.optionalSubcomponent,
      },
      [SUB_COMPONENTS.LAYER_3]: {
        [SUB_COMPONENTS.BUTTON_1]: button1Component.optionalSubcomponent,
        [SUB_COMPONENTS.BUTTON_2]: button2Component.optionalSubcomponent,
      }
    },
  };
}

