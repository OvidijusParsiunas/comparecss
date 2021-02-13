<template>
  <div class="HTMLContainer" :class="SUBCOMPONENT_CURSOR_AUTO_CLASS">
    <div class="HTMLContents">
      {{ innerHTML }}
    </div>
  </div>
</template>

<script lang="ts">
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';

interface Consts {
  SUBCOMPONENT_CURSOR_AUTO_CLASS: string;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
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
