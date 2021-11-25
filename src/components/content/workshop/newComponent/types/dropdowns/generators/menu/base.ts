import { CustomCss, CustomFeatures, CustomStaticFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { LAYER_COMPONENTS_BASE_NAMES, TEMPORARY_COMPONENT_BASE_NAME } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentGenerator, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { DropdownFeatures, DropdownMenuPosition } from '../../../../../../../../interfaces/dropdownFeatures';
import { DROPDOWN_MENU_Z_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { DropdownUtils } from '../../../../../utils/componentManipulation/utils/dropdownUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { inheritedBaseChildCss } from '../../../shared/childCss/inheritedBaseChildCss';
import { SetTextSubcomponentContext } from '../../../layers/generators/dropdownItem';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { DropdownMenuAutoWidthUtils } from '../../utils/dropdownMenuAutoWidthUtils';
import { inheritedCardBaseCss } from '../../../cards/inheritedCss/inheritedCardCss';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { MenuBaseSpecificSettings } from '../../settings/menuBaseSpecificSettings';
import { ApplyDropdownMenuItemTextProperties } from '../itemText/applyProperties';
import { BORDER_STYLES } from '../../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { ITEM_TEXT_OPTIONS } from '../itemText/itemTextOptions';

export class DropdownMenuBase extends ComponentBuilder {

  public static setNewChildComponents(dropdownMenuComponent: WorkshopComponent): void {
    const dropdownItems = DropdownUtils.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]);
    dropdownMenuComponent.newChildComponents.addRemoveFunctionality = { dropdownItems };
  }

  public static setSyncableComponents(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents({
      [COMPONENT_TYPES.DROPDOWN_MENU]: dropdownMenuComponent });
  }

  private static incrementItemTextOptionIndex(itemComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    if (itemComponent.activeSubcomponentName !== TEMPORARY_COMPONENT_BASE_NAME.TEMPORARY) {
      const { dropdownMenuData: dropdownMenu } = menuComponent.baseSubcomponent.customStaticFeatures;
      if (dropdownMenu.itemTextOptionIndex < ITEM_TEXT_OPTIONS.length - 1) {
        dropdownMenu.itemTextOptionIndex += 1;  
      } else {
        dropdownMenu.itemTextOptionIndex = 0;
      }
    }
  }

  public static setPropertyOverwritables(menuComponent: WorkshopComponent): void {
    menuComponent.newChildComponents.propertyOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.LAYER]: [DropdownMenuBase.incrementItemTextOptionIndex],
      },
    };
  }

  private static setMenuWidthViaMenuItemOrTextChange(subcomponent: Subcomponent): void {
    const menuComponent = subcomponent.seedComponent.containerComponent || subcomponent.seedComponent;
    DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
  }

  private static setWidthViaRange(subcomponent: Subcomponent, cssProperty: string): void {
    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingRight' || cssProperty === 'fontSize' || cssProperty === 'fontWeight') {
      DropdownMenuBase.setMenuWidthViaMenuItemOrTextChange(subcomponent);
    }
  }

  private static setDropdownButtonAndMenuWidthsViaItemTextContentChange(itemSubcomponent: Subcomponent): void {
    const menuComponent = itemSubcomponent.seedComponent.containerComponent;
    DropdownMenuAutoWidthUtils.setMenuWidth(menuComponent);
    DropdownMenuAutoWidthUtils.setButtonWidth(menuComponent.linkedComponents.base, menuComponent);
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: DropdownMenuBase.setDropdownButtonAndMenuWidthsViaItemTextContentChange,
      [SETTINGS_TYPES.RANGE]: DropdownMenuBase.setWidthViaRange,
      [SETTINGS_TYPES.ACTIONS_DROPDOWN]: DropdownMenuBase.setWidthViaRange,
    };
  }

  public static setOnChildComponentRemovalFunc(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.onChildComponentRemovalFunc = DropdownMenuAutoWidthUtils.updateButtonAndMenuWidth;
  }

  private static copyItemAndTextComponentProperties(layerSubcomponentToBeCopied: Subcomponent, targetLayerSubcomponent: Subcomponent,
      menuComponent: WorkshopComponent): void {
    targetLayerSubcomponent.customCss = layerSubcomponentToBeCopied.customCss;
    targetLayerSubcomponent.customFeatures = layerSubcomponentToBeCopied.customFeatures;
    ApplyDropdownMenuItemTextProperties.apply
      .bind({ menuComponent } as SetTextSubcomponentContext)
      (targetLayerSubcomponent.seedComponent.newChildComponents.childComponentsLockedToLayer[0]);
  }

  private static getMenuComponent(component: WorkshopComponent): WorkshopComponent {
    if (component.paddingComponentChild) {
      return component.paddingComponentChild.linkedComponents.auxiliary[0];
    }
    return component;
  }

  // component param can be either menu component or padding component
  public static setAllItemAndItemTextComponentsToBeInSync(component: WorkshopComponent): void {
    const menuComponent = DropdownMenuBase.getMenuComponent(component);
    const firstLayerSubcomponent = menuComponent.componentPreviewStructure.layers[0]?.subcomponent;
    menuComponent.componentPreviewStructure.layers.forEach((layer) => {
      DropdownMenuBase.copyItemAndTextComponentProperties(firstLayerSubcomponent, layer.subcomponent, menuComponent);
    });
  }

  public static setSiblingChildComponentsAutoSynced(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.sync.siblingChildComponentsAutoSynced = { resyncFunc: DropdownMenuBase.setAllItemAndItemTextComponentsToBeInSync };
  }

  private static createDefaultMenuCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderLeftWidth: '1px',
        borderBottomWidth: '1px',
        borderStyle: BORDER_STYLES.SOLID,
        borderRadius: '4px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        top: '0px',
        width: '114px',
        minWidth: '160px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        userSelect: 'none',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingLeft: '0px',
        paddingBottom: '0px',
        zIndex: 1,
      },
    };
  }

  private static createDefaultMenuPosition(): DropdownMenuPosition {
    return { position: DROPDOWN_MENU_POSITIONS.BOTTOM };
  }

  private static createDefaultDropdownProperties(): DropdownFeatures {
    return {
      zIndexAlignment: DROPDOWN_MENU_Z_INDEX_ALIGNMENT.ABOVE,
      menuPosition: DropdownMenuBase.createDefaultMenuPosition(),
    };
  }

  private static createDefaultCustomStaticFeatures(): CustomStaticFeatures {
    return {
      dropdownMenuData: {
        itemTextOptionIndex: 0,
      },
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
      dropdown: DropdownMenuBase.createDefaultDropdownProperties(),
    };
  }

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.DROPDOWN_MENU,
      customCss: DropdownMenuBase.createDefaultMenuCss(),
      defaultCss: DropdownMenuBase.createDefaultMenuCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
      customStaticFeatures: DropdownMenuBase.createDefaultCustomStaticFeatures(),
      defaultCustomStaticFeatures: DropdownMenuBase.createDefaultCustomStaticFeatures(),
    };
  }
}

export const dropdownMenuBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
  presetProperties.componentType = COMPONENT_TYPES.DROPDOWN_MENU;
    const dropdownMenuComponent = DropdownMenuBase.createBaseComponent(presetProperties, DropdownMenuBase.createBaseSubcomponent, false);
    DropdownMenuBase.setSiblingChildComponentsAutoSynced(dropdownMenuComponent);
    DropdownMenuBase.setOnChildComponentRemovalFunc(dropdownMenuComponent);
    DropdownMenuBase.setTriggerFuncOnSettingChange(dropdownMenuComponent);
    DropdownMenuBase.setPropertyOverwritables(dropdownMenuComponent);
    DropdownMenuBase.setSyncableComponents(dropdownMenuComponent);
    DropdownMenuBase.setNewChildComponents(dropdownMenuComponent);
    MenuBaseSpecificSettings.set(dropdownMenuComponent);
    return dropdownMenuComponent;
  },
}
