import { CustomCss, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { AddComponentsToButtonBaseUtils } from '../utils/addComponentsToButtonBaseUtils';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import ReferenceSharingUtils from '../utils/referenceSharingUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class CloseButton extends ComponentBuilder {

  public static setStyle(component: WorkshopComponent): void {
    component.style = BUTTON_STYLES.CLOSE;
  }

  public static addReferences(component: WorkshopComponent): void {
    const { coreSubcomponentNames } = component;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(component.subcomponents, coreSubcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(component.subcomponents, coreSubcomponentNames);
    component.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
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
        borderStyle: 'solid',
        borderColor: '#000000',
        backgroundColor: CSS_PROPERTY_VALUES.INHERIT,
        outline: 'none',
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        marginRight: '5px',
        transition: CSS_PROPERTY_VALUES.UNSET,
        left: '0px',
      }
    }
  }

  public static overwriteBaseCustomCss(component: WorkshopComponent): void {
    component.subcomponents[component.coreSubcomponentNames.base].customCss = CloseButton.createDefaultBaseCss();
    component.subcomponents[component.coreSubcomponentNames.base].defaultCss = CloseButton.createDefaultBaseCss();
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    CloseButton.overwriteBaseCustomCss(buttonComponent);
    AddComponentsToButtonBaseUtils.add(buttonComponent, TEXT_STYLES.CLOSE_BUTTON, CLOSE_BUTTON_X_TEXT);
    CloseButton.addReferences(buttonComponent);
    CloseButton.setStyle(buttonComponent);
    return buttonComponent;
  }
};
