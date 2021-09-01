import { CustomCss, CustomFeatures, DropdownMenuPosition, SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { UpdateDropdownOptionNamesShared } from '../../../../../utils/componentManipulation/updateChildComponent/updateDropdownOptionNamesShared';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/dropdownMenuAutoWidthUtils';
import { LAYER_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { NestedDropdownStructure } from '../../../../../../../../interfaces/nestedDropdownStructure';
import { DROPDOWN_MENU_POSITIONS } from '../../../../../../../../consts/dropdownMenuPositions.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../../../cards/inheritedCss/inheritedCardCss';
import { SETTINGS_TYPES } from '../../../../../../../../consts/settingsTypes.enum';
import { MenuBaseSpecificSettings } from '../../settings/menuBaseSpecificSettings';
import { BORDER_STYLES } from '../../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../../shared/componentBuilder';

class DropdownMenuBase extends ComponentBuilder {

  private static setWidthViaRange(subcomponentProperties: SubcomponentProperties, cssProperty: string): void {
    if (cssProperty === 'paddingLeft' || cssProperty === 'paddingRight' || cssProperty === 'fontSize' || cssProperty === 'fontWeight') {
      DropdownMenuAutoWidthUtils.setWidth(subcomponentProperties);
    }
  }

  public static setTriggerFuncOnSettingChange(dropdownMenuBaseComponent: WorkshopComponent): void {
    dropdownMenuBaseComponent.triggerFuncOnSettingChange = {
      [SETTINGS_TYPES.INPUT]: DropdownMenuAutoWidthUtils.setWidth,
      [SETTINGS_TYPES.RANGE]: DropdownMenuBase.setWidthViaRange,
      [SETTINGS_TYPES.ACTIONS_DROPDOWN]: DropdownMenuBase.setWidthViaRange,
    };
  }

  public static setAreLayersInSyncByDefault(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.areLayersInSyncByDefault = true;
  }

  private static createDefaultNewChildComponentsOptions(): NestedDropdownStructure {
    return UpdateDropdownOptionNamesShared.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]);
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
      },
    };
  }

  private static createDropdownMenuPosition(): DropdownMenuPosition {
    return { position: DROPDOWN_MENU_POSITIONS.BOTTOM };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
      dropdownMenuPosition: DropdownMenuBase.createDropdownMenuPosition(),
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
      newChildComponentsOptions: DropdownMenuBase.createDefaultNewChildComponentsOptions(),
    };
  }
}

export const dropdownMenuBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const dropdownMenuComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.DROPDOWN_MENU, baseName }, DropdownMenuBase.createBaseSubcomponent, false);
    DropdownMenuBase.setAreLayersInSyncByDefault(dropdownMenuComponent);
    DropdownMenuBase.setTriggerFuncOnSettingChange(dropdownMenuComponent);
    MenuBaseSpecificSettings.set(dropdownMenuComponent);
    return dropdownMenuComponent;
  },
}
