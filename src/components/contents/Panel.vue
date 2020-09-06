<template>
  <div :class="panelClass">
    <button type="button" class="btn btn-primary">Primary</button>
  </div>
</template>
<script>
export default {
  props: {
    panelClass: String,
  },
};
</script>
