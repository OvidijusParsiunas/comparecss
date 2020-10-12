<template>
  <div>
    <panel name="Bootstrap" panelClass="bootstrap" iconSrc="assets/icons/bootstrap.ico" :componentMarkup="componentMarkup.bootstrap"/>
    <panel name="Materialize" panelClass="materialize" iconSrc="assets/icons/materialize.png" customIconWidthPx="27px" :componentMarkup="componentMarkup.materialize"/>
    <panel name="Uikit" panelClass="uikit" iconSrc="assets/icons/uikit.png" :componentMarkup="componentMarkup.uikit"/>
    <panel name="Foundation" panelClass="foundation" iconSrc="assets/icons/foundation.svg" customIconWidthPx="16px" :componentMarkup="componentMarkup.foundation"/>
    <panel name="Bulma" panelClass="bulma" iconSrc="assets/icons/bulma.png" customIconWidthPx="23px" :componentMarkup="componentMarkup.bulma"/>
    <panel name="Semantic" panelClass="semantic" iconSrc="assets/icons/semantic.png" :componentMarkup="componentMarkup.semantic"/>
    <panel name="Pure" panelClass="pure" iconSrc="assets/icons/pure.png" :componentMarkup="componentMarkup.pure"/>
    <panel name="Skeleton" panelClass="skeleton" iconSrc="assets/icons/skeleton.png" customIconWidthPx="25px" :componentMarkup="componentMarkup.skeleton"/>
    <panel name="Milligram" panelClass="milligram" iconSrc="assets/icons/milligram.png" customIconWidthPx="23px" :componentMarkup="componentMarkup.milligram"/>
    <panel name="Spectre" panelClass="spectre" iconSrc="assets/icons/spectre.png" customIconWidthPx="24px" :componentMarkup="componentMarkup.spectre"/>
    <panel name="Primer" panelClass="primer" :componentMarkup="componentMarkup.primer"/>
    <panel name="Nes" panelClass="nes" :componentMarkup="componentMarkup.nes"/>
    <panel name="Picnic" panelClass="picnic" :componentMarkup="componentMarkup.picnic"/>
    <panel name="Chota" panelClass="chota" :componentMarkup="componentMarkup.chota"/>
    <panel name="Cirrus" panelClass="cirrus" :componentMarkup="componentMarkup.cirrus"/>
    <panel name="Turret" panelClass="turret" :componentMarkup="componentMarkup.turret"/>
    <panel name="Hiq" panelClass="hiq" :componentMarkup="componentMarkup.hiq"/>
    <panel name="Mui" panelClass="mui" :componentMarkup="componentMarkup.mui"/>
    <panel name="Patternfly" panelClass="patternfly" :componentMarkup="componentMarkup.patternfly"/>
    <panel name="Bootflat" panelClass="bootflat" :componentMarkup="componentMarkup.bootflat"/>
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
    componentMarkup: Object,
  },
};
</script>
