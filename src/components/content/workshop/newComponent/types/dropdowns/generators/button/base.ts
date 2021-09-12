import { UpdateLayerDropdownOptionNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownOptionNames';
import { DropdownOptionsDisplayStatusUtils } from '../../../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { AddLayerComponent } from '../../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { DROPDOWN_OPTION_AUX_DETAILS_REF } from '../../../../../../../../interfaces/dropdownOptionDisplayStatus';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
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
    layer1Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    ComponentBuilder.executeReferenceSharingExecutables(layer1Component);
    const layer2Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    layer2Component.childComponentsLockedToLayer.add(dropdownMenuBaseComponent);
    ComponentBuilder.executeReferenceSharingExecutables(layer2Component);
    const layer3Component = AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
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

// WORK 2 - make the button style swappable
export const dropdownButtonBase: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    // will probably need to be a style
    const buttonComponent = buttonWithIcon.createNewComponent(UniqueSubcomponentNameGenerator.generate(BUTTON_COMPONENTS_BASE_NAMES.BUTTON));
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent(UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU));
    DropdownButton.setButtonAutoSize(buttonComponent);
    DropdownButton.overwriteCustomCss(buttonComponent);
    Object.assign(buttonComponent.subcomponents, dropdownMenuBaseComponent.subcomponents);
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name][DROPDOWN_OPTION_AUX_DETAILS_REF] = { ...DropdownOptionsDisplayStatusUtils.createDefaultOptionDisplayStatus(buttonComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) };
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name] = { ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name) };
    buttonComponent.linkedComponents = { auxiliary: [dropdownMenuBaseComponent] };
    dropdownMenuBaseComponent.linkedComponents = { base: buttonComponent };
    dropdownMenuBaseComponent.masterComponent = buttonComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    DropdownButton.addComponentsToBase(dropdownMenuBaseComponent);
    DropdownButton.setTriggerFuncOnSettingChange(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    DropdownButton.populateReferences(buttonComponent, dropdownMenuBaseComponent);
    return buttonComponent;
  },
}
