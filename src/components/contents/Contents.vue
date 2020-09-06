<template>
  <div id="content">
      {{ activeButtonName }}
    <div class="bootstrap">
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
    <div class="material">
        <button type="button" class="btn btn-primary">Primary</button>
    </div>
    <div class="uikit">
        <button class="uk-button uk-button-default">Primary</button>
    </div>
    <div class="foundation">
        <a class="button">Primary</a>
    </div>
    <div class="bulma">
        <button class="button">Button</button>
    </div>
    <panel panelClass="material"/>
     <ul id="example-1">
  </ul>
  <panel-slot v-for="item in data" :key="item.class" v-bind:class="item.class">
    <div v-html="item.component"></div>
  </panel-slot>
  <!-- <panel-slot class="bulma">
    <BulmaButtons/>
  </panel-slot> -->
  </div>
</template>

<script lang="ts">

import Panel from './Panel.vue';
import PanelSlot from './PanelSlot.vue';

export default {
  props: {
    activeButtonName: String,
    panels: Array,
    data: Array,
  },
  components: {
    Panel,
    PanelSlot,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
