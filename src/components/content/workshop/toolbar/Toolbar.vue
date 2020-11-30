<template>
  <div v-if="component">
    <div style="width: 98.5%; height: 228px">
      <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
        <div style="margin-left: 10px; padding: 5px; width: 100%">
          <options ref="options"
            :component="component"
            @option-clicked="updateSettings"
            @subcomponents-mode-clicked="updateSubcomponentsMode"
            @css-mode-clicked="updateCssMode"/>
        </div>
      </div>
      <settings
        :subcomponentproperties="component.subcomponents[component.subcomponentsActiveMode]"
        :settings="activeSettings"
        :settingsResetTriggered="settingsResetTriggered"/>
    </div>
  </div>
</template>

<script lang="ts">
interface Data {
  activeOption: WORKSHOP_TOOLBAR_OPTIONS;
  activeSettings: any;
  activeCssMode: SUB_COMPONENT_CSS_MODES;
  settingsResetTriggered: boolean;
}
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import { optionToSettings } from './settings/types/optionToSettings';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { UpdateOptionsMode } from '../../../../interfaces/updateCssMode';
import SettingsManager from '../../../../services/workshop/settingsManager';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';

export default {
  data: (): Data => ({
    activeOption: null,
    activeSettings: {},
    activeCssMode: SUB_COMPONENT_CSS_MODES.DEFAULT,
    settingsResetTriggered: false,
  }),
  methods: {
    updateSettings(newOption: WORKSHOP_TOOLBAR_OPTIONS): void {
      if (newOption === WORKSHOP_TOOLBAR_OPTIONS.RESET) {
        SettingsManager.resetComponentProperties(this.component, this.activeCssMode);
        this.triggerSettingsReset();
      } else {
        this.activeOption = newOption;
        this.activeSettings = optionToSettings[newOption];
        this.componentPreviewAssistance.margin = (newOption === WORKSHOP_TOOLBAR_OPTIONS.MARGIN)
          && (this.component.subcomponentsActiveMode !== SUB_COMPONENTS.CLOSE);
      }
    },
    updateCssMode(newCssMode: UpdateOptionsMode): void {
      if (newCssMode[0]) { this.activeCssMode = newCssMode[0]; }
      let newCssModeContainsActiveOption = newCssMode[1];
      if (newCssModeContainsActiveOption === undefined) {
        newCssModeContainsActiveOption = this.$refs.options.getNewCssModeContainsActiveOptionState(this.activeCssMode);
      }
      if (this.activeSettings && Object.keys(this.activeSettings).length && !newCssModeContainsActiveOption) {
        this.hideSettings();
      }
      this.triggerSettingsReset();
    },
    updateSubcomponentsMode(updateSubcomponentsMode: UpdateOptionsMode): void {
      if (!updateSubcomponentsMode[1]) {
        this.hideSettings();
      }
      this.triggerSettingsReset();
    },
    triggerSettingsReset(): void {
      // this trigger type is used instead of a ref method because this will only trigger the settings-reset when
      // the props (more specifically the component properties) have updated first (via the watch property)
      // whereas directly calling the reset method via ref invokes it before the props have been updated
      this.settingsResetTriggered = !this.settingsResetTriggered;
      this.$nextTick(() => {
        if (this.activeOption === WORKSHOP_TOOLBAR_OPTIONS.MARGIN && Object.keys(this.activeSettings).length > 0) {
          this.componentPreviewAssistance.margin = !(this.component.subcomponentsActiveMode === SUB_COMPONENTS.CLOSE);
        }
      });
    },
    hideSettings(): void {
      this.activeSettings = {};
      this.componentPreviewAssistance.margin = false;
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
