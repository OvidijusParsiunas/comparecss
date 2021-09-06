import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownOptionNames';
import { DropdownOptionsDisplayStatusUtils } from '../../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewChildComponent/add/addNewLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { DropdownMenuAutoWidthUtils } from '../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../consts/dropdownMenuAlignment.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../consts/javascriptClasses.enum';
import { SelectDropdown } from '../../../../../../../interfaces/dropdownStaticFeatures';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
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
    baseSubcomponent.customStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    baseSubcomponent.defaultCustomStaticFeatures = { dropdown: { select: DropdownBase.createSelectDropdownProperties(), indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW } };
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.customStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
    textSubcomponent.defaultCustomStaticFeatures.dropdown = { select: baseSubcomponent.customStaticFeatures.dropdown.select };
  }

  public static addComponentsToBase(dropdownMenuBaseComponent: WorkshopComponent): void {
    const layer1Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer1Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    ComponentBuilder.executeReferenceSharingExecutables(layer1Component);
    const layer2Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    ComponentBuilder.executeReferenceSharingExecutables(layer2Component);
    const layer3Component = AddNewLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer3Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    ComponentBuilder.executeReferenceSharingExecutables(layer3Component);
    UpdateLayerDropdownOptionNames.update(dropdownMenuBaseComponent, 0);
  }

  public static populateReferences(buttonComponent: WorkshopComponent, dropdownMenuBaseComponent: WorkshopComponent): void {
    buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_MENU_BUTTON);
    buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_MENU_BUTTON);
    dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
    dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
    ComponentBuilder.executeReferenceSharingExecutables(buttonComponent, dropdownMenuBaseComponent);
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
    DropdownBase.populateReferences(buttonComponent, dropdownMenuBaseComponent);
    return buttonComponent;
  },
}
