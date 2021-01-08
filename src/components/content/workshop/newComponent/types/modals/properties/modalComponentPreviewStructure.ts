import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'
import { SUB_COMPONENT_PREVIEW_ELEMENT_IDS } from '@/consts/subcomponentPreviewElementIds.enum'

export default function createAlertComponentPreviewStructure(
  baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties, layer1Component?: SubcomponentProperties, layer2Component?: SubcomponentProperties, layer3Component?: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        id: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_1,
        css: layer1Component,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal title',
          [SUB_COMPONENTS.CLOSE]: closeComponent,
        }
      },
      {
        id: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_2,
        css: layer2Component,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal body text',
        }
      },
      {
        id: SUB_COMPONENT_PREVIEW_ELEMENT_IDS.LAYER_3,
        css: layer3Component,
        subcomponents: {
          [PSEUDO_COMPONENTS.TEXT]: 'Modal footer',
        }
      },
    ],
  }
}
