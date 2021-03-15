import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createAlertComponentPreviewStructure(baseComponent: SubcomponentProperties,
    closeComponent: SubcomponentProperties, layerComponent: SubcomponentProperties): any {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.SINGLE_LAYER_BASE,
        customCss: layerComponent.customCss,
        nestedSubcomponents: {
          alignedSections: {
            center: {
              [PSEUDO_COMPONENTS.TEXT]: 'Alert',
            },
            right: {
              [SUB_COMPONENTS.CLOSE]: closeComponent,
            },
          },
        },
      },
    ],
    subcomponentDropdownStructure: {
      [SUB_COMPONENTS.SINGLE_LAYER_BASE]: {
        [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
      },
    },
  };
}
