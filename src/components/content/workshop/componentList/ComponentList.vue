<template>
  <div id="component-cards">
    <div id="component-cards-container">
      <transition-group :name="listAnimationName">
        <component-card v-for="component in components" :key="component"
          class="transition-item"
          :thisComponent="component"
          :allComponents="components"
          :currentlySelectedComponent="currentlySelectedComponent"
          :isImportSubcomponentModeActive="isImportSubcomponentModeActive"
          :currentlySelectedImportComponent="currentlySelectedImportComponent"
          @component-card-selected="componentCardSelected($event)"
          @component-card-copied="componentCardCopied($event)"
          @component-card-removed="componentCardRemoved($event)"
          @stop-editing-class-name-callback="stopEditingClassName($event)"
          @prepare-remove-component-modal="prepareRemoveComponentModal"/>
        <div v-if="!isImportSubcomponentModeActive"
          class="transition-item component-card component-body-container add-card"
          data-toggle="modal" :data-target="`#${NEW_COMPONENT_MODAL_ID}`"
          @click="prepareNewComponentModal">
          <div class="card-body add-card-body">
            <div class="add-card-text">
              Add +
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { WorkshopEventCallback } from '../../../../interfaces/workshopEventCallback';
import { WorkshopComponent } from '../../../../interfaces/workshopComponent';
import { NEW_COMPONENT_MODAL_ID } from '../../../../consts/elementIds';
import componentCard from './ComponentCard.vue';

interface Consts {
  NEW_COMPONENT_MODAL_ID: string;
}

interface Data {
  listAnimationName: string,
}

export default {
  setup(): Consts {
    return {
      NEW_COMPONENT_MODAL_ID,
    }
  },
  data: (): Data => ({
    listAnimationName: 'horizontal-transition',
  }),
  methods: {
    componentCardSelected(selectedComponentCard: WorkshopComponent): void {
      this.$emit('component-card-selected', selectedComponentCard);
    },
    componentCardCopied(selectComponentCard: WorkshopComponent): void {
      this.$emit('component-card-copied', selectComponentCard);
    },
    componentCardRemoved(componentCard: WorkshopComponent): void {
      this.$emit('component-card-removed', componentCard);
    },
    stopEditingClassName(callback: WorkshopEventCallback): void {
      this.$emit('stop-editing-class-name-callback', callback);
    },
    prepareNewComponentModal(): void {
      this.$emit('prepare-new-component-modal');
    },
    prepareRemoveComponentModal(): void {
      this.$emit('prepare-remove-component-modal');
    }
  },
  components: {
    componentCard,
  },
  props: {
    components: Array,
    currentlySelectedComponent: Object,
    currentlySelectedImportComponent: Object,
    isImportSubcomponentModeActive: Boolean,
  },
  watch: {
    isImportSubcomponentModeActive(): void {
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
