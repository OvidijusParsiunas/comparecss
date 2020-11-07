<template>
  <div style="width: 98.5%; height: 228px">
    <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
      <div style="margin-left: 10px; padding: 5px">
        <!-- <div style="margin-top: 10px; display: flex"> 
          <button type="button" class="btn btn-outline-secondary edit-component-button">Edit</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Code</button>
        </div> -->
        <options :componentProperties="componentProperties" @option-clicked="updateSettings" @mode-clicked="updateMode"/>
      </div>
    </div>
    <settings :componentProperties="componentProperties" :settings="activeSettings" :settingsResetTriggered="settingsResetTriggered"/>
  </div>
</template>

<script lang="ts">
interface Data {
  activeSettings: any,
  activeMode: BUTTON_COMPONENT_MODES,
  settingsResetTriggered: boolean,
}
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../../../consts/buttonComponentModes.enum';
import SettingsManager from '../../../../services/workshop/settingsManager';
import settings from './Settings.vue';
import options from './Options.vue';

export default {
  data: (): Data => ({
    activeSettings: {},
    activeMode: BUTTON_COMPONENT_MODES.DEFAULT,
    settingsResetTriggered: false,
  }),
  components: {
    settings,
    options,
  },
  props: {
    componentProperties: Object,
    componentPreviewAssistance: Object,
  },
  methods: {
    updateSettings(newSettings: WORKSHOP_TOOLBAR_OPTIONS): void {
      if (newSettings === WORKSHOP_TOOLBAR_OPTIONS.RESET) {
        SettingsManager.resetComponentProperties(this.componentProperties, this.activeMode);
        this.settingsResetTriggered = !this.settingsResetTriggered;
      } else {
        this.activeSettings = SettingsManager.getSettings(newSettings);
        this.componentPreviewAssistance.margin = newSettings === WORKSHOP_TOOLBAR_OPTIONS.MARGIN;
      }
    },
    updateMode(event: BUTTON_COMPONENT_MODES): void {
      this.activeMode = event;
      this.activeSettings = {};
      this.componentPreviewAssistance.margin = false;
    }
  }
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
