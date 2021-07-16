import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { subcomponentAlignmentDropdownState } from '../../../utils/componentManipulation/moveSubcomponent/subcomponentAlignmentDropdownState';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { ComponentOptions } from 'vue';

function changeSubcomponentOrder(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS, parentComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-subcomponent-order', [direction, parentComponent] as ChangeSubcomponentOrderEvent);
}

function changeSubcomponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, shouldSubcomponentNamesBeUpdated?: boolean): void {
  const { settingsComponent, previousOptionName, triggeredOptionName, subcomponentProperties, isCustomFeatureResetTriggered } = event;
  if (isCustomFeatureResetTriggered) return;
  settingsComponent.$emit('change-subcomponent-alignment',
    [previousOptionName, triggeredOptionName, subcomponentProperties, shouldSubcomponentNamesBeUpdated] as ChangeSubcomponentAlignmentEvent);
}

function changeSubcomponentAlignmentOptionSelect(event: ActionsDropdownMouseEventCallbackEvent): void {
  const isOptionSelected = this as any as boolean;
  changeSubcomponentAlignment(event, isOptionSelected);
  if ((isOptionSelected || event.isDropdownHidden) && !event.isCustomFeatureResetTriggered) subcomponentAlignmentDropdownState.reset();
}

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickOptionCallback: changeSubcomponentAlignmentOptionSelect.bind(true),
    mouseEnterOptionCallback: changeSubcomponentAlignment,
    mouseLeaveDropdownCallback: changeSubcomponentAlignmentOptionSelect,
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
