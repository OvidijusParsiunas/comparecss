<template>
  <div style="margin-top: 10px; margin-bottom: 10px">
    <div style="float: left" class="edit-component-button">
      <select class="form-control" v-model="selectedMode" @change="dropdownValueChange">
        <option>Default</option>
        <option>Hover</option>
        <option>Click</option>
      </select>
    </div>
    <button v-for="(option) in buttonOptions[selectedMode]" :key="option"
      type="button" class="btn btn-outline-secondary edit-component-button"
      @click="optionClick(...option.clickParams)">
        {{option.buttonName}}
    </button>
  </div>
</template>

<script lang="ts">
import buttonOptions from './options/button';
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
export default {
  data: (): {WORKSHOP_TOOLBAR_OPTIONS, buttonOptions, selectedMode: string} => ({
    WORKSHOP_TOOLBAR_OPTIONS,
    selectedMode: 'Default',
    buttonOptions,
  }),
  props: {
    modelValue: Object,
  },
  methods: {
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.$emit('option-clicked', option);
    },
    dropdownValueChange(event: Event): void {
      console.log((event.target as HTMLInputElement).value);
    }
  }
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
