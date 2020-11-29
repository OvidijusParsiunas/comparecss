<template>
  <div style="margin-top: 10px; margin-bottom: 10px">
    <div style="float: left" class="option-button">
      <select v-if="Object.keys(component.subcomponents).length > 1" class="form-control" v-model="activeSubcomponentMode" @change="subcomponentsModeClick">
        <option v-for="(mode, propertyName) in component.subcomponents" :key="propertyName">{{propertyName}}</option>
      </select>
    </div>
    <div style="float: left" class="option-button">
      <select v-if="Object.keys(componentTypeToOptions[component.type][component.subcomponentsActiveMode]).length > 1" class="form-control" v-model="component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode" @change="cssModeClick">
        <option v-for="(mode, propertyName) in componentTypeToOptions[component.type][component.subcomponentsActiveMode]" :key="propertyName">{{propertyName}}</option>
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
</template>

<script lang="ts">
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { componentTypeToOptions } from '../options/components/componentTypeToOptions';
import { UpdateOptionsMode } from '../../../../../interfaces/updateCssMode';
import { SUB_COMPONENTS } from '@/consts/subcomponentModes.enum';

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
  .btn-outline-secondary:hover {
    background-color: #d6d6d6 !important;
    color: black !important;
  }
  .option-button {
    margin-right: 8px;
    border-color: #9d9d9d !important;
    background-color: white !important;
  }
</style>
