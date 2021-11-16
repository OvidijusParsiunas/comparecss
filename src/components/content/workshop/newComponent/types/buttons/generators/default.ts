import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { AddTextComponentToButton } from '../utils/addTextComponentToButton';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class DefaultButton extends ComponentBuilder {

  public static overwriteSubcomponentProperties(textBaseSubcomponent: Subcomponent): void {
    textBaseSubcomponent.tempCustomCss = new Set(['transition']);
  }

  public static createDefaultTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: 'max-content',
        userSelect: 'none',
        overflow: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '14px',
        fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        color: '#ffffff',
        fontWeight: '400',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
      [CSS_PSEUDO_CLASSES.HOVER]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
      [CSS_PSEUDO_CLASSES.CLICK]: {
        color: CSS_PROPERTY_VALUES.INHERIT,
      },
    };
  }
}

export const defaultButton: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(presetProperties);
    AddTextComponentToButton.add(buttonComponent, TEXT_STYLES.BUTTON,
      DefaultButton.createDefaultTextCss, DefaultButton.overwriteSubcomponentProperties);
    return buttonComponent;
  },
}
