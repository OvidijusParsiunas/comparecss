import { UpdateLinkedComponentsDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLinkedComponentsDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, CreateNewComponent, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { AddLayerComponent } from '../../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { DropdownItemLayer, SetTextSubcomponentPropertiesContext } from '../../../layers/generators/dropdownItem';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { PaddingComponentUtils } from '../../../shared/paddingComponent/paddingComponentUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { SelectedDropdownText } from '../../../../../../../../interfaces/dropdownFeatures';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../../consts/layerSections.enum';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { ApplyDropdownButtonProperties } from '../button/applyProperties';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { defaultDropdownMenu } from '../menu/default';

interface ButtonAndMenuComponentsSetupProperties {
  buttonComponentOverwritable?: (component: WorkshopComponent) => void;
  menuComponent: WorkshopComponent;
}

export class DropdownPaddingBase extends ComponentBuilder {

  // only executed when padding component is dereferenced
  // custom properties references are instead shared on new layer additions by areLayersInSyncByDefault, however
  // when existing layers are copied - this method sets them to be in sync 
  private static setAllItemAndItemTextComponentsToBeInSync(component: WorkshopComponent): void {
    const menuComponent = component.paddingComponentChild.linkedComponents
      .auxiliary[0].baseSubcomponent.seedComponent;
    const firstLayerSubcomponentProperties = menuComponent.componentPreviewStructure.layers[0]?.subcomponentProperties;
    menuComponent.componentPreviewStructure.layers.forEach((layer) => {
      layer.subcomponentProperties.customCss = firstLayerSubcomponentProperties.customCss;
      layer.subcomponentProperties.customFeatures = firstLayerSubcomponentProperties.customFeatures;
      DropdownItemLayer.setTextSubcomponentProperties
        .bind({ menuComponent } as SetTextSubcomponentPropertiesContext)
        (layer.subcomponentProperties.seedComponent.newChildComponents.childComponentsLockedToLayer[0]);
    });
  }

  private static setAndExecutePropertyReferenceSharingFuncs(paddingComponent: WorkshopComponent): void {
    paddingComponent.newChildComponents.propertyOverwritables = {
      propertyReferenceSharingFuncs: [DropdownPaddingBase.setAllItemAndItemTextComponentsToBeInSync],
    }
    ApplyDropdownButtonProperties.overwriteButtonCustomFeatures(paddingComponent);
  }

  private static setSyncableSubcomponents(dropdownComponent: WorkshopComponent): void {
    const { baseSubcomponent, paddingComponentChild } = dropdownComponent;
    const syncableSubcomponents = {
      [SUBCOMPONENT_TYPES.BASE]: baseSubcomponent,
    };
    const childComponents = [paddingComponentChild, paddingComponentChild.linkedComponents.auxiliary[0]];
    dropdownComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents(syncableSubcomponents, childComponents, dropdownComponent);
  }

  private static createSelectDropdownTextProperties(): SelectedDropdownText {
    return {
      defaultText: 'Select',
      lastHoveredItemText: null,
      lastSelectedItemText: null,
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      alignedLayerSection: ComponentBuilder.createAlignedLayerSection(ALIGNED_SECTION_TYPES.LEFT),
      dropdownSelectedText: DropdownPaddingBase.createSelectDropdownTextProperties(),
    };
  }

  private static overwriteStaticFeatures(paddingBaseSubcomponent: SubcomponentProperties): void {
    paddingBaseSubcomponent.customStaticFeatures = DropdownPaddingBase.createDefaultCustomStaticFeatures();
    paddingBaseSubcomponent.defaultCustomStaticFeatures = DropdownPaddingBase.createDefaultCustomStaticFeatures();
  }

  private static overwriteCustomFeatures(paddingBaseSubcomponent: SubcomponentProperties): void {
    paddingBaseSubcomponent.customFeatures = { dropdown: ComponentBuilder.createDopdownFeatures(null, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW) };
    paddingBaseSubcomponent.defaultCustomFeatures = { dropdown: ComponentBuilder.createDopdownFeatures(null, DROPDOWN_MENU_INDEX_ALIGNMENT.BELOW) };
  }

  private static overwriteBase(paddingComponent: WorkshopComponent): void {
    const paddingBaseSubcomponent = paddingComponent.baseSubcomponent;
    DropdownPaddingBase.overwriteCustomFeatures(paddingBaseSubcomponent);
    DropdownPaddingBase.overwriteStaticFeatures(paddingBaseSubcomponent);
  }

  private static addComponentsToBase(dropdownMenuBaseComponent: WorkshopComponent): void {
    AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    AddLayerComponent.add(dropdownMenuBaseComponent, LAYER_STYLES.DROPDOWN_ITEM, true);
    UpdateLayerDropdownItemNames.update(dropdownMenuBaseComponent, 0);
  }

  private static addMenuItems(buttonComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    buttonComponent.activeSubcomponentName = menuComponent.baseSubcomponent.name;
    DropdownPaddingBase.addComponentsToBase(menuComponent);
    buttonComponent.activeSubcomponentName = buttonComponent.defaultSubcomponentName;
  }
  
  private static buttonAndMenuComponentsSetup(buttonComponent: WorkshopComponent): void {
    const { buttonComponentOverwritable, menuComponent } = this as any as ButtonAndMenuComponentsSetupProperties;
    // WORK 2 - replace with property overwritables
    buttonComponentOverwritable?.(buttonComponent);
    ApplyDropdownButtonProperties.apply(buttonComponent, menuComponent);
    DropdownPaddingBase.addMenuItems(buttonComponent, menuComponent);
    UpdateLinkedComponentsDropdownItemNames.update(buttonComponent);
  }

  // this method should also be used for other button and menu styles
  public static create(baseName: string, createButtonFunc: CreateNewComponent, menuComponent: WorkshopComponent,
      buttonComponentOverwritable?: (component: WorkshopComponent) => void): WorkshopComponent {
    const paddingComponent = PaddingComponentUtils.create(baseName, COMPONENT_TYPES.DROPDOWN,
      DEFAULT_STYLES.BASE, SUBCOMPONENT_TYPES.DROPDOWN, createButtonFunc, BUTTON_COMPONENTS_BASE_NAMES.BUTTON,
      DropdownPaddingBase.buttonAndMenuComponentsSetup.bind({ buttonComponentOverwritable, menuComponent } as ButtonAndMenuComponentsSetupProperties));
    DropdownPaddingBase.overwriteBase(paddingComponent);
    DropdownPaddingBase.setSyncableSubcomponents(paddingComponent);
    DropdownPaddingBase.setAndExecutePropertyReferenceSharingFuncs(paddingComponent);
    return paddingComponent;
  }
}

export const dropdownPaddingBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const dropdownMenuComponent = defaultDropdownMenu.createNewComponent(
      { baseName: UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU) });
    return DropdownPaddingBase.create(presetProperties.baseName, buttonWithIcon.createNewComponent, dropdownMenuComponent);
  },
}
