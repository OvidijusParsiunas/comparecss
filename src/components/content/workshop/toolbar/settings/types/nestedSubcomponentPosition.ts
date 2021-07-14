import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { changeSubcomponentAlignmentState } from '../../../utils/componentManipulation/moveSubcomponent/changeSubcomponentAlignmentState';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { ComponentOptions } from 'vue';

function changeSubcomponentOrder(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-subcomponent-order', [direction, parentComponent] as ChangeSubcomponentOrderEvent);
}

function emitChangeSubcomponent(event: ActionsDropdownMouseEventCallbackEvent): void {
  // WORK2: reset should not work
  const { settingsComponent, previousOptionName, triggeredOptionName, subcomponentProperties, isCustomFeatureResetTriggered, isDropdownHidden } = event;
  if (event.isDropdownHidden) {
    changeSubcomponentAlignmentState.reset();
    return;
  }
  const isOptionSelected = this as any as boolean;
  const shouldSubcomponentBeRealigned = isCustomFeatureResetTriggered || !isOptionSelected;
  settingsComponent.$emit('change-subcomponent-alignment',
    [previousOptionName, triggeredOptionName, subcomponentProperties, isOptionSelected, shouldSubcomponentBeRealigned] as ChangeSubcomponentAlignmentEvent);
}

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickOptionCallback: emitChangeSubcomponent.bind(true),
    mouseEnterOptionCallback: emitChangeSubcomponent,
    mouseLeaveDropdownCallback: emitChangeSubcomponent,
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
        customFeatureObjectKeys: ['customFeatures', 'alignedLayerSection', 'section'],
        ...generateMouseEventCallbacks(),
      },
    },
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: 'Order',
        options: { [SUBCOMPONENT_ORDER_DIRECTIONS.LEFT]: null, [SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT]: null },
        optionAction: changeSubcomponentOrder,
      },
    },
  ]
};
