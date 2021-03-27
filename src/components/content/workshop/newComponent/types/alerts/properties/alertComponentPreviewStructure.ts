import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createAlertComponentPreviewStructure(baseComponent: SubcomponentProperties,
    closeComponent: SubcomponentProperties, layerComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): any {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layerComponent.customCss,
        nestedSubcomponents: {
          alignedSections: {
            center: {
              [SUB_COMPONENTS.BUTTON_COMPONENT_TEXT]: textSubcomponent,
            },
            right: {
              [SUB_COMPONENTS.CLOSE]: closeComponent,
            },
          },
        },
      },
    ],
    subcomponentDropdownStructure: {
      [SUB_COMPONENTS.BASE]: {
        [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
      },
    },
  };
}
