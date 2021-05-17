<template>
  <div id="component-cards" :class="COMPONENT_LIST_ITEM_MARKER">
    <div id="component-cards-container" :class="COMPONENT_LIST_ITEM_MARKER">
      <transition-group :name="listAnimationName">
        <component-card v-for="component in components" :key="component"
          class="transition-item"
          :class="COMPONENT_LIST_ITEM_MARKER"
          :thisComponent="component"
          :allComponents="components"
          :currentlySelectedComponent="currentlySelectedComponent"
          :isImportComponentModeActive="isImportComponentModeActive"
          :currentlyHoveredImportComponent="currentlyHoveredImportComponent"
          :currentlySelectedImportComponent="currentlySelectedImportComponent"
          @component-card-selected="$emit('component-card-selected', $event)"
          @mouse-hover-component-card="$emit('mouse-hover-component-card', $event)"
          @component-card-copied="$emit('component-card-copied', $event)"
          @component-card-removed="$emit('component-card-removed', $event)"
          @stop-editing-class-name-callback="$emit('stop-editing-class-name-callback', $event)"
          @prepare-remove-component-modal="$emit('prepare-remove-component-modal', $event)"/>
        <div v-if="!isImportComponentModeActive"
          class="transition-item component-card component-body-container add-card"
          :class="COMPONENT_LIST_ITEM_MARKER"
          data-toggle="modal" :data-target="`#${NEW_COMPONENT_MODAL_ID}`"
          @click="$emit('prepare-new-component-modal', $event)">
          <div class="card-body add-card-body" :class="COMPONENT_LIST_ITEM_MARKER">
            <div class="add-card-text" :class="COMPONENT_LIST_ITEM_MARKER">
              Add +
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { COMPONENT_LIST_ITEM_MARKER } from '../../../../consts/elementClassMarkers';
import { NEW_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import componentCard from './ComponentCard.vue';

interface Consts {
  NEW_COMPONENT_MODAL_ID: string;
  COMPONENT_LIST_ITEM_MARKER: string;
}

interface Data {
  listAnimationName: string,
}

export default {
  setup(): Consts {
    return {
      NEW_COMPONENT_MODAL_ID,
      COMPONENT_LIST_ITEM_MARKER,
    }
  },
  data: (): Data => ({
    listAnimationName: 'horizontal-transition',
  }),
  components: {
    componentCard,
  },
  props: {
    components: Array,
    currentlySelectedComponent: Object,
    currentlyHoveredImportComponent: Object,
    currentlySelectedImportComponent: Object,
    isImportComponentModeActive: Boolean,
  },
  watch: {
    isImportComponentModeActive(): void {
      if (this.listAnimationName === 'vertical-transition') {
        setTimeout(() => {
           this.listAnimationName = 'horizontal-transition';
        });
      } else {
        this.listAnimationName = 'vertical-transition';
      }
    }
  }
};
</script>

<style lang="css" scoped>
  #component-cards {
    background-color: rgb(251 251 251);
    display: grid;
    border-radius: 20px;
    height: 95%;
    width: 90%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
  #component-cards-container {
    margin-top: 5px;
  }
  .transition-item {
    transition: all 0.5s ease;
  }
  .horizontal-transition-enter-from {
    opacity: 0;
    transform: translateX(-50%);
  }
  .horizontal-transition-leave-to {
    opacity: 0;
  }
  .horizontal-transition-leave-active {
    position: absolute;
    margin-left: 0px;
  }
  .vertical-transition-enter-from,
  .vertical-transition-leave-to {
    opacity: 0;
  }
  .vertical-transition-leave-active {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .add-card {
    cursor: pointer;
    border: 1px dashed #c2c2c2 !important;
  }
  .add-card:hover {
    border: 1px dashed #949494 !important;
  }
  .add-card:focus {
    border: 1px dashed #2e2e2e !important;
  }
  .add-card-body {
    text-align: center;
  }
  .add-card-text {
    height: 38px;
    padding-top: 6px;
  }
</style>
<style lang="css">
  .component-card {
    cursor: move;
    width: 18rem;
    margin: auto;
    margin-top: 5px;
  }
  .component-body-container {
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
</style>
