import { CopyNestedComponentModeTempPropertiesUtils } from './copyNestedComponentModeTempPropertiesUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class CopyNestedComponentModeCardEvents {

  public static mouseClick(workshopComponent: ComponentOptions, componentToBeCopied: WorkshopComponent): void {
    CopyNestedComponentModeTempPropertiesUtils.setActiveComponentToCopyNestedComponent(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    CopyNestedComponentModeTempPropertiesUtils.setLastSelectectedComponentToCopy(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlySelectedComponentForCopyNested = componentToBeCopied;
  }

  public static mouseEnter(workshopComponent: ComponentOptions, componentToBeCopied: WorkshopComponent): void {
    // the condition is a bug fix as when the copy nested component mode is toggled on, during the component list animation the user can hover over a modal card
    if (workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .seedComponent.ref.type !== componentToBeCopied.type) return;
    CopyNestedComponentModeTempPropertiesUtils.setActiveComponentToCopyNestedComponent(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlyHoveredComponentForCopyNested = componentToBeCopied;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedComponentForCopyNested, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedComponentForCopyNested) {
      CopyNestedComponentModeTempPropertiesUtils.setActiveComponentToCopyNestedComponent(currentlySelectedComponentForCopyNested, currentlySelectedComponent);
    } else {
      CopyNestedComponentModeTempPropertiesUtils.cleanComponent(currentlySelectedComponent, true);
    }
  }
}
