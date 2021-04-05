import { expandedModalPreviewModeState } from '../../../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewModeState';
import { TemporaryDropdownValue } from '../../../../../../interfaces/temporaryDropdownValue';
import { SubcomponentProperties, } from '../../../../../../interfaces/workshopComponent';
import { UseActionsDropdown } from '../../../../../../interfaces/UseActionsDropdown';
import ActionsDropdownUtils from './utils/actionsDropdownUtils';
import CustomFeaturesUtils from './utils/customFeaturesUtils';
import GeneralUtils from './utils/generalUtils';
import SharedUtils from '../utils/sharedUtils';
import { ComponentOptions } from 'vue';

export default function useActionsDropdown(): UseActionsDropdown {

  const temporaryDropdownValue: TemporaryDropdownValue = { value: ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED };

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
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownButton(temporaryDropdownValue,
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
    temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }
  
  const mouseEnterActionsDropdownOption = (settingsComponent: ComponentOptions, triggeredOptionName: string,
      settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseEnterActionsDropdownOptionCustomCss(temporaryDropdownValue,
      triggeredOptionName, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseEnterActionsDropdownOptionCustomFeature(temporaryDropdownValue,
      triggeredOptionName, subcomponentProperties, settingSpec, settingsComponent);
  }
  
  const mouseLeaveActionsDropdown = (settingsComponent: ComponentOptions, settingSpec: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { cssProperty, customFeatureObjectKeys } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseLeaveActionsDropdownCustomCss(temporaryDropdownValue, subcomponentProperties, settingSpec);
    if (customFeatureObjectKeys) ActionsDropdownUtils.mouseLeaveActionsDropdownOptionCustomFeature(temporaryDropdownValue,
      subcomponentProperties, settingSpec, settingsComponent);
  }

  const mouseClickActionsDropdownOption = (settingsComponent: ComponentOptions, mouseClickOptionEvent: any, setting: any,
      allSettings: any, subcomponentProperties: SubcomponentProperties): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    ActionsDropdownUtils.mouseClickActionsDropdownOption(mouseClickOptionEvent, setting, allSettings, subcomponentProperties);
    const { mouseClickOptionCallback } = setting.spec;
    if (mouseClickOptionCallback) mouseClickOptionCallback({
      subcomponentProperties, settingsComponent, previousOptionName: mouseClickOptionEvent[0], triggeredOptionName: mouseClickOptionEvent[1]});
    temporaryDropdownValue.value = ActionsDropdownUtils.TEMPORARY_VALUE_UNUSED;
  }
  
  const mouseClickActionsDropdownNewOption = (triggeredOptionName: string, settingSpec: any,
      subcomponentProperties: SubcomponentProperties, activeOptionsObject: any): void => {
    if (expandedModalPreviewModeState.getIsModeToggleTransitionInProgressState()) return;
    const { customFeatures } = subcomponentProperties;
    const { customFeatureObjectKeys, cssProperty } = settingSpec;
    if (cssProperty) ActionsDropdownUtils.mouseClickActionsDropdownNewOption(temporaryDropdownValue, triggeredOptionName,
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
