<template>
  <div id="content">
    <panel name="Bootstrap" panelClass="bootstrap" iconSrc="assets/icons/bootstrap.ico" :componentMarkup="markup.bootstrap"/>
    <panel name="Materialize" panelClass="materialize" iconSrc="assets/icons/materialize.png" customIconWidthPx="27px" :componentMarkup="markup.materialize"/>
    <panel name="Uikit" panelClass="uikit" :componentMarkup="markup.uikit"/>
    <panel name="Foundation" panelClass="foundation" :componentMarkup="markup.foundation"/>
    <panel name="Bulma" panelClass="bulma" :componentMarkup="markup.bulma"/>
    <panel name="Semantic" panelClass="semantic" :componentMarkup="markup.semantic"/>
    <panel name="Pure" panelClass="pure" :componentMarkup="markup.pure"/>
    <panel name="Skeleton" panelClass="skeleton" :componentMarkup="markup.skeleton"/>
    <panel name="Milligram" panelClass="milligram" :componentMarkup="markup.milligram"/>
    <panel name="Spectre" panelClass="spectre" :componentMarkup="markup.spectre"/>
    <panel name="Primer" panelClass="primer" :componentMarkup="markup.primer"/>
    <panel name="Nes" panelClass="nes" :componentMarkup="markup.nes"/>
    <panel name="Picnic" panelClass="picnic" :componentMarkup="markup.picnic"/>
    <panel name="Chota" panelClass="chota" :componentMarkup="markup.chota"/>
    <panel name="Cirrus" panelClass="cirrus" :componentMarkup="markup.cirrus"/>
    <panel name="Turret" panelClass="turret" :componentMarkup="markup.turret"/>
    <panel name="Hiq" panelClass="hiq" :componentMarkup="markup.hiq"/>
    <panel name="Mui" panelClass="mui" :componentMarkup="markup.mui"/>
    <panel name="Patternfly" panelClass="patternfly" :componentMarkup="markup.patternfly"/>
    <panel name="Bootflat" panelClass="bootflat" :componentMarkup="markup.bootflat"/>
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
<style lang="css" scoped>
  #content {
    width: 100%;
    overflow: hidden;
  }
</style>
