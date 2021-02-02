<template>
  <div class="options-container">
    <div class="options-container-inner">
      <div class="btn-group option-component-button">
        <button v-if="isSubcomponentSelectModeButtonDisplayed"
          id="component-select-button" type="button" class="btn option-action-button" :class="SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER"
          @click="initiateSubcomponentSelectMode">
          <i class="fa fa-mouse-pointer" :class="SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER"></i>
        </button>
        <dropdown class="button-group-secondary-component"
          :uniqueIdentifier="'subcomponentsDropdown'"
          :dropdownOptions="component.componentPreviewStructure.subcomponentDropdownStructure"
          :objectContainingActiveOption="component"
          :activeModePropertyKeyName="'subcomponentsActiveMode'"
          :fontAwesomeIconClassName="'fa-angle-double-down'"
          :highlightSubcomponents="true"
          :isButtonGroup="true"
          :isNested="true"
          :customEventHandlers="useSubcomponentDropdownEventHandlers"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @new-dropdown-option-clicked="newSubcomponentsModeClicked($event)"
          @is-component-displayed="toggleSubcomponentSelectModeButtonDisplay($event)"/>
      </div>
      <div class="option-component-button">
        <button
          type="button" class="btn option-action-button"
          @click="toggleModalExpandMode">
          <i class="dropdown-button-marker" :class="['fa', isExpandedModalPreviewModeActive ? 'fa-compress' : 'fa-expand']"></i>
        </button>
      </div>
      <div class="option-component-button">
        <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
          type="button" class="btn option-action-button" data-toggle="modal" :data-target="currentRemoveSubcomponentModalTargetId"
          :class="[ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'display-toggle-remove' : 'display-toggle-add' ]"
          @mouseenter="subcomponentMouseEnterHandler"
          @mouseleave="subcomponentMouseLeaveHandler"
          @click="toggleSubcomponent(component.subcomponents[component.subcomponentsActiveMode])">
        </button>
      </div>
      <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
        <dropdown class="option-component-button"
          :uniqueIdentifier="'cssModesDropdown'"
          :dropdownOptions="componentTypeToOptions[component.type][component.subcomponentsActiveMode]"
          :objectContainingActiveOption="component.subcomponents[component.subcomponentsActiveMode]"
          :activeModePropertyKeyName="'customCssActiveMode'"
          :fontAwesomeIconClassName="'fa-angle-down'"
          :isNested="false"
          @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
          @new-dropdown-option-clicked="newCssModeClicked($event)"/>
        <button
          type="button"
          v-for="(option) in componentTypeToOptions[component.type][component.subcomponentsActiveMode][component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode]" :key="option"
          :disabled="option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive"
          class="btn btn-outline-secondary option-component-button option-select-button-default"
          :class="[
            option.type === activeOption.type ? 'option-select-button-active' : '',
            option.enabledOnExpandedModalPreviewMode && !isExpandedModalPreviewModeActive ? 'option-select-button-default-disabled' : 'option-select-button-default-enabled',]"
          @click="optionClick(option)">
            {{option.buttonName}}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useSubcomponentDropdownEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../consts/subcomponentPreviewClasses';
import SubcomponentToggleService from './subcomponentToggleService/subcomponentToggleService';
import { componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import SubcomponentSelectMode from './subcomponentSelectMode/subcomponentSelectMode';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import { REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import { SettingProperties } from '../../../../../interfaces/componentOptions';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { subcomponentSelectModeState } from './subcomponentSelectMode/state';
import { UpdateOptionsMode } from '../../../../../interfaces/updateCssMode';
import { removeSubcomponentModalState } from './modal/state';
import dropdown from './dropdown/Dropdown.vue';

interface Consts {
  WORKSHOP_TOOLBAR_OPTION_TYPES;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  useSubcomponentDropdownEventHandlers;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER;
  REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: string;
}

interface Data {
  currentRemoveSubcomponentModalTargetId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOption: SettingProperties;
  isExpandedModalPreviewModeActive: boolean;
}

export default {
  setup(): RemovalModalState & Consts {
    return {
      ...removeSubcomponentModalState,
      WORKSHOP_TOOLBAR_OPTION_TYPES,
      SUB_COMPONENT_CSS_MODES,
      componentTypeToOptions,
      useSubcomponentDropdownEventHandlers,
      SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
      REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: `#${REMOVE_SUBCOMPONENT_MODAL_ID}`,
    };
  },
  data: (): Data => ({
    currentRemoveSubcomponentModalTargetId: '',
    isSubcomponentSelectModeButtonDisplayed: false,
    activeOption: { buttonName: null, type: null },
    isExpandedModalPreviewModeActive: false,
  }),
  methods: {
    initiateSubcomponentSelectMode(): void {
      if (subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState()) {
        subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
        return;
      }
      const buttonElement = event.currentTarget as HTMLElement;
      const workshopEventCallback = SubcomponentSelectMode.initiate(buttonElement, this.component, this.newSubcomponentsModeClicked);
      subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(true);
      this.$emit('toggle-subcomponent-select-mode', workshopEventCallback);
    },
    optionClick(option: SettingProperties): void {
      this.setNewActiveOption(option);
      this.$emit('option-clicked', option);
    },
    setNewActiveOption(newOption: SettingProperties): void {
      this.activeOption = newOption;
    },
    getActiveOption(): SettingProperties {
      return this.activeOption;
    },
    newSubcomponentsModeClicked(newSubComponent: SUB_COMPONENTS): void {
      // reset css mode of the previous subcomponent to the first one
      const oldActiveSubcomponent = this.component.subcomponents[this.component.subcomponentsActiveMode];
      oldActiveSubcomponent.customCssActiveMode = Object.keys(oldActiveSubcomponent.customCss)[0];
      this.component.subcomponentsActiveMode = newSubComponent;
      let newOption: SettingProperties = null;
      const newActiveSubcomponent = this.component.subcomponents[newSubComponent];
      if (newActiveSubcomponent.optionalSubcomponent && !newActiveSubcomponent.optionalSubcomponent.currentlyDisplaying) {
        const { subcomponents, subcomponentsActiveMode, type } = this.component;
        const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][subcomponents[subcomponentsActiveMode].customCssActiveMode];
        newOption = activeModeOptions[0];
        this.setNewActiveOption(newOption);
        // TO-DO should also display settings
        // TO-DO set default
      } else {
        newOption = this.activeOption.buttonName ? this.updateOption() : undefined;
      }
      this.$emit('subcomponents-mode-clicked', newOption);
    },
    newCssModeClicked(newCssMode: SUB_COMPONENT_CSS_MODES): void {
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode = newCssMode;
      const newOption: SettingProperties = this.activeOption.buttonName ? this.updateOption() : undefined;
      this.$emit('css-mode-clicked', newOption);
    },
    updateOptionsForNewComponent(activeSettings: any): SettingProperties {
      return activeSettings ? this.updateOption() : undefined;
    },
    updateOption(activeCssMode?: SUB_COMPONENT_CSS_MODES): SettingProperties {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][activeCssMode || subcomponents[subcomponentsActiveMode].customCssActiveMode];
      const activeOption = activeModeOptions.find((option: SettingProperties) => {
        return option.type === this.activeOption.type
          && (this.isExpandedModalPreviewModeActive || option.enabledOnExpandedModalPreviewMode === this.activeOption.enabledOnExpandedModalPreviewMode);
      });
      const newOption = activeOption || activeModeOptions[0];
      this.setNewActiveOption(newOption);
      return newOption;
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { optionalSubcomponent, initialCss } = subcomponent;
      if (!optionalSubcomponent.currentlyDisplaying) {
        optionalSubcomponent.currentlyDisplaying = true;
        SubcomponentToggleService.changeSubcomponentPreviewClass(optionalSubcomponent, this.component.subcomponentsActiveMode, false,
          SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_ADD, SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      } else if (!this.getIsDoNotShowModalAgainState()) {
        this.currentRemoveSubcomponentModalTargetId = this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID;
        setTimeout(() => { this.currentRemoveSubcomponentModalTargetId = ''; });
        this.$emit('prepare-remove-subcomponent-modal');
      } else {
        subcomponent.customCss = JSONManipulation.deepCopy(initialCss);
        optionalSubcomponent.currentlyDisplaying = false;
        this.$emit('hide-settings');
        SubcomponentToggleService.changeSubcomponentPreviewClass(optionalSubcomponent, this.component.subcomponentsActiveMode, true,
          SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE, SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
      }
    },
    subcomponentMouseEnterHandler(): void {
      SubcomponentToggleService.displaySubcomponentPreview(this.component, subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState());
    },
    subcomponentMouseLeaveHandler(): void {
      if (this.currentRemoveSubcomponentModalTargetId === this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID) return;
      SubcomponentToggleService.hideSubcomponentPreview(this.component, subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState());
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    },
    toggleModalExpandMode(): void {
      this.isExpandedModalPreviewModeActive = !this.isExpandedModalPreviewModeActive;
      if (!this.isExpandedModalPreviewModeActive && this.activeOption.enabledOnExpandedModalPreviewMode) {
        const { subcomponents, subcomponentsActiveMode, type } = this.component;
        const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][subcomponents[subcomponentsActiveMode].customCssActiveMode];
        this.setNewActiveOption(activeModeOptions[0]);
      }
      this.$emit('expand-modal-component', this.isExpandedModalPreviewModeActive);
    },
  },
  props: {
    component: Object,
  },
  components: {
    dropdown,
  }
};
</script>

<style lang="css" scoped>
  .options-container {
    padding: 5px;
    padding-left: 15px;
    width: 100%;
    display: grid;
    background-color: rgb(251 251 251);
    border-radius: 20px;
  }
  .options-container-inner {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  #component-select-button {
    padding-left: 10px !important;
    padding-right: 9px !important;
    font-size: 13px !important;
    color: #5c5c5c;
  }
  .option-component-button {
    float: left;
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .option-select-button-default {
    color:#616161 !important;
  }
  .option-select-button-default-enabled {
    cursor: pointer;
  }
  .option-select-button-default-enabled:hover {
    background-color: #ebebeb !important;
    color: rgb(85, 85, 85) !important;
  }
  .option-select-button-default-enabled:active {
    background-color: #e4e4e4 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .option-select-button-default-disabled {
    cursor: default;
  }
  .option-select-button-active {
    border-color: #84bbff !important;
    background-color: rgb(245, 251, 255) !important;
    color: #4a84ab !important;
  }
  .option-select-button-active:hover {
    background-color: rgb(227, 245, 255) !important;
    color: rgb(87, 109, 156) !important;
  }
  .option-select-button-active:active {
    background-color: rgb(204, 237, 255) !important;
  }
  .display-toggle-remove {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/rubbish-can-default.svg') center no-repeat;
    background-size: 17px auto;
    transition: 0.1s ease-in-out !important;
  }
  /* remove this if the red colour is a little distracting - UX */
  .display-toggle-remove:active {
    background-color: #f3eded !important;
  }
  .display-toggle-add {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/plus-default.svg') center no-repeat;
    background-size: 14px auto;
    /* transition removed due to stuttering in the plus svgs */
    /* transition: 0.1s ease-in-out !important; */
  }
  /* remove this if the green colour is a little distracting - UX */
  .display-toggle-add:active {
    background-color: #e9f5e9 !important;
  }
</style>

<style lang="css">
  .button-group-secondary-component {
    left: -1px;
  }
  .option-action-button {
    border: 1px solid #aaaaaa !important;
  }
  .option-action-button:hover {
    background-color: #ebebeb !important;
  }
  .option-action-button:active {
    background-color: #e4e4e4 !important;
  }
</style>