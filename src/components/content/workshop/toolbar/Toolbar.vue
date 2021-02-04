<template>
  <div v-if="component" ref="toolbarContainer" class="toolbar-container-default" :style="EXPANDED_MODAL_INITIAL_FADE_OUT_ANIMATION_VALUES">
    <div ref="toolbarContainerInner">
      <options ref="options"
        :component="component"
        :isSettingsDisplayed="isSettingsDisplayed"
        :componentPreviewAssistance="componentPreviewAssistance"
        @trigger-settings-refresh="triggerSettingsRefresh"
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
import ExpandedModalPreviewMode, { TransitionAnimation } from'../../../../services/workshop/expandedModalPreviewMode/expandedModalPreviewMode';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../consts/workshopToolbarOptionTypes.enum';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { optionToSettings } from './settings/types/optionToSettings';
import { Option } from '../../../../interfaces/componentOptions';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

interface Consts {
  EXPANDED_MODAL_INITIAL_FADE_OUT_ANIMATION_VALUES: TransitionAnimation;
}

interface Data {
  isSettingsDisplayed: boolean;
  lastActiveOptionPriorToAllComponentsDeletion: Option;
}

export default {
  setup(): Consts {
    return {
      EXPANDED_MODAL_INITIAL_FADE_OUT_ANIMATION_VALUES: ExpandedModalPreviewMode.expandedModalInitialFadeOutAnimationValues,
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
        this.$refs.settings.updateSettings(newSettings, newOptionType);
      });
    },
    hideSettings(): void {
      this.isSettingsDisplayed = false;
    },
    toggleSubcomponentSelectMode(callback: WorkshopEventCallback): void {
      this.$emit('toggle-subcomponent-select-mode', callback);
      this.$refs.settings.toggleSubcomponentSelectMode();
    },
    expandModalComponent(isExpandedModalPreviewModeActive: boolean): void {
      if (isExpandedModalPreviewModeActive) {
        this.$refs.toolbarContainer.style.opacity = '0';
        setTimeout(() => {
          this.$refs.toolbarContainer.classList.replace('toolbar-container-default', 'toolbar-container-modal');
          this.$refs.toolbarContainerInner.classList.add('toolbar-container-inner-modal');
          this.$refs.toolbarContainer.style.opacity = '1';
        }, ExpandedModalPreviewMode.expandedModalInitialFadeOutAnimationDurationMilliseconds);
      } else {
        this.$refs.toolbarContainer.classList.replace('toolbar-container-modal', 'toolbar-container-default');
        this.$refs.toolbarContainerInner.classList.remove('toolbar-container-inner-modal');
      }
      this.$emit('toggle-expanded-modal-preview-mode', isExpandedModalPreviewModeActive);
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
  .toolbar-container-modal {
    width: 100vw;
    height: 228px;
    position: absolute;
    left: -30vw;
    z-index: 1;
  }
  .toolbar-container-inner-modal {
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
