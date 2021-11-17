import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class ButtonGroupGenericUtils {
  
  public static INDIVIDUAL_BUTTON_ALIGNED_SECTION = HORIZONTAL_ALIGNMENT_SECTIONS.LEFT;

  public static getAllButtonComponents(buttonGroupBaseComponent: WorkshopComponent): WorkshopComponent[] {
    const baseSubcomponents = buttonGroupBaseComponent.componentPreviewStructure.layers[0]
      .alignmentSectionToSubcomponents[ButtonGroupGenericUtils.INDIVIDUAL_BUTTON_ALIGNED_SECTION];
    return baseSubcomponents.map((button) => button.seedComponent);
  }
}
