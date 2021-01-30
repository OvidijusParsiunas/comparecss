<template>
  <div class="HTMLContainer">
    <div class="HTMLContents">
      {{ innerHTML }}
    </div>
  </div>
</template>

<script lang="ts">
import { NEW_COMPONENT_TYPES } from '../../../../consts/newComponentTypes.enum';

interface Consts {
  NEW_COMPONENT_TYPES,
}

export default {
  setup(): Consts {
    return {
      NEW_COMPONENT_TYPES,
    };
  },
  props: {
    innerHTML: String,
  }
}
</script>

<style lang="css" scoped>
  .HTMLContainer {
    position: relative;
    height: 100%;
  }
  .HTMLContents {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: inherit;
  }
</style>
