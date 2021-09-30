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

  private static populateReferences(buttonComponent: WorkshopComponent): void {
    buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.jsClasses.add(JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    const dropdownMenuBaseComponent = buttonComponent.linkedComponents.auxiliary[0];
    dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].customFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
    dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].defaultCustomFeatures.jsClasses = new Set([JAVASCRIPT_CLASSES.DROPDOWN_MENU]) as Set<JAVASCRIPT_CLASSES>;
  }

  public static overwriteButtonCustomFeatures(buttonComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = buttonComponent.paddingComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
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

  public static setAndExecutePropertyOverwritingExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.propertyOverwritingExecutables.push(DropdownButton.overwriteButtonCustomFeatures, DropdownButton.populateReferences);
    DropdownButton.populateReferences(buttonComponent);
  }

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'fontSize') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: DropdownButton.setWidthViaRange,
    };
  }

  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = DropdownMenuAutoWidthUtils.setWidth;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc })
  }

  public static setButtonAutoSize(buttonComponent: WorkshopComponent): void {
    const { customFeatures, defaultCustomFeatures } = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    customFeatures.autoSize = DropdownButton.createDefaultAutoSize();
    defaultCustomFeatures.autoSize = DropdownButton.createDefaultAutoSize();
  }

  public static overwriteCustomCss(buttonComponent: WorkshopComponent): void {
    const baseSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    const textSubcomponent = buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.TEXT];
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
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name][DROPDOWN_ITEM_AUX_DETAILS_REF] = { ...DropdownItemsDisplayStatusUtils.createDefaultItemDisplayStatus(buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) };
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) };
    buttonComponent.linkedComponents = { auxiliary: [dropdownMenuBaseComponent] };
    dropdownMenuBaseComponent.linkedComponents = { base: buttonComponent };
    dropdownMenuBaseComponent.masterComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    DropdownButton.setAndExecutePropertyOverwritingExecutables(buttonComponent);
    DropdownButton.addComponentsToBase(dropdownMenuBaseComponent);
    DropdownButton.setTriggerFuncOnSettingChange(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    return buttonComponent;
  },
}
