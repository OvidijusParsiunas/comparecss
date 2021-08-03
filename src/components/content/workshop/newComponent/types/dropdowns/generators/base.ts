import { UpdateGenericComponentDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateGenericComponentDropdownOptionNames';
import { UpdateLayerDropdownOptionNames } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateLayerDropdownOptionNames';
import { CustomFeatures, CustomStaticFeatures, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { DEFAULT_STYLES, LAYER_STYLES, } from '../../../../../../../consts/componentStyles.enum';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { defaultButton } from '../../buttons/generators/default';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { cardBase } from '../../cards/generators/base';
import { dropdownMenuBase } from './menu/base';

class DropdownBase extends ComponentBuilder {

  public static overwriteCustomCss(dropdownBaseComponent: WorkshopComponent): void {
    const baseSubcomponent = dropdownBaseComponent.subcomponents[dropdownBaseComponent.coreSubcomponentNames.base];
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '105px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '105px';
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

  private static overwriteDescriptionProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customFeatures = DropdownBase.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].defaultCustomFeatures = DropdownBase.createDefaultTextCustomFeatures();
    subcomponents[coreSubcomponentNames.base].customStaticFeatures = DropdownBase.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures = DropdownBase.createDefaultTextCustomStaticFeatures('Description');
    subcomponents[coreSubcomponentNames.base].isRemovable = true;
  }

  private static addNewLayers(cardComponent: WorkshopComponent): WorkshopComponent[] {
    const layerSubcomponent = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const layerSubcomponent1 = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    const layerSubcomponent2 = AddNewLayerComponent.add(cardComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    return [layerSubcomponent, layerSubcomponent1, layerSubcomponent2];
  }

  public static addComponentsToBase(cardComponent: WorkshopComponent): void {
    const [layer1Component, layer2Component, layer3Component] = DropdownBase.addNewLayers(cardComponent);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer1Component.coreSubcomponentNames.base, [DropdownBase.overwriteDescriptionProperties]);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer2Component.coreSubcomponentNames.base, [DropdownBase.overwriteDescriptionProperties]);
    UpdateLayerDropdownOptionNames.update(cardComponent, 0);
    AddNewGenericComponent.add(cardComponent, COMPONENT_TYPES.TEXT, DEFAULT_STYLES.DEFAULT,
      layer3Component.coreSubcomponentNames.base, [DropdownBase.overwriteDescriptionProperties]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[0]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[1]);
    UpdateGenericComponentDropdownOptionNames.updateViaParentLayerPreviewStructure(cardComponent, cardComponent.componentPreviewStructure.layers[2]);
  }
}

export const dropdownBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const buttonComponent = defaultButton.createNewComponent(baseName);
    const dropdownMenuBaseComponent = dropdownMenuBase.createNewComponent('Menu');
    DropdownBase.addComponentsToBase(dropdownMenuBaseComponent);
    buttonComponent.auxiliaryComponent = dropdownMenuBaseComponent;
    buttonComponent.subcomponents = { ...buttonComponent.subcomponents, ...dropdownMenuBaseComponent.subcomponents };
    buttonComponent.componentPreviewStructure.subcomponentDropdownStructure = { ...buttonComponent.componentPreviewStructure.subcomponentDropdownStructure, ...dropdownMenuBaseComponent.componentPreviewStructure.subcomponentDropdownStructure };
    buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = { ...buttonComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName, ...dropdownMenuBaseComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName };
    return buttonComponent;
  },
}
