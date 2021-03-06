<template>
  <div class="layer-sections-container" :class="[...classes, COMPONENT_PREVIEW_MARKER]">
    <!-- center -->
    <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.CENTER]"
      class="center-section"
      :class="COMPONENT_PREVIEW_MARKER"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.CENTER]"
      :mouseEvents="mouseEvents"
      :specialisedSectionContainerClass="SPECIALISED_SECTION_CONTAINER_CLASSES.CENTER_SECTION"/>
    <div class="default-sections-container" :class="[...classes, COMPONENT_PREVIEW_MARKER]">
      <!-- left -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT]"
        style="order: 0"
        class="default-section"
        :class="COMPONENT_PREVIEW_MARKER"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.LEFT]"
        :mouseEvents="mouseEvents"/>
      <!-- right -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS] && sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.RIGHT]"
        style="order: 1"
        class="default-section right-section"
        :class="COMPONENT_PREVIEW_MARKER"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.ALIGNED_SECTIONS][ALIGNED_SECTION_TYPES.RIGHT]"
        :mouseEvents="mouseEvents"/>
      <!-- equal split sections -->
      <layer-section v-if="sections[LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]"
        class="default-section equal-split-sections"
        :class="COMPONENT_PREVIEW_MARKER"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="sections[LAYER_SECTIONS_TYPES.EQUAL_SPLIT_SECTIONS]"
        :mouseEvents="mouseEvents"
        :specialisedSectionContainerClass="SPECIALISED_SECTION_CONTAINER_CLASSES.EQUAL_SPLIT_SECTIONS"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SPECIALISED_SECTION_CONTAINER_CLASSES } from '../../../../../consts/specialisedSectionContainerClasses.enum';
import { ALIGNED_SECTION_TYPES, LAYER_SECTIONS_TYPES } from '../../../../../consts/layerSections.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import layerSection from './LayerSection.vue';

interface Consts {
  SPECIALISED_SECTION_CONTAINER_CLASSES: typeof SPECIALISED_SECTION_CONTAINER_CLASSES;
  SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES;
  COMPONENT_PREVIEW_MARKER: string;
  ALIGNED_SECTION_TYPES: typeof ALIGNED_SECTION_TYPES;
  LAYER_SECTIONS_TYPES: typeof LAYER_SECTIONS_TYPES;
}

export default {
  setup(): Consts {
    return {
      SPECIALISED_SECTION_CONTAINER_CLASSES: SPECIALISED_SECTION_CONTAINER_CLASSES,
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
      COMPONENT_PREVIEW_MARKER,
      ALIGNED_SECTION_TYPES,
      LAYER_SECTIONS_TYPES,
    };
  },
  components: {
    layerSection,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    sections: Object,
    mouseEvents: Object,
    classes: Array,
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
    text-align: center;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  .right-section {
    margin-left: auto;
  }
  .equal-split-sections {
    width: 100%;
  }
</style>
