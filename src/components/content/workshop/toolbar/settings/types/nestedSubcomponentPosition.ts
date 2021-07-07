import { SubcomponentProperties, WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import SubcomponentAlignment from './utils/subcomponentAlignment';

function moveSubcomponent(optionName: string, component: WorkshopComponent, subcomponentProperties: SubcomponentProperties): void {
  console.log(component);
  console.log(optionName);
  console.log(subcomponentProperties.nestedComponent.ref.componentPreviewStructure); 
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
