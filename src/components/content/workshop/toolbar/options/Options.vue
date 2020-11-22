<template>
  <div style="margin-top: 10px; margin-bottom: 10px">
    <div style="float: left" class="edit-component-button">
      <select v-if="Object.keys(component.subcomponents).length > 1" class="form-control" v-model="component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode" @change="modeClick">
        <option v-for="(mode, propertyName) in component.subcomponents" :key="propertyName">{{propertyName}}</option>
      </select>
    </div>
    <div style="float: left" class="edit-component-button">
      <select v-if="Object.keys(componentTypeToOptions[component.type]).length > 1" class="form-control" v-model="component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode" @change="modeClick">
        <option v-for="(mode, propertyName) in componentTypeToOptions[component.type]" :key="propertyName">{{propertyName}}</option>
      </select>
    </div>
    <button
      type="button"
      v-for="(option) in componentTypeToOptions[component.type][component.subcomponents[component.subcomponentsActiveMode].customCssActiveMode]" :key="option"
      class="btn btn-outline-secondary edit-component-button"
      @click="optionClick(option.identifier)">
        {{option.buttonName}}
    </button>
  </div>
</template>

<script lang="ts">
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../../consts/workshopToolbarOptions';
import { COMPONENT_MODES } from '../../../../../consts/componentModes.enum';
import { componentTypeToOptions } from '../options/components/componentTypeToOptions';
import { UpdateMode } from '../../../../../interfaces/updateMode';

interface Data {
  WORKSHOP_TOOLBAR_OPTIONS;
  COMPONENT_MODES;
  componentTypeToOptions;
  activeOptionIdentifier: WORKSHOP_TOOLBAR_OPTIONS;
}

export default {
  data: (): Data => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    COMPONENT_MODES,
    componentTypeToOptions,
    activeOptionIdentifier: null,
  }),
  methods: {
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.activeOption = option;
      this.$emit('option-clicked', option);
    },
    modeClick(): void {
      this.$emit('mode-clicked', [this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode, this.getNewModeContainsActiveOptionState()] as UpdateMode);
    },
    getNewModeContainsActiveOptionState(activeMode?: COMPONENT_MODES): boolean {
      const activeModeOptions = componentTypeToOptions[this.component.type][activeMode || this.component.subcomponents[this.component.subcomponentsActiveMode].customCssActiveMode];
      return activeModeOptions.some((option) => option.identifier === this.activeOption);
    }
  },
  props: {
    component: Object,
  },
};
</script>

<style lang="css" scoped>
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
