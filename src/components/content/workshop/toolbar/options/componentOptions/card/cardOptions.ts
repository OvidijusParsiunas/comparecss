import { SubcomponentTypeToOptions } from '../../../../../../../interfaces/subcomponentTypeToOptions';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ImportedButtonOptions } from '../button/importedButtonOptions';
import { Options } from '../../../../../../../interfaces/options';
import { closeButtonTextOptions } from '../button/closeText';
import { sectionTextOptions } from '../text/sectionText';
import { LayerOptions } from '../layer/layerOptions';
import { buttonTextOptions } from '../button/text';
import { textOptions } from '../text/text';
import { avatarOptions } from './avatar';
import { cardBaseOptions } from './base';

// WORK1: text - will be done when all imported components have their text imported with specific styles
const staticCardOptions: SubcomponentTypeToOptions = {
  [SUBCOMPONENT_TYPES.BASE]: cardBaseOptions as Options,
  [SUBCOMPONENT_TYPES.TEXT]: textOptions as Options,
  [SUBCOMPONENT_TYPES.SECTION_TEXT]: sectionTextOptions as Options,
  [SUBCOMPONENT_TYPES.BUTTON_TEXT]: buttonTextOptions as Options,
  [SUBCOMPONENT_TYPES.CLOSE_BUTTON_TEXT]: closeButtonTextOptions as Options,
  [SUBCOMPONENT_TYPES.AVATAR]: avatarOptions as Options,
}

export function getCardOptions(subcomponentType: SUBCOMPONENT_TYPES, component: WorkshopComponent): Options {
  if (subcomponentType === SUBCOMPONENT_TYPES.LAYER) {
    return LayerOptions.getOptions(component);
  }
  if (subcomponentType === SUBCOMPONENT_TYPES.BUTTON) {
    return ImportedButtonOptions.getOptions(component);
  }
  return staticCardOptions[subcomponentType];
}
