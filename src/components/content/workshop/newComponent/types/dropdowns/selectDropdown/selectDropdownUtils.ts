import { SelectDropdown, SubcomponentMouseEventItemText } from '../../../../../../../interfaces/dropdownStaticFeatures';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class SelectDropdownUtils {
  
  public static refresh(components: WorkshopComponent, checkBeforeProceeding = false): void {
    const { select } = components.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures?.dropdown || {};
    if (select && (select.enabled || !checkBeforeProceeding)) {
      select.lastHoveredItemText = null;
      select.lastSelectedItemText = null;
    }
  }

  private static setMouseEventText(seedComponent: WorkshopComponent, selectDropdown: SelectDropdown,
      itemTextKey: keyof SubcomponentMouseEventItemText): void {
    if (seedComponent.type === COMPONENT_TYPES.LAYER) {
      const dropdownItemText = seedComponent.childComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(seedComponent: WorkshopComponent, itemTextKey: keyof SubcomponentMouseEventItemText, canBeUnset = false): void {
    const dropdownPaddingComponent = seedComponent.type === COMPONENT_TYPES.DROPDOWN
      ? seedComponent : seedComponent.containerComponent.linkedComponents.base.paddingComponent;
    const { select } = dropdownPaddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures?.dropdown;
    if (select.enabled) {
      SelectDropdownUtils.setMouseEventText(seedComponent, select, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refresh(dropdownPaddingComponent);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties.seedComponent, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponentProperties: SubcomponentProperties): void {
    SelectDropdownUtils.setDetails(subcomponentProperties.seedComponent, 'lastSelectedItemText', true);
  }

  public static isItemSelected(layer: Layer): boolean {
    const { containerComponent, childComponentsLockedToLayer } = layer.subcomponentProperties.seedComponent;
    if (containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      const { select } = containerComponent.linkedComponents.base.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.dropdown;
      return select?.enabled && select.lastSelectedItemText
        && childComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text === select.lastHoveredItemText; 
    }
    return false;
  }


  public static isTextSelected(component: WorkshopComponent): boolean {
    if (component.type === COMPONENT_TYPES.TEXT && component.containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      const { select } = component.containerComponent.linkedComponents.base.paddingComponent
        .coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.dropdown;
      return select?.enabled && select.lastSelectedItemText
        && select.lastHoveredItemText === component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.subcomponentText.text;
    }
    return false;
  }
}
