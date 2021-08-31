import { SelectDropdown, SubcomponentMouseEventItemText } from '../../../../../../../interfaces/selectDropdown';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';

export class SelectDropdownUtils {
  
  public static refresh(components: WorkshopComponent, checkBeforeProceeding = false): void {
    const { selectDropdown } = components.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures || {};
    if (selectDropdown && (selectDropdown.enabled || !checkBeforeProceeding)) {
      selectDropdown.lastHoveredItemText = null;
      selectDropdown.lastSelectedItemText = null;
    }
  }

  private static setMouseEventText(seedComponent: WorkshopComponent, selectDropdown: SelectDropdown,
      itemTextKey: keyof SubcomponentMouseEventItemText): void {
    if (seedComponent.type === COMPONENT_TYPES.LAYER) {
      const dropdownItemText = seedComponent.childComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(subcomponentProperties: SubcomponentProperties, itemTextKey: keyof SubcomponentMouseEventItemText, canBeUnset = false): void {
    const seedComponent = subcomponentProperties.seedComponent;
    const containerComponent = seedComponent.containerComponent || seedComponent;
    const menuComponent = containerComponent.linkedComponents?.base || containerComponent;
    const { selectDropdown } = menuComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures;
    if (selectDropdown.enabled) {
      SelectDropdownUtils.setMouseEventText(seedComponent, selectDropdown, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refresh(menuComponent);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties, 'lastSelectedItemText', true);
  }
}
