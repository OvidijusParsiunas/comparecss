import { SubcomponentProperties } from '../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function moveSubcomponentToTargetSection(subcomponent: SubcomponentProperties, previousSection: ALIGNED_SECTION_TYPES, targetSection: ALIGNED_SECTION_TYPES): void {
  let nestedSubcomponentIndex = 0;
  const previousSectionArray = subcomponent.customFeatures.parentLayer.sections.alignedSections[previousSection];
  for (let i = 0; i < previousSection.length; i += 1) {
    if (previousSectionArray[i].subcomponentProperties === subcomponent) {
      subcomponent.customFeatures.parentLayer.sections.alignedSections[targetSection].unshift(previousSectionArray[i]);
      nestedSubcomponentIndex = i;
      break;
    }
  }
  previousSectionArray.splice(nestedSubcomponentIndex, 1);
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
    { 
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: 'Align',
        options: { [ALIGNED_SECTION_TYPES.LEFT]: null, [ALIGNED_SECTION_TYPES.CENTER]: null, [ALIGNED_SECTION_TYPES.RIGHT]: null },
        activeOptionPropertyKeyName: 'section',
        customFeatureObjectKeys: ['alignedLayerSection', 'section'],
      },
      triggers: {
        [ALIGNED_SECTION_TYPES.LEFT]: {
          function: moveSubcomponentToTargetSection,
        },
        [ALIGNED_SECTION_TYPES.CENTER]: {
          function: moveSubcomponentToTargetSection,
        },
        [ALIGNED_SECTION_TYPES.RIGHT]: {
          function: moveSubcomponentToTargetSection,
        },
      },
    },
  ]
};
