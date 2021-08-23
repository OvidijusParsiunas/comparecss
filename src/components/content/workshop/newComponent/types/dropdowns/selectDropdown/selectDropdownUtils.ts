import { SelectDropdown, SubcomponentMouseEventItemText } from '../../../../../../../interfaces/selectDropdown';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class SelectDropdownUtils {
  
  public static refresh(components: WorkshopComponent[], checkBeforeProceeding = false): void {
    const menuComponent = (components || []).find((component) => component.type === COMPONENT_TYPES.DROPDOWN_MENU);
    if (!menuComponent) return;
    const { selectDropdown } = menuComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures;
    if (!checkBeforeProceeding || selectDropdown.enabled) {
      selectDropdown.lastHoveredItemText = null;
      selectDropdown.lastSelectedItemText = null;
    }
  }

  private static setMouseEventText(nestedComponent: WorkshopComponent, selectDropdown: SelectDropdown,
      itemTextKey: keyof SubcomponentMouseEventItemText): void {
    if (nestedComponent.type === COMPONENT_TYPES.LAYER) {
      const dropdownItemText = nestedComponent.nestedComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(subcomponentProperties: SubcomponentProperties, itemTextKey: keyof SubcomponentMouseEventItemText, canBeUnset = false): void {
    const nestedComponent = subcomponentProperties.nestedComponent.ref;
    const menuComponent = nestedComponent.nestedComponentParent || nestedComponent;
    const { selectDropdown } = menuComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures;
    if (selectDropdown.enabled) {
      SelectDropdownUtils.setMouseEventText(nestedComponent, selectDropdown, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refresh([menuComponent]);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastSelectedItemText', true);
  }
}
