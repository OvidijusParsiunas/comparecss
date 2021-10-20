import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { DropdownItemLayer, SetTextSubcomponentPropertiesContext } from '../../../layers/generators/dropdownItem';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { ComponentGenerator, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { DropdownFeatures, DropdownMenuPosition } from '../../../../../../../../interfaces/dropdownFeatures';
import { DROPDOWN_MENU_INDEX_ALIGNMENT } from '../../../../../../../../consts/dropdownMenuAlignment.enum';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { DropdownUtils } from '../../../../../utils/componentManipulation/utils/dropdownUtils';
import { CSS_PROPERTY_VALUES } from '../../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { inheritedBaseChildCss } from '../../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../../cards/inheritedCss/inheritedCardCss';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { MenuBaseSpecificSettings } from '../../settings/menuBaseSpecificSettings';
import { BORDER_STYLES } from '../../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../../shared/componentBuilder';

export class DropdownMenuBase extends ComponentBuilder {

  public static setNewChildComponents(dropdownMenuComponent: WorkshopComponent): void {
    const dropdownItems = DropdownUtils.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]);
    dropdownMenuComponent.newChildComponents = { dropdownItems };
  }

  public static setSyncableSubcomponents(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.sync.syncables = ComponentBuilder.createSyncablesObjectUsingSubcomponents({
      [SUBCOMPONENT_TYPES.BASE]: dropdownMenuComponent.baseSubcomponent });
  }

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingRight' || cssProperty === 'fontSize' || cssProperty === 'fontWeight') {
      DropdownMenuAutoWidthUtils.setMenuWidthViaMenuItemOrTextChange(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: DropdownMenuAutoWidthUtils.setDropdownButtonAndMenuWidthsViaItemTextContentChange,
      [SETTINGS_TYPES.RANGE]: DropdownMenuBase.setWidthViaRange,
      [SETTINGS_TYPES.ACTIONS_DROPDOWN]: DropdownMenuBase.setWidthViaRange,
    };
  }

  private static copyItemAndTextComponentProperties(layerSubcomponentToBeCopied: SubcomponentProperties, targetLayerSubcomponent: SubcomponentProperties,
      menuComponent: WorkshopComponent): void {
    targetLayerSubcomponent.customCss = layerSubcomponentToBeCopied.customCss;
    targetLayerSubcomponent.customFeatures = layerSubcomponentToBeCopied.customFeatures;
    DropdownItemLayer.setTextSubcomponentProperties
      .bind({ menuComponent } as SetTextSubcomponentPropertiesContext)
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
    const firstLayerSubcomponentProperties = menuComponent.componentPreviewStructure.layers[0]?.subcomponentProperties;
    menuComponent.componentPreviewStructure.layers.forEach((layer) => {
      DropdownMenuBase.copyItemAndTextComponentProperties(firstLayerSubcomponentProperties, layer.subcomponentProperties, menuComponent);
    });
  }

  public static setSiblingLayersInSyncWithEachOther(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.siblingLayersInSyncWithEachOther = { containerSyncFunc: DropdownMenuBase.setAllItemAndItemTextComponentsToBeInSync };
  }

  private static createDefaultMenuCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderWidth: '1px',
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
      indexAlignment: DROPDOWN_MENU_INDEX_ALIGNMENT.ABOVE,
      menuPosition: DropdownMenuBase.createDefaultMenuPosition(),
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
      dropdown: DropdownMenuBase.createDefaultDropdownProperties(),
    };
  }

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.DROPDOWN_MENU,
      customCss: DropdownMenuBase.createDefaultMenuCss(),
      defaultCss: DropdownMenuBase.createDefaultMenuCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
    };
  }
}

export const dropdownMenuBase: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
  presetProperties.componentType = COMPONENT_TYPES.DROPDOWN_MENU;
    const dropdownMenuComponent = DropdownMenuBase.createBaseComponent(presetProperties, DropdownMenuBase.createBaseSubcomponent, false);
    DropdownMenuBase.setSiblingLayersInSyncWithEachOther(dropdownMenuComponent);
    DropdownMenuBase.setTriggerFuncOnSettingChange(dropdownMenuComponent);
    DropdownMenuBase.setSyncableSubcomponents(dropdownMenuComponent);
    DropdownMenuBase.setNewChildComponents(dropdownMenuComponent);
    MenuBaseSpecificSettings.set(dropdownMenuComponent);
    return dropdownMenuComponent;
  },
}
