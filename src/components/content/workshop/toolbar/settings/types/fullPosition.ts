import { SubcomponentCssPropertyDetails } from '../../../../../../interfaces/subcomponentCssPropertyDetails';
import { PARENT_SUBCOMPONENT_NAME } from '../../../../../../consts/baseSubcomponentNames.enum';
import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { LAYER_SECTION_DIVISOR } from '../../../../../../consts/layerSectionDivisor';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import SubcomponentAlignment from './utils/subcomponentAlignment';

function getOtherSubcomponentCssPropertyDetails(): SubcomponentCssPropertyDetails {
  return [
    {subcomponentName: PARENT_SUBCOMPONENT_NAME.BASE, cssProperty: 'width'},
  ];
}

function moveSubcomponent(optionName: string, subcomponentProperties: SubcomponentProperties): void {
  console.log(optionName);
  console.log(subcomponentProperties.nestedComponent.ref.componentPreviewStructure.layers);
}

// create an optional interface
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
    // WORK2
    // this may not be required and it may just end up being replaced by margin - this file may not be needed
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
    { 
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Align',
        options: { [ALIGNED_SECTION_TYPES.LEFT]: null, [ALIGNED_SECTION_TYPES.CENTER]: null, [ALIGNED_SECTION_TYPES.RIGHT]: null },
        activeOptionPropertyKeyName: 'section',
        customFeatureObjectKeys: ['customFeatures', 'alignedLayerSection', 'section'],
        ...SubcomponentAlignment.generateMouseEventCallbacks(),
      },
    },
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: 'Order',
        options: { ['Left']: null, ['Right']: null },
        optionAction: moveSubcomponent,
      },
    },
  ]
};
