import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChildComponentAlignSetting } from './shared/childComponentAlignSetting';
import { ChildComponentOrderSetting } from './shared/childComponentOrderSetting';

// create an optional interface
export default {
  options: [
    ChildComponentAlignSetting.get('horizontalSection', ['customStaticFeatures', 'alignment', 'horizontalSection']),
    ChildComponentOrderSetting.get([CHANGE_COMPONENT_ORDER_DIRECTIONS.LEFT, CHANGE_COMPONENT_ORDER_DIRECTIONS.RIGHT]),
  ],
};
