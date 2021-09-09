import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class AddChildComponentOverlay {

  private static displayPaddingComponentChildren(paddingComponentChild: WorkshopComponent): void {
    paddingComponentChild.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliaryComponent) => {
      auxiliaryComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    });
  }

  public static display(newComponent: WorkshopComponent): void {
    newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].isTemporaryAddPreview = true;
    if (newComponent.paddingComponentChild) {
      AddChildComponentOverlay.displayPaddingComponentChildren(newComponent.paddingComponentChild);
    }
  }
}
