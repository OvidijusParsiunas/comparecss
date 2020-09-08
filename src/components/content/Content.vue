<template>
  <div id="content">
    <panel panelClass="bootstrap" :componentMarkup="markup.bootstrap"/>
    <panel panelClass="material" :componentMarkup="markup.material"/>
    <panel panelClass="uikit" :componentMarkup="markup.uikit"/>
    <panel panelClass="foundation" :componentMarkup="markup.foundation"/>
    <panel panelClass="bulma" :componentMarkup="markup.bulma"/>
    <panel panelClass="semantic" :componentMarkup="markup.semantic"/>
    <panel panelClass="pure" :componentMarkup="markup.pure"/>
  </div>
</template>
  <!-- if the order is going to become important,
  consider having a for loop which would traverse an array -->
  <!-- <panel-slot v-for="item in data" :key="item.class" v-bind:class="item.class">
    <div v-html="item.component"></div>
  </panel-slot> -->

<script lang="ts">

import Panel from './Panel.vue';

export default {
  components: {
    Panel,
  },
  props: {
    markup: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
