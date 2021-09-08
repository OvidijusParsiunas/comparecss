import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SelectDropdown } from '../../../../../../../interfaces/dropdownStaticFeatures';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SelectDropdownUtils } from '../selectDropdown/selectDropdownUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { plainLayer } from '../../layers/generators/plainLayer';
import { dropdownButtonBase } from './button/base';

class DropdownBase extends ComponentBuilder {

  private static createSelectDropdownProperties(): SelectDropdown {
    return {
      enabled: false,
      defaultText: 'Select',
      lastHoveredItemText: null,
      lastSelectedItemText: null,
      callback: SelectDropdownUtils.setSelectDropdownText,
    };
  }

  public static createStaticFeatures(overlayComponent: WorkshopComponent): void {
    const baseSubcomponent = overlayComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    baseSubcomponent.defaultCustomStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
  }

  public static overwriteCustomStaticFeatures(buttonComponent: WorkshopComponent, overlayComponent: WorkshopComponent): void {
    const overlayBaseSubcomponent = overlayComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customStaticFeatures = { dropdown: { select: overlayBaseSubcomponent.customStaticFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    baseSubcomponent.defaultCustomStaticFeatures = { dropdown: { select: overlayBaseSubcomponent.customStaticFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
    textSubcomponent.defaultCustomStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const overlayComponent = plainLayer.createNewComponent(baseName);
    overlayComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].subcomponentType = SUBCOMPONENT_TYPES.DROPDOWN;
    overlayComponent.type = COMPONENT_TYPES.DROPDOWN;
    const dropdownComponent = dropdownButtonBase.createNewComponent();
    // updated names
    DropdownBase.createStaticFeatures(overlayComponent);
    DropdownBase.overwriteCustomStaticFeatures(dropdownComponent, overlayComponent);
    Object.assign(overlayComponent.subcomponents, dropdownComponent.subcomponents);
    Object.assign(overlayComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, dropdownComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    overlayComponent.componentPreviewStructure.subcomponentDropdownStructure[overlayComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...dropdownComponent.componentPreviewStructure.subcomponentDropdownStructure };
    overlayComponent.paddingComponentChildren = dropdownComponent;
    return overlayComponent;
  },
}
