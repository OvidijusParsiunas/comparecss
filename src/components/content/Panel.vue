<template>
  <div :class="panelClass">
    <div>Panel</div>
    <div v-html="componentMarkup"></div>
  </div>
</template>
<script>
export default {
  props: {
    panelClass: String,
    componentMarkup: String,
  },
};
</script>
