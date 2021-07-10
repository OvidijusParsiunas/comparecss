import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { CardBaseSpecificSettings } from '../settings/cardBaseSpecificSettings';
import { inheritedCardBaseCss } from '../inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class CardBase extends ComponentBuilder {

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
    };
  }

  private static createDefaultCustomFeatures(): CustomFeatures {
    return {
      animations: ComponentBuilder.createDefaultAnimationsProperties(),
    };
  }

  public static createBaseSubcomponent(): SubcomponentProperties {
    return {
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: CardBase.createDefaultCardCss(),
      defaultCss: CardBase.createDefaultCardCss(),
      activeCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClass: CSS_PSEUDO_CLASSES.DEFAULT,
      inheritedCss: inheritedCardBaseCss,
      childCss: inheritedBaseChildCss,
      customFeatures: CardBase.createDefaultCustomFeatures(),
      defaultCustomFeatures: CardBase.createDefaultCustomFeatures(),
    };
  }
}

export const cardBase: ComponentGenerator = {
  createNewComponent(): WorkshopComponent {
    uniqueSubcomponentIdState.resetUniqueId();
    const cardBaseComponent = ComponentBuilder.createBaseComponent(
      { componentType: COMPONENT_TYPES.CARD }, CardBase.createBaseSubcomponent, false);
    CardBaseSpecificSettings.set(cardBaseComponent);
    return cardBaseComponent;
  },
}
