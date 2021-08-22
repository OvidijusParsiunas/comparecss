import { SelectDropdown, SubcomponentMouseEventItemText } from '../../../../../../../interfaces/selectDropdown';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';

export class SelectDropdownUtils {
  
  public static refresh(parentBaseComponentRef: WorkshopComponent, checkBeforeProceeding = false): void {
    const { selectDropdown } = parentBaseComponentRef?.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    if (!checkBeforeProceeding || selectDropdown?.enabled) {
      selectDropdown.lastHoveredItemText = null;
      selectDropdown.lastSelectedItemText = null;
    }
  }

  private static setMouseEventText(subcomponentProperties: SubcomponentProperties, selectDropdown: SelectDropdown,
      itemTextKey: keyof SubcomponentMouseEventItemText): void {
    const { nestedComponentsLockedToLayer } = subcomponentProperties.nestedComponent.ref;
    if (nestedComponentsLockedToLayer) {
      const dropdownItemText = nestedComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(subcomponentProperties: SubcomponentProperties, itemTextKey: keyof SubcomponentMouseEventItemText, canBeUnset = false): void {
    const { parentBaseComponentRef } = subcomponentProperties;
    const { selectDropdown } = parentBaseComponentRef.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures;
    if (selectDropdown.enabled) {
      SelectDropdownUtils.setMouseEventText(subcomponentProperties, selectDropdown, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refresh(parentBaseComponentRef);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastSelectedItemText', true);
  }
}
