import { CustomCss, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class CloseButton extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = BUTTON_STYLES.CLOSE;
  }

  private static createDefaultBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        height: '18px',
        width: '17px',
        borderRadius: '15px',
        cursor: 'pointer',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        borderWidth: '0px',
        borderStyle: BORDER_STYLES.SOLID,
        borderColor: '#000000',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        outline: 'none',
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        marginRight: '5px',
        marginLeft: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        left: '0px',
      }
    }
  }

  private static overwriteBaseCustomCss(subcomponent: SubcomponentProperties): void {
    subcomponent.customCss = CloseButton.createDefaultBaseCss();
    subcomponent.defaultCss = CloseButton.createDefaultBaseCss();
  }

  public static overwrite(component: WorkshopComponent): void {
    CloseButton.overwriteBaseCustomCss(component.baseSubcomponent);
    CloseButton.setStyle(component);
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(presetProperties);
    CloseButton.overwrite(buttonComponent);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.CLOSE_BUTTON, CLOSE_BUTTON_X_TEXT);
    return buttonComponent;
  }
};
