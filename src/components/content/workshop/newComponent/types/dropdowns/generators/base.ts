import { UpdatePaddingComponentDropdownOptions } from '../../../../utils/componentManipulation/updateChildComponent/updatePaddingComponentDropdownOptionNames';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SelectDropdown } from '../../../../../../../interfaces/dropdownStaticFeatures';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
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

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  public static overwriteCustomFeatures(paddingComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    paddingBaseSubcomponent.customFeatures = DropdownBase.createDefaultCustomFeatures();
    paddingBaseSubcomponent.defaultCustomFeatures = DropdownBase.createDefaultCustomFeatures();
  }

  public static createStaticFeatures(paddingComponent: WorkshopComponent): void {
    const baseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    baseSubcomponent.defaultCustomStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
  }

  public static overwriteCustomStaticFeatures(buttonComponent: WorkshopComponent, paddingComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customStaticFeatures = { dropdown: { select: paddingBaseSubcomponent.customStaticFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    baseSubcomponent.defaultCustomStaticFeatures = { dropdown: { select: paddingBaseSubcomponent.customStaticFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
    textSubcomponent.defaultCustomStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const paddingComponent = plainLayer.createNewComponent(baseName);
    paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].subcomponentType = SUBCOMPONENT_TYPES.DROPDOWN;
    paddingComponent.type = COMPONENT_TYPES.DROPDOWN;
    DropdownBase.overwriteCustomFeatures(paddingComponent);
    const buttonComponent = dropdownButtonBase.createNewComponent();
    UpdatePaddingComponentDropdownOptions.updatePaddingComponentChildren(buttonComponent);
    DropdownBase.createStaticFeatures(paddingComponent);
    DropdownBase.overwriteCustomStaticFeatures(buttonComponent, paddingComponent);
    Object.assign(buttonComponent.subcomponents, paddingComponent.subcomponents);
    paddingComponent.subcomponents = buttonComponent.subcomponents;
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, paddingComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    paddingComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName;
    paddingComponent.componentPreviewStructure.subcomponentDropdownStructure[paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...buttonComponent.componentPreviewStructure.subcomponentDropdownStructure };
    paddingComponent.paddingComponentChild = buttonComponent;
    buttonComponent.paddingComponent = paddingComponent;
    return paddingComponent;
  },
}
