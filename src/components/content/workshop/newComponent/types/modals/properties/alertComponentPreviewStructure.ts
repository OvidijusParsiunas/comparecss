import { ComponentPreviewStructure, SubcomponentProperties } from '../../../../../../../interfaces/workshopComponent'
import { PSEUDO_COMPONENTS } from '../../../../../../../consts/pseudoComponents.enum'
import { SUB_COMPONENTS } from '../../../../../../../consts/subcomponentModes.enum'

export default function createAlertComponentPreviewStructure(baseComponent: SubcomponentProperties, closeComponent: SubcomponentProperties): ComponentPreviewStructure {
  return {
    baseCss: baseComponent,
    layeringType: 'vertical',
    layers: [
      {
        [PSEUDO_COMPONENTS.TEXT]: 'Alert',
        [SUB_COMPONENTS.CLOSE]: closeComponent,
      },
    ],
  }
}
