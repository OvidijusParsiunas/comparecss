import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { BUTTON_STYLES } from '../../../../../../consts/componentStyles.enum';

export class CopyChildComponentUtils {

  private static canSeedComponentBeOverwrittenByCopy(activeSubcomponent: SubcomponentProperties): boolean {
    return activeSubcomponent.seedComponent !== activeSubcomponent.seedComponent.masterComponent;
  }

  private static canButtonBeOverwrittenByCopy(buttonSubcomponent: SubcomponentProperties): boolean {
    if (buttonSubcomponent.seedComponent.style === BUTTON_STYLES.CLOSE) return false;
    if (buttonSubcomponent.seedComponent.paddingComponent?.type === COMPONENT_TYPES.DROPDOWN) {
      return !buttonSubcomponent.seedComponent.paddingComponent.sync.componentThisIsSyncedTo;
    }
    return CopyChildComponentUtils.canSeedComponentBeOverwrittenByCopy(buttonSubcomponent);
  }

  public static isCopyOptionButtonDisplayed(activeComponent: WorkshopComponent): boolean {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    if (activeSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return CopyChildComponentUtils.canButtonBeOverwrittenByCopy(activeSubcomponent);
    } else if (activeSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.DROPDOWN) {
      return CopyChildComponentUtils.canSeedComponentBeOverwrittenByCopy(activeSubcomponent);
    }
    return false;
  }

  public static isComponentCopyable(subjectCopyableComponent: WorkshopComponent, activeComponent: WorkshopComponent): boolean {
    if (subjectCopyableComponent !== activeComponent) {
      return activeComponent.type === subjectCopyableComponent.type;
    }
    return false;
  }
}
