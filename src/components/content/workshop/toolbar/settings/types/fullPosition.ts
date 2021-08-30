import { SubcomponentCssPropertyDetails } from '../../../../../../interfaces/subcomponentCssPropertyDetails';
import { MASTER_SUBCOMPONENT_BASE_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { LAYER_SECTION_DIVISOR } from '../../../../../../consts/layerSectionDivisor';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// ATTENTION!!!!!!!!!!!!!!!!!!!!!!
// This option has been retired and only serves as a demonstarion for the following child component options:
// Example of vertical offset and horizontal offset
// Example of interconnected settings via updateSettingSpecViaOtherCssProperties
function getOtherSubcomponentCssPropertyDetails(): SubcomponentCssPropertyDetails {
  return [
    {subcomponentName: MASTER_SUBCOMPONENT_BASE_NAME.BASE, cssProperty: 'width'},
  ];
}

export default {
  options: [
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Vertical-Offset',
        default: 50,
        scale: [0, 100],
        smoothingDivisible: 1,
        cssProperty: 'top',
        postfix: '%',
      },
    },
    {
      type: SETTINGS_TYPES.RANGE,
      spec: {
        name: 'Horizontal-Offset',
        default: 0,
        scale: [-100, 100],
        smoothingDivisible: 1,
        cssProperty: 'left',
        postfix: 'px',
        lastSelectedValueObjectKeys: ['customFeatures', 'lastSelectedCssValues', 'left'],
        updateSettingSpecViaOtherCssProperties: {
          aggregatedCssProperties: getOtherSubcomponentCssPropertyDetails(),
          isScaleNegativeToPositive: true,
          divisor: LAYER_SECTION_DIVISOR,
        },
      },
    },
  ]
};
