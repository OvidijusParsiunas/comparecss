import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { childComponentAlignmentDropdownState } from '../../../utils/componentManipulation/moveChildComponent/childComponentAlignmentDropdownState';
import { ChangeSubcomponentAlignmentEvent, ChangeSubcomponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { SUBCOMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/subcomponentOrderDirections.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ComponentOptions } from 'vue';

// leaving the functions in here instead of the shared settings folder as this is a very generic function and should only be moved if everything else is
// being moved
function changeSubcomponentOrder(settingsComponent: ComponentOptions, direction: SUBCOMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-subcomponent-order', [direction, masterComponent] as ChangeSubcomponentOrderEvent);
}

function changeSubcomponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, shouldSubcomponentNamesBeUpdated?: boolean): void {
  const { settingsComponent, previousItemName, triggeredItemName, subcomponent, isCustomFeatureResetTriggered } = event;
  if (isCustomFeatureResetTriggered) return;
  settingsComponent.$emit('change-subcomponent-alignment',
    [previousItemName, triggeredItemName, subcomponent, shouldSubcomponentNamesBeUpdated] as ChangeSubcomponentAlignmentEvent);
}

function changeSubcomponentAlignmentItemSelect(event: ActionsDropdownMouseEventCallbackEvent): void {
  const isItemSelected = this as any as boolean;
  changeSubcomponentAlignment(event, isItemSelected);
  if ((isItemSelected || event.isDropdownHidden) && !event.isCustomFeatureResetTriggered) childComponentAlignmentDropdownState.reset();
}

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickItemCallback: changeSubcomponentAlignmentItemSelect.bind(true),
    mouseEnterItemCallback: changeSubcomponentAlignment,
    mouseLeaveDropdownCallback: changeSubcomponentAlignmentItemSelect,
  };
}

// create an optional interface
export default {
  options: [
    { 
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.ALIGN,
        options: DropdownUtils.generateDropdownStructure(Object.values(HORIZONTAL_ALIGNMENT_SECTIONS)),
        activeItemPropertyKeyName: 'section',
        customFeatureObjectKeys: ['customStaticFeatures', 'alignedLayerSection', 'section'],
        ...generateMouseEventCallbacks(),
      },
    },
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: DropdownUtils.generateDropdownStructure([SUBCOMPONENT_ORDER_DIRECTIONS.LEFT, SUBCOMPONENT_ORDER_DIRECTIONS.RIGHT]),
        itemAction: changeSubcomponentOrder,
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
