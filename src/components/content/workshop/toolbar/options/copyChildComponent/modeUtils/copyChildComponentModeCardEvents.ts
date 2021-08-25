import { CopyChildComponentModeTempPropertiesUtils } from './copyChildComponentModeTempPropertiesUtils';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentOptions } from 'vue';

export class CopyChildComponentModeCardEvents {

  public static mouseClick(workshopComponent: ComponentOptions, componentToBeCopied: WorkshopComponent): void {
    CopyChildComponentModeTempPropertiesUtils.setActiveComponentToCopyChildComponent(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    CopyChildComponentModeTempPropertiesUtils.setLastSelectectedComponentToCopy(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlySelectedComponentForCopyChild = componentToBeCopied;
  }

  public static mouseEnter(workshopComponent: ComponentOptions, componentToBeCopied: WorkshopComponent): void {
    // the condition is a bug fix as when the copy child component mode is toggled on, during the component list animation the user can hover over a modal card
    if (workshopComponent.currentlySelectedComponent.subcomponents[workshopComponent.currentlySelectedComponent.activeSubcomponentName]
      .seedComponent.ref.type !== componentToBeCopied.type) return;
    CopyChildComponentModeTempPropertiesUtils.setActiveComponentToCopyChildComponent(componentToBeCopied, workshopComponent.currentlySelectedComponent);
    workshopComponent.currentlyHoveredComponentForCopyChild = componentToBeCopied;
  }
  
  public static mouseLeave(workshopComponent: ComponentOptions): void {
    const { currentlySelectedComponentForCopyChild, currentlySelectedComponent } = workshopComponent;
    if (currentlySelectedComponentForCopyChild) {
      CopyChildComponentModeTempPropertiesUtils.setActiveComponentToCopyChildComponent(currentlySelectedComponentForCopyChild, currentlySelectedComponent);
    } else {
      CopyChildComponentModeTempPropertiesUtils.cleanComponent(currentlySelectedComponent, true);
    }
  }
}