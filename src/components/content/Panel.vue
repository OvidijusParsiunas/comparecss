<template>
  <div style="width: 80%; margin: auto">
    <div class="panel" v-if="componentMarkup">
      <div style="padding: 10px 15px 20px; background-color: white; box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 20px 0px; border-radius: 10px">
        <!-- <div style="padding: 10px 15px 20px; background-color: white; box-shadow: rgba(130, 136, 148, 0.12) 0px 0px 0px 1px, rgba(130, 136, 148, 0.28) 0px 4px 8px -2px">  --> 
        <div style="height: 27px">
          <img :style="{ width: customIconWidthPx }" style="float: left; margin-right: 10px;" :src="iconSrc"> 
          <div style="font-size: 17px">{{name}}</div>
        </div>
        <div :class="panelClass">
          <div class="panel-content">
            <div v-html="componentMarkup"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div style="height: 27px">
      <img :style="{ width: customIconWidthPx }" style="float: left; margin-right: 10px;" v-bind:src="iconSrc"> 
      <div style="font-size: 17px">{{name}}</div>
  </div>
  <div :class="panelClass">
    <div class="panel-content">
      <div v-html="componentMarkup"></div>
    </div>
  </div> -->
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
    /* border-bottom: 1px solid #d2d2d2; */
    background-color: white;
    padding-top: 2px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .panel-content {
    text-align: center;
    margin: 10px;
  }
</style>
