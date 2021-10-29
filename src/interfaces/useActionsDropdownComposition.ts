import { MouseClickNewItemEvent, MouseClickItemEvent, MouseEnterItemEvent } from './dropdownMenuMouseEvents';
import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (settingSpecs: any, subcomponentProperties: SubcomponentProperties) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseEnterActionsDropdownItem: (settingsComponent: ComponentOptions, mouseEnterItemEvent: MouseEnterItemEvent, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties, isDropdownHidden: boolean, triggeredItemName?: string) => void;
  mouseClickActionsDropdownItem: (settingsComponent: ComponentOptions, mouseClickItemEvent: MouseClickItemEvent, setting: any, allSettings: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseClickActionsDropdownNewItem: (mouseClickNewItemEvent: MouseClickNewItemEvent, settingSpecs: any, subcomponentProperties: SubcomponentProperties, activeOptionsObject: any) => void;
}
