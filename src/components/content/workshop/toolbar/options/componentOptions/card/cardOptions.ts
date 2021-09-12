import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Options } from '../../../../../../../interfaces/options';
import { cardBottomLayerOptions } from '../layer/cardBottomLayer';
import { closeButtonTextOptions } from '../text/closeButtonText';
import { dropdownMenuOptions } from '../dropdown/dropdownMenu';
import { childButtonOptions } from '../button/childButton';
import { closeButtonOptions } from '../button/closeButton';
import { buttonTextOptions } from '../text/buttonText';
import { dropdownOptions } from '../dropdown/dropdown';
import { cardLayerOptions } from '../layer/cardLayer';
import { imageOptions } from '../image/image';
import { textOptions } from '../text/text';
import { iconOptions } from '../icon/icon';
import { cardBaseOptions } from './base';

export class CardOptions {

  private static readonly STATIC_CARD_OPTIONS: SubcomponentTypeToOptions = {
    // WORK 2 - may need to be removed from Card
    [SUBCOMPONENT_TYPES.DROPDOWN_MENU]: dropdownMenuOptions as Options,
    [SUBCOMPONENT_TYPES.DROPDOWN]: dropdownOptions as Options,
    [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
    [SUBCOMPONENT_TYPES.IMAGE]: imageOptions as Options,
    [SUBCOMPONENT_TYPES.ICON]: iconOptions as Options,
  };

  protected static getTextOptions(component: WorkshopComponent): Options {
    const subcomponentStyle = component.subcomponents[component.activeSubcomponentName].seedComponent.style;
    if (subcomponentStyle === TEXT_STYLES.BUTTON) {
      return buttonTextOptions as Options;
    } else if (subcomponentStyle === TEXT_STYLES.CLOSE_BUTTON) {
      return closeButtonTextOptions as Options;
    }
    return textOptions as Options;
  }

  protected static getButtonOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].seedComponent.style === BUTTON_STYLES.CLOSE) {
      return closeButtonOptions;
    }
    return childButtonOptions;
  }

  protected static getLayerOptions(component: WorkshopComponent): Options {
    // WORK 2 - may need to be removed from Card
    if (component.subcomponents[component.activeSubcomponentName].seedComponent.containerComponent.type === COMPONENT_TYPES.DROPDOWN_MENU) {
      return dropdownMenuOptions as Options;
    }
    const { layers } = component.componentPreviewStructure;
    const currentLayerIndex = layers.findIndex((layer) => layer.subcomponentProperties.name === component.activeSubcomponentName);
    if (currentLayerIndex === layers.length - 1) {
      return cardBottomLayerOptions as Options;
    }
    return cardLayerOptions as Options;
  }

  public static getCardOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.LAYER) {
      return CardOptions.getLayerOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return CardOptions.getButtonOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return CardOptions.getTextOptions(component);
    }
    return CardOptions.STATIC_CARD_OPTIONS[subcomponentType];
  } 
}
