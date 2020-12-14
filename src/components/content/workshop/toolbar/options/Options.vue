<template>
  <div class="options-container">
    <dropdown class="option-button"
      :dropdownOptions="component.subcomponents"
      :objectContainingActiveOption="component"
      :activeModePropertyKeyName="'subcomponentsActiveMode'"
      :fontAwesomeIconClassName="'fa-angle-double-down'"
      @dropdown-option-clicked="$emit('subcomponents-mode-clicked', [$event, getNewCssModeContainsActiveOptionState()])"/>
    <div class="option-button">
      <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
        type="button" class="btn view-option" data-toggle="modal" :data-target="removeSubcomponentModalId"
        :class="[ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'display-toggle-remove' : 'display-toggle-add' ]"
        @click="toggleSubcomponent(component.subcomponents[component.subcomponentsActiveMode])">
      </button>
    </div>
    <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
      <dropdown class="option-button"
        :dropdownOptions="componentTypeToOptions[component.type][component.subcomponentsActiveMode]"
        :objectContainingActiveOption="component.subcomponents[component.subcomponentsActiveMode]"
        :activeModePropertyKeyName="'customCssActiveMode'"
        :fontAwesomeIconClassName="'fa-angle-down'"
        @dropdown-option-clicked="this.$emit('css-mode-clicked', [$event, this.getNewCssModeContainsActiveOptionState()])"/>
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
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { componentTypeToOptions } from '../options/componentOptions/componentTypeToOptions';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import JSONManipulation from '../../../../../services/workshop/jsonManipulation';
import { getIsDoNotShowModalAgainState } from './modal/state';
import dropdown from './dropdown/Dropdown.vue';

interface Data {
  WORKSHOP_TOOLBAR_OPTIONS;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  removeSubcomponentModalId: string;
}

export default {
  data: (): Data => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    SUB_COMPONENT_CSS_MODES,
    componentTypeToOptions,
    removeSubcomponentModalId: '',
  }),
  methods: {  
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeOption = option;
      this.$emit('option-clicked', option);
    },
    getNewCssModeContainsActiveOptionState(activeMode?: SUB_COMPONENT_CSS_MODES): boolean {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][activeMode || subcomponents[subcomponentsActiveMode].customCssActiveMode];
      return activeModeOptions && activeModeOptions.some((option) => option.identifier === this.activeOption);
    },
    toggleSubcomponent(subcomponent: SubcomponentProperties): void {
      this.removeSubcomponentModalId = '';
      const { optionalSubcomponent, initialCss } = subcomponent;
      if (!optionalSubcomponent.currentlyDisplaying) {
        optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
      } else {
        if (!getIsDoNotShowModalAgainState()){
          this.removeSubcomponentModalId = '#removeSubcomponentModal';
        } else {
          subcomponent.customCss = JSONManipulation.deepCopy(initialCss);
          optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
          this.$emit('hide-settings');
        }
      }
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
    background-color: #fffdfd;
    border-color: red !important;
    color: red !important;
    background: url('../../../../../assets/svg/rubbish-can-red.svg') center no-repeat;
    background-size: 17px auto;
  }
  .display-toggle-add {
    width: 3em;
    height: 38px;
    background: url('../../../../../assets/svg/plus-default.svg') center no-repeat;
    background-size: 16px auto;
    /* transition removed due to stuttering in the plus svgs */
    /* transition: 0.1s ease-in-out !important; */
  }
  .display-toggle-add:hover {
    background-color: #f8fff8;
    border-color: green !important;
    color: green !important;
    background: url('../../../../../assets/svg/plus-green.svg') center no-repeat;
    background-size: 16px auto;
  }
</style>
