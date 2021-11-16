import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { Subcomponent, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { LinkedComponentsUtils } from '../../../shared/linkedComponents/linkedComponentsUtils';
import { JAVASCRIPT_CLASSES } from '../../../../../../../../consts/javascriptClasses.enum';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { DropdownMenuAutoWidthUtils } from '../../utils/dropdownMenuAutoWidthUtils';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { AutoSize } from '../../../../../../../../interfaces/autoSize';
import { ComponentBuilder } from '../../../shared/componentBuilder';

export class ApplyDropdownButtonProperties extends ComponentBuilder {

  private static getPaddingAndButtonSubcomponents(component: WorkshopComponent):
      { paddingBaseSubcomponent: Subcomponent, buttonBaseSubcomponent: Subcomponent } {
    if (component.paddingComponent) {
      return {
        paddingBaseSubcomponent: component.paddingComponent.baseSubcomponent,
        buttonBaseSubcomponent: component.baseSubcomponent,
      };
    }
    return {
      paddingBaseSubcomponent: component.baseSubcomponent,
      buttonBaseSubcomponent: component.paddingComponentChild.baseSubcomponent,
    };
  }

  private static overwriteTextDropdownProperties(paddingBaseSubcomponent: Subcomponent, textSubcomponent: Subcomponent): void {
    textSubcomponent.customFeatures.dropdown = ComponentBuilder.createDopdownFeatures(paddingBaseSubcomponent.customFeatures.dropdown.select);
    textSubcomponent.defaultCustomFeatures.dropdown = ComponentBuilder.createDopdownFeatures(paddingBaseSubcomponent.customFeatures.dropdown.select);
    textSubcomponent.customStaticFeatures.selectDropdownText = paddingBaseSubcomponent.customStaticFeatures.selectDropdownText;
    textSubcomponent.defaultCustomStaticFeatures.selectDropdownText = paddingBaseSubcomponent.defaultCustomStaticFeatures.selectDropdownText;
  }

  private static overwriteButtonBaseDropdownProperties(paddingBaseSubcomponent: Subcomponent, buttonBaseSubcomponent: Subcomponent): void {
    buttonBaseSubcomponent.customFeatures.dropdown = ComponentBuilder.createDopdownFeatures(
      paddingBaseSubcomponent.customFeatures.dropdown.select, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW);
    buttonBaseSubcomponent.defaultCustomFeatures.dropdown = ComponentBuilder.createDopdownFeatures(
      paddingBaseSubcomponent.customFeatures.dropdown.select, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW);
    buttonBaseSubcomponent.customStaticFeatures.selectDropdownText = paddingBaseSubcomponent.customStaticFeatures.selectDropdownText;
    buttonBaseSubcomponent.defaultCustomStaticFeatures.selectDropdownText = paddingBaseSubcomponent.defaultCustomStaticFeatures.selectDropdownText;
  }

  private static populateReferences(buttonComponent: WorkshopComponent): void {
    ComponentBuilder.addJsClasses(buttonComponent.baseSubcomponent, 'customStaticFeatures', JAVASCRIPT_CLASSES.DROPDOWN_BUTTON);
    const dropdownMenuBaseComponent = buttonComponent.linkedComponents.auxiliary[0];
    ComponentBuilder.addJsClasses(dropdownMenuBaseComponent.baseSubcomponent, 'customStaticFeatures', JAVASCRIPT_CLASSES.DROPDOWN_MENU);
  }

  public static overwriteButtonFeatures(component: WorkshopComponent): void {
    const { paddingBaseSubcomponent, buttonBaseSubcomponent } = ApplyDropdownButtonProperties.getPaddingAndButtonSubcomponents(component);
    ApplyDropdownButtonProperties.overwriteButtonBaseDropdownProperties(paddingBaseSubcomponent, buttonBaseSubcomponent);
    const textComponent = buttonBaseSubcomponent.seedComponent.sync.syncables.onCopy.uniqueComponents[COMPONENT_TYPES.TEXT];
    if (!textComponent) return;
    ApplyDropdownButtonProperties.overwriteTextDropdownProperties(paddingBaseSubcomponent, textComponent.baseSubcomponent);
  }

  private static setAndExecutePropertyReferenceSharingFuncs(buttonComponent: WorkshopComponent): void {
    // here button has already been created, so populateReferences will need to be executed separately
    // also overwriteButtonCustomFeatures needs to be executed when padding component has been created
    // hence padding component executes it explicitly
    buttonComponent.newChildComponents.propertyOverwritables.propertyReferenceSharingFuncs.container.push(
      ApplyDropdownButtonProperties.overwriteButtonFeatures,
      ApplyDropdownButtonProperties.populateReferences);
    ApplyDropdownButtonProperties.populateReferences(buttonComponent);
  }

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    const { type } = subcomponent.seedComponent;
    // the reason why there is an if statement is because this can get triggered when margin left/right is changed in the button
    if (type === COMPONENT_TYPES.BUTTON) return;
    // width is used by icon size
    if (cssProperty === 'fontSize' || cssProperty === 'marginLeft' || cssProperty === 'marginRight' || cssProperty === 'width') {
      const buttonComponent = subcomponent.seedComponent.containerComponent;
      const menuComponent = buttonComponent.linkedComponents.auxiliary[0];
      DropdownMenuAutoWidthUtils.setButtonWidth(buttonComponent, menuComponent); 
    }
  }

  public static setTriggerFuncOnSettingChange(buttonBaseComponent: WorkshopComponent): void {
    buttonBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.RANGE]: ApplyDropdownButtonProperties.setWidthViaRange,
    };
  }

  private static initialiseSelectDropdownButtonWidthViaLargestItem(subcomponent: Subcomponent): void {
    const buttonComponent = subcomponent.seedComponent;
    const menuComponent = buttonComponent.linkedComponents.auxiliary[0];
    DropdownMenuAutoWidthUtils.setButtonWidth(buttonComponent, menuComponent); 
  }

  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = ApplyDropdownButtonProperties.initialiseSelectDropdownButtonWidthViaLargestItem;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc });
  }

  public static setButtonAutoSize(buttonComponent: WorkshopComponent): void {
    const { customFeatures, defaultCustomFeatures } = buttonComponent.baseSubcomponent;
    customFeatures.autoSize = ApplyDropdownButtonProperties.createDefaultAutoSize();
    defaultCustomFeatures.autoSize = ApplyDropdownButtonProperties.createDefaultAutoSize();
  }

  // the reason why this is not a generator is because button components are already constructed separately
  public static apply(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    ApplyDropdownButtonProperties.setButtonAutoSize(buttonComponent);
    LinkedComponentsUtils.setAuxiliaryComponents(buttonComponent, menuComponent);
    ApplyDropdownButtonProperties.setAndExecutePropertyReferenceSharingFuncs(buttonComponent);
    ApplyDropdownButtonProperties.setTriggerFuncOnSettingChange(buttonComponent);
  }
}
