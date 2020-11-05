<template>
  <div style="cursor: move; width: 18rem; margin: auto; margin-top: 5px" class="card component-card" v-on:click="selectComponentCard(component)" tabindex="0">
    <div class="card-body">
      <h5 style="float: left" class="card-title">{{component.className}}</h5>
      <a style="float: right" href="#!" class="btn btn-danger">Delete</a>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';

export default {
  methods: {
    selectComponentCard(selectedComponentCard: WorkshopComponent): void {
      this.$emit('component-card-selected', selectedComponentCard);
    }
  },
  props: {
    component: Object,
  }
};
</script>

<style lang="css" scoped>
  .component-card:hover {
    border-color: #d1d5da!important;
    box-shadow: 0 1px 3px rgba(106,115,125,.3)!important;
  }
  .component-card:focus {
    outline: none;
    border-color: #2188ff!important;
    box-shadow: 0 0 0 .2em rgba(3,102,214,.3)!important;
  }
</style>
