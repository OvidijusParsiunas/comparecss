import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { BUTTON_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { AlertBaseSpecificSettings } from '../settings/alertBaseSpecificSettings';
import { inheritedCardBaseCss } from '../../cards/inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class AlertBase extends ComponentBuilder {

  public static setNestedComponentCountMax(alertBaseComponent: WorkshopComponent): void {
    alertBaseComponent.nestedComponentCount = { max: { [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: 1 }};
  }

  public static setNewNestedComponentsOptionsRefs(alertBaseComponent: WorkshopComponent): void {
    const newNestedComponentsOptions = UpdateDropdownOptionNamesShared.generateDropdownStructure([
      PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, BUTTON_COMPONENTS_BASE_NAMES.CLOSE]);
    alertBaseComponent.newNestedComponentsOptionsRefs = { layer: newNestedComponentsOptions };
    alertBaseComponent.coreSubcomponentRefs.base.newNestedComponentsOptions = newNestedComponentsOptions;
  }

  private static createDefaultCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#cce5ff',
        borderColor: '#b8daff',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        width: '400px',
        height: '50px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        fontSize: '16px',
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0px',
        paddingBottom: '0px',
        fontFamily: '"Poppins", sans-serif',
        textAlign: 'left',
      },
    }
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDisplayAnimationsProperties(),
    };
  }

  public static createBaseSubcomponent(name: string): SubcomponentProperties {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: AlertBase.createDefaultCss(),
      defaultCss: AlertBase.createDefaultCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: AlertBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: AlertBase.createDefaultCustomFeatures(),
    };
  }
}

export const alertBase: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const alertBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.ALERT, baseName }, AlertBase.createBaseSubcomponent, false);
    AlertBase.setNewNestedComponentsOptionsRefs(alertBaseComponent);
    AlertBase.setNestedComponentCountMax(alertBaseComponent);
    AlertBaseSpecificSettings.set(alertBaseComponent);
    return alertBaseComponent;
  },
}
