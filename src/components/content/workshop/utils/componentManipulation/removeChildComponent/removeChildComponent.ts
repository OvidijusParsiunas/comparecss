import { RemoveTemporaryAddPreviewComponent } from './remove/removeTemporaryAddPreviewComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { RemoveAnyChildComponent } from './remove/removeAnyChildComponent';

export class RemoveChildComponent {

  public static remove(masterComponent: WorkshopComponent, isTemporaryAddPreview?: boolean): void {
    if (isTemporaryAddPreview) {
      // when removing an add preview component - the currently active subcomponent is the parent
      const activeComponent = ActiveComponentUtils.getActiveSeedComponentParent(masterComponent);
      RemoveTemporaryAddPreviewComponent.remove(activeComponent);
    } else {
      // when removing an actual component - retrieve the parent component of the currently active subcomponent
      const { subcomponents, activeSubcomponentName } = masterComponent;
      const activeComponentParent = subcomponents[activeSubcomponentName].seedComponent.ref.parentComponent;
      RemoveAnyChildComponent.remove(activeComponentParent?.linkedComponents?.base || activeComponentParent, activeSubcomponentName, true);
    }
  }
}