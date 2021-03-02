import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import CustomFeaturesUtils from './utils/customFeaturesUtils';
import CustomCssUtils from './utils/customCssUtils';
import GeneralUtils from './utils/generalUtils';
import SharedUtils from '../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const currentCustomCssPropertyValue = { value: null };

  const getObjectContainingActiveOption = (subcomponentProperties: SubcomponentProperties, settingSpec: any): unknown => {
    const { customFeatureObjectKeys } = settingSpec;
    if (customFeatureObjectKeys) {
      return CustomFeaturesUtils.getObjectContainingActiveOption(subcomponentProperties.customFeatures, customFeatureObjectKeys);
    }
    return CustomCssUtils.getObjectContainingActiveOption(subcomponentProperties);
  }

  const mouseEnterActionsDropdownButton = (settingsComponent: ComponentOptions, subcomponentProperties: SubcomponentProperties,
     settingSpec: any): void => {
    const { mouseEnterButtonCallback, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseEnterActionsDropdownButton(currentCustomCssPropertyValue,
      subcomponentProperties, settingSpec.cssProperty);
    if (mouseEnterButtonCallback) {
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseEnterButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
 
  const mouseLeaveActionsDropdownButton = (settingsComponent: ComponentOptions, subcomponentProperties: SubcomponentProperties,
      settingSpec: any): void => {
    const { mouseLeaveButtonCallback } = settingSpec;
    if (mouseLeaveButtonCallback) {
      const triggeredOptionName = GeneralUtils.getTriggeredOptionName(subcomponentProperties, settingSpec);
      mouseLeaveButtonCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
    }
  }
  
  const mouseEnterActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void => {
    const { mouseEnterOptionCallback, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseEnterActionsDropdownOption(currentCustomCssPropertyValue,
      triggeredOptionName, subcomponentProperties, settingSpec);
    if (mouseEnterOptionCallback) mouseEnterOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void => {
    const { mouseLeaveDropdownCallback, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseLeaveActionsDropdown(currentCustomCssPropertyValue, subcomponentProperties, settingSpec);
    if (mouseLeaveDropdownCallback) mouseLeaveDropdownCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      subcomponentProperties: SubcomponentProperties, settingSpec: any): void => {
    const { mouseClickOptionCallback } = settingSpec;
    if (mouseClickOptionCallback) mouseClickOptionCallback({subcomponentProperties, settingsComponent, triggeredOptionName});
  }
  
  const mouseClickActionsDropdownNewOption = (triggeredOptionName: string, subcomponentProperties: SubcomponentProperties,
      settingSpec: any): void => {
    const { customFeatures } = subcomponentProperties;
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (cssProperty) CustomCssUtils.mouseClickActionsDropdownNewOption(currentCustomCssPropertyValue, triggeredOptionName,
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
