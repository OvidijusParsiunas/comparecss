import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { DropdownOptionsDisplayStatusUtils } from '../../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { DropdownMenuAutoWidthUtils } from '../../../../toolbar/settings/utils/autoDropdownMenuWidthUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { defaultButton } from '../../buttons/generators/default';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { dropdownMenuBase } from './menu/base';

class DropdownBase extends ComponentBuilder {

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, updatedSetting: any): void {
    const { cssProperty } = updatedSetting.spec;
    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingRight') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: DropdownMenuAutoWidthUtils.setWidth,
      [SETTINGS_TYPES.RANGE]: DropdownBase.setWidthViaRange,
    };
  }

  public static overwriteCustomCss(dropdownBaseComponent: WorkshopComponent, dropdownMenuBaseComponent: WorkshopComponent): void {
    const baseSubcomponent = dropdownBaseComponent.subcomponents[dropdownBaseComponent.coreSubcomponentNames.base];
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    const textSubcomponent = dropdownBaseComponent.subcomponents[dropdownBaseComponent.coreSubcomponentNames.text];
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.customStaticFeatures.selectDropdown = dropdownMenuBaseComponent.componentPreviewStructure.baseSubcomponentProperties.customStaticFeatures.selectDropdown;
    textSubcomponent.defaultCustomStaticFeatures.selectDropdown = dropdownMenuBaseComponent.componentPreviewStructure.baseSubcomponentProperties.defaultCustomStaticFeatures.selectDropdown;
  }

  public static addComponentsToBase(buttonComponent: WorkshopComponent): void {
    const layer1Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer1Component.nestedComponentsLockedToLayer.add(buttonComponent);
    const layer2Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.nestedComponentsLockedToLayer.add(buttonComponent);
    const layer3Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer3Component.nestedComponentsLockedToLayer.add(buttonComponent);
    UpdateLayerDropdownOptionNames.update(buttonComponent, 0);
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const buttonComponent = defaultButton.createNewComponent(baseName);
    buttonComponent.type = COMPONENT_TYPES.DROPDOWN;
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent('Menu');
    DropdownBase.overwriteCustomCss(buttonComponent, dropdownMenuBaseComponent);
    Object.assign(buttonComponent.subcomponents, dropdownMenuBaseComponent.subcomponents);
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentNames.base] = { ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentNames.base) };
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    dropdownMenuBaseComponent.coreBaseComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentNames.base;
    DropdownBase.addComponentsToBase(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    DropdownBase.setTriggerFuncOnSettingChange(dropdownMenuBaseComponent);
    return buttonComponent;
  },
}
