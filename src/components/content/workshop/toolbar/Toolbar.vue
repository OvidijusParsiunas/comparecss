<template>
  <div v-if="component" ref="toolbarContainer" class="toolbar-container-default">
    <div ref="toolbarContainerInner">
      <options ref="options"
        :component="component"
        :isSettingsDisplayed="isSettingsDisplayed"
        :componentPreviewAssistance="componentPreviewAssistance"
        @option-clicked="updateSettings"
        @new-option="newOption"
        @hide-settings="hideSettings"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @prepare-remove-subcomponent-modal="$emit('prepare-remove-subcomponent-modal')"
        @toggle-subcomponent-select-mode="toggleSubcomponentSelectMode($event)"
        @expand-modal-component="expandModalComponent($event)"/>
      <settings v-if="isSettingsDisplayed" ref="settings"
        :subcomponentproperties="component.subcomponents[component.subcomponentsActiveMode]"
        :settings="activeSettings"/>
    </div>
  </div>
</template>

<script lang="ts">
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../consts/workshopToolbarOptionTypes.enum';
import PartialCssCustomSettingsUtils from './settings/utils/partialCssCustomSettingsUtils';
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { SettingProperties } from '../../../../interfaces/componentOptions';
import { optionToSettings } from './settings/types/optionToSettings';
import settings from './settings/Settings.vue';
import options from './options/Options.vue';

interface Data {
  activeSettings: any;
  isSettingsDisplayed: boolean;
  customSettingsOriginalSpecs: CustomSettingOriginalSpec[];
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
    // TO-Do active settings should be managed in the settings component
    activeSettings: {},
    isSettingsDisplayed: false,
    customSettingsOriginalSpecs: [],
  }),
  methods: {
    updateSettings(newOption: SettingProperties): void {
      this.setCustomSettings(newOption.type);
      this.activeSettings = optionToSettings[newOption.type];
      this.isSettingsDisplayed = Object.keys(this.activeSettings).length > 0;
    },
    updateToolbarForNewComponent(): void {
      this.$nextTick(() => {
        const activeOption = this.$refs.options.updateOptionsForNewComponent(Object.keys(this.activeSettings).length);
        if (activeOption) { this.updateSettings(activeOption); }
        this.triggerSettingsReset();
      });
    },
    newOption(newOption: SettingProperties): void {
      this.$nextTick(() => {
        if (newOption && this.isSettingsDisplayed) { this.updateSettings(newOption); }
        this.triggerSettingsReset();
      });
    },
    triggerSettingsReset(): void {
      // this trigger type is used instead of a ref method because this will only trigger the settings-reset when
      // the props (more specifically the component properties) have updated first (via the watch property)
      // whereas directly calling the reset method via ref invokes it before the props have been updated
      const activeOption = this.$refs.options.getActiveOption();
      this.setCustomSettings(activeOption.type);
      if (this.$refs.settings) this.$refs.settings.updateSettings();
    },
    hideSettings(): void {
      this.activeSettings = {};
    },
    setCustomSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
      this.resetCustomSettings();
      this.setNewCustomSettings(optionType);
    },
    resetCustomSettings(): void {
      this.customSettingsOriginalSpecs.forEach((customSetting: CustomSettingOriginalSpec) => {
        customSetting.spec[customSetting.originalValues.name] = customSetting.originalValues.value;
      });
      this.customSettingsOriginalSpecs = [];
    },
    setNewCustomSettings(optionType: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
      const { customSettings } = this.component.subcomponents[this.component.subcomponentsActiveMode];
      if (customSettings && customSettings[optionType]) {
        optionToSettings[optionType].options.forEach((setting) => {
          const cssPropertyName = setting.spec.partialCss
          ? PartialCssCustomSettingsUtils.generateCustomPartialCssPropertyName(setting.spec.cssProperty, setting.spec.partialCss.position) : setting.spec.cssProperty;
          if (customSettings[optionType][cssPropertyName]) {
            const customSettingOriginalSpec: CustomSettingOriginalSpec = { spec: setting.spec, originalValues: { name: 'scale', value: setting.spec.scale }};
            this.customSettingsOriginalSpecs.push(customSettingOriginalSpec);
            setting.spec.scale = customSettings[optionType][cssPropertyName].scale;
          }
        });
      }
    },
    toggleSubcomponentSelectMode(callback: WorkshopEventCallback): void {
      this.$emit('toggle-subcomponent-select-mode', callback);
      this.$refs.settings.toggleSubcomponentSelectMode();
    },
    expandModalComponent(isExpandedModalPreviewModeActive: boolean): void {
      if (isExpandedModalPreviewModeActive) {
        this.$refs.toolbarContainer.classList.replace('toolbar-container-default', 'toolbar-container-modal');
        this.$refs.toolbarContainerInner.classList.add('toolbar-container-inner-modal');
      } else {
        this.$refs.toolbarContainer.classList.replace('toolbar-container-modal', 'toolbar-container-default');
        this.$refs.toolbarContainerInner.classList.remove('toolbar-container-inner-modal');
      }
      this.$emit('expand-modal-component', isExpandedModalPreviewModeActive);
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
