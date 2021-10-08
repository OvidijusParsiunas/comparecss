import { UpdateLayerDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { AddLayerComponent } from '../../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { LinkedComponentsUtils } from '../../../shared/linkedComponents/linkedComponentsUtils';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { LAYER_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { AutoSize } from '../../../../../../../../interfaces/autoSize';
import { ComponentBuilder } from '../../../shared/componentBuilder';

export class ApplyDropdownButtonProperties extends ComponentBuilder {

  private static getPaddingAndButtonSubcomponents(component: WorkshopComponent):
      { paddingBaseSubcomponent: SubcomponentProperties, buttonBaseSubcomponent: SubcomponentProperties } {
    if (component.paddingComponent) {
      return {
        paddingBaseSubcomponent: component.paddingComponent.baseSubcomponent,
        buttonBaseSubcomponent: component.baseSubcomponent,
      }
    }
    return {
      paddingBaseSubcomponent: component.baseSubcomponent,
      buttonBaseSubcomponent: component.paddingComponentChild.baseSubcomponent,
    }
  }

  private static overwriteTextDropdownProperties(paddingBaseSubcomponent: SubcomponentProperties, textSubcomponent: SubcomponentProperties): void {
    textSubcomponent.customFeatures.dropdown = ComponentBuilder.createDopdownFeatures(paddingBaseSubcomponent.customFeatures.dropdown.select);
    textSubcomponent.defaultCustomFeatures.dropdown = ComponentBuilder.createDopdownFeatures(paddingBaseSubcomponent.customFeatures.dropdown.select);
    textSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    textSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
  }

  private static overwriteButtonBaseDropdownProperties(paddingBaseSubcomponent: SubcomponentProperties, buttonBaseSubcomponent: SubcomponentProperties): void {
    buttonBaseSubcomponent.customFeatures.dropdown = ComponentBuilder.createDopdownFeatures(
      paddingBaseSubcomponent.customFeatures.dropdown.select, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW);
    buttonBaseSubcomponent.defaultCustomFeatures.dropdown = ComponentBuilder.createDopdownFeatures(
      paddingBaseSubcomponent.customFeatures.dropdown.select, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW);
    buttonBaseSubcomponent.customStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.customStaticFeatures.dropdownSelectedText;
    buttonBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText = paddingBaseSubcomponent.defaultCustomStaticFeatures.dropdownSelectedText;
  }

  public static overwriteButtonCustomFeatures(component: WorkshopComponent): void {
    const { paddingBaseSubcomponent, buttonBaseSubcomponent } = ApplyDropdownButtonProperties.getPaddingAndButtonSubcomponents(component);
    ApplyDropdownButtonProperties.overwriteButtonBaseDropdownProperties(paddingBaseSubcomponent, buttonBaseSubcomponent);
    const textSubcomponent = buttonBaseSubcomponent.seedComponent.sync.syncables.subcomponents[SUBCOMPONENT_TYPES.TEXT];
    if (!textSubcomponent) return;
    ApplyDropdownButtonProperties.overwriteTextDropdownProperties(paddingBaseSubcomponent, textSubcomponent);
  }

  private static populateReferences(buttonComponent: WorkshopComponent): void {
    ComponentBuilder.addJsClasses(buttonComponent.baseSubcomponent, JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    const dropdownMenuBaseComponent = buttonComponent.linkedComponents.auxiliary[0];
    ComponentBuilder.addJsClasses(dropdownMenuBaseComponent.baseSubcomponent, JAVASCRIPT_CLASSES.DROPDOWN_MENU);
  }

  private static setAndExecutePropertyOverwritingExecutables(buttonComponent: WorkshopComponent): void {
    buttonComponent.propertyOverwritingExecutables.push(ApplyDropdownButtonProperties.overwriteButtonCustomFeatures,
      ApplyDropdownButtonProperties.populateReferences);
    ApplyDropdownButtonProperties.populateReferences(buttonComponent);
  }

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'fontSize') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: ApplyDropdownButtonProperties.setWidthViaRange,
    };
  }

  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = DropdownMenuAutoWidthUtils.setWidth;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc });
  }

  public static setButtonAutoSize(buttonComponent: WorkshopComponent): void {
    const { customFeatures, defaultCustomFeatures } = buttonComponent.baseSubcomponent;
    customFeatures.autoSize = ApplyDropdownButtonProperties.createDefaultAutoSize();
    defaultCustomFeatures.autoSize = ApplyDropdownButtonProperties.createDefaultAutoSize();
  }

  // should be done in the menu base component itself
  public static addComponentsToBase(dropdownMenuBaseComponent: WorkshopComponent): void {
    const layer1Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer1Component.childComponentsLockedToLayer.add(layer1Component, dropdownMenuBaseComponent);
    const layer2Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.childComponentsLockedToLayer.add(layer2Component, dropdownMenuBaseComponent);
    const layer3Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer3Component.childComponentsLockedToLayer.add(layer3Component, dropdownMenuBaseComponent);
    UpdateLayerDropdownItemNames.update(dropdownMenuBaseComponent, 0);
  }

  // the reason why this is not a generator is because button components are already constructed as separate components
  public static apply(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    ApplyDropdownButtonProperties.setButtonAutoSize(buttonComponent);
    LinkedComponentsUtils.setAuxiliaryComponents(buttonComponent, menuComponent);
    ApplyDropdownButtonProperties.setAndExecutePropertyOverwritingExecutables(buttonComponent);
    ApplyDropdownButtonProperties.setTriggerFuncOnSettingChange(buttonComponent);
    buttonComponent.activeSubcomponentName = menuComponent.baseSubcomponent.name;
    ApplyDropdownButtonProperties.addComponentsToBase(menuComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
  }
}
