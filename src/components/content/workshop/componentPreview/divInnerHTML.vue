<template>
  <div v-if="componentType === NEW_COMPONENT_TYPES.ALERT" class="HTMLContainer">
    <div class="HTMLContents">
      {{ innerHTML }}
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
    left: 50%;
    transform: translate(-50%,-50%);
    width: 200px;
  }
</style>
