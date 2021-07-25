import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { cardBottomLayerOptions } from '../layer/cardBottomLayer';
import { closeButtonTextOptions } from '../text/closeButtonText';
import { nestedButtonOptions } from '../button/nestedButton';
import { closeButtonOptions } from '../button/closeButton';
import { cardLayerOptions } from '../layer/cardLayer';
import { buttonTextOptions } from '../button/text';
import { imageOptions } from '../image/image';
import { textOptions } from '../text/text';
import { cardBaseOptions } from './base';

export class CardOptions {

  private static readonly STATIC_CARD_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
    [SUBCOMPONENT_TYPES.IMAGE]: imageOptions as Options,
  };

  protected static getTextOptions(component: WorkshopComponent): Options {
    const subcomponentStyle = component.subcomponents[component.activeSubcomponentName].nestedComponent.ref.style;
    if (subcomponentStyle === TEXT_STYLES.BUTTON) {
      return buttonTextOptions as Options;
    } else if (subcomponentStyle === TEXT_STYLES.CLOSE_BUTTON) {
      return closeButtonTextOptions as Options;
    }
    return textOptions as Options;
  }

  protected static getButtonOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].nestedComponent.ref.style === BUTTON_STYLES.CLOSE) {
      return closeButtonOptions;
    }
    return nestedButtonOptions;
  }

  protected static getLayerOptions(component: WorkshopComponent): Options {
    const { layers } = component.componentPreviewStructure;
    const currentLayerIndex = layers.findIndex((layer) => layer.name === component.activeSubcomponentName);
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
