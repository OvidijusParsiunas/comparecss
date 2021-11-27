import { DropdownItemLayer, OverwriteDropdownItemContext, SetTextSubcomponentContext } from '../../../layers/generators/dropdownItem';
import { ComponentGenerator, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { CustomCss, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../../consts/cssPropertyValues.enum';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { ApplyDropdownMenuItemTextProperties } from '../itemText/applyProperties';
import { BORDER_STYLES } from '../../../../../../../../consts/borderStyles.enum';
import { dropdownMenuBase } from './base';

export class DefaultDropdownMenu {

  private static createDefaultLayerCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        position: 'relative',
        height: '30px',
        textAlign: 'left',
        paddingLeft: '20px',
        paddingTop: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        borderBottomWidth: '0px',
        borderBottomStyle: BORDER_STYLES.SOLID,
        borderBottomColor: '#e9ecef',
        cursor: 'pointer',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        backgroundColor: '#5050da',
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }

  private static overwriteLayerCss(layerComponent: WorkshopComponent): void {
    layerComponent.baseSubcomponent.customCss = DefaultDropdownMenu.createDefaultLayerCss();
    layerComponent.baseSubcomponent.defaultCss = DefaultDropdownMenu.createDefaultLayerCss();
  }

  private static createDefaultTextCustomCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: 'max-content',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        fontSize: '14px',
        color: '#000000',
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
        borderTopWidth: '0px',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        borderBottomWidth: '0px',
        borderColor: '#1779ba',
        borderStyle: BORDER_STYLES.SOLID,
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

  public static setPropertyOverwritables(menuComponent: WorkshopComponent): void {
    menuComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs[COMPONENT_TYPES.LAYER]
      .unshift(DropdownItemLayer.overwriteDropdownItem.bind(DefaultDropdownMenu.overwriteLayerCss as OverwriteDropdownItemContext));
    menuComponent.childComponentHandlers.onAddOverwritables.postBuildFuncs[COMPONENT_TYPES.TEXT] = [
      ApplyDropdownMenuItemTextProperties.apply.bind(
        { menuComponent, createDefaultTextCss: DefaultDropdownMenu.createDefaultTextCustomCss } as SetTextSubcomponentContext)];
  }
}

export const defaultDropdownMenu: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const menuComponent = dropdownMenuBase.createNewComponent(presetProperties);
    DefaultDropdownMenu.setPropertyOverwritables(menuComponent);
    return menuComponent;
  },
}
