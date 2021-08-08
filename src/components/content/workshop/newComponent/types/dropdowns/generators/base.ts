import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { DropdownOptionsDisplayStatusUtils } from '../../../../utils/dropdownOptionsDisplayStatusUtils/dropdownOptionsDisplayStatusUtils';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { LAYER_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { defaultButton } from '../../buttons/generators/default';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { dropdownMenuBase } from './menu/base';

class DropdownBase extends ComponentBuilder {

  public static overwriteCustomCss(dropdownBaseComponent: WorkshopComponent): void {
    const baseSubcomponent = dropdownBaseComponent.subcomponents[dropdownBaseComponent.coreSubcomponentNames.base];
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '125px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    const textSubcomponent = dropdownBaseComponent.subcomponents[dropdownBaseComponent.coreSubcomponentNames.text];
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
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
    DropdownBase.overwriteCustomCss(buttonComponent);
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent('Menu');
    Object.assign(buttonComponent.subcomponents, dropdownMenuBaseComponent.subcomponents);
    Object.assign(buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName);
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure[dropdownMenuBaseComponent.coreSubcomponentNames.base] = { ...DropdownOptionsDisplayStatusUtils.createDropdownOptionDisplayStatusReferenceObject(dropdownMenuBaseComponent.coreSubcomponentNames.base) };
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    dropdownMenuBaseComponent.isAuxiliaryComponent = true;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentNames.base;
    DropdownBase.addComponentsToBase(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    return buttonComponent;
  },
}
