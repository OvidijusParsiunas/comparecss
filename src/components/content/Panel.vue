<template>
  <div class="panel">
    <div style="height: 27px">
        <img :style="{ width: customIconWidthPx }" style="float: left; margin-right: 10px;" v-bind:src="iconSrc"> 
        <div style="font-size: 17px">{{name}}</div>
    </div>
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
    name: {
      type: String,
      default: 'Placeholder',
    },
    iconSrc: {
      type: String,
      default: 'assets/icons/bootstrap.ico'
    },
    customIconWidthPx: {
      type: String,
      default: '26px',
    },
    panelClass: String,
    componentMarkup: String,
  },
};
</script>
<style lang="css">
  .panel {
    padding: 20px;
    border-bottom: 1px solid #d2d2d2;
    background-color: white;
  }
  .panel-content {
    text-align: center;
  }
</style>
