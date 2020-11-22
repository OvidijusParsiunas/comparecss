<template>
  <div>
    <div v-if="componentType === NEW_COMPONENT_TYPES.ALERT">
      <button class="alert-close-button" type="button" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';

interface Data {
  NEW_COMPONENT_TYPES,
}

export default {
  data: (): Data => ({
    NEW_COMPONENT_TYPES,
  }),
  props: {
    componentType: String,
  }
}
</script>

<style lang="css" scoped>
  .alert-close-button {
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    box-sizing: border-box;
    border-radius: 0;
    margin: 0;
    overflow: visible;
    text-transform: none;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px 20px;
    color: inherit;
  }
</style>