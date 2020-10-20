<template>
  <div style="margin-top: 10px; margin-bottom: 10px"> 
    <button type="button" class="btn btn-outline-secondary edit-component-button" @click="optionClick(WORKSHOP_TOOLBAR_OPTIONS.BORDER)">Border</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">Color</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">Shadow</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">Size</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">Padding</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">margin</button>
    <button type="button" class="btn btn-outline-secondary edit-component-button">Shadow</button>
    <button type="button" class="btn btn-outline-primary edit-component-button">Text</button>
  </div>
</template>

<script lang="ts">
import { WORKSHOP_TOOLBAR_OPTIONS } from '../../../../consts/workshopToolbarOptions';
export default {
  data: (): {WORKSHOP_TOOLBAR_OPTIONS} => ({
    WORKSHOP_TOOLBAR_OPTIONS,
  }),
  props: {
    modelValue: Object,
  },
  methods: {
    optionClick(option: WORKSHOP_TOOLBAR_OPTIONS): void {
      this.$emit('option-clicked', option);
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
