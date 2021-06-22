import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { NEW_COMPONENT_STYLES } from '../../../../../../../consts/newComponentStyles.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { imageLayerTopOptions } from '../layer/imageLayerTop';
import { closeButtonTextOptions } from '../button/closeText';
import { nestedButtonOptions } from '../button/nestedButton';
import { closeButtonOptions } from '../button/closeButton';
import { layerBottomOptions } from '../layer/layerBottom';
import { sectionTextOptions } from '../text/sectionText';
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
    if (subcomponentStyle === NEW_COMPONENT_STYLES.TEXT_BUTTON) {
      return buttonTextOptions as Options;
    } else if (subcomponentStyle === NEW_COMPONENT_STYLES.CLOSE_BUTTON_TEXT) {
      return closeButtonTextOptions as Options;
    }
    return textOptions as Options;
  }

  private static getButtonOptions(component: WorkshopComponent): Options {
    if (component.subcomponents[component.activeSubcomponentName].importedComponent.componentRef.style === NEW_COMPONENT_STYLES.BUTTON_CLOSE) {
      return closeButtonOptions;
    }
    return nestedButtonOptions;
  }

  private static getLayerSubcomponentNames(component: WorkshopComponent): string[] {
    return Object.keys(component.subcomponents)
      .filter((key) => component.subcomponents[key].subcomponentType === SUBCOMPONENT_TYPES.LAYER);
  }

  private static getOptions(component: WorkshopComponent): Options {
    const layerSubcomponentNames = CardOptions.getLayerSubcomponentNames(component);
    const currentLayerIndex = layerSubcomponentNames.indexOf(component.activeSubcomponentName);
    if (currentLayerIndex === 0) {
      return imageLayerTopOptions as Options;
    }
    return layerBottomOptions as Options;
  }

  public static getCardOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.LAYER) {
      return CardOptions.getOptions(component);
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
