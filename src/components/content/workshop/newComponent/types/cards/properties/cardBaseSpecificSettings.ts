import { CustomCss, DetailsToUpdateOtherCssProperties, SubcomponentSpecificSettings } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { modalBaseSpecificSettings } from '../../modals/properties/modalBaseSpecificSettings';
import { LAYER_SECTION_DIVISOR } from '../../../../../../../consts/layerSectionDivisor';

function getLayerSectionSubcomponentPosition(customCss: CustomCss): DetailsToUpdateOtherCssProperties {
  return {
    cssProperty: 'left',
    customCss,
    isScaleNegativeToPositive: true,
    divisor: LAYER_SECTION_DIVISOR,
  }
}

export function getCardBaseSpecificSettings(customCss: CustomCss): SubcomponentSpecificSettings {
  return {
    ...modalBaseSpecificSettings,
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: {
      'width': { scale: [170, 700], detailsToUpdateOtherCssProperties: [getLayerSectionSubcomponentPosition(customCss)] },
    },
  }
}
