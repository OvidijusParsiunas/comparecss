import { DetailsToUpdateOtherCssProperties, SubcomponentProperties, SubcomponentSpecificSettings } from '../../../../../../../interfaces/workshopComponent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { modalBaseSpecificSettings } from '../../modals/properties/modalBaseSpecificSettings';
import { LAYER_SECTION_DIVISOR } from '../../../../../../../consts/layerSectionDivisor';

function getLeftPositionProperties({ customCss, customFeatures }: SubcomponentProperties): DetailsToUpdateOtherCssProperties {
  return {
    cssProperty: 'left',
    customCss,
    customFeatures,
    isScaleNegativeToPositive: true,
    divisor: LAYER_SECTION_DIVISOR,
  }
}

export function getCardBaseSpecificSettings(closeButtonSubcomponentProperties: SubcomponentProperties,
    avatarSubcomponentProperties: SubcomponentProperties): SubcomponentSpecificSettings {
  return {
    ...modalBaseSpecificSettings,
    [WORKSHOP_TOOLBAR_OPTION_TYPES.SIZE_WIDTH]: {
      'width': {
        scale: [170, 700],
        detailsToUpdateOtherCssProperties: [
          getLeftPositionProperties(closeButtonSubcomponentProperties),
          getLeftPositionProperties(avatarSubcomponentProperties),
        ],
      },
    },
  }
}
