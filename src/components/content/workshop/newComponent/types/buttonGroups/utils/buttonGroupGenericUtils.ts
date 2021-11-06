import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupGenericUtils {
  
  public static BUTTONS_ALIGNED_SECTION_TYPE = ALIGNED_SECTION_TYPES.LEFT;

  public static getAllButtonComponents(buttonGroupBaseComponent: WorkshopComponent): WorkshopComponent[] {
    const baseSubcomponentRefs = buttonGroupBaseComponent.componentPreviewStructure.layers[0]
      .sections.alignedSections[ButtonGroupGenericUtils.BUTTONS_ALIGNED_SECTION_TYPE];
    return baseSubcomponentRefs.map((button) => button.subcomponentProperties.seedComponent);
  }
}
