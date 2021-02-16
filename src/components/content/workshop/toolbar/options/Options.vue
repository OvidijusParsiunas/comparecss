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
          :uniqueIdentifier="SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
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
      <div v-if="component.type === MODAL_COMPONENT_TYPE" class="option-component-button">
        <button
          type="button" class="btn option-action-button"
          @click="toggleModalExpandMode">
          <i class="dropdown-button-marker" :class="['fa', isExpandedModalPreviewModeActive ? 'fa-compress' : 'fa-expand']"></i>
        </button>
      </div>
      <div class="option-component-button">
        <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
          type="button" class="btn option-action-button" data-toggle="modal" :data-target="currentRemoveSubcomponentModalTargetId"
          :class="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'subcomponent-display-toggle-remove' : 'subcomponent-display-toggle-add'"
          @mouseenter="subcomponentMouseEnterHandler"
          @mouseleave="subcomponentMouseLeaveHandler"
          @click="toggleSubcomponent(component.subcomponents[component.subcomponentsActiveMode])">
        </button>
      </div>
      <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
        <dropdown class="option-component-button"
          :uniqueIdentifier="CSS_MODES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER"
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
            @click="selectOption(option)">
            {{option.buttonName}}
        </button>
      </div>
      <div style="display: none" ref="toolbarPositionToggle" class="toolbar-position-toggle-container">
        <button
          type="button" class="btn toolbar-position-toggle"
          @click="$emit('toggle-toolbar-position')">
          <i class="dropdown-button-marker" :class="['fa', 'fa-sort']"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS } from '../../../../../consts/customDropdownButtonsUniqueIdentifiers.enum';
import { ToggleExpandedModalPreviewModeEvent } from '../../../../../interfaces/toggleExpandedModalPreviewModeEvent';
import useSubcomponentDropdownEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { ToggleSubcomponentSelectModeEvent } from '../../../../../interfaces/toggleSubcomponentSelectModeEvent';
import { removeSubcomponentModalState } from './removeSubcomponentModalState/removeSubcomponentModalState';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../consts/elementClassMarkers';
import { subcomponentSelectModeState } from './subcomponentSelectMode/subcomponentSelectModeState';
import SubcomponentSelectModeService from './subcomponentSelectMode/subcomponentSelectModeService';
import SubcomponentToggleService from './subcomponentToggleService/subcomponentToggleService';
import { componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../consts/domEventTriggerKeys.enum';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import { NEW_COMPONENT_TYPES } from '../../../../../consts/newComponentTypes.enum';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import { REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { Option } from '../../../../../interfaces/componentOptions';
import dropdown from './dropdown/Dropdown.vue';

interface Consts {
  WORKSHOP_TOOLBAR_OPTION_TYPES;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  useSubcomponentDropdownEventHandlers;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER;
  MODAL_COMPONENT_TYPE: NEW_COMPONENT_TYPES;
  REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: string;
  SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
  CSS_MODES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS;
}

interface Data {
  currentRemoveSubcomponentModalTargetId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOption: Option;
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
      MODAL_COMPONENT_TYPE: NEW_COMPONENT_TYPES.MODAL,
      REMOVE_SUBCOMPONENT_MODAL_TARGET_ID: `#${REMOVE_SUBCOMPONENT_MODAL_ID}`,
      SUBCOMPONENTS_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.SUBCOMPONENTS,
      CSS_MODES_DROPDOWN_BUTTON_UNIQUE_IDENTIFIER: CUSTOM_DROPDOWN_BUTTONS_UNIQUE_IDENTIFIERS.CSS_MODES,
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
      const subcomponentSelectModeCallbackFunction = SubcomponentSelectModeService.initiate(buttonElement);
      const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_DOWN, DOM_EVENT_TRIGGER_KEYS.ESCAPE])
      const subcomponentsModeClickedFunc = this.newSubcomponentsModeClicked;
      this.$emit('toggle-subcomponent-select-mode',
        [subcomponentSelectModeCallbackFunction, keyTriggers, buttonElement, subcomponentsModeClickedFunc] as ToggleSubcomponentSelectModeEvent);
    },
    selectOption(option: Option): void {
      this.setNewActiveOption(option);
      this.$emit('trigger-settings-refresh', option.type);
      this.resetComponentPreviewMarginAssistance();
    },
    setNewActiveOption(newOption: Option): void {
      this.activeOption = newOption;
    },
    getActiveOption(): Option {
      return this.activeOption;
    },
    newSubcomponentsModeClicked(newSubComponent: SUB_COMPONENTS): void {
      // reset css mode of the previous subcomponent to the first one
      const oldActiveSubcomponent = this.component.subcomponents[this.component.subcomponentsActiveMode];
      oldActiveSubcomponent.customCssActiveMode = Object.keys(oldActiveSubcomponent.customCss)[0];
      this.component.subcomponentsActiveMode = newSubComponent;
      if (this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent
          && !this.component.subcomponents[this.component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying) {
        this.hideSettings();
        return;
      }
      this.newOptionOnNewModeSelect();
    },
    newCssModeClicked(newCssMode: SUB_COMPONENT_CSS_MODES): void {
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode = newCssMode;
      this.newOptionOnNewModeSelect();
    },
    updateOptionsForNewComponent(lastActiveOptionPriorToAllComponentsDeletion: Option): void {
      if (lastActiveOptionPriorToAllComponentsDeletion) this.activeOption = lastActiveOptionPriorToAllComponentsDeletion;
      this.newOptionOnNewModeSelect()
    },
    newOptionOnNewModeSelect(): void {
      if (this.activeOption.buttonName) {
        const newOption = this.getNewSuitableOption();
        this.selectOption(newOption);
      }
    },
    getNewSuitableOption(): Option {
      const activeModeOptions = this.getActiveModeOptions();
      const activeOption = activeModeOptions.find((option: Option) => {
        return option.buttonName === this.activeOption.buttonName
          && (this.isExpandedModalPreviewModeActive || option.enabledOnExpandedModalPreviewMode === this.activeOption.enabledOnExpandedModalPreviewMode);
      });
      return activeOption || activeModeOptions[0];
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { optionalSubcomponent, initialCss } = subcomponent;
      if (!optionalSubcomponent.currentlyDisplaying) {
        optionalSubcomponent.currentlyDisplaying = true;
        if (this.activeOption.buttonName) {
          const defaultOption = this.getDefaultOption();
          this.selectOption(defaultOption); 
        }
        SubcomponentToggleService.changeSubcomponentOverlayClass(optionalSubcomponent, this.component.subcomponentsActiveMode, false,
          SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE);
      } else if (!this.getIsDoNotShowModalAgainState()) {
        this.currentRemoveSubcomponentModalTargetId = this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID;
        setTimeout(() => { this.currentRemoveSubcomponentModalTargetId = ''; });
        this.$emit('prepare-remove-subcomponent-modal');
      } else {
        subcomponent.customCss = JSONManipulation.deepCopy(initialCss);
        optionalSubcomponent.currentlyDisplaying = false;
        SubcomponentToggleService.changeSubcomponentOverlayClass(optionalSubcomponent, this.component.subcomponentsActiveMode, true,
          SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_REMOVE, SUBCOMPONENT_OVERLAY_CLASSES.SUBCOMPONENT_TOGGLE_ADD);
        this.hideSettings();
      }
    },
    subcomponentMouseEnterHandler(): void {
      SubcomponentToggleService.displaySubcomponentOverlay(this.component);
    },
    subcomponentMouseLeaveHandler(): void {
      if (this.currentRemoveSubcomponentModalTargetId === this.REMOVE_SUBCOMPONENT_MODAL_TARGET_ID) return;
      SubcomponentToggleService.hideSubcomponentOverlay(this.component);
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    },
    toggleModalExpandMode(): void {
      this.isExpandedModalPreviewModeActive = !this.isExpandedModalPreviewModeActive;
      if (!this.isExpandedModalPreviewModeActive && this.activeOption.enabledOnExpandedModalPreviewMode) {
        this.selectOption(this.getDefaultOption());
      }
      this.$emit('toggle-expanded-modal-preview-mode',
        [this.isExpandedModalPreviewModeActive, this.$refs.toolbarPositionToggle] as ToggleExpandedModalPreviewModeEvent);
    },
    getDefaultOption(): Option {
      return this.getActiveModeOptions()[0];
    },
    getActiveModeOptions(): Option[] {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      return componentTypeToOptions[type][subcomponentsActiveMode][subcomponents[subcomponentsActiveMode].customCssActiveMode];
    },
    hideSettings(): void {
      this.$emit('hide-settings');
      this.resetComponentPreviewMarginAssistance();
    },
    resetComponentPreviewMarginAssistance(): void {
      this.$nextTick(() => {
        this.componentPreviewAssistance.margin = this.activeOption.type === WORKSHOP_TOOLBAR_OPTION_TYPES.MARGIN
          && this.isSettingsDisplayed
          && this.component.subcomponentsActiveMode !== SUB_COMPONENTS.CLOSE
          && !this.isExpandedModalPreviewModeActive;
      });
    }
  },
  props: {
    component: Object,
    isSettingsDisplayed: Boolean,
    componentPreviewAssistance: Object,
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
  .subcomponent-display-toggle-remove {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/rubbish-can-default.svg') center no-repeat;
    background-size: 17px auto;
    transition: 0.1s ease-in-out !important;
  }
  /* remove this if the red colour is a little distracting - UX */
  .subcomponent-display-toggle-remove:active {
    background-color: #f3eded !important;
  }
  .subcomponent-display-toggle-add {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/plus-default.svg') center no-repeat;
    background-size: 14px auto;
    /* transition removed due to stuttering in the plus svgs */
    /* transition: 0.1s ease-in-out !important; */
  }
  /* remove this if the green colour is a little distracting - UX */
  .subcomponent-display-toggle-add:active {
    background-color: #e9f5e9 !important;
  }
  .toolbar-position-toggle-container {
    position: relative;
  }
  .toolbar-position-toggle {
    position: absolute;
    right: 7px;
    border: unset !important;
    font-size: 15px !important;
    padding: 4px !important;
    display: inline-flex !important;
    height: 20px;
    top: 10px;
    color: #848484 !important;
  }
  .toolbar-position-toggle:hover {
    color: black !important;
  }
</style>

<style lang="css">
  .button-group-secondary-component {
    left: -1px;
    z-index: 1;
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