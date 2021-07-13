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
        @toggle-import-subcomponent-mode="$emit('toggle-import-subcomponent-mode', $event)"
        @add-subcomponent="$emit('add-subcomponent')"
        @remove-subcomponent="$emit('remove-subcomponent', $event)"/>
      <settings v-if="isSettingsDisplayed" ref="settings"
        :component="component"
        :subcomponentProperties="component.subcomponents[component.activeSubcomponentName]"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @play-animation-preview="$emit('play-animation-preview', $event)"
        @stop-animation-preview="$emit('stop-animation-preview')"
        @remove-insync-option-button="$refs.options.toggleInSync($event)"
        @move-subcomponent="$emit('move-subcomponent', $event)"/>
    </div>
  </div>
</template>

<script lang="ts">
import ToolbarToggles from '../componentPreview/utils/animations/expandedModalPreviewMode/toggleAnimations/toolbarToggles';
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
  .toolbar-position-full-preview-active {
    float: right;
    margin-right: 15px;
  }
</style>

<style lang="css">
  .bootstrap .btn-group > .btn-group-option:not(:last-child):not(.dropdown-toggle) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .bootstrap .btn-group > .btn-group-option:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .bootstrap .btn-group > .btn-group-option:not(:first-child) {
    margin-left: -1px;
  }
  .bootstrap .btn-group-option:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  .bootstrap .btn-group > .btn-group-option {
    position: relative;
    flex: 1 1 auto;
  }
  .bootstrap .btn-group-option {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background-color: transparent;
  }
  .toolbar-button-group-primary-component {
    left: 0px;
    z-index: 2 !important;
    background-color: white !important;
  }
  .toolbar-button-group-secondary-component {
    left: -1px;
    z-index: 1;
    background-color: white !important;
  }
  .toolbar-general-button {
    border: 1px solid #9d9d9d !important;
    background-color: white !important;
    outline: none;
  }
  .toolbar-general-button:hover {
    background-color: #ebebeb !important;
  }
  .toolbar-general-button:active {
    background-color: #e4e4e4 !important;
  }
</style>