import { UpdateLinkedComponentsDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLinkedComponentsDropdownItemNames';
import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { CustomStaticFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { ComponentGenerator, CreateNewComponent } from '../../../../../../../../interfaces/componentGenerator';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { PaddingComponentUtils } from '../../../shared/paddingComponent/paddingComponentUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { SelectedDropdownText } from '../../../../../../../../interfaces/dropdownFeatures';
import { ALIGNED_SECTION_TYPES } from '../../../../../../../../consts/layerSections.enum';
import { DEFAULT_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { DropdownItemLayer } from '../../../layers/generators/dropdownItem';
import { ApplyDropdownButtonProperties } from '../button/applyProperties';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { defaultDropdownMenu } from '../menu/default';

export class DropdownPaddingBase extends ComponentBuilder {

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
        .bind(menuComponent)(layer.subcomponentProperties.seedComponent.childComponentsLockedToLayer.list[0].seedComponent);
    });
  }

  private static setAndExecutePropertyOverwritingExecutables(paddingComponent: WorkshopComponent): void {
    paddingComponent.propertyOverwritingExecutables = [
      DropdownPaddingBase.setAllItemAndItemTextComponentsToBeInSync,
      ApplyDropdownButtonProperties.overwriteButtonCustomFeatures];
    ApplyDropdownButtonProperties.overwriteButtonCustomFeatures(paddingComponent);
  }

  private static setSyncableSubcomponents(dropdownComponent: WorkshopComponent): void {
    const { sync, baseSubcomponent, paddingComponentChild } = dropdownComponent;
    sync.syncables = {
      subcomponents: {
        [SUBCOMPONENT_TYPES.BASE]: baseSubcomponent,
      },
      childComponents: [paddingComponentChild, paddingComponentChild.linkedComponents.auxiliary[0]],
    };
    dropdownComponent.sync.parentComponentsThatCanBeSynced = [dropdownComponent];
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

  private static buttonAndAuxiliaryComponentSetup(buttonComponent: WorkshopComponent): void {
    // WORK 2
    const { buttonComponentOverwritable, auxiliaryComponents } = this as any;
    const menuComponent = auxiliaryComponents[0];
    // WORK 2 - replace with property overwritables
    buttonComponentOverwritable?.(buttonComponent);
    ApplyDropdownButtonProperties.apply(buttonComponent, menuComponent);
    UpdateLinkedComponentsDropdownItemNames.update(buttonComponent);
  }

  // use this method for other button and menu styles
  public static create(baseName: string, createButtonFunc: CreateNewComponent, menuComponent: WorkshopComponent, buttonComponentOverwritable?: (component: WorkshopComponent) => void): WorkshopComponent {
    const paddingComponent = PaddingComponentUtils.create(baseName, COMPONENT_TYPES.DROPDOWN,
      DEFAULT_STYLES.BASE, SUBCOMPONENT_TYPES.DROPDOWN, createButtonFunc, BUTTON_COMPONENTS_BASE_NAMES.BUTTON,
      DropdownPaddingBase.buttonAndAuxiliaryComponentSetup.bind({ buttonComponentOverwritable, auxiliaryComponents: [menuComponent] }));
    DropdownPaddingBase.overwriteBase(paddingComponent);
    DropdownPaddingBase.setSyncableSubcomponents(paddingComponent);
    DropdownPaddingBase.setAndExecutePropertyOverwritingExecutables(paddingComponent);
    return paddingComponent;
  }
}

export const dropdownPaddingBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const dropdownMenuComponent = defaultDropdownMenu.createNewComponent(UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU));
    return DropdownPaddingBase.create(baseName, buttonWithIcon.createNewComponent, dropdownMenuComponent);
  },
}
