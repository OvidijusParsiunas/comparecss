import { CustomCss, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ComponentGenerator, PresetProperties } from '../../../../../../../interfaces/componentGenerator';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { inheritedCloseTextCss } from '../../text/inheritedCss/inheritedCloseTextCss';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { AddTextComponentToButton } from '../utils/addTextComponentToButton';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class CloseButton extends ComponentBuilder {

  public static removeChildComponentAddRemoveFunctionality(buttonComponent: WorkshopComponent): void {
    delete buttonComponent.newChildComponents.addRemoveFunctionality;
  }

  private static overwriteButtonTextProperties(textBaseSubcomponent: Subcomponent, textContent: string): void {
    textBaseSubcomponent.customStaticFeatures.subcomponentText.text = textContent;
    textBaseSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = textContent;
    textBaseSubcomponent.isRemovable = false;
  }

  private static overwriteInheritedCss(textBaseSubcomponent: Subcomponent): void {
    textBaseSubcomponent.inheritedCss = inheritedCloseTextCss;
  }

  public static overwriteTextBase(textBaseSubcomponent: Subcomponent): void {
    CloseButton.overwriteInheritedCss(textBaseSubcomponent);
    CloseButton.overwriteButtonTextProperties(textBaseSubcomponent, CLOSE_BUTTON_X_TEXT);
  }

  public static createDefaultTextCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        width: 'max-content',
        color: '#ff0000',
        userSelect: 'none',
        overflow: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '18px',
        fontFamily: '"Poppins", sans-serif',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        fontWeight: '300',
        paddingTop: '1px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        outline: 'none',
        left: '0px',
      },
    };
  }

  private static setButtonStyle(buttonComponent: WorkshopComponent): void {
    buttonComponent.style = BUTTON_STYLES.CLOSE;
  }

  private static createDefaultButtonBaseCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        height: '18px',
        width: '17px',
        borderRadius: '15px',
        cursor: 'pointer',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        borderTopWidth: '0px',
        borderRightWidth: '0px',
        borderLeftWidth: '0px',
        borderBottomWidth: '0px',
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
      },
    };
  }

  private static overwriteBaseCustomCss(buttonBaseSubcomponent: Subcomponent): void {
    buttonBaseSubcomponent.customCss = CloseButton.createDefaultButtonBaseCss();
    buttonBaseSubcomponent.defaultCss = CloseButton.createDefaultButtonBaseCss();
  }

  public static overwriteButton(buttonComponent: WorkshopComponent): void {
    CloseButton.overwriteBaseCustomCss(buttonComponent.baseSubcomponent);
    CloseButton.setButtonStyle(buttonComponent);
    CloseButton.removeChildComponentAddRemoveFunctionality(buttonComponent);
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(presetProperties);
    CloseButton.overwriteButton(buttonComponent);
    AddTextComponentToButton.add(buttonComponent, TEXT_STYLES.CLOSE_BUTTON,
      CloseButton.createDefaultTextCss, CloseButton.overwriteTextBase);
    return buttonComponent;
  }
};
