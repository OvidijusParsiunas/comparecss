import { MouseClickNewItemEvent, MouseClickItemEvent, MouseEnterItemEvent } from './dropdownMenuMouseEvents';
import { Subcomponent } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (settingSpecs: any, subcomponent: Subcomponent) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponent: Subcomponent) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponent: Subcomponent) => void;
  mouseEnterActionsDropdownItem: (settingsComponent: ComponentOptions, mouseEnterItemEvent: MouseEnterItemEvent, settingSpecs: any, subcomponent: Subcomponent) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponent: Subcomponent, isDropdownHidden: boolean, triggeredItemName?: string) => void;
  mouseClickActionsDropdownItem: (settingsComponent: ComponentOptions, mouseClickItemEvent: MouseClickItemEvent, setting: any, allSettings: any, subcomponent: Subcomponent) => void;
  mouseClickActionsDropdownNewItem: (mouseClickNewItemEvent: MouseClickNewItemEvent, settingSpecs: any, subcomponent: Subcomponent, activeOptionsObject: any) => void;
}
