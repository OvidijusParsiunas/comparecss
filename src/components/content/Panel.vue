<template>
  <div class="panel">
    <div>Panel</div>
    <div :class="panelClass">
      <div class="panel-content">
        <div v-html="componentMarkup"></div>
      </div>
    </div>
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
<style lang="css">
.panel {
  text-align: center;
}
.panel-content {
  background-color: #fafafa;
}
</style>
