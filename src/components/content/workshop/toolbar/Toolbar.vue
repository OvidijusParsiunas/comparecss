<template>
  <div v-if="component">
    <div style="width: 98.5%; height: 228px">
      <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
        <div style="margin-left: 10px; padding: 5px">
          <options ref="options"
            :component="component"
            @option-clicked="updateSettings"
            @mode-clicked="updateMode"/>
        </div>
      </div>
      <settings
        :subcomponentproperties="component.subcomponents[component.subcomponentsActiveMode]"
        :customSettingsProperties="component.customSettingsProperties"
        :settings="activeSettings"
        :settingsResetTriggered="settingsResetTriggered"/>
    </div>
  </div>
</template>

<script lang="ts">
interface Data {
  activeSettings: any,
  activeMode: COMPONENT_MODES,
  settingsResetTriggered: boolean,
}
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import { optionToSettings } from './settings/types/optionToSettings';
import { COMPONENT_MODES } from '../../../../consts/componentModes.enum';
import { UpdateMode } from '../../../../interfaces/updateMode';
import SettingsManager from '../../../../services/workshop/settingsManager';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

export default {
  data: (): Data => ({
    activeSettings: {},
    activeMode: COMPONENT_MODES.DEFAULT,
    settingsResetTriggered: false,
  }),
  components: {
    settings,
    options,
  },
  methods: {
    updateSettings(newSettings: WORKSHOP_TOOLBAR_OPTIONS): void {
      if (newSettings === WORKSHOP_TOOLBAR_OPTIONS.RESET) {
        SettingsManager.resetComponentProperties(this.component, this.activeMode);
        this.triggerSettingsReset();
      } else {
        this.activeSettings = optionToSettings[newSettings];
        this.componentPreviewAssistance.margin = newSettings === WORKSHOP_TOOLBAR_OPTIONS.MARGIN;
      }
    },
    updateMode(updateMode: UpdateMode): void {
      if (updateMode[0]) this.activeMode = updateMode[0];
      let newModeContainsActiveOption = updateMode[1];
      if (newModeContainsActiveOption === undefined) {
        newModeContainsActiveOption = this.$refs.options.getNewModeContainsActiveOptionState(this.activeMode);
      }
      if (this.activeSettings && Object.keys(this.activeSettings).length && !newModeContainsActiveOption) {
        this.activeSettings = {};
        this.componentPreviewAssistance.margin = false;
      }
      this.triggerSettingsReset();
    },
    triggerSettingsReset(): void {
      // this trigger type is used instead of a ref method because this will only trigger the settings-reset when
      // the props (more specifically the component properties) have updated first (via the watch property)
      // whereas directly calling the reset method via ref invokes it before the props have been updated
      this.settingsResetTriggered = !this.settingsResetTriggered;
    }
  },
  props: {
    component: Object,
    componentPreviewAssistance: Object,
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
