import { SyncChildComponentModeCardEvents } from '../../../toolbar/options/syncChildComponent/modeUtils/syncChildComponentModeCardEvents';
import { Subcomponent, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { PaddingComponentUtils } from './paddingComponentUtils';
import ComponentJs from '../componentJs/componentJs';
import { ComponentOptions } from 'vue';

export class SetActiveComponentUtils {

  public static setActiveSubcomponent(component: WorkshopComponent, newActiveSubcomponentName: string, isDefault = false): void {
    component.activeSubcomponentName = newActiveSubcomponentName;
    PaddingComponentUtils.setActiveSubcomponent(component, newActiveSubcomponentName, isDefault);
  }

  private static resetComponentModes(previousComponent: WorkshopComponent): void {
    if (!previousComponent) return;
    SetActiveComponentUtils.setActiveSubcomponent(previousComponent, previousComponent.defaultSubcomponentName, true);
    Object.keys(previousComponent.subcomponents).forEach((key) => {
      const subcomponent: Subcomponent = previousComponent.subcomponents[key];
      subcomponent.activeCssPseudoClassesDropdownItem = subcomponent.defaultCssPseudoClassesDropdownItem;
    });
  }

  public static switchActiveComponent(workshopComponent: ComponentOptions, component: WorkshopComponent): void {
    SetActiveComponentUtils.resetComponentModes(workshopComponent.currentlySelectedComponent);
    if (workshopComponent.currentlySelectedComponent && workshopComponent.currentlySelectedComponent.type !== component.type) {
      ComponentJs.manipulateJSClasses(workshopComponent.currentlySelectedComponent.type, 'revokeJS');
    }
    workshopComponent.currentlySelectedComponent = component;
    ComponentJs.manipulateJSClasses(workshopComponent.currentlySelectedComponent.type, 'initializeJS');
    workshopComponent.$refs.toolbar.updateToolbarForNewComponent();
  }

  public static setActiveComponent(workshopComponent: ComponentOptions, component?: WorkshopComponent): void {
    if (workshopComponent.$refs.contents.isFullPreviewModeOn) {
      workshopComponent.componentSelectedBeforeFadeAnimation = component;
      return;
    }
    if (workshopComponent.componentSelectedBeforeFadeAnimation) {
      component = workshopComponent.componentSelectedBeforeFadeAnimation;
      workshopComponent.componentSelectedBeforeFadeAnimation = null;
    }
    if (!component) return;
    if (workshopComponent.isSyncChildComponentModeActive) {
      SyncChildComponentModeCardEvents.mouseClick(workshopComponent, component);
    } else if (workshopComponent.currentlySelectedComponent !== component) {
      SetActiveComponentUtils.switchActiveComponent(workshopComponent, component);
    }
    workshopComponent.currentlySelectedComponent.onComponentDisplayFunc?.(workshopComponent.currentlySelectedComponent);
  }
}
