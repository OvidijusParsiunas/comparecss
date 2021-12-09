import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChildComponentAlignSetting } from './shared/childComponentAlignSetting';
import { ChildComponentOrderSetting } from './shared/childComponentOrderSetting';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';

// create an optional interface
export default {
  options: [
    ChildComponentAlignSetting.get('horizontalSection', ['customStaticFeatures', 'alignment', 'horizontalSection']),
    ChildComponentOrderSetting.get([CHANGE_COMPONENT_ORDER_DIRECTIONS.LEFT, CHANGE_COMPONENT_ORDER_DIRECTIONS.RIGHT]),
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
  ]
};
