import { CustomCss, CustomFeatures, DropdownMenuPosition, SubcomponentProperties, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { UpdateDropdownOptionNamesShared } from '../../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { DropdownMenuAutoWidthUtils } from '../../../../../toolbar/settings/utils/autoDropdownMenuWidthUtils';
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
import { MenuBaseSpecificSettings } from '../../settings/menuBaseSpecificSettings';
import { DropdownItemLayer } from '../../../layers/generators/dropdownItem';
import { AutoSize } from '../../../../../../../../interfaces/autoSize';
import { ComponentBuilder } from '../../../shared/componentBuilder';

class DropdownMenuBase extends ComponentBuilder {

  public static setAreLayersInSyncByDefault(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.areLayersInSyncByDefault = true;
  }

  public static setAuxiliaryComponentReferenceOnBase(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.subcomponents[dropdownMenuComponent.coreSubcomponentNames.base].parentAuxiliaryComponent = dropdownMenuComponent;
  }

  private static createDefaultNewNestedComponentsOptions(): NestedDropdownStructure {
    return UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.DROPDOWN_MENU_ITEM]);
  }

  private static createDefaultMenuCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        width: '160px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        top: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        userSelect: 'none',
        minWidth: '0px',
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

  private static createDefaultAutoSize(): AutoSize {
    const widthCalculationFunc = DropdownMenuAutoWidthUtils.setWidth;
    return ComponentBuilder.createAutoSize(false, false, { widthCalculationFunc })
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
      autoSize: DropdownMenuBase.createDefaultAutoSize(),
      dropdownMenuPosition: DropdownMenuBase.createDropdownMenuPosition(),
      // WORK1
      dropdownSelect: { enabled: false, lastSelectedItemText: 'Select', callback: DropdownItemLayer.callback },
    };
  }

  public static createBaseSubcomponent(): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.DROPDOWN_MENU,
      customCss: DropdownMenuBase.createDefaultMenuCss(),
      defaultCss: DropdownMenuBase.createDefaultMenuCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: DropdownMenuBase.createDefaultCustomFeatures(),
      newNestedComponentsOptions: DropdownMenuBase.createDefaultNewNestedComponentsOptions(),
    };
  }
}

export const dropdownMenuBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const dropdownMenuComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.DROPDOWN_MENU, baseName }, DropdownMenuBase.createBaseSubcomponent, false);
    DropdownMenuBase.setAuxiliaryComponentReferenceOnBase(dropdownMenuComponent);
    DropdownMenuBase.setAreLayersInSyncByDefault(dropdownMenuComponent);
    MenuBaseSpecificSettings.set(dropdownMenuComponent);
    return dropdownMenuComponent;
  },
}
