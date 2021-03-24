import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export default function createButtonComponentPreviewStructure(buttonComponent: SubcomponentProperties,
    layerSubcomponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): any {
  return {
    baseCss: buttonComponent,
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layerSubcomponent.customCss,
        nestedSubcomponents: {
          alignedSections: {
            center: {
              [SUB_COMPONENTS.BUTTON_COMPONENT_TEXT]: textSubcomponent,
            },
          },
        },
      },
    ],
  };
}
