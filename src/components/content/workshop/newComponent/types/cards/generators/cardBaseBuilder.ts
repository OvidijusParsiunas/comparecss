import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { NewComponentStyleProperties } from '../../../../../../../consts/newComponentStyleProperties';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { inheritedCardBaseCss } from '../inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class CardBaseBuilder extends ComponentBuilder {

  private static createDefaultCardCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '4px',
        width: '450px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        top: '0px',
      },
    }
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDefaultAnimationsProperties(),
    };
  }

  private static createBaseSubcomponent(componentStyle: NewComponentStyleProperties): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || CardBaseBuilder.createDefaultCardCss(),
      defaultCss: (componentStyle.baseCustomCssFunc && componentStyle.baseCustomCssFunc()) || CardBaseBuilder.createDefaultCardCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: CardBaseBuilder.createDefaultCustomFeatures(),
      defaultCustomFeatures: CardBaseBuilder.createDefaultCustomFeatures(),
    };
  }

  public static create(componentStyle: NewComponentStyleProperties = {}): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    if (componentStyle.componentType === undefined) componentStyle.componentType = COMPONENT_TYPES.CARD;
    return ComponentBuilder.createBaseComponent(componentStyle, CardBaseBuilder.createBaseSubcomponent, false);
  }
}

export const cardBase: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    return CardBaseBuilder.create();
  },
}
