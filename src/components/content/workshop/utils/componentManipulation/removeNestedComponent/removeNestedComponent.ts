import { RemoveTemporaryAddPreviewComponent } from './remove/removeTemporaryAddPreviewComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { RemoveAnyNestedComponent } from './remove/removeAnyNestedComponent';

export class RemoveNestedComponent {

  public static remove(currentlySelectedComponent: WorkshopComponent, isTemporaryAddPreview?: boolean): void {
    if (isTemporaryAddPreview) {
      // when removing an add preview component - the currently active subcomponent is the parent
      const activeComponent = ActiveComponentUtils.getActiveNestedComponentParent(currentlySelectedComponent);
      RemoveTemporaryAddPreviewComponent.remove(activeComponent);
    } else {
      // when removing an actual component - retrieve the parent component of the currently active subcomponent
      const { subcomponents, activeSubcomponentName } = currentlySelectedComponent;
      const activeComponentParent = subcomponents[activeSubcomponentName].nestedComponent.ref.nestedComponentParent;
      RemoveAnyNestedComponent.remove(activeComponentParent?.coreBaseComponent || activeComponentParent);
    }
  }
}