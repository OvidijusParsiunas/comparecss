import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createModalComponentPreviewStructure(
  baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties, layer1Component: SubcomponentProperties, layer2Component: SubcomponentProperties, layer3Component: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layer1Component.customCss,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal title',
          [SUB_COMPONENTS.CLOSE]: closeComponent,
        }
      },
      {
        subcomponentType: SUB_COMPONENTS.LAYER_2,
        customCss: layer2Component.customCss,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal body text',
        }
      },
      {
        subcomponentType: SUB_COMPONENTS.LAYER_3,
        customCss: layer3Component.customCss,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal footer',
        }
      },
    ],
    subcomponentDropdownStructure: {
      [SUB_COMPONENTS.BASE]: {
        [SUB_COMPONENTS.LAYER_1]: {
          [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
        },
        [SUB_COMPONENTS.LAYER_2]: { currentlyDisplaying: true },
        [SUB_COMPONENTS.LAYER_3]: { currentlyDisplaying: true },
      },
    }
  }
}
