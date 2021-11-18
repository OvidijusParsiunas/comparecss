import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { childComponentAlignmentDropdownState } from '../../../utils/componentManipulation/moveChildComponent/childComponentAlignmentDropdownState';
import { ChangeChildComponentAlignmentEvent, ChangeChildComponentOrderEvent } from '../../../../../../interfaces/settingsComponentEvents';
import { CHANGE_COMPONENT_ORDER_DIRECTIONS } from '../../../../../../interfaces/changeComponentOrderDirections.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../consts/horizontalAlignmentSections';
import { DropdownUtils } from '../../../utils/componentManipulation/utils/dropdownUtils';
import { WorkshopComponent } from '../../../../../../interfaces/workshopComponent';
import { SETTINGS_TYPES } from '../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../consts/settingNames.enum';
import { ComponentOptions } from 'vue';

// leaving the functions in here instead of the shared settings folder as this is a very generic function and should only be moved if everything else is
// being moved
function changeChildComponentOrder(settingsComponent: ComponentOptions, direction: CHANGE_COMPONENT_ORDER_DIRECTIONS, masterComponent: WorkshopComponent): void {
  settingsComponent.$emit('change-child-component-order', [direction, masterComponent] as ChangeChildComponentOrderEvent);
}

function changeChildComponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, shouldSubcomponentNamesBeUpdated?: boolean): void {
  const { settingsComponent, previousItemName, triggeredItemName, subcomponent, isCustomFeatureResetTriggered } = event;
  if (isCustomFeatureResetTriggered) return;
  settingsComponent.$emit('change-child-component-alignment',
    [previousItemName, triggeredItemName, subcomponent.seedComponent, shouldSubcomponentNamesBeUpdated] as ChangeChildComponentAlignmentEvent);
}

function changeChildComponentAlignmentItemSelect(event: ActionsDropdownMouseEventCallbackEvent): void {
  const isItemSelected = this as any as boolean;
  changeChildComponentAlignment(event, isItemSelected);
  if ((isItemSelected || event.isDropdownHidden) && !event.isCustomFeatureResetTriggered) childComponentAlignmentDropdownState.reset();
}

function generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
  return {
    mouseClickItemCallback: changeChildComponentAlignmentItemSelect.bind(true),
    mouseEnterItemCallback: changeChildComponentAlignment,
    mouseLeaveDropdownCallback: changeChildComponentAlignmentItemSelect,
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
        activeItemPropertyKeyName: 'horizontalSection',
        customFeatureObjectKeys: ['customStaticFeatures', 'alignment', 'horizontalSection'],
        ...generateMouseEventCallbacks(),
      },
    },
    { 
      type: SETTINGS_TYPES.BUTTONS,
      spec: {
        name: SETTING_NAMES.ORDER,
        options: DropdownUtils.generateDropdownStructure([CHANGE_COMPONENT_ORDER_DIRECTIONS.LEFT, CHANGE_COMPONENT_ORDER_DIRECTIONS.RIGHT]),
        itemAction: changeChildComponentOrder,
      },
    },
  ]
};
