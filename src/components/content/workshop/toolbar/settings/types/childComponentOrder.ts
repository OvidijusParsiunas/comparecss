import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChildComponentOrderSetting } from './shared/childComponentOrderSetting';

// create an optional interface
export default {
  options: [
    ChildComponentOrderSetting.get([CHANGE_COMPONENT_ORDER_DIRECTIONS.LEFT, CHANGE_COMPONENT_ORDER_DIRECTIONS.RIGHT]),
  ],
};
