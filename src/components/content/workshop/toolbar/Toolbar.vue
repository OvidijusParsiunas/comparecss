<template>
  <div v-if="component">
    <div style="width: 98.5%; height: 228px">
      <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
        <div style="margin-left: 10px; padding: 5px; width: 100%; display: grid">
          <options ref="options"
            :component="component"
            @option-clicked="updateSettings"
            @subcomponents-mode-clicked="updateSubcomponentsMode"
            @css-mode-clicked="updateCssMode"
            @hide-settings="hideSettings"/>
        </div>
      </div>
      <settings
        :subcomponentproperties="component.subcomponents[component.subcomponentsActiveMode]"
        :settings="activeSettings"
        :settingsUpdateTriggered="settingsUpdateTriggered"/>
    </div>
  </div>
</template>

<script lang="ts">
import { componentTypeToOptions } from './options/componentOptions/componentTypeToOptions';
import PartialCssCustomSettingsUtils from './settings/utils/partialCssCustomSettingsUtils';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import { UpdateOptionsMode } from '../../../../interfaces/updateCssMode';
import { optionToSettings } from './settings/types/optionToSettings';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

interface Data {
  activeOption: WORKSHOP_TOOLBAR_OPTIONS;
  activeSettings: any;
  customSettingsOriginalSpecs: CustomSettingOriginalSpec[];
  activeCssMode: SUB_COMPONENT_CSS_MODES;
  settingsUpdateTriggered: boolean;
  settingsOpenedOnce: boolean;
}

interface CustomSettingOriginalSpec { 
  spec: any;
  originalValues:
  {
    name: string;
    value: number[];
  }
}

export default {
  data: (): Data => ({
    activeOption: null,
    activeSettings: {},
    customSettingsOriginalSpecs: [],
    activeCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    settingsUpdateTriggered: false,
    settingsOpenedOnce: false,
  }),
  methods: {
    updateSettings(newOption: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.setCustomSettings(newOption);
      this.activeOption = newOption;
      this.activeSettings = optionToSettings[newOption];
      this.componentPreviewAssistance.margin = (newOption === WORKSHOP_TOOLBAR_OPTIONS.MARGIN)
        && (this.component.subcomponentsActiveMode !== SUB_COMPONENTS.CLOSE);
      this.settingsOpenedOnce = true;
    },
    updateCssMode(newCssMode: UpdateOptionsMode): void {
      this.$nextTick(() => {
        if (newCssMode[0]) { this.activeCssMode = newCssMode[0]; }
        let newCssModeContainsActiveOption = newCssMode[1];
        if (newCssModeContainsActiveOption === undefined) {
          newCssModeContainsActiveOption = this.$refs.options.getNewCssModeContainsActiveOptionState(this.activeCssMode);
        }
        if (this.activeSettings && Object.keys(this.activeSettings).length && !newCssModeContainsActiveOption) {
          this.setDefaultOption();
        }
        this.triggerSettingsReset();
      });
    },
    updateSubcomponentsMode(updateSubcomponentsMode: UpdateOptionsMode): void {
      // when an optional subcomponent is set to not display, hide settings
      if (this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent
        && !this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying) {
        this.hideSettings();
        return;   
      }
      // when the subcomponent does not contain an option or settings are not displayed (if subcomponent is removed), display default option
      if ((!updateSubcomponentsMode[1] || Object.keys(this.activeSettings).length === 0) && this.settingsOpenedOnce) {
        this.setDefaultOption();
      }
      this.triggerSettingsReset();
    },
    triggerSettingsReset(): void {
      // this trigger type is used instead of a ref method because this will only trigger the settings-reset when
      // the props (more specifically the component properties) have updated first (via the watch property)
      // whereas directly calling the reset method via ref invokes it before the props have been updated
      this.setCustomSettings(this.activeOption);
      this.settingsUpdateTriggered = !this.settingsUpdateTriggered;
      this.$nextTick(() => {
        if (this.activeOption === WORKSHOP_TOOLBAR_OPTIONS.MARGIN && Object.keys(this.activeSettings).length > 0) {
          this.componentPreviewAssistance.margin = !(this.component.subcomponentsActiveMode === SUB_COMPONENTS.CLOSE);
        }
      });
    },
    setDefaultOption(): void {
      const availableOptions = componentTypeToOptions[this.component.type]
        [this.component.subcomponentsActiveMode]
        [this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode];
      const firstOption = Object.keys(availableOptions)[0];
      this.updateSettings(firstOption);
    },
    hideSettings(): void {
      this.activeSettings = {};
      this.componentPreviewAssistance.margin = false;
    },
    setCustomSettings(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.resetCustomSettings();
      this.setNewCustomSettings(option);
    },
    resetCustomSettings(): void {
      this.customSettingsOriginalSpecs.forEach((customSetting: CustomSettingOriginalSpec) => {
        customSetting.spec[customSetting.originalValues.name] = customSetting.originalValues.value;
      });
      this.customSettingsOriginalSpecs = [];
    },
    setNewCustomSettings(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      const { customSettings } = this.component.subcomponents[this.component.subcomponentsActiveMode];
      if (customSettings && customSettings[option]) {
        optionToSettings[option].options.forEach((setting) => {
          const cssPropertyName = setting.spec.partialCss
          ? PartialCssCustomSettingsUtils.generateCustomPartialCssPropertyName(setting.spec.cssProperty, setting.spec.partialCss.position) : setting.spec.cssProperty;
          if (customSettings[option][cssPropertyName]) {
            const customSettingOriginalSpec: CustomSettingOriginalSpec = { spec: setting.spec, originalValues: { name: 'scale', value: setting.spec.scale }};
            this.customSettingsOriginalSpecs.push(customSettingOriginalSpec);
            setting.spec.scale = customSettings[option][cssPropertyName].scale;
          }
        });
      }
    }
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
  },
  components: {
    settings,
    options,
  },
};
</script>

<style lang="css" scoped>
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .edit-component-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
</style>
