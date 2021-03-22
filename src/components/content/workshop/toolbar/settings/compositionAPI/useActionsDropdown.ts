import { expandedModalPreviewModeState } from '../../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { DropdownCustomCssProperty } from '../../../../../../interfaces/dropdownCustomCssProperty';
import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import ActionsDropdownUtils from './utils/actionsDropdownUtils';
import CustomFeaturesUtils from './utils/customFeaturesUtils';
import GeneralUtils from './utils/generalUtils';
import SharedUtils from '../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const dropdownCustomCssProperty: DropdownCustomCssProperty = { value: ActionsDropdownUtils.NULL_CUSTOM_CSS_VALUE };

  const getObjectContainingActiveOption = (settingSpec: any, subcomponentProperties: SubcomponentProperties): unknown => {
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (customFeatureObjectKeys) {
      return CustomFeaturesUtils.getObjectContainingActiveOption(subcomponentProperties.customFeatures, customFeatureObjectKeys);
    }
    return ActionsDropdownUtils.getObjectContainingActiveOption(subcomponentProperties, cssProperty);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseEnterButtonCallback, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownButton(dropdownCustomCssProperty,
      subcomponentProperties, settingSpec.cssProperty);
    if (mouseEnterButtonCallback) {
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseEnterButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
 
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseLeaveButtonCallback } = settingSpec;
    if (mouseLeaveButtonCallback) {
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseLeaveButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
  
  const mouseEnterActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseEnterOptionCallback, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownOption(dropdownCustomCssProperty,
      triggeredOptionName, subcomponentProperties, settingSpec);
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseLeaveDropdownCallback, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseLeaveActionsDropdown(dropdownCustomCssProperty, subcomponentProperties, settingSpec);
    if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string, setting: any,
      allSettings: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseClickOptionCallback, cssProperty } = setting.spec;
    if (cssProperty) ActionsDropdownUtils.mouseClickActionsDropdownOption(triggeredOptionName, setting, allSettings, subcomponentProperties);
    if (mouseClickOptionCallback) mouseClickOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseClickActionsDropdownNewOption = (triggeredOptionName: string, settingSpec: any,
      subcomponentProperties: SubcomponentProperties, activeOptionsObject: any): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customFeatures } = subcomponentProperties;
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseClickActionsDropdownNewOption(dropdownCustomCssProperty, triggeredOptionName,
      subcomponentProperties, settingSpec, activeOptionsObject);
    if (customFeatureObjectKeys) SharedUtils.setCustomFeatureValue(customFeatureObjectKeys, customFeatures, triggeredOptionName);
  }
  
  return {
    getObjectContainingActiveOption,
    mouseEnterActionsDropdownButton,
    mouseLeaveActionsDropdownButton,
    mouseEnterActionsDropdownOption,
    mouseLeaveActionsDropdown,
    mouseClickActionsDropdownOption,
    mouseClickActionsDropdownNewOption,
  };
}
