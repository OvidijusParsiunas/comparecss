import { ComponentPreviewStructure } from '../../../../../../../interfaces/componentPreviewStructure';
import { SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum';

export default function createButtonComponentPreviewStructure(buttonComponent: SubcomponentProperties,
    layerSubcomponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: buttonComponent,
    layers: [
      {
        subcomponentType: SUB_COMPONENTS.LAYER_1,
        customCss: layerSubcomponent.customCss,
        sections: {
          alignedSections: {
            left: {},
            center: {
              [SUB_COMPONENTS.TEXT_1]: textSubcomponent,
            },
            right: {},
          },
        },
      },
    ],
  };
}
