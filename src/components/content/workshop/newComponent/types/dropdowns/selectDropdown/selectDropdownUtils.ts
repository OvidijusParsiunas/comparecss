import { Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SelectDropdownText } from '../../../../../../../interfaces/dropdownFeatures';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';

export class SelectDropdownUtils {

  private static refreshItemTextState(dropdownBaseSubcomponent: Subcomponent, checkBeforeProceeding = true): void {
    const { customFeatures: { dropdown: { select }}, customStaticFeatures } = dropdownBaseSubcomponent;
    if (select.enabled || !checkBeforeProceeding) {
      customStaticFeatures.selectDropdownText.lastHoveredItemText = null;
      customStaticFeatures.selectDropdownText.lastSelectedItemText = null;
    }
  }

  public static refreshAllDropdowns(component: WorkshopComponent, checkBeforeProceeding = false): void {
    const { subcomponents } = component.masterComponent;
    const dropdownSubcomponentNames = Object.keys(subcomponents)
      .filter((subcomponentName) => subcomponents[subcomponentName].seedComponent.type === COMPONENT_TYPES.DROPDOWN);
    dropdownSubcomponentNames.forEach((dropdownSubcomponentName) => {
      SelectDropdownUtils.refreshItemTextState(component.masterComponent.subcomponents[dropdownSubcomponentName], checkBeforeProceeding);
    });
  }

  private static setMouseEventText(seedComponent: WorkshopComponent, selectDropdownText: SelectDropdownText,
      itemTextKey: keyof SelectDropdownText): void {
    if (seedComponent.type === COMPONENT_TYPES.LAYER) {
      const dropdownItemText = seedComponent.childComponentsLockedToThis[0].baseSubcomponent.customStaticFeatures.subcomponentText.text;
      selectDropdownText[itemTextKey] = dropdownItemText;
    }
  }

  private static setDetails(seedComponent: WorkshopComponent, itemTextKey: keyof SelectDropdownText, canBeUnset = false): void {
    const dropdownPaddingComponent = seedComponent.type === COMPONENT_TYPES.DROPDOWN
      ? seedComponent : seedComponent.containerComponent.linkedComponents.base.paddingComponent;
    const { customFeatures: { dropdown: { select } }, customStaticFeatures: { selectDropdownText }
      } = dropdownPaddingComponent.baseSubcomponent;
    if (select.enabled) {
      SelectDropdownUtils.setMouseEventText(seedComponent, selectDropdownText, itemTextKey);
    } else if (canBeUnset) {
      SelectDropdownUtils.refreshItemTextState(dropdownPaddingComponent.baseSubcomponent);
    }
  }

  public static setSelectDropdownLastHoveredItemText(subcomponent: Subcomponent): void {
    SelectDropdownUtils.setDetails(subcomponent.seedComponent, 'lastHoveredItemText');
  }

  public static setSelectDropdownText(subcomponent: Subcomponent): void {
    SelectDropdownUtils.setDetails(subcomponent.seedComponent, 'lastSelectedItemText', true);
  }

  public static setSelectDropdownAutoWidthToOff(subcomponent: Subcomponent): void {
    const buttonComponent = subcomponent.seedComponent.paddingComponentChild;
    const { autoSize } = buttonComponent.baseSubcomponent.customFeatures;
    if (autoSize) autoSize.width = false;
  }
  
  private static isSelected(paddingComponentBase: Subcomponent, text: string): boolean {
    const { customFeatures: { dropdown: { select } }, customStaticFeatures: { selectDropdownText: { lastSelectedItemText, lastHoveredItemText }}
      } = paddingComponentBase;
    return select?.enabled && lastSelectedItemText && text === lastHoveredItemText; 
  }

  public static isItemSelected(layer: Layer): boolean {
    const { containerComponent, childComponentsLockedToThis } = layer.subcomponent.seedComponent;
    if (containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return SelectDropdownUtils.isSelected(
        containerComponent.linkedComponents.base.baseSubcomponent,
        childComponentsLockedToThis[0].baseSubcomponent.customStaticFeatures.subcomponentText.text);
    }
    return false;
  }

  public static isTextSelected(component: WorkshopComponent): boolean {
    if (component.type === COMPONENT_TYPES.TEXT && component.containerComponent?.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return SelectDropdownUtils.isSelected(
        component.containerComponent.linkedComponents.base.paddingComponent.baseSubcomponent,
        component.baseSubcomponent.customStaticFeatures.subcomponentText.text);
    }
    return false;
  }
}
