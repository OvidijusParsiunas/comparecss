import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownMouseEventCallbacks';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

function moveSubcomponentToTargetSection(event: ActionsDropdownMouseEventCallbackEvent): void {
  const { previousOptionName, triggeredOptionName, subcomponentProperties } = event;
  let nestedSubcomponentIndex = 0;
  const previousSectionArray = subcomponentProperties.customFeatures.parentLayer.sections.alignedSections[previousOptionName];
  for (let i = 0; i < previousSectionArray.length; i += 1) {
    if (previousSectionArray[i].subcomponentProperties === subcomponentProperties) {
      subcomponentProperties.customFeatures.parentLayer.sections.alignedSections[triggeredOptionName].unshift(previousSectionArray[i]);
      nestedSubcomponentIndex = i;
      break;
    }
  }
  previousSectionArray.splice(nestedSubcomponentIndex, 1);
}

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickOptionCallback: moveSubcomponentToTargetSection,
    mouseEnterOptionCallback: moveSubcomponentToTargetSection,
    mouseLeaveDropdownCallback: moveSubcomponentToTargetSection,
  };
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
        ...generateMouseEventCallbacks(),
      },
    },
  ]
};
