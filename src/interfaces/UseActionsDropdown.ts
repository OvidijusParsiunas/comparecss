import { SubcomponentProperties } from './workshopComponent';
import { ComponentOptions } from 'vue';

export interface UseActionsDropdown {
  getObjectContainingActiveOption: (subcomponentProperties: SubcomponentProperties, settingSpecs: any) => unknown;
  mouseEnterActionsDropdownButton: (settingsComponent: ComponentOptions, subcomponentProperties: SubcomponentProperties, settingSpec: any) => void;
  mouseLeaveActionsDropdownButton: (settingsComponent: ComponentOptions, subcomponentProperties: SubcomponentProperties, settingSpecs: any) => void;
  mouseEnterActionsDropdownOption: (settingsComponent: ComponentOptions, triggeredOptionName: string, subcomponentProperties: SubcomponentProperties, settingSpecs: any) => void;
  mouseLeaveActionsDropdown: (settingsComponent: ComponentOptions, triggeredOptionName: string, subcomponentProperties: SubcomponentProperties, settingSpecs: any) => void;
  mouseClickActionsDropdownOption: (settingsComponent: ComponentOptions, triggeredOptionName: string, subcomponentProperties: SubcomponentProperties, settingSpecs: any) => void;
  mouseClickActionsDropdownNewOption: (event: unknown, subcomponentProperties: SubcomponentProperties, settingSpec: any) => void;
}
