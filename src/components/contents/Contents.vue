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
    <Panel panelClass="material"/>
     <ul id="example-1">
    <li v-for="item in panels" :key="item.message">
      {{ item.message }}
    </li>
  </ul>
  </div>
</template>

<script lang="ts">

import Panel from './Panel.vue';

export default {
  props: {
    activeButtonName: String,
    panels: Array,
  },
  components: {
    Panel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
