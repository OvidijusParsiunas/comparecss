import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { ChildComponentOrderSetting } from './shared/childComponentOrderSetting';

// create an optional interface
export default {
  options: [
    ChildComponentOrderSetting.get([CHANGE_COMPONENT_ORDER_DIRECTIONS.UP, CHANGE_COMPONENT_ORDER_DIRECTIONS.DOWN]),
  ],
};
