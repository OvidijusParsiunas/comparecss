import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { cardLayerOptions } from '../layer/cardLayer';
import { CardOptions } from '../card/cardOptions';
import { avatarOptions } from '../card/avatar';
import { modalBaseOptions } from './base';

export class ModalOptions extends CardOptions {

  private static readonly STATIC_MODAL_OPTIONS: SubcomponentTypeToOptions = {
    [SUBCOMPONENT_TYPES.BASE]: modalBaseOptions as Options,
    [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions as Options,
    [SUBCOMPONENT_TYPES.LAYER]: cardLayerOptions as Options,
  };

  public static getModalOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
    if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
      return CardOptions.getButtonOptions(component);
    }
    if (subcomponentType === SUBCOMPONENT_TYPES.TEXT) {
      return CardOptions.getTextOptions(component);
    }
    return ModalOptions.STATIC_MODAL_OPTIONS[subcomponentType];
  } 
}
