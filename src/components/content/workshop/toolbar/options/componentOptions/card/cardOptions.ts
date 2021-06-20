import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { closeButtonTextOptions } from '../button/closeText';
import { sectionTextOptions } from '../text/sectionText';
import { ButtonOptions } from '../button/buttonOptions';
import { LayerOptions } from '../layer/layerOptions';
import { buttonTextOptions } from '../button/text';
import { textOptions } from '../text/text';
import { avatarOptions } from './avatar';
import { cardBaseOptions } from './base';

type SubcomponentTypeToOptions = {
  [key in SUBCOMPONENT_TYPES]?: Options;
}

const staticCardOptions: SubcomponentTypeToOptions = {
  [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
  [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
  [SUBCOMPONENT_TYPES.SECTION_TEXT]: sectionTextOptions as Options,
  [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as Options,
  [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions as Options,
}

export function getCardOptions(component: WorkshopComponent, subcomponentType: SUBCOMPONENT_TYPES): Options {
  if (subcomponentType === SUBCOMPONENT_TYPES.LAYER) {
    return LayerOptions.getOptions(component);
  }
  if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
    return ButtonOptions.getOptions(component);
  }
  return staticCardOptions[subcomponentType];
}
