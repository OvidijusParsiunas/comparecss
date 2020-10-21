<template>
  <div style="width: 98.5%">
    <div style="display: flex; background-color: rgb(251 251 251); border-radius: 20px;">
      <div style="margin-left: 10px; padding: 5px">
        <div style="margin-top: 10px; display: flex"> 
          <button type="button" class="btn btn-outline-secondary edit-component-button">Default</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Button</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Code</button>
          <button type="button" class="btn btn-outline-secondary edit-component-button">Preview</button>
        </div>
        <options @option-clicked="updateSettings($event)"/>
      </div>
    </div>
    <settings :customCss="customCss" :settings="activeSettings"/>
  </div>
</template>

<script lang="ts">
interface Data {
  activeSettings: any,
}
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import SettingsManager from '../../../../services/workshop/settingsManager';
import settings from './Settings.vue';
import options from './Options.vue';

export default {
  data: (): Data => ({
    activeSettings: {},
  }),
  components: {
    settings,
    options,
  },
  props: {
    customCss: Object,
  },
  methods: {
    updateSettings(newSettings: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeSettings = SettingsManager.getSettings(newSettings);
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
