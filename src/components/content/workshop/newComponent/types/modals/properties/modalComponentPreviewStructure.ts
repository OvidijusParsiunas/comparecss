import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createModalComponentPreviewStructure(
  baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties, button1Component: SubcomponentProperties, button2Component: SubcomponentProperties,
  layer1Component: SubcomponentProperties, layer2Component: SubcomponentProperties, layer3Component: SubcomponentProperties): any {
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
          [SUB_COMPONENTS.BUTTON_1]: button1Component,
          [SUB_COMPONENTS.BUTTON_2]: button2Component,
        },
        nestedSubcomponents: {
          [SUB_COMPONENTS.BUTTON_1]: button1Component,
          [SUB_COMPONENTS.BUTTON_2]: button2Component,
        }
      },
    ],
    subcomponentDropdownStructure: {
      [SUB_COMPONENTS.BASE]: {
        [SUB_COMPONENTS.LAYER_1]: {
          [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
        },
        [SUB_COMPONENTS.LAYER_2]: { currentlyDisplaying: true },
        [SUB_COMPONENTS.LAYER_3]: {
          [SUB_COMPONENTS.BUTTON_1]: button1Component.optionalSubcomponent,
          [SUB_COMPONENTS.BUTTON_2]: button2Component.optionalSubcomponent,
        }
      },
    }
  }
}
