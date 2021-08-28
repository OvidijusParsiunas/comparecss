import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../interfaces/subcomponentSpecificSettings';

interface OverwrittenSettingDefaultValues { 
  spec: any;
  originalValues: {
    name: string;
    value: number[];
  },
}

export default class SubcomponentSpecificSettingsState {

  private static overwrittenSettingsDefaultValues: OverwrittenSettingDefaultValues[] = [];

  private static resetOverwrittenSettings(): void {
    // best way to test this functionality is to observe settings that contain a subcomponent specific property and then opening up a component that contains
    // the same setting property which is not specific to a subcomponent. The result setting property should be the default value defined within the specs.
    this.overwrittenSettingsDefaultValues.forEach((overwrittenSettingDefaultValues: OverwrittenSettingDefaultValues) => {
      overwrittenSettingDefaultValues.spec[overwrittenSettingDefaultValues.originalValues.name] = overwrittenSettingDefaultValues.originalValues.value;
      if (overwrittenSettingDefaultValues.spec.updateOtherCssProperties) delete overwrittenSettingDefaultValues.spec.updateOtherCssProperties;
    });
    this.overwrittenSettingsDefaultValues = [];
  }

  private static setNewSubcomponentSpecificSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES,
      subcomponentSpecificSettings: SubcomponentSpecificSettings, settingsOptions: any): void {
    if (subcomponentSpecificSettings?.[optionType]) {
      settingsOptions.forEach((setting) => {
        const settingName = setting.spec.name;
        if (subcomponentSpecificSettings[optionType][settingName]) {
          const { scale, updateOtherCssProperties, actionsDropdownMouseEvents } = subcomponentSpecificSettings[optionType][settingName];
          if (scale) {
            const overwrittenSettingDefaultValues: OverwrittenSettingDefaultValues = { spec: setting.spec, originalValues: { name: 'scale', value: setting.spec.scale }};
            this.overwrittenSettingsDefaultValues.push(overwrittenSettingDefaultValues);
            setting.spec.scale = scale;
          }
          if (updateOtherCssProperties) setting.spec.updateOtherCssProperties = updateOtherCssProperties;
          if (actionsDropdownMouseEvents) Object.assign(setting.spec, actionsDropdownMouseEvents);
        }
      });
    }
  }

  public static setSubcomponentSpecificSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES,
      subcomponentSpecificSettings: SubcomponentSpecificSettings, settingsOptions: any): void {
    this.resetOverwrittenSettings();
    this.setNewSubcomponentSpecificSettings(optionType, subcomponentSpecificSettings, settingsOptions);
  }
}
