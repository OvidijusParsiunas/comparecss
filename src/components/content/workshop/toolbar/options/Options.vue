<template>
  <div class="options-container">
    <div class="option-button">
      <select v-if="Object.keys(component.subcomponents).length > 1" class="form-control" v-model="activeSubcomponentMode" @change="subcomponentsModeClick">
        <option v-for="(mode, subcomponentMode) in component.subcomponents" :key="subcomponentMode">{{subcomponentMode}}</option>
      </select>
    </div>
    <div class="option-button">
      <button v-if="component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent"
        type="button" class="btn view-option"
        :class="[ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'display-toggle-remove' : 'display-toggle-add' ]"
        @click="toggleSubcomponentDisplay(component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent)">
          {{ component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying ? 'Remove' : 'Add' }}
      </button>
    </div>
    <div v-if="!component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent || component.subcomponents[component.subcomponentsActiveMode].optionalSubcomponent.currentlyDisplaying"> 
      <div class="option-button">
        <select v-if="Object.keys(componentTypeToOptions[component.type][component.subcomponentsActiveMode]).length > 1" class="form-control" v-model="component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode" @change="cssModeClick">
          <option v-for="(mode, cssMode) in componentTypeToOptions[component.type][component.subcomponentsActiveMode]" :key="cssMode">{{cssMode}}</option>
        </select>
      </div>
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
import { componentTypeToOptions } from '../options/components/componentTypeToOptions';
import { UpdateOptionsMode } from '../../../../../interfaces/updateCssMode';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { OptionalSubcomponent } from '../../../../../interfaces/workshopComponent';

interface Data {
  WORKSHOP_TOOLBAR_OPTIONS;
  SUB_COMPONENT_CSS_MODES;
  componentTypeToOptions;
  activeOptionIdentifier: WORKSHOP_TOOLBAR_OPTIONS;
  activeSubcomponentMode: SUB_COMPONENTS;
}

export default {
  data: (): Data => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    SUB_COMPONENT_CSS_MODES,
    componentTypeToOptions,
    activeOptionIdentifier: null,
    activeSubcomponentMode: null,
  }),
  methods: {
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeOption = option;
      this.$emit('option-clicked', option);
    },
    subcomponentsModeClick(): void {
      this.component.subcomponentsActiveMode = this.activeSubcomponentMode;
      this.$emit('subcomponents-mode-clicked', [this.component.subcomponentsActiveMode, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode);
    },
    cssModeClick(): void {
      this.$emit('css-mode-clicked', [this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode, this.getNewCssModeContainsActiveOptionState()] as UpdateOptionsMode);
    },
    getNewCssModeContainsActiveOptionState(activeMode?: SUB_COMPONENT_CSS_MODES): boolean {
      const { subcomponents, subcomponentsActiveMode, type } = this.component;
      const activeModeOptions = componentTypeToOptions[type][subcomponentsActiveMode][activeMode || subcomponents[subcomponentsActiveMode].customCssActiveMode];
      return activeModeOptions.some((option) => option.identifier === this.activeOption);
    },
    toggleSubcomponentDisplay(optionalSubcomponent: OptionalSubcomponent): void {
      optionalSubcomponent.currentlyDisplaying = !optionalSubcomponent.currentlyDisplaying;
    }
  },
  props: {
    component: Object,
  },
  watch: {
    activeSubcomponentMode(newSubcomponentMode: SUB_COMPONENTS, oldSubcomponentMode: SUB_COMPONENTS): void {
      if (oldSubcomponentMode && this.component.subcomponents[oldSubcomponentMode]) {
        this.component.subcomponents[oldSubcomponentMode].customCssActiveMode = SUB_COMPONENT_CSS_MODES.DEFAULT;
      }
    },
    component(): void {
      this.activeSubcomponentMode = this.component.subcomponentsActiveMode;
    }
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
  .display-toggle-remove:hover {
    background-color: #fffdfd;
    border-color: red !important;
    color: red !important;
  }
  .display-toggle-add:hover {
    background-color: #f8fff8;
    border-color: green !important;
    color: green !important;
  }
</style>
