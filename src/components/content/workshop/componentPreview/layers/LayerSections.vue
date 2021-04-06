<template>
  <div class="layer-sections-container">
    <!-- center -->
    <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.CENTER]"
      class="center-section"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.CENTER]"
      :mouseEvents="mouseEvents"
      :subcomponentElementContainerClass="'center-section-subcomponent'"/>
    <div class="default-sections-container" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS">
      <!-- left -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT]"
        class="default-section"
        style="order: 0"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT]"
        :mouseEvents="mouseEvents"/>
      <!-- right -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.RIGHT]"
        class="default-section right-section"
        style="order: 1"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.RIGHT]"
        :mouseEvents="mouseEvents"/>
      <!-- equal split sections -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]"
        class="default-section equal-split-sections-container"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]"
        :mouseEvents="mouseEvents"
        :subcomponentElementContainerClass="'equal-split-section'"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../consts/layerSections';
import layerSection from './LayerSection.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
  LAYER_SECTIONS_TYPES: typeof LAYER_SECTIONS_TYPES;
  ALIGNED_SECTION_TYPES: typeof ALIGNED_SECTION_TYPES;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
      LAYER_SECTIONS_TYPES,
      ALIGNED_SECTION_TYPES,
    };
  },
  components: {
    layerSection,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    sections: Object,
    mouseEvents: Object,
  },
}
</script>

<style lang="css" scoped>
  .layer-sections-container {
    position: relative;
    height: 100%;
  }
  .default-sections-container {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: max-content;
    min-width: 100%;
    text-align: right;
    height: 100%;
    display: flex;
  }
  .default-section {
    display: flex; height: 100%;
  }
  .center-section {
    position: absolute;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    top: 50%;
    display: flex;
    justify-content: center;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  .right-section {
    margin-left: auto;
  }
  .equal-split-sections-container {
    width: 100%;
  }
</style>
