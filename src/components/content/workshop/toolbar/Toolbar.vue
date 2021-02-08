<template>
  <div v-if="component" ref="toolbarContainer" class="toolbar-container-default toolbar-container-position-top">
    <div ref="toolbar">
      <options ref="options"
        :component="component"
        :isSettingsDisplayed="isSettingsDisplayed"
        :componentPreviewAssistance="componentPreviewAssistance"
        @trigger-settings-refresh="triggerSettingsRefresh($event)"
        @hide-settings="hideSettings"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @prepare-remove-subcomponent-modal="$emit('prepare-remove-subcomponent-modal')"
        @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
        @toggle-expanded-modal-preview-mode="expandModalComponent($event)"/>
      <settings v-if="isSettingsDisplayed" ref="settings"
        :subcomponentproperties="component.subcomponents[component.subcomponentsActiveMode]"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../consts/workshopToolbarOptionTypes.enum';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { optionToSettings } from './settings/types/optionToSettings';
import { Option } from '../../../../interfaces/componentOptions';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

interface Data {
  isSettingsDisplayed: boolean;
  lastActiveOptionPriorToAllComponentsDeletion: Option;
}

export default {
  data: (): Data => ({
    isSettingsDisplayed: false,
    lastActiveOptionPriorToAllComponentsDeletion: null,
  }),
  methods: {
    updateToolbarForNewComponent(): void {
      this.$nextTick(() => {
        this.$refs.options.updateOptionsForNewComponent(this.lastActiveOptionPriorToAllComponentsDeletion);
        if (this.lastActiveOptionPriorToAllComponentsDeletion) { this.lastActiveOptionPriorToAllComponentsDeletion = null; }
      });
    },
    saveLastActiveOptionPriorToAllComponentsDeletion(): void {
      this.lastActiveOptionPriorToAllComponentsDeletion = this.$refs.options.getActiveOption();
    },
    triggerSettingsRefresh(newOptionType: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
      const newSettings = optionToSettings[newOptionType];
      this.isSettingsDisplayed = true;
      this.$nextTick(() => {
        this.$refs.settings.updateSettings(newSettings, newOptionType);
      });
    },
    hideSettings(): void {
      this.isSettingsDisplayed = false;
    },
    toggleSubcomponentSelectMode(callback: WorkshopEventCallback): void {
      this.$emit('toggle-subcomponent-select-mode', callback);
      if (this.$refs.settings) this.$refs.settings.toggleSubcomponentSelectMode();
    },
    expandModalComponent(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      this.$emit('toggle-expanded-modal-preview-mode',
        [toggleExpandedModalPreviewModeEvent[0], this.$refs.toolbarContainer, this.$refs.toolbar] as ToggleExpandedModalPreviewModeEvent);
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
  .toolbar-container-default {
    width: 98.5%;
  }
  .toolbar-container-modal-preview-active {
    width: 100vw;
    position: absolute;
    left: -30vw;
    z-index: 1;
  }
  .toolbar-container-position-top {
    height: 228px;
  }
  .toolbar-container-modal-preview-active-position-bottom {
    bottom: 0px;
    height: 170px;
  }
  .toolbar-modal-preview-active {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
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
