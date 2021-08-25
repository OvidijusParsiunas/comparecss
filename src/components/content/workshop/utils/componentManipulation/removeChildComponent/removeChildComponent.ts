import { RemoveTemporaryAddPreviewComponent } from './remove/removeTemporaryAddPreviewComponent';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../activeComponent/activeComponentUtils';
import { RemoveAnyChildComponent } from './remove/removeAnyChildComponent';

export class RemoveChildComponent {

  public static remove(masterComponent: WorkshopComponent, isTemporaryAddPreview?: boolean): void {
    if (isTemporaryAddPreview) {
      // when removing a temporary add preview component - the currently active component is the container component
      const activeComponent = ActiveComponentUtils.getActiveContainerComponent(masterComponent);
      RemoveTemporaryAddPreviewComponent.remove(activeComponent);
    } else {
      // when removing an actual component - retrieve the container component of the currently active component
      const { subcomponents, activeSubcomponentName } = masterComponent;
      const activeContainerComponent = subcomponents[activeSubcomponentName].seedComponent.ref.containerComponent;
      RemoveAnyChildComponent.remove(
        activeContainerComponent?.linkedComponents?.base || activeContainerComponent, activeSubcomponentName, true);
    }
  }
}