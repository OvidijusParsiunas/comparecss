<template>
  <div class="options-container">
    <div class="btn-group option-button">
      <button v-if="isSubcomponentSelectModeButtonDisplayed"
        id="component-select-button" type="button" class="btn"
        @click="toggleSubcomponentSelectMode">
        1
      </button>
      <dropdown
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
        class="btn btn-outline-secondary option-button"
        @click="optionClick(option.identifier)">
          {{option.buttonName}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useComponentPreviewEventHandlers from './dropdown/compositionAPI/useSubcomponentDropdownEventHandlers';
import { SUBCOMPONENT_PREVIEW_CLASSES } from '../../../../../consts/subcomponentPreviewClasses';
import { componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import { REMOVE_SUBCOMPONENT_MODAL_ID } from '../../../../../consts/elementIds';
import { RemovalModalState } from '../../../../../interfaces/removalModalState';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { UpdateOptionsMode } from '../../../../../interfaces/updateCssMode';
import { removeSubcomponentModalState } from './modal/state';
import dropdown from './dropdown/Dropdown.vue';

interface Consts {
  WORKSHOP_TOOLBAR_OPTIONS;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  useComponentPreviewEventHandlers;
}

interface Data {
  removeSubcomponentModalId: string;
  isSubcomponentSelectModeButtonDisplayed: boolean;
}

export default {
  setup(): RemovalModalState & Consts {
    return {
      ...removeSubcomponentModalState,
      WORKSHOP_TOOLBAR_OPTIONS,
      SUB_COMPONENT_CSS_MODES,
      componentTypeToOptions,
      useComponentPreviewEventHandlers,
    };
  },
  data: (): Data => ({
    removeSubcomponentModalId: '',
    isSubcomponentSelectModeButtonDisplayed: false,
  }),
  methods: {
    toggleSubcomponentSelectMode(): void {
      const subcomponentPreviewElements = document.getElementsByClassName(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
      [...subcomponentPreviewElements].forEach((element) => {
        element.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
        element.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
        (element as HTMLElement).style.display = 'block';
        element.addEventListener('mouseover', () => {
          const hoverElement = event.target as HTMLElement;
          hoverElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
          hoverElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
        });
        element.addEventListener('mouseleave', () => {
          const blurredElement = event.target as HTMLElement;
          blurredElement.classList.remove(SUBCOMPONENT_PREVIEW_CLASSES.DEFAULT);
          blurredElement.classList.add(SUBCOMPONENT_PREVIEW_CLASSES.SUBCOMPONENT_SELECT_MODE_IN_PROGRESS_HIDDEN);
        });
      });
      // UX - SUBCOMPONENT SELECT - set this to appropriate dimensions when the event is fired
      this.$emit('prepare-subcomponent-select-mode');
    },
    // TO-DO
    // traverseAllDropdownOptions(dropdownOptions): void {
    //   const optionNames = Object.keys(dropdownOptions);
    //   for (let i = 0; i < optionNames.length; i += 1) {
    //     if (typeof dropdownOptions[optionNames[i]].currentlyDisplaying !== 'boolean') {
    //       this.traverseAllDropdownOptions(dropdownOptions[optionNames[i]]);
    //     }
    //     this.toggleSubcomponentPreviewDisplay(optionNames[i]);
    //   }
    // },
    // toggleSubcomponentPreviewDisplay(subcomponentType: string): void {
    //   const subcomponentPreviewElementId = subcomponentTypeToPreviewId[subcomponentType];
    //   const subcomponentPreviewElement = document.getElementById(subcomponentPreviewElementId);
    //   if (subcomponentPreviewElement) {
    //     subcomponentPreviewElement.style.backgroundColor = 'unset !important';
    //     subcomponentPreviewElement.style.display = 'block';
    //   }
    // },
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeOption = option;
      this.$emit('option-clicked', option);
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
      return activeModeOptions && activeModeOptions.some((option) => option.identifier === this.activeOption);
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      const { optionalSubcomponent, initialCss } = subcomponent;
      if (!optionalSubcomponent.currentlyDisplaying) {
        optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
      } else {
        if (!this.getIsDoNotShowModalAgainState()) {
          this.removeSubcomponentModalId = `#${REMOVE_SUBCOMPONENT_MODAL_ID}`;
          setTimeout(() => { this.removeSubcomponentModalId = ''; });
          this.$emit('prepare-remove-subcomponent-modal');
        } else {
          subcomponent.customCss = JSONManipulation.deepCopy(initialCss);
          optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
          this.$emit('hide-settings');
        }
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
    border: 1px solid #ced4da !important;
    background-color: white !important;
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
</style>
