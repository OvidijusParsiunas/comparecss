<template>
  <div id="component-cards" style="background-color: rgb(251 251 251); display: grid; border-radius: 20px; height: 95%; width: 90%; margin: 0; position: absolute; top: 50%; left: 50%; -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center">
    <div id="component-cards-container" style="margin-top: 5px">
      <div v-for="component in components" :key="component">
        <componentCard
          :thisComponent="component"
          :allComponents="components"
          @component-card-selected="componentCardSelected($event)"
          @component-card-copied="componentCardCopied($event)"
          @component-card-deleted="componentCardDeleted($event)"
          @stop-editing-class-name-callback="stopEditingClassName($event)"/>
      </div>
      <!-- link id to the modal via workshop -->
      <div style="cursor: move; width: 18rem; margin: auto; outline: none; margin-top: 5px" class="add-card card" data-toggle="modal" data-target="#exampleModal" tabindex="0">
        <div style="text-align: center" class="card-body">
          <div style="height: 38px; padding-top: 6px">
            Add +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import componentCard from './ComponentCard.vue';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';

export default {
  components: {
    componentCard,
  },
  methods: {
    componentCardSelected(selectedComponentCard: WorkshopComponent): void {
      this.$emit('component-card-selected', selectedComponentCard);
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      this.$emit('component-card-copied', selectComponentCard);
    },
    componentCardDeleted(selectComponentCard: WorkshopComponent): void {
      this.$emit('component-card-deleted', selectComponentCard);
    },
    stopEditingClassName(callback: () => boolean): void {
      this.$emit('stop-editing-class-name-callback', callback);
    }
  },
  props: {
    components: Array,
  },
};
</script>

<style lang="css" scoped>
  .add-card {
    border: 1px dashed #c2c2c2 !important;
  }
  .add-card:hover {
    border: 1px dashed #949494 !important;
  }
  .add-card:focus {
    border: 1px dashed #2e2e2e !important;
  }
</style>