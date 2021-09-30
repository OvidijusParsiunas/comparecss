import { UpdatePaddingComponentDropdownItemNames } from '../../../../utils/componentManipulation/updateChildComponent/updatePaddingComponentDropdownItemNames';
import { CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SelectedDropdownText, SelectDropdown } from '../../../../../../../interfaces/dropdownFeatures';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { SelectDropdownUtils } from '../selectDropdown/selectDropdownUtils';
import { DropdownItemLayer } from '../../layers/generators/dropdownItem';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { plainLayer } from '../../layers/generators/plainLayer';
import { dropdownButtonBase } from './button/base';

class DropdownBase extends ComponentBuilder {

  // will need to be placed in the same class as the one in DropdownButton
  private static overwriteButtonCustomFeatures(paddingComponent: WorkshopComponent): void {
    const buttonComponent = paddingComponent.paddingComponentChild;
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    baseSubcomponent.defaultCustomFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    baseSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    baseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select };
    textSubcomponent.defaultCustomFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select };
    textSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    textSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
  }

  // custom properties references are instead shared on new layer additions by areLayersInSyncByDefault, however
  // when existing layers are copied - this method sets them in sync 
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
    paddingComponent.propertyOverwritingExecutables = [
      DropdownBase.setAllItemAndItemTextComponentsToBeInSync,
      DropdownBase.overwriteButtonCustomFeatures];
    DropdownBase.overwriteButtonCustomFeatures(paddingComponent);
  }
  
  public static setCopyableSubcomponents(dropdownComponent: WorkshopComponent): void {
    const { coreSubcomponentRefs } = dropdownComponent;
    dropdownComponent.sync.copyables = {
      subcomponents: {
        [SUBCOMPONENT_TYPES.BASE]: coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
      },
      childComponents: [dropdownComponent.paddingComponentChild, dropdownComponent.paddingComponentChild.linkedComponents.auxiliary[0]],
    };
  }

  private static createSelectDropdownTextProperties(): SelectedDropdownText {
    return {
      defaultText: 'Select',
      lastHoveredItemText: null,
      lastSelectedItemText: null,
    };
  }

  private static createSelectDropdownProperties(): SelectDropdown {
    return {
      enabled: false,
      callback: SelectDropdownUtils.setSelectDropdownText,
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
      dropdownSelectedText: DropdownBase.createSelectDropdownTextProperties(),
    };
  }

  public static overwriteStaticFeatures(paddingBaseSubcomponent: SubcomponentProperties): void {
    paddingBaseSubcomponent.customStaticFeatures = DropdownBase.createDefaultCustomStaticFeatures();
    paddingBaseSubcomponent.defaultCustomStaticFeatures = DropdownBase.createDefaultCustomStaticFeatures();
  }

  public static overwriteCustomFeatures(paddingBaseSubcomponent: SubcomponentProperties): void {
    paddingBaseSubcomponent.customFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    paddingBaseSubcomponent.defaultCustomFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
  }

  public static overwriteBase(paddingComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    DropdownBase.overwriteCustomFeatures(paddingBaseSubcomponent);
    DropdownBase.overwriteStaticFeatures(paddingBaseSubcomponent);
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const paddingComponent = plainLayer.createNewComponent(baseName);
    paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].subcomponentType = SUBCOMPONENT_TYPES.DROPDOWN;
    paddingComponent.type = COMPONENT_TYPES.DROPDOWN;
    const buttonComponent = dropdownButtonBase.createNewComponent();
    UpdatePaddingComponentDropdownItemNames.updatePaddingComponentChildren(buttonComponent);
    DropdownBase.overwriteBase(paddingComponent);
    Object.assign(buttonComponent.subcomponents, paddingComponent.subcomponents);
    paddingComponent.subcomponents = buttonComponent.subcomponents;
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownItemName, paddingComponent.componentPreviewStructure.subcomponentNameToDropdownItemName);
    paddingComponent.componentPreviewStructure.subcomponentNameToDropdownItemName = buttonComponent.componentPreviewStructure.subcomponentNameToDropdownItemName;
    paddingComponent.componentPreviewStructure.subcomponentDropdownStructure[paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...buttonComponent.componentPreviewStructure.subcomponentDropdownStructure };
    paddingComponent.paddingComponentChild = buttonComponent;
    buttonComponent.paddingComponent = paddingComponent;
    DropdownBase.setCopyableSubcomponents(paddingComponent);
    DropdownBase.setAndExecutePropertyOverwritingExecutables(paddingComponent);
    return paddingComponent;
  },
}
