import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SiblingSubcomponentTypes } from '../../../../../../interfaces/siblingChildComponentsAutoSynced';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { BUTTON_STYLES } from '../../../../../../consts/componentStyles.enum';

export type SyncableSubcomponentTraversalCallback = (
  subcomponent: SubcomponentProperties, siblingSubcomponentTypes?: SiblingSubcomponentTypes) => void;

export class SyncChildComponentUtils {

  public static getParentComponentWithOtherComponentsSyncedToIt(component: WorkshopComponent): WorkshopComponent {
    const { containerComponents } = component.sync.syncables;
    const parentComponents = (containerComponents[0] === component) ? containerComponents.slice(1) : containerComponents;
    return parentComponents.find((parentComponent) => parentComponent.sync.componentsSyncedToThis.size);
  }

  // traverses all components that could be synced to another component
  // starting from the target component all the way to its top parent component
  public static getCurrentOrParentComponentThatIsInSync(component: WorkshopComponent): WorkshopComponent {
    return component.sync.syncables.containerComponents.find((reference) => reference.sync.componentThisIsSyncedTo);
  }

  private static canSeedComponentBeOverwrittenBySynced(activeSubcomponent: SubcomponentProperties): boolean {
    return activeSubcomponent.seedComponent !== activeSubcomponent.seedComponent.masterComponent;
  }

  private static canButtonBeOverwrittenBySynced(buttonSubcomponent: SubcomponentProperties): boolean {
    if (buttonSubcomponent.seedComponent.style === BUTTON_STYLES.CLOSE) return false;
    if (buttonSubcomponent.seedComponent.paddingComponent?.type === COMPONENT_TYPES.DROPDOWN) {
      return !buttonSubcomponent.seedComponent.paddingComponent.sync.componentThisIsSyncedTo;
    }
    return SyncChildComponentUtils.canSeedComponentBeOverwrittenBySynced(buttonSubcomponent);
  }

  public static isSyncOptionButtonDisplayed(activeComponent: WorkshopComponent): boolean {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    if (activeSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return SyncChildComponentUtils.canButtonBeOverwrittenBySynced(activeSubcomponent);
    } else if (activeSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.DROPDOWN) {
      return SyncChildComponentUtils.canSeedComponentBeOverwrittenBySynced(activeSubcomponent);
    }
    return false;
  }

  public static isComponentSyncable(subjectSyncableComponent: WorkshopComponent, activeComponent: WorkshopComponent): boolean {
    if (subjectSyncableComponent !== activeComponent) {
      return activeComponent.type === subjectSyncableComponent.type;
    }
    return false;
  }

  public static callFuncOnSyncableSubcomponents(callback: SyncableSubcomponentTraversalCallback, childComponent: WorkshopComponent,
      siblingSubcomponentTypes?: SiblingSubcomponentTypes): void {
    const syncableSubcomponents = childComponent.sync.syncables.onCopy?.subcomponents;
    if (syncableSubcomponents) {
      Object.keys(syncableSubcomponents).forEach((subcomponentType) => {
        const subcomponent = syncableSubcomponents[subcomponentType];
        if (subcomponent) callback(subcomponent, siblingSubcomponentTypes);
      });
    } else {
      callback(childComponent.baseSubcomponent, siblingSubcomponentTypes);
    }
  }
}
