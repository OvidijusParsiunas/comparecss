import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class AddChildComponentOverlay {

  private static displayPaddingComponentChildren(paddingComponentChild: WorkshopComponent): void {
    paddingComponentChild.baseSubcomponent.isTemporaryAddPreview = true;
    paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliaryComponent) => {
      auxiliaryComponent.baseSubcomponent.isTemporaryAddPreview = true;
    });
  }

  public static display(newComponent: WorkshopComponent): void {
    newComponent.baseSubcomponent.isTemporaryAddPreview = true;
    if (newComponent.paddingComponentChild) {
      AddChildComponentOverlay.displayPaddingComponentChildren(newComponent.paddingComponentChild);
    }
  }
}
