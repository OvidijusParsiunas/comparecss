import { ActionsDropdownMouseEventCallbackEvent, ActionsDropdownMouseEventCallbacks } from '../../../../../../../interfaces/actionsDropdownsMouseEventCallbacks';
import { childComponentAlignmentDropdownState } from '../../../../utils/componentManipulation/moveChildComponent/childComponentAlignmentDropdownState';
import { ChangeChildComponentAlignmentEvent } from '../../../../../../../interfaces/settingsComponentEvents';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../../../consts/horizontalAlignmentSections';
import { DropdownUtils } from '../../../../utils/componentManipulation/utils/dropdownUtils';
import { SETTINGS_TYPES } from '../../../../../../../consts/settingsTypes.enum';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';

export class ChildComponentAlignSetting {

  private static changeChildComponentAlignment(event: ActionsDropdownMouseEventCallbackEvent, shouldSubcomponentNamesBeUpdated?: boolean): void {
    const { settingsComponent, previousItemName, triggeredItemName, subcomponent, isCustomFeatureResetTriggered } = event;
    if (isCustomFeatureResetTriggered) return;
    settingsComponent.$emit('change-child-component-alignment',
      [previousItemName, triggeredItemName, subcomponent.seedComponent, shouldSubcomponentNamesBeUpdated] as ChangeChildComponentAlignmentEvent);
  }
  
  private static changeChildComponentAlignmentItemSelect(event: ActionsDropdownMouseEventCallbackEvent): void {
    const isItemSelected = this as any as boolean;
    ChildComponentAlignSetting.changeChildComponentAlignment(event, isItemSelected);
    if ((isItemSelected || event.isDropdownHidden) && !event.isCustomFeatureResetTriggered) childComponentAlignmentDropdownState.reset();
  }
  
  private static generateMouseEventCallbacks(): ActionsDropdownMouseEventCallbacks {
    return {
      mouseClickItemCallback: ChildComponentAlignSetting.changeChildComponentAlignmentItemSelect.bind(true),
      mouseEnterItemCallback: ChildComponentAlignSetting.changeChildComponentAlignment,
      mouseLeaveDropdownCallback: ChildComponentAlignSetting.changeChildComponentAlignmentItemSelect,
    };
  }

  // create an optional interface
  public static get(activeItemPropertyKeyName: string, customFeatureObjectKeys: string[]): any {
    return {
      type: SETTINGS_TYPES.ACTIONS_DROPDOWN,
      spec: {
        name: SETTING_NAMES.ALIGN,
        options: DropdownUtils.generateDropdownStructure(Object.values(HORIZONTAL_ALIGNMENT_SECTIONS)),
        activeItemPropertyKeyName,
        customFeatureObjectKeys,
        ...ChildComponentAlignSetting.generateMouseEventCallbacks(),
      },
    };
  }
}
