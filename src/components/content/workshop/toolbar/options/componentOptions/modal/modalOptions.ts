import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { CardOptions } from '../card/cardOptions';
import { imageOptions } from '../image/image';
import { modalBaseOptions } from './base';

export class ModalOptions extends CardOptions {

  private static readonly STATIC_MODAL_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: modalBaseOptions as Options,
    [SUBCOMPONENT_TYPES.IMAGE]: imageOptions as Options,
  };

  public static get(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.LAYER) {
      return CardOptions.getLayerOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return CardOptions.getButtonOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return CardOptions.getTextOptions(component);
    }
    return ModalOptions.STATIC_MODAL_OPTIONS[subcomponentType];
  } 
}
