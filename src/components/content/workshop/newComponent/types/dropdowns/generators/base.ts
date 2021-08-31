import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownOptionNames';
import { DropdownOptionsDisplayStatusUtils } from '../../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewChildComponent/add/addNewLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { DropdownMenuAutoWidthUtils } from '../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SelectDropdown } from '../../../../../../../interfaces/selectDropdown';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { SelectDropdownUtils } from '../selectDropdown/selectDropdownUtils';
import { buttonWithIcon } from '../../buttons/generators/buttonWithIcon';
import { AutoSize } from '../../../../../../../interfaces/autoSize';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { dropdownMenuBase } from './menu/base';

class DropdownBase extends ComponentBuilder {

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'fontSize') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: DropdownBase.setWidthViaRange,
    };
  }

  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = DropdownMenuAutoWidthUtils.setWidth;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc })
  }

  public static setButtonAutoSize(buttonComponent: WorkshopComponent): void {
    const { customFeatures, defaultCustomFeatures } = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    customFeatures.autoSize = DropdownBase.createDefaultAutoSize();
    defaultCustomFeatures.autoSize = DropdownBase.createDefaultAutoSize();
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

  public static overwriteCustomCss(buttonComponent: WorkshopComponent): void {
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.customStaticFeatures = { selectDropdown: DropdownBase.createSelectDropdownProperties() };
    baseSubcomponent.defaultCustomStaticFeatures = { selectDropdown: DropdownBase.createSelectDropdownProperties() };
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.customStaticFeatures.selectDropdown = baseSubcomponent.customStaticFeatures.selectDropdown;
    textSubcomponent.defaultCustomStaticFeatures.selectDropdown = baseSubcomponent.defaultCustomStaticFeatures.selectDropdown;
  }

  public static addComponentsToBase(dropdownMenuBaseComponent: WorkshopComponent): void {
    const layer1Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer1Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    const layer2Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    const layer3Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer3Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    UpdateLayerDropdownOptionNames.update(dropdownMenuBaseComponent, 0);
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    // will probably need to be a style
    const buttonComponent = buttonWithIcon.createNewComponent(baseName);
    buttonComponent.type = COMPONENT_TYPES.DROPDOWN;
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent('Menu');
    DropdownBase.setButtonAutoSize(buttonComponent);
    DropdownBase.overwriteCustomCss(buttonComponent);
    Object.assign(buttonComponent.subcomponents, dropdownMenuBaseComponent.subcomponents);
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) };
    buttonComponent.linkedComponents = { auxiliary: [dropdownMenuBaseComponent] };
    dropdownMenuBaseComponent.linkedComponents = { base: buttonComponent };
    dropdownMenuBaseComponent.masterComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    DropdownBase.addComponentsToBase(dropdownMenuBaseComponent);
    DropdownBase.setTriggerFuncOnSettingChange(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    return buttonComponent;
  },
}
