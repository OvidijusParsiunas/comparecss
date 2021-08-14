import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { nestedComponentAlignmentDropdownState } from '../../../utils/componentManipulation/moveNestedComponent/nestedComponentAlignmentDropdownState';
import { UpdateDropdownOptionNamesShared } from '../../../utils/componentManipulation/updateNestedComponentNames/updateDropdownOptionNamesShared';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { ALIGNED_SECTION_TYPES } from '../../../../../../consts/layerSections.enum';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ComponentOptions } from 'vue';

// leaving the functions in here instead of the shared settings folder as this is a very generic function and should only be moved if everything else is
// being moved
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
  if ((isOptionSelected || event.isDropdownHidden) && !event.isCustomFeatureResetTriggered) nestedComponentAlignmentDropdownState.reset();
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
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.ALIGN,
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure(Object.values(ALIGNED_SECTION_TYPES)),
        activeOptionPropertyKeyName: 'section',
        customFeatureObjectKeys: ['customFeatures', 'alignedLayerSection', 'section'],
        ...generateMouseEventCallbacks(),
      },
    },
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: UpdateDropdownOptionNamesShared.generateNestedDropdownStructure([SUBCOMPONENT_ORDER_DIRECTIONS.LEFT, SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT]),
        optionAction: changeSubcomponentOrder,
      },
    },
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
