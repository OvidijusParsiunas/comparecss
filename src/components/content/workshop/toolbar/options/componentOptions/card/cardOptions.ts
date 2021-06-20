import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { Options } from '../../../../../../../interfaces/options';
import { closeButtonTextOptions } from '../button/closeText';
import { nestedButtonOptions } from '../button/nestedButton';
import { closeButtonOptions } from '../button/closeButton';
import { sectionTextOptions } from '../text/sectionText';
import { LayerOptions } from '../layer/layerOptions';
import { buttonTextOptions } from '../button/text';
import { textOptions } from '../text/text';
import { avatarOptions } from './avatar';
import { cardBaseOptions } from './base';

const staticCardOptions = {
  [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
  [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
  [SUBCOMPONENT_TYPES.SECTION_TEXT]: sectionTextOptions as Options,
  [SUBCOMPONENT_TYPES.BUTTON]: nestedButtonOptions,
  [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions,
  [SUBCOMPONENT_TYPES.CLOSE_BUTTON]: closeButtonOptions,
  [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions,
  [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions,
}

export function getCardOptions(component: WorkshopComponent, subcomponentName: SUBCOMPONENT_TYPES): Options {
  if (subcomponentName === SUBCOMPONENT_TYPES.LAYER) {
    return LayerOptions.getOptions(component);
  }
  return staticCardOptions[subcomponentName];
}
