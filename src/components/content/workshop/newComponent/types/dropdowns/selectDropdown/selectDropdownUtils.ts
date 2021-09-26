import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { SelectedDropdownText } from '../../../../../../../interfaces/dropdownFeatures';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class SelectDropdownUtils {

  private static refreshItemTextState(dropdownBaseSubcomponent: SubcomponentProperties, checkBeforeProceeding: boolean): void {
    const { customFeatures: { dropdown: { select }}, customStaticFeatures } = dropdownBaseSubcomponent;
    if (select.enabled || !checkBeforeProceeding) {
      customStaticFeatures.dropdownSelectedText.lastHoveredItemText = null;
      customStaticFeatures.dropdownSelectedText.lastSelectedItemText = null;
    }
  }

  public static refresh(component: WorkshopComponent, checkBeforeProceeding = false): void {
    const { subcomponents } = component.masterComponent;
    const dropdownSubcomponentNames = Object.keys(subcomponents)
      .filter((subcomponentName) => subcomponents[subcomponentName].seedComponent.type === COMPONENT_TYPES.DROPDOWN);
    dropdownSubcomponentNames.forEach((dropdownSubcomponentName) => {
      SelectDropdownUtils.refreshItemTextState(component.masterComponent.subcomponents[dropdownSubcomponentName], checkBeforeProceeding);
    });
  }

  private static setMouseEventText(seedComponent: WorkshopComponent, selectDropdown: SelectedDropdownText,
      itemTextKey: keyof SelectedDropdownText): void {
    if (seedComponent.type === COMPONENT_TYPES.LAYER) {
      const dropdownItemText = seedComponent.childComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text;
      selectDropdown[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(seedComponent: WorkshopComponent, itemTextKey: keyof SelectedDropdownText, canBeUnset = false): void {
    const dropdownPaddingComponent = seedComponent.type === COMPONENT_TYPES.DROPDOWN
      ? seedComponent : seedComponent.containerComponent.linkedComponents.base.paddingComponent;
    const { customFeatures: { dropdown: { select } }, customStaticFeatures: { dropdownSelectedText }
      } = dropdownPaddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    if (select.enabled) {
      SelectDropdownUtils.setMouseEventText(seedComponent, dropdownSelectedText, itemTextKey);
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

  private static isSelected(paddingComponentBase: SubcomponentProperties, text: string): boolean {
    const { customFeatures: { dropdown: { select } }, customStaticFeatures: { dropdownSelectedText: { lastSelectedItemText, lastHoveredItemText }}
      } = paddingComponentBase;
    return select?.enabled && lastSelectedItemText && text === lastHoveredItemText; 
  }

  public static isItemSelected(layer: Layer): boolean {
    const { containerComponent, childComponentsLockedToLayer } = layer.subcomponentProperties.seedComponent;
    if (containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return SelectDropdownUtils.isSelected(
        containerComponent.linkedComponents.base.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
        childComponentsLockedToLayer.list[0].customStaticFeatures.subcomponentText.text);
    }
    return false;
  }


  public static isTextSelected(component: WorkshopComponent): boolean {
    if (component.type === COMPONENT_TYPES.TEXT && component.containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return SelectDropdownUtils.isSelected(
        component.containerComponent.linkedComponents.base.paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
        component.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customStaticFeatures.subcomponentText.text);
    }
    return false;
  }
}
