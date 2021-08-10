import { SelectDropdown as SelectDropdownI, SubcomponentMouseEventItemText } from '../../../../../../../interfaces/selectDropdown';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class SelectDropdownUtils {
  
  public static refresh(parentAuxiliaryComponent: WorkshopComponent, checkBeforeProceeding = false): void {
    const { selectDropdown } = parentAuxiliaryComponent?.coreSubcomponentRefs.base.customStaticFeatures || {};
    if (!checkBeforeProceeding || selectDropdown?.enabled) {
      selectDropdown.lastHoveredItemText = null;
      selectDropdown.lastSelectedItemText = null;
    }
  }

  private static setMouseEventText(parentAuxiliaryComponent: WorkshopComponent, subcomponentProperties: SubcomponentProperties,
      selectDropdown: SelectDropdownI, itemTextKey: keyof SubcomponentMouseEventItemText): void {
    // if dropdown item
    const { nestedComponent } = subcomponentProperties;
    if (nestedComponent) {
      const dropdownItemTextSubcomponentName = nestedComponent.ref.nestedComponentsLockedToLayer.list[0];
      const dropdownItemText = parentAuxiliaryComponent.coreBaseComponent.subcomponents[dropdownItemTextSubcomponentName]
        .customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(subcomponentProperties: SubcomponentProperties, itemTextKey: keyof SubcomponentMouseEventItemText, canBeUnset = false): void {
    const { parentAuxiliaryComponent } = subcomponentProperties;
    const { selectDropdown } = parentAuxiliaryComponent.coreSubcomponentRefs.base.customStaticFeatures;
    if (selectDropdown.enabled) {
      SelectDropdownUtils.setMouseEventText(parentAuxiliaryComponent, subcomponentProperties, selectDropdown, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refresh(parentAuxiliaryComponent);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastSelectedItemText', true);
  }
}
