<template>
  <div style="margin-top: 10px; margin-bottom: 10px">
    <div style="float: left" class="edit-component-button">
      <select class="form-control" v-model="componentProperties.customCssActiveMode" @change="modeClick">
        <option v-for="mode in BUTTON_COMPONENT_MODES" :key="mode">{{mode}}</option>
      </select>
    </div>
    <button
      type="button"
      v-for="(option) in buttonOptions[componentProperties.customCssActiveMode]" :key="option"
      class="btn btn-outline-secondary edit-component-button"
      @click="optionClick(...option.clickParams)">
        {{option.buttonName}}
    </button>
  </div>
</template>

<script lang="ts">
import buttonOptions from './options/button';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
import { BUTTON_COMPONENT_MODES } from '../../../../consts/buttonComponentModes.enum';

export default {
  data: (): {WORKSHOP_TOOLBAR_OPTIONS, BUTTON_COMPONENT_MODES, buttonOptions} => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    BUTTON_COMPONENT_MODES,
    buttonOptions,
  }),
  props: {
    componentProperties: Object,
  },
  methods: {
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.$emit('option-clicked', option);
    },
    modeClick(): void {
      this.$emit('mode-clicked', this.componentProperties.customCssActiveMode);
    }
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
