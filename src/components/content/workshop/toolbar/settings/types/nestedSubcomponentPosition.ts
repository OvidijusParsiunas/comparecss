import { SUBCOMPONENT_MOVE_DIRECTIONS } from '../../../../../../interfaces/subcomponentMoveDirections.enum';
import { MoveSubcomponentEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import SubcomponentAlignment from './utils/subcomponentAlignment';
import { ComponentOptions } from 'vue';

function moveSubcomponent(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_MOVE_DIRECTIONS, parentComponent: WorkshopComponent): void {
  settingsComponent.$emit('move-subcomponent', [direction, parentComponent] as MoveSubcomponentEvent);
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
        options: { [SUBCOMPONENT_MOVE_DIRECTIONS.LEFT]: null, [SUBCOMPONENT_MOVE_DIRECTIONS.RIGHT]: null },
        optionAction: moveSubcomponent,
      },
    },
  ]
};
