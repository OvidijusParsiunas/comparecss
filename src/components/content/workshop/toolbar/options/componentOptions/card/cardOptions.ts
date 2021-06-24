import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { BUTTON_STYLES, TEXT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { closeButtonTextOptions } from '../button/closeText';
import { nestedButtonOptions } from '../button/nestedButton';
import { defaultLayerOptions } from '../layer/defaultLayer';
import { closeButtonOptions } from '../button/closeButton';
import { layerBottomOptions } from '../layer/layerBottom';
import { sectionTextOptions } from '../text/sectionText';
import { imageLayerOptions } from '../layer/imageLayer';
import { buttonTextOptions } from '../button/text';
import { textOptions } from '../text/text';
import { avatarOptions } from './avatar';
import { cardBaseOptions } from './base';

export class CardOptions {

  private static readonly STATIC_CARD_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
    // WORK1: check if this is needed
    [SUBCOMPONENT_TYPES.SECTION_TEXT]: sectionTextOptions as Options,
    [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions as Options,
  };

  private static getTextOptions(component: WorkshopComponent): Options {
    const subcomponentStyle = component.subcomponents[component.activeSubcomponentName].importedComponent.componentRef.style;
    if (subcomponentStyle === TEXT_STYLES.BUTTON) {
      return buttonTextOptions as Options;
    } else if (subcomponentStyle === TEXT_STYLES.CLOSE_BUTTON) {
      return closeButtonTextOptions as Options;
    }
    return textOptions as Options;
  }

  private static getButtonOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].importedComponent.componentRef.style === BUTTON_STYLES.CLOSE) {
      return closeButtonOptions;
    }
    return nestedButtonOptions;
  }

  private static getLayerOptions(component: WorkshopComponent): Options {
    const { layers } = component.componentPreviewStructure;
    const currentLayerIndex = layers.findIndex((layer) => layer.name === component.activeSubcomponentName);
    if (currentLayerIndex === 0) {
      return imageLayerOptions as Options;
    } else if (currentLayerIndex === layers.length - 1) {
      return layerBottomOptions as Options;
    }
    return defaultLayerOptions as Options;
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
