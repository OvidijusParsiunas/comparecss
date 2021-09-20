import { UpdatePaddingComponentDropdownOptions } from '../../../../utils/componentManipulation/updateChildComponent/updatePaddingComponentDropdownOptionNames';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CustomFeatures, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { SelectDropdown } from '../../../../../../../interfaces/dropdownFeatures';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SelectDropdownUtils } from '../selectDropdown/selectDropdownUtils';
import { DropdownItemLayer } from '../../layers/generators/dropdownItem';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { plainLayer } from '../../layers/generators/plainLayer';
import { dropdownButtonBase } from './button/base';

class DropdownBase extends ComponentBuilder {

  private static setAllItemAndItemTextComponentsToBeInSync(component: WorkshopComponent): void {
    const menuComponent = component.paddingComponentChild.linkedComponents
      .auxiliary[0].coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].seedComponent;
    const firstLayerSubcomponentProperties = menuComponent.componentPreviewStructure.layers[0].subcomponentProperties;
    menuComponent.componentPreviewStructure.layers.forEach((layer) => {
      layer.subcomponentProperties.customCss = firstLayerSubcomponentProperties.customCss;
      layer.subcomponentProperties.customFeatures = firstLayerSubcomponentProperties.customFeatures;
      DropdownItemLayer.setTextSubcomponentProperties
        .bind(menuComponent)(layer.subcomponentProperties.seedComponent.childComponentsLockedToLayer.list[0].seedComponent);
    });
  }

  public static setAndExecutePropertyOverwritingExecutables(paddingComponent: WorkshopComponent): void {
    paddingComponent.propertyOverwritingExecutables = [DropdownBase.setAllItemAndItemTextComponentsToBeInSync];
    DropdownBase.setAllItemAndItemTextComponentsToBeInSync(paddingComponent);
  }

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
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    paddingBaseSubcomponent.customFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    paddingBaseSubcomponent.defaultCustomFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
  }

  public static overwriteButtonCustomFeatures(buttonComponent: WorkshopComponent, paddingComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    baseSubcomponent.defaultCustomFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customFeatures.dropdown = { select: baseSubcomponent.customFeatures.dropdown.select };
    textSubcomponent.defaultCustomFeatures.dropdown = { select: baseSubcomponent.customFeatures.dropdown.select };
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
    DropdownBase.overwriteButtonCustomFeatures(buttonComponent, paddingComponent);
    Object.assign(buttonComponent.subcomponents, paddingComponent.subcomponents);
    paddingComponent.subcomponents = buttonComponent.subcomponents;
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, paddingComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    paddingComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName;
    paddingComponent.componentPreviewStructure.subcomponentDropdownStructure[paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...buttonComponent.componentPreviewStructure.subcomponentDropdownStructure };
    paddingComponent.paddingComponentChild = buttonComponent;
    buttonComponent.paddingComponent = paddingComponent;
    DropdownBase.setAndExecutePropertyOverwritingExecutables(paddingComponent);
    return paddingComponent;
  },
}
