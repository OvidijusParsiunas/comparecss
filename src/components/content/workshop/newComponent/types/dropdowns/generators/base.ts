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

    // WORK1
    public static setTriggerFuncOnSettingChange(buttonComponent: WorkshopComponent): void {
    buttonComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: DropdownMenuAutoWidthUtils.setButtonWidth,
      [SETTINGS_TYPES.RANGE]: DropdownBase.setWidthViaRange,
    };
  }

  public static overwriteCustomCss(dropdownBaseComponent: WorkshopComponent, dropdownMenuBaseComponent: WorkshopComponent): void {
    const baseSubcomponent = dropdownBaseComponent.coreSubcomponentRefs.base;
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    const textSubcomponent = dropdownBaseComponent.coreSubcomponentRefs.text;
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.customStaticFeatures.selectDropdown = dropdownMenuBaseComponent.coreSubcomponentRefs.base.customStaticFeatures.selectDropdown;
    textSubcomponent.defaultCustomStaticFeatures.selectDropdown = dropdownMenuBaseComponent.coreSubcomponentRefs.base.defaultCustomStaticFeatures.selectDropdown;
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
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentRefs.base.name] = { ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentRefs.base.name) };
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    dropdownMenuBaseComponent.coreBaseComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentRefs.base.name;
    DropdownBase.addComponentsToBase(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    DropdownBase.setTriggerFuncOnSettingChange(buttonComponent);
    return buttonComponent;
  },
}
