import { AddNewGenericComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewGenericComponent';
import { AddNewLayerComponent } from '../../../../utils/componentManipulation/addNewNestedComponent/add/addNewLayerComponent';
import { CustomCss, Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { CoreSubcomponentNames } from '../../../../../../../interfaces/customSubcomponentNames';
import { LAYER_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { CLOSE_BUTTON_X_TEXT } from '../../../../../../../consts/closeButtonXText';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import ReferenceSharingUtils from '../utils/referenceSharingUtils';
import { ComponentBuilder } from '../../shared/componentBuilder';
import { buttonBase } from './base';

class CloseButton extends ComponentBuilder {

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

  private static overwriteButtonTextProperties(subcomponents: Subcomponents, coreSubcomponentNames: CoreSubcomponentNames): void {
    subcomponents[coreSubcomponentNames.base].customStaticFeatures.subcomponentText.text = CLOSE_BUTTON_X_TEXT;
    subcomponents[coreSubcomponentNames.base].defaultCustomStaticFeatures.subcomponentText.text = CLOSE_BUTTON_X_TEXT;
  }

  public static addComponentsToBase(buttonComponent: WorkshopComponent): void {
    const layerSubcomponent = AddNewLayerComponent.add(buttonComponent, LAYER_STYLES.PLAIN, false);
    const textSubcomponent = AddNewGenericComponent.add(buttonComponent, COMPONENT_TYPES.TEXT, TEXT_STYLES.CLOSE_BUTTON,
      layerSubcomponent.coreSubcomponentNames.base, [CloseButton.overwriteButtonTextProperties]);
    const { coreSubcomponentNames } = buttonComponent;
    buttonComponent.componentPreviewStructure.baseSubcomponentProperties.nameOfAnotherSubcomponetToTrigger = textSubcomponent.coreSubcomponentNames.base;
    coreSubcomponentNames.text = textSubcomponent.coreSubcomponentNames.base;
  }

  public static addReferences(buttonComponent: WorkshopComponent): void {
    const { coreSubcomponentNames } = buttonComponent;
    ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    ReferenceSharingUtils.appendBaseSubcomponentRefToAllChildSubcomponents(buttonComponent.subcomponents, coreSubcomponentNames);
    buttonComponent.referenceSharingExecutables = [ReferenceSharingUtils.appendJsClassesRefToAllSubcomponents];
  }
}

export const closeButton: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonBase.createNewComponent(baseName);
    CloseButton.overwriteBaseCustomCss(buttonComponent);
    CloseButton.addComponentsToBase(buttonComponent);
    CloseButton.addReferences(buttonComponent);
    return buttonComponent;
  }
};
