import { DropdownCustomCssProperty } from '../../../../../../interfaces/dropdownCustomCssProperty';
import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import CustomFeaturesUtils from './utils/customFeaturesUtils';
import CustomCssUtils from './utils/customCssUtils';
import GeneralUtils from './utils/generalUtils';
import SharedUtils from '../utils/sharedUtils';
import { ComponentOptions } from 'vue';
import { expandedModalPreviewModeState } from '@/services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';

export default function useActionsDropdown(): UseActionsDropdown {

  const dropdownCustomCssProperty: DropdownCustomCssProperty = { value: CustomCssUtils.NULL_CUSTOM_CSS_VALUE };

  const getObjectContainingActiveOption = (settingSpec: any, subcomponentProperties: SubcomponentProperties): unknown => {
    const { customFeatureObjectKeys } = settingSpec;
    if (customFeatureObjectKeys) {
      return CustomFeaturesUtils.getObjectContainingActiveOption(subcomponentProperties.customFeatures, customFeatureObjectKeys);
    }
    return CustomCssUtils.getObjectContainingActiveOption(subcomponentProperties);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseEnterButtonCallback, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseEnterActionsDropdownButton(dropdownCustomCssProperty,
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
    if (cssProperty) CustomCssUtils.mouseEnterActionsDropdownOption(dropdownCustomCssProperty,
      triggeredOptionName, subcomponentProperties, settingSpec);
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseLeaveDropdownCallback, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseLeaveActionsDropdown(dropdownCustomCssProperty, subcomponentProperties, settingSpec);
    if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string, setting: any,
      allSettings: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { mouseClickOptionCallback, cssProperty } = setting.spec;
    if (cssProperty) CustomCssUtils.mouseClickActionsDropdownOption(triggeredOptionName, setting, allSettings, subcomponentProperties);
    if (mouseClickOptionCallback) mouseClickOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseClickActionsDropdownNewOption = (triggeredOptionName: string, settingSpec: any,
      subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customFeatures } = subcomponentProperties;
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseClickActionsDropdownNewOption(dropdownCustomCssProperty, triggeredOptionName,
      subcomponentProperties, settingSpec);
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
