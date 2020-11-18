<template>
  <div style="margin-top: 10px; margin-bottom: 10px">
    <div style="float: left" class="edit-component-button">
      <select class="form-control" v-model="component.componentProperties.customCssActiveMode" @change="modeClick">
        <option v-for="(mode, propertyName) in componentTypeToOptions[component.type]" :key="propertyName">{{propertyName}}</option>
      </select>
    </div>
    <button
      type="button"
      v-for="(option) in componentTypeToOptions[component.type][component.componentProperties.customCssActiveMode]" :key="option"
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
      this.$emit('mode-clicked', [this.component.componentProperties.customCssActiveMode, this.getNewModeContainsActiveOptionState()] as UpdateMode);
    },
    getNewModeContainsActiveOptionState(activeMode?: COMPONENT_MODES): boolean {
      const activeModeOptions = componentTypeToOptions[this.component.type][activeMode || this.component.componentProperties.customCssActiveMode];
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
