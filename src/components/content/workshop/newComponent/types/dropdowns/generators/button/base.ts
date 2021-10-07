import { UpdateLayerDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { DropdownItemsDisplayStatusUtils } from '../../../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { AddLayerComponent } from '../../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../../interfaces/dropdownItemDisplayStatus';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { LAYER_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { AutoSize } from '../../../../../../../../interfaces/autoSize';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { dropdownMenuBase } from '../menu/base';

class DropdownButton extends ComponentBuilder {

  // base
  private static populateReferences(buttonComponent: WorkshopComponent): void {
    buttonComponent.baseSubcomponent.customFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    buttonComponent.baseSubcomponent.defaultCustomFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    const dropdownMenuBaseComponent = buttonComponent.linkedComponents.auxiliary[0];
    dropdownMenuBaseComponent.baseSubcomponent.customFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
    dropdownMenuBaseComponent.baseSubcomponent.defaultCustomFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
  }

  // shared
  private static overwriteButtonCustomFeatures(buttonComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = buttonComponent.paddingComponent.baseSubcomponent;
    const buttonBaseSubcomponent = buttonComponent.baseSubcomponent;
    buttonBaseSubcomponent.customFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    buttonBaseSubcomponent.defaultCustomFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select, indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW };
    buttonBaseSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    buttonBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
    const textSubcomponent = buttonComponent.sync.syncables.subcomponents[SUBCOMPONENT_TYPES.TEXT];
    if (!textSubcomponent) return;
    textSubcomponent.customFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select };
    textSubcomponent.defaultCustomFeatures.dropdown = { select: paddingBaseSubcomponent.customFeatures.dropdown.select };
    textSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    textSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
  }

  // base
  public static setAndExecutePropertyOverwritingExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.propertyOverwritingExecutables.push(DropdownButton.overwriteButtonCustomFeatures, DropdownButton.populateReferences);
    DropdownButton.populateReferences(buttonComponent);
  }

  // base
  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'fontSize') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  // base
  public static setTriggerFuncOnSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: DropdownButton.setWidthViaRange,
    };
  }

  // base
  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = DropdownMenuAutoWidthUtils.setWidth;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc })
  }

  // base
  public static setButtonAutoSize(buttonComponent: WorkshopComponent): void {
    const { customFeatures, defaultCustomFeatures } = buttonComponent.baseSubcomponent;
    customFeatures.autoSize = DropdownButton.createDefaultAutoSize();
    defaultCustomFeatures.autoSize = DropdownButton.createDefaultAutoSize();
  }

  // default
  public static overwriteCustomCss(buttonComponent: WorkshopComponent): void {
    const baseSubcomponent = buttonComponent.baseSubcomponent;
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    const textSubcomponent = buttonComponent.sync.syncables.subcomponents[SUBCOMPONENT_TYPES.TEXT];
    // WORK 1 - static name
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
  }

  public static addComponentsToBase(dropdownMenuBaseComponent: WorkshopComponent): void {
    const layer1Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer1Component.childComponentsLockedToLayer.add(layer1Component, dropdownMenuBaseComponent);
    const layer2Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.childComponentsLockedToLayer.add(layer2Component, dropdownMenuBaseComponent);
    const layer3Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer3Component.childComponentsLockedToLayer.add(layer3Component, dropdownMenuBaseComponent);
    UpdateLayerDropdownItemNames.update(dropdownMenuBaseComponent, 0);
  }
}

// WORK 2 - make the button style swappable
export const dropdownButtonBase: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    // will probably need to be a style
    const buttonComponent = buttonWithIcon.createNewComponent(UniqueSubcomponentNameGenerator.generate(BUTTON_COMPONENTS_BASE_NAMES.BUTTON));
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent(UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU));
    DropdownButton.setButtonAutoSize(buttonComponent);
    DropdownButton.overwriteCustomCss(buttonComponent);
    Object.assign(buttonComponent.subcomponents, dropdownMenuBaseComponent.subcomponents);
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownItemName, dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownItemName);
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[buttonComponent.baseSubcomponent.name][DROPDOWN_ITEM_AUX_DETAILS_REF] = { ...DropdownItemsDisplayStatusUtils.createDefaultItemDisplayStatus(buttonComponent.baseSubcomponent.name) };
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.baseSubcomponent.name] = { ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(dropdownMenuBaseComponent.baseSubcomponent.name) };
    buttonComponent.linkedComponents = { auxiliary: [dropdownMenuBaseComponent] };
    dropdownMenuBaseComponent.linkedComponents = { base: buttonComponent };
    dropdownMenuBaseComponent.masterComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.baseSubcomponent.name;
    DropdownButton.setAndExecutePropertyOverwritingExecutables(buttonComponent);
    DropdownButton.addComponentsToBase(dropdownMenuBaseComponent);
    DropdownButton.setTriggerFuncOnSettingChange(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    return buttonComponent;
  },
}
