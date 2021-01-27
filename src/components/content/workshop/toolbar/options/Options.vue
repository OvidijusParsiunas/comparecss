<template>
  <div class="options-container">
    <div class="btn-group option-button">
      <button v-if="isSubcomponentSelectModeButtonDisplayed"
        id="component-select-button" type="button" class="btn" :class="SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER"
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
        :customEventHandlers="useComponentPreviewEventHandlers"
        @hide-dropdown-menu-callback="$emit('hide-dropdown-menu-callback', $event)"
        @new-dropdown-option-clicked="newSubcomponentsModeClicked($event)"
        @is-component-displayed="toggleSubcomponentSelectModeButtonDisplay($event)"/>
    </div>
    <div class="option-button">
      <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
        type="button" class="btn view-option" data-toggle="modal" :data-target="removeSubcomponentModalId"
        :class="[ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'display-toggle-remove' : 'display-toggle-add' ]"
        @click="toggleSubcomponent(component.subcomponents[component.subcomponentsActiveMode])">
      </button>
    </div>
    <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
      <dropdown class="option-button"
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
        class="btn btn-outline-secondary option-button option-default"
        :class="[option.buttonName === activeOptionButtonName ? 'active-option' : '']"
        @click="optionClick(option.buttonName, option.type)">
          {{option.buttonName}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useComponentPreviewEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../consts/workshopToolbarOptionTypes.enum';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../consts/elementClassMarkers';
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
  useComponentPreviewEventHandlers;
  SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
}

interface Data {
  removeSubcomponentModalId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
  activeOptionButtonName: WORKSHOP_TOOLBAR_OPTION_TYPES,
}

export default {
  setup(): RemovalModalState & Consts {
    return {
      ...removeSubcomponentModalState,
      WORKSHOP_TOOLBAR_OPTION_TYPES,
      SUB_COMPONENT_CSS_MODES,
      componentTypeToOptions,
      useComponentPreviewEventHandlers,
      SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER,
    };
  },
  data: (): Data => ({
    removeSubcomponentModalId: '',
    isSubcomponentSelectModeButtonDisplayed: false,
    activeOptionButtonName: null,
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
    optionClick(optionButtonName: string, optionIdentifier: WORKSHOP_TOOLBAR_OPTION_TYPES): void {
      this.setNewActiveOption(optionButtonName);
      this.$emit('option-clicked', optionIdentifier);
    },
    setNewActiveOption(optionButtonName: string): void {
      this.activeOptionButtonName = optionButtonName;
    },
    newSubcomponentsModeClicked(newSubComponent: SUB_COMPONENTS): void {
      // reset css mode of the previous subcomponent to the first one
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode = Object.keys(this.component.subcomponents[this.component.subcomponentsActiveMode].customCss)[0];
      this.component.subcomponentsActiveMode = newSubComponent;
      this.$emit('subcomponents-mode-clicked', [newSubComponent, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode)
    },
    newCssModeClicked(newCssMode: SUB_COMPONENT_CSS_MODES): void {
      this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode = newCssMode;
      this.$emit('css-mode-clicked', [newCssMode, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode)
    },
    getNewCssModeContainsActiveOptionState(activeMode?: SUB_COMPONENT_CSS_MODES): boolean {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][activeMode || subcomponents[subcomponentsActiveMode].customCssActiveMode];
      return activeModeOptions && activeModeOptions.some((option: SettingProperties) => option.buttonName === this.activeOptionButtonName);
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { optionalSubcomponent, initialCss } = subcomponent;
      if (!optionalSubcomponent.currentlyDisplaying) {
        optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
      } else if (!this.getIsDoNotShowModalAgainState()) {
        this.removeSubcomponentModalId = `#${REMOVE_SUBCOMPONENT_MODAL_ID}`;
        setTimeout(() => { this.removeSubcomponentModalId = ''; });
        this.$emit('prepare-remove-subcomponent-modal');
      } else {
        subcomponent.customCss = JSONManipulation.deepCopy(initialCss);
        optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
        this.$emit('hide-settings');
      }
    },
    toggleSubcomponentSelectModeButtonDisplay(isDropdownDisplayed: boolean): void {
      this.isSubcomponentSelectModeButtonDisplayed = isDropdownDisplayed;
    }
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
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  #component-select-button {
    border: 1px solid #aaaaaa !important;
    background-color: white !important;
    padding-left: 10px !important;
    padding-right: 9px !important;
    font-size: 13px !important;
    color: #5c5c5c;
  }
  #component-select-button:hover {
    background-color: #ebebeb !important;
  }
  #component-select-button:active {
    background-color: #e4e4e4 !important;
  }
  .view-option {
    color: black !important;
    border-color: #ced4da !important;
  }
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .option-button {
    float: left;
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
  .display-toggle-remove {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/rubbish-can-default.svg') center no-repeat;
    background-size: 17px auto;
    transition: 0.1s ease-in-out !important;
  }
  .display-toggle-remove:hover {
    background-color: #fffdfd !important;
    border-color: #ff2f20 !important;
    color:#ff2f20 !important;
    background: url('../../../../../assets/svg/rubbish-can-hover-active.svg') center no-repeat;
    background-size: 17px auto;
  }
  .display-toggle-remove:active {
    background-color: #fff6f6 !important;
    border-color:red !important;
    color: red !important;
    background: url('../../../../../assets/svg/rubbish-can-hover-active.svg') center no-repeat;
    background-size: 17px auto;
  }
  .display-toggle-add {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/plus-default.svg') center no-repeat;
    background-size: 14px auto;
    /* transition removed due to stuttering in the plus svgs */
    /* transition: 0.1s ease-in-out !important; */
  }
  .display-toggle-add:hover {
    background-color: #f7fff7 !important;
    border-color: #069906 !important;
    color: #069906 !important;
    background: url('../../../../../assets/svg/plus-hover.svg') center no-repeat;
    background-size: 14px auto;
  }
  .display-toggle-add:active {
    background-color: #f4fff4 !important;
    border-color: #00b400 !important;
    color: #0db80d !important;
    background: url('../../../../../assets/svg/plus-active.svg') center no-repeat;
    background-size: 14px auto;
  }
  .active-option {
    border-color: #84bbff !important;
    background-color: rgb(245, 251, 255) !important;
    color: #4a84ab !important;
  }
  .active-option:hover {
    background-color: rgb(227, 245, 255) !important;
    color: rgb(87, 109, 156) !important;
  }
  .active-option:active {
    background-color: rgb(204, 237, 255) !important;
  }
</style>

<style lang="css">
  .option-default {
    border-color: rgb(204, 204, 204) !important;
  }
  .option-default:hover {
    background-color: #ebebeb !important;
    color: rgb(85, 85, 85) !important;
  }
  .option-default:active {
    background-color: #e4e4e4 !important;
    outline: none !important;
    box-shadow: none !important;
  }
  .button-group-secondary-component {
    left: -1px;
  }
</style>