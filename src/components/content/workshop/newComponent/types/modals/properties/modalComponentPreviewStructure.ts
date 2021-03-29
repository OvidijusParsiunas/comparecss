import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createModalComponentPreviewStructure(
  baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties, button1Component: SubcomponentProperties,
  button2Component: SubcomponentProperties, layer1Component: SubcomponentProperties, layer2Component: SubcomponentProperties,
  layer3Component: SubcomponentProperties, textSubcomponent1: SubcomponentProperties, textSubcomponent2: SubcomponentProperties): any {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layer1Component.customCss,
        nestedSubcomponents: {
          alignedSections: {
            left: {
              [SUB_COMPONENTS.TEXT_1]: textSubcomponent1,
            },
            center: {
            },
            right: {
              [SUB_COMPONENTS.CLOSE]: closeComponent,
            },
          },
          // gives the user an option to customise the borders
          // equalSplitSections: {
            
          // },
        }
      },
      {
        subcomponentType: SUB_COMPONENTS.LAYER_2,
        customCss: layer2Component.customCss,
        nestedSubcomponents: {
          alignedSections: {
            left: {
              [SUB_COMPONENTS.TEXT_2]: textSubcomponent2,
            },
          },
        },
      },
      {
        subcomponentType: SUB_COMPONENTS.LAYER_3,
        customCss: layer3Component.customCss,
        nestedSubcomponents: {
          alignedSections: {
            right: {
              [SUB_COMPONENTS.BUTTON_1]: button1Component,
              [SUB_COMPONENTS.BUTTON_2]: button2Component,
            },
          },
        }
      },
    ],
    subcomponentDropdownStructure: {
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
    }
  }
}
