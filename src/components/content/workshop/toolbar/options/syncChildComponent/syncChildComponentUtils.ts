import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { BUTTON_STYLES } from '../../../../../../consts/componentStyles.enum';

export class SyncChildComponentUtils {

  private static getPaddingComponent(component: WorkshopComponent): WorkshopComponent {
    return component?.paddingComponent || component?.linkedComponents?.base?.paddingComponent;
  }

  private static getPaddingComponentWithCondition(component: WorkshopComponent): WorkshopComponent {
    const paddingComponent = SyncChildComponentUtils.getPaddingComponent(component) || SyncChildComponentUtils.getPaddingComponent(component.containerComponent);
    return paddingComponent?.sync.componentsSyncedToThis.size ? paddingComponent : null;
  }

  public static getParentComponentWithOtherComponentsSyncedToIt(component: WorkshopComponent): WorkshopComponent {
    if (component.containerComponent?.sync.componentsSyncedToThis.size) {
      return component.containerComponent;
    }
    return SyncChildComponentUtils.getPaddingComponentWithCondition(component);
  }

  // traverses all components that could be synced to another component
  // starting from the target component all the way to its top parent component
  public static getComponentTheTargetOrItsParentIsSyncedTo(component: WorkshopComponent): WorkshopComponent {
    return component.sync.parentComponentsThatCanBeSynced.find((reference) => reference.sync.componentThisIsSyncedTo);
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
}
