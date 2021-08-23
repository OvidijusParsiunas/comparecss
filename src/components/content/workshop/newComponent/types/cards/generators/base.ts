import { BUTTON_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { UpdateDropdownOptionNamesShared } from '../../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { CustomCss, CustomFeatures, SubcomponentProperties, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { CardBaseSpecificSettings } from '../settings/cardBaseSpecificSettings';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { inheritedCardBaseCss } from '../inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class CardBase extends ComponentBuilder {

  public static setNestedComponentCountMax(cardBaseComponent: WorkshopComponent): void {
    cardBaseComponent.nestedComponentCount = {
      max: { [LAYER_COMPONENTS_BASE_NAMES.LAYER]: 5, [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: 1 }};
  }

  public static setNestedComponentsOptions(cardBaseComponent: WorkshopComponent): void {
    const layerComponentsOptions = UpdateDropdownOptionNamesShared.generateDropdownStructure([
      BUTTON_COMPONENTS_BASE_NAMES.BUTTON, PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT, BUTTON_COMPONENTS_BASE_NAMES.CLOSE, PRIMITIVE_COMPONENTS_BASE_NAMES.IMAGE]);
    cardBaseComponent.newNestedComponentsOptionsRefs = { layer: layerComponentsOptions };
    const baseComponentOptions = UpdateDropdownOptionNamesShared.generateDropdownStructure([LAYER_COMPONENTS_BASE_NAMES.LAYER]);
    cardBaseComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].newNestedComponentsOptions = baseComponentOptions;
    cardBaseComponent.nestedComponentCount = {
      max: { [LAYER_COMPONENTS_BASE_NAMES.LAYER]: 5, [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: 1 }};
  }

  private static createDefaultCardCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderWidth: '1px',
        borderStyle: BORDER_STYLES.SOLID,
        borderRadius: '4px',
        width: '450px',
        boxSizing: CSS_PROPERTY_VALUES.UNSET,
        boxShadow: CSS_PROPERTY_VALUES.UNSET,
        top: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
      },
    };
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
    CardBase.setNestedComponentsOptions(cardBaseComponent);
    CardBaseSpecificSettings.set(cardBaseComponent);
    return cardBaseComponent;
  },
}
