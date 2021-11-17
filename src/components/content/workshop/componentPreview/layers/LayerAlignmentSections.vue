<template>
  <div class="layer-sections-container" :class="[...classes, COMPONENT_PREVIEW_MARKER]">
    <!-- center -->
    <layer-alignment-section v-if="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.CENTER])"
      class="center-section"
      :class="COMPONENT_PREVIEW_MARKER"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :subcomponents="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.CENTER])"
      :mouseEvents="mouseEvents"
      :specialisedSectionContainerClass="SPECIALISED_SECTION_CONTAINER_CLASSES.CENTER_SECTION"/>
    <div class="default-sections-container" :class="[...classes, COMPONENT_PREVIEW_MARKER]">
      <!-- left -->
      <layer-alignment-section v-if="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.LEFT])"
        style="order: 0"
        class="default-section"
        :class="COMPONENT_PREVIEW_MARKER"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :subcomponents="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.LEFT])"
        :mouseEvents="mouseEvents"/>
      <!-- right -->
      <layer-alignment-section v-if="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.RIGHT])"
        style="order: 1"
        class="default-section right-section"
        :class="COMPONENT_PREVIEW_MARKER"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :subcomponents="getAlignmentSectionSubcomponents([HORIZONTAL_ALIGNMENT_SECTIONS.RIGHT])"
        :mouseEvents="mouseEvents"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SPECIALISED_SECTION_CONTAINER_CLASSES } from '../../../../../consts/specialisedSectionContainerClasses.enum';
import { HORIZONTAL_ALIGNMENT_SECTIONS } from '../../../../../consts/horizontalAlignmentSections';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import layerAlignmentSection from './LayerAlignmentSection.vue';

interface Consts {
  SPECIALISED_SECTION_CONTAINER_CLASSES: typeof SPECIALISED_SECTION_CONTAINER_CLASSES;
  HORIZONTAL_ALIGNMENT_SECTIONS: typeof HORIZONTAL_ALIGNMENT_SECTIONS;
  COMPONENT_PREVIEW_MARKER: string;
}

export default {
  setup(): Consts {
    return {
      SPECIALISED_SECTION_CONTAINER_CLASSES: SPECIALISED_SECTION_CONTAINER_CLASSES,
      HORIZONTAL_ALIGNMENT_SECTIONS,
      COMPONENT_PREVIEW_MARKER,
    };
  },
  methods: {
    getAlignmentSectionSubcomponents(horizontalAlignmentSection: HORIZONTAL_ALIGNMENT_SECTIONS): WorkshopComponent {
      return this.alignmentSectionToSubcomponents[horizontalAlignmentSection];
    }
  },
  components: {
    layerAlignmentSection,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    alignmentSectionToSubcomponents: Object,
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
    position: relative;
    transform: translateY(-50%);
    top: 50%;
    width: max-content;
    min-width: 100%;
    text-align: right;
    height: 100%;
    display: flex;
  }
  .default-section {
    display: flex;
    height: 100%;
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
</style>
