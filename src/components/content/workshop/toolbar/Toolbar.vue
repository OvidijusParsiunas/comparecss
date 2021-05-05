<template>
  <div v-if="component" ref="toolbarContainer" :class="TOOLBAR_CONTAINER_DEFAULT_CLASS">
    <div ref="toolbar">
      <options ref="options"
        :component="component"
        :isSettingsDisplayed="isSettingsDisplayed"
        :componentPreviewAssistance="componentPreviewAssistance"
        @trigger-settings-refresh="triggerSettingsRefresh($event)"
        @hide-settings="hideSettings"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @prepare-remove-subcomponent-modal="$emit('prepare-remove-subcomponent-modal', $event)"
        @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
        @toggle-expanded-modal-preview-mode="toggleExpandModalPreviewMode($event)"
        @toggle-full-preview-mode="toggleFullPreviewMode($event)"
        @toggle-toolbar-position="toggleToolbarPosition"
        @toggle-import-subcomponent-mode="$emit('toggle-import-subcomponent-mode', $event)"/>
      <settings v-if="isSettingsDisplayed" ref="settings"
        :subcomponentProperties="component.subcomponents[component.activeSubcomponentName]"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @play-transition-preview="$emit('play-transition-preview', $event)"
        @stop-transition-preview="$emit('stop-transition-preview')"
        @remove-insync-option-button="$refs.options.toggleImportedComponentInSync($event)"/>
    </div>
  </div>
</template>

<script lang="ts">
import ToolbarToggles from '../componentPreview/utils/expandedModalPreviewMode/modeToggleTransitions/toolbarToggles';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import { ToggleSubcomponentSelectModeEvent } from '../../../../interfaces/toggleSubcomponentSelectModeEvent';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../consts/workshopToolbarOptionTypes.enum';
import { ToggleFullPreviewModeEvent } from '../../../../interfaces/toggleFullPreviewModeEvent';
import { TOOLBAR_CONTAINER_GENERAL_CLASSES } from '../../../../consts/toolbarClasses';
import { optionToSettings } from './settings/types/optionToSettings';
import { Option } from '../../../../interfaces/componentOptions';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

interface Consts {
  TOOLBAR_CONTAINER_DEFAULT_CLASS: TOOLBAR_CONTAINER_GENERAL_CLASSES;
}

interface Data {
  isSettingsDisplayed: boolean;
  lastActiveOptionPriorToAllComponentsDeletion: Option;
}

export default {
  setup(): Consts {
    return {
      TOOLBAR_CONTAINER_DEFAULT_CLASS: TOOLBAR_CONTAINER_GENERAL_CLASSES.DEFAULT,
    };
  },
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
        this.$refs.settings.refreshSettings(newSettings, newOptionType);
      });
    },
    hideSettings(): void {
      this.isSettingsDisplayed = false;
    },
    toggleSubcomponentSelectMode(toggleSubcomponentSelectModeEvent: ToggleSubcomponentSelectModeEvent): void {
      this.$emit('toggle-subcomponent-select-mode', toggleSubcomponentSelectModeEvent);
      if (this.$refs.settings) this.$refs.settings.toggleSubcomponentSelectMode();
    },
    toggleExpandModalPreviewMode(toggleExpandedModalPreviewModeEvent: ToggleExpandedModalPreviewModeEvent): void {
      this.$emit('toggle-expanded-modal-preview-mode',
        toggleExpandedModalPreviewModeEvent.concat(this.$refs.toolbarContainer, this.$refs.toolbar) as ToggleExpandedModalPreviewModeEvent);
    },
    toggleFullPreviewMode(event: ToggleFullPreviewModeEvent): void {
      this.$emit('toggle-full-preview-mode',
        event.concat(this.$refs.toolbarContainer, this.$refs.toolbar) as ToggleFullPreviewModeEvent);
    },
    toggleToolbarPosition(): void {
      ToolbarToggles.toggleToolbarPosition(this.$refs.toolbarContainer);
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
    height: 228px;
  }
  .toolbar-container-modal-preview-active {
    width: 100vw;
    position: absolute;
    left: -30vw;
    z-index: 1;
  }
  .toolbar-container-modal-preview-active-position-bottom {
    bottom: 0px;
  }
  .toolbar-modal-preview-active {
    width: fit-content;
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
  .toolbar-position-full-preview-active {
    float: right;
    margin-right: 15px;
  }
</style>
