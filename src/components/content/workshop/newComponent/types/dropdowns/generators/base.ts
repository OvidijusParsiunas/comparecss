import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { LAYER_STYLES, TEXT_STYLES, } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
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

  private static createDefaultTextCustomCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        top: '50%',
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        fontSize: '14px',
        color: '#212529',
        textAlign: 'left',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        height: '',
        borderWidth: '0',
        borderColor: '#1779ba',
        borderStyle: 'solid',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
        cursor: 'pointer',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        color: '#ffffff',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  private static createDefaultTextCustomFeatures(): CustomFeatures {
    return {
      autoSize: ComponentBuilder.createAutoSize(true, true),
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
    };
  }

  private static createDefaultTextCustomStaticFeatures(text?: string): CustomStaticFeatures {
    return {
      subcomponentText: ComponentBuilder.createText(text || 'text'),
    };
  }

  private static overwriteTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customCss = DropdownBase.createDefaultTextCustomCss();
    subcomponents[coreSubcomponentNames.base].defaultCss = DropdownBase.createDefaultTextCustomCss();
    subcomponents[coreSubcomponentNames.base].customFeatures = DropdownBase.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DropdownBase.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DropdownBase.createDefaultTextCustomStaticFeatures('Dropdown item');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DropdownBase.createDefaultTextCustomStaticFeatures('Dropdown item');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layer1Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const layer2Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const layer3Component = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const customCss = layer1Component.subcomponents[layer1Component.coreSubcomponentNames.base].customCss;
    layer2Component.subcomponents[layer2Component.coreSubcomponentNames.base].customCss = customCss;
    layer3Component.subcomponents[layer3Component.coreSubcomponentNames.base].customCss = customCss;
    return [layer1Component, layer2Component, layer3Component];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DropdownBase.addNewLayers(cardComponent);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    const textComponent1 = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layer1Component.coreSubcomponentNames.base, [DropdownBase.overwriteTextProperties]);
    layer1Component.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textComponent1.coreSubcomponentNames.base;
    const textComponent2 = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layer2Component.coreSubcomponentNames.base, [DropdownBase.overwriteTextProperties]);
    layer2Component.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textComponent2.coreSubcomponentNames.base;
    const textComponent3 = AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.BUTTON,
      layer3Component.coreSubcomponentNames.base, [DropdownBase.overwriteTextProperties]);
    layer3Component.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textComponent3.coreSubcomponentNames.base;
    const customCss = textComponent1.subcomponents[textComponent1.coreSubcomponentNames.base].customCss;
    textComponent2.subcomponents[textComponent2.coreSubcomponentNames.base].customCss = customCss;
    textComponent3.subcomponents[textComponent3.coreSubcomponentNames.base].customCss = customCss;
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const buttonComponent = defaultButton.createNewComponent(baseName);
    buttonComponent.type = COMPONENT_TYPES.DROPDOWN;
    DropdownBase.overwriteCustomCss(buttonComponent);
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent('Menu');
    DropdownBase.addComponentsToBase(dropdownMenuBaseComponent);
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    buttonComponent.subcomponents = { ...buttonComponent.subcomponents, ...dropdownMenuBaseComponent.subcomponents };
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure = { ...buttonComponent.componentPreviewStructure.subcomponentDropdownStructure, ...dropdownMenuBaseComponent.componentPreviewStructure.subcomponentDropdownStructure };
    buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = { ...buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, ...dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName };
    return buttonComponent;
  },
}
