import { SyncChildComponentUtils } from '../../../../../toolbar/options/syncChildComponent/syncChildComponentUtils';
import { CustomCss, WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { BORDER_STYLES } from '../../../../../../../../consts/borderStyles.enum';
import { DropdownItemLayer } from '../../../layers/generators/dropdownItem';
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
        color: '#ff0000',
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
        borderWidth: '0px',
        borderColor: '#1779ba',
        borderStyle: BORDER_STYLES.SOLID,
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

  // WORK 2 - place in the dropdown item class
  private static overwriteLayer(layerComponent: WorkshopComponent, menuComponent: WorkshopComponent): void {
    DropdownItemLayer.addChildComponentsToLayer(layerComponent, menuComponent, DefaultDropdownMenu.createDefaultTextCustomCss);
    if (menuComponent.componentPreviewStructure.layers.length === 1
        && !SyncChildComponentUtils.getCurrentOrParentComponentThatIsInSync(menuComponent)) {
      DefaultDropdownMenu.overwriteLayerCss(layerComponent);
    }
  }

  public static overwrite(dropdownMenuComponent: WorkshopComponent): void {
    dropdownMenuComponent.newChildComponents.propertyOverwritables = {
      [COMPONENT_TYPES.LAYER]: DefaultDropdownMenu.overwriteLayer,
    };
  }
}

export const defaultDropdownMenu: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const dropdownMenuComponent = dropdownMenuBase.createNewComponent(baseName);
    DefaultDropdownMenu.overwrite(dropdownMenuComponent);
    return dropdownMenuComponent;
  },
}
