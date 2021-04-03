import { ComponentPreviewStructure } from '../../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createAlertComponentPreviewStructure(baseComponent: SubcomponentProperties,
    closeComponent: SubcomponentProperties, layerComponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layerComponent.customCss,
        sections: {
          alignedSections: {
            left: {
            },
            center: {
              [SUB_COMPONENTS.TEXT_1]: textSubcomponent,
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
        [SUB_COMPONENTS.TEXT_1]: { currentlyDisplaying: true },
        [SUB_COMPONENTS.CLOSE]: closeComponent.optionalSubcomponent,
      },
    },
  };
}
