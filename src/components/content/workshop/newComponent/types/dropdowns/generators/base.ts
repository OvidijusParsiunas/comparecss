import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
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
    // WORK1: potentially add a property to nested subcomponent - signifying which auxiliary component it belongs to (easier for remove/copy)
    const layer1Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const [textComponent1] = layer1Component.nestedComponentsInLayer.add(buttonComponent);
    const layer2Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const [textComponent2] = layer2Component.nestedComponentsInLayer.add(buttonComponent);
    const layer3Component = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const [textComponent3] = layer3Component.nestedComponentsInLayer.add(buttonComponent);
    const layerCustomCss = layer1Component.subcomponents[layer1Component.coreSubcomponentNames.base].customCss;
    layer2Component.subcomponents[layer2Component.coreSubcomponentNames.base].customCss = layerCustomCss;
    layer3Component.subcomponents[layer3Component.coreSubcomponentNames.base].customCss = layerCustomCss;
    const textCustomCss = textComponent1.subcomponents[textComponent1.coreSubcomponentNames.base].customCss;
    textComponent2.subcomponents[textComponent2.coreSubcomponentNames.base].customCss = textCustomCss;
    textComponent3.subcomponents[textComponent3.coreSubcomponentNames.base].customCss = textCustomCss;
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
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    buttonComponent.activeSubcomponentName = dropdownMenuBaseComponent.coreSubcomponentNames.base;
    DropdownBase.addComponentsToBase(buttonComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
    return buttonComponent;
  },
}
