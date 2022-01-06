import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES, LAYER_COMPONENTS_BASE_NAMES, PRIMITIVE_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { CustomCss, CustomFeatures, Subcomponent, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { uniqueSubcomponentIdState } from '../../../../utils/componentGenerator/uniqueSubcomponentIdState';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../consts/subcomponentCssClasses.enum';
import { CSS_PROPERTY_VALUES } from '../../../../../../../consts/cssPropertyValues.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { inheritedBaseChildCss } from '../../shared/childCss/inheritedBaseChildCss';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { DropdownRefreshUtils } from '../../dropdowns/utils/dropdownRefreshUtils';
import { CardBaseSpecificSettings } from '../settings/cardBaseSpecificSettings';
import { BORDER_STYLES } from '../../../../../../../consts/borderStyles.enum';
import { inheritedCardBaseCss } from '../inheritedCss/inheritedCardCss';
import { ComponentBuilder } from '../../shared/componentBuilder';

class CardBase extends ComponentBuilder {

  private static setComponentToRemovable(component: WorkshopComponent): void {
    component.baseSubcomponent.isRemovable = true;
  }

  public static setPropertyOverwritables(cardComponent: WorkshopComponent): void {
    cardComponent.childComponentHandlers.onAddOverwritables = {
      postBuildFuncs: {
        [COMPONENT_TYPES.LAYER]: {
          completeOnly: [CardBase.setComponentToRemovable],
        },
      },
    };
  }

  public static setChildComponentsItems(cardBaseComponent: WorkshopComponent): void {
    const layerChildItems = [
      BUTTON_COMPONENTS_BASE_NAMES.BUTTON, PRIMITIVE_COMPONENTS_BASE_NAMES.TEXT,
      BUTTON_COMPONENTS_BASE_NAMES.CLOSE, PRIMITIVE_COMPONENTS_BASE_NAMES.IMAGE,
      DROPDOWN_COMPONENTS_BASE_NAMES.DROPDOWN];
    const componentChildItems = [LAYER_COMPONENTS_BASE_NAMES.LAYER];
    const childComponentMaxCount = { max: { [LAYER_COMPONENTS_BASE_NAMES.LAYER]: 5, [BUTTON_COMPONENTS_BASE_NAMES.CLOSE]: 1 }};
    ComponentBuilder.setNewChildComponentsItemsProperties(cardBaseComponent,
      layerChildItems, componentChildItems, childComponentMaxCount);
  }

  private static createDefaultCardCss(): CustomCss {
    return {
      [CSS_PSEUDO_CLASSES.DEFAULT]: {
        color: '#004085',
        backgroundColor: '#ffffff',
        borderColor: '#00000033',
        borderTopWidth: '1px',
        borderRightWidth: '1px',
        borderLeftWidth: '1px',
        borderBottomWidth: '1px',
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

  public static createBaseSubcomponent(name: string): Subcomponent {
    return {
      name,
      subcomponentType: SUBCOMPONENT_TYPES.BASE,
      customCss: CardBase.createDefaultCardCss(),
      defaultCss: CardBase.createDefaultCardCss(),
      activeCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      defaultCssPseudoClassesDropdownItem: CSS_PSEUDO_CLASSES.DEFAULT,
      activeCssPseudoClassViaUserAction: CSS_PSEUDO_CLASSES.DEFAULT,
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
    CardBase.setChildComponentsItems(cardBaseComponent);
    CardBase.setPropertyOverwritables(cardBaseComponent);
    DropdownRefreshUtils.setOnComponentLeaveFunc(cardBaseComponent);
    CardBaseSpecificSettings.set(cardBaseComponent);
    return cardBaseComponent;
  },
}
