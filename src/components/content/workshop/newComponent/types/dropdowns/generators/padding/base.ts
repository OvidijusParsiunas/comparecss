import { UpdateLinkedComponentsDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLinkedComponentsDropdownItemNames';
import { UpdateLayerDropdownItemNames } from '../../../../../utils/componentManipulation/updateChildComponent/updateLayerDropdownItemNames';
import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentGenerator, CreateNewComponent, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { AddLayerComponent } from '../../../../../utils/componentManipulation/addChildComponent/add/addLayerComponent';
import { DROPDOWN_MENU_Z_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../../consts/horizontalAlignmentSections';
import { DEFAULT_STYLES, LAYER_STYLES } from '../../../../../../../../consts/componentStyles.enum';
import { PaddingComponentUtils } from '../../../shared/paddingComponent/paddingComponentUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { SelectDropdownText } from '../../../../../../../../interfaces/dropdownFeatures';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { ApplyDropdownButtonProperties } from '../button/applyProperties';
import { DropdownRefreshUtils } from '../../utils/dropdownRefreshUtils';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { defaultDropdownMenu } from '../menu/default';
import { DropdownMenuBase } from '../menu/base';

interface ButtonAndMenuComponentsSetupProperties {
  buttonComponentOverwritable?: (component: WorkshopComponent) => void;
  menuComponent: WorkshopComponent;
}

export class DropdownPaddingBase extends ComponentBuilder {

  private static setAndExecutePropertyReferenceSharingFuncs(paddingComponent: WorkshopComponent): void {
    paddingComponent.childComponentHandlers.onAddOverwritables = {
      propertyReferenceSharingFuncs: {
        // only executed when padding component is dereferenced
        // custom properties references are signalled to be shared on new layer additions by siblingChildComponentsAutoSynced,
        // however when existing layers are copied - this method sets them to be in sync
        container: [DropdownMenuBase.setAllItemAndItemTextComponentsToBeInSync],
      },
    };
    ApplyDropdownButtonProperties.overwriteButtonFeatures(paddingComponent);
  }

  private static setSyncableComponents(dropdownComponent: WorkshopComponent): void {
    const { paddingComponentChild } = dropdownComponent;
    const childComponents = [paddingComponentChild, paddingComponentChild.linkedComponents.auxiliary[0]];
    const uniqueComponents = {
      [COMPONENT_TYPES.DROPDOWN]: dropdownComponent,
    };
    dropdownComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents(uniqueComponents, childComponents, dropdownComponent);
  }

  private static createSelectDropdownTextProperties(): SelectDropdownText {
    return {
      defaultText: 'Select',
      lastHoveredItemText: null,
      lastSelectedItemText: null,
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      alignment: ComponentBuilder.createHorizontalAlignmentSection(HORIZONTAL_ALIGNMENT_SECTIONS.LEFT),
      selectDropdownText: DropdownPaddingBase.createSelectDropdownTextProperties(),
    };
  }

  private static overwriteStaticFeatures(paddingBaseSubcomponent: Subcomponent): void {
    paddingBaseSubcomponent.customStaticFeatures = DropdownPaddingBase.createDefaultCustomStaticFeatures();
    paddingBaseSubcomponent.defaultCustomStaticFeatures = DropdownPaddingBase.createDefaultCustomStaticFeatures();
  }

  private static overwriteCustomFeatures(paddingBaseSubcomponent: Subcomponent): void {
    paddingBaseSubcomponent.customFeatures = { dropdown: ComponentBuilder.createDopdownFeatures(null, DROPDOWN_MENU_Z_INDEX_ALIGNMENT.BELOW) };
    paddingBaseSubcomponent.defaultCustomFeatures = { dropdown: ComponentBuilder.createDopdownFeatures(null, DROPDOWN_MENU_Z_INDEX_ALIGNMENT.BELOW) };
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
    DropdownPaddingBase.setSyncableComponents(paddingComponent);
    DropdownPaddingBase.setAndExecutePropertyReferenceSharingFuncs(paddingComponent);
    DropdownRefreshUtils.setOnComponentLeaveFunc(paddingComponent);
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
