<template>
  <div v-if="componentType === NEW_COMPONENT_TYPES.ALERT">
    extra stuff
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
