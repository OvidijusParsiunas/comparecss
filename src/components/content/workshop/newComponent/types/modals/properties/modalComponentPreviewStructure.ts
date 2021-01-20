import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '../../../../../../../consts/subcomponentPreviewElementIds.enum'
import { SUB_COMPONENT_CSS_MODES } from '../../../../../../../consts/subcomponentCssModes.enum'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createModalComponentPreviewStructure(
  baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties, layer1Component: SubcomponentProperties, layer2Component: SubcomponentProperties, layer3Component: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        subcomponentPreviewId: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_1,
        css: layer1Component.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal title',
          [SUB_COMPONENTS.CLOSE]: closeComponent,
        }
      },
      {
        subcomponentPreviewId: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_2,
        css: layer2Component.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal body text',
        }
      },
      {
        subcomponentPreviewId: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_3,
        css: layer3Component.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
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
