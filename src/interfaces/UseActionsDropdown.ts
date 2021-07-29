import { MouseClickNewOptionEvent } from './dropdownMenuMouseEvents';
import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (settingSpecs: any, subcomponentProperties: SubcomponentProperties) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseEnterActionsDropdownOption: (settingsComponent: ComponentOptions, triggeredOptionName: string, settingSpecs: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, settingSpecs: any, subcomponentProperties: SubcomponentProperties, isDropdownHidden: boolean, triggeredOptionName?: string) => void;
  mouseClickActionsDropdownOption: (settingsComponent: ComponentOptions, triggeredOptionName: string, setting: any, allSettings: any, subcomponentProperties: SubcomponentProperties) => void;
  mouseClickActionsDropdownNewOption: (mouseClickNewOptionEvent: MouseClickNewOptionEvent, settingSpecs: any, subcomponentProperties: SubcomponentProperties, activeOptionsObject: any) => void;
}
