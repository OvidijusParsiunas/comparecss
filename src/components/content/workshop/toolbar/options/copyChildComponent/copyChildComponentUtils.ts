import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { BUTTON_STYLES } from '../../../../../../consts/componentStyles.enum';

export class CopyChildComponentUtils {

  private static readonly SUBCOMPONENT_TYPES_TO_COPYABLE_TYPES = {
    [COMPONENT_TYPES.BUTTON]: new Set([COMPONENT_TYPES.BUTTON]),
    [COMPONENT_TYPES.DROPDOWN]: new Set([COMPONENT_TYPES.BUTTON]),
  };

  private static canActiveButtonSubcomponentCopy(buttonSubcomponent: SubcomponentProperties, activeComponent: WorkshopComponent): boolean {
    if (activeComponent.type === COMPONENT_TYPES.DROPDOWN) return !buttonSubcomponent.customFeatures.autoSize.width;
    if (buttonSubcomponent.seedComponent?.style === BUTTON_STYLES.CLOSE) return false;
    return buttonSubcomponent.seedComponent !== buttonSubcomponent.seedComponent.masterComponent;
  }

  public static isCopyOptionButtonDisplayed(activeComponent: WorkshopComponent): boolean {
    const activeSubcomponent = activeComponent.subcomponents[activeComponent.activeSubcomponentName];
    if (activeSubcomponent.subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return CopyChildComponentUtils.canActiveButtonSubcomponentCopy(activeSubcomponent, activeComponent);
    }
    return false;
  }

  public static isComponentCopyable(subjectCopyableComponent: WorkshopComponent, activeComponent: WorkshopComponent): boolean {
    if (subjectCopyableComponent !== activeComponent) {
      return CopyChildComponentUtils.SUBCOMPONENT_TYPES_TO_COPYABLE_TYPES[activeComponent.type]?.has(subjectCopyableComponent.type);
    }
    return false;
  }
}
