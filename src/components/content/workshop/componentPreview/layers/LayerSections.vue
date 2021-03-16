<template>
  <div class="layer-sections-container">
    <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.center"
      class="center-section"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="nestedSubcomponents.alignedSections.center"
      :mouseEvents="mouseEvents"
      :subcomponentClass="'center-subcomponent'"/>
    <div class="default-sections-container" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS">
      <!-- left -->
      <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.left"
        class="default-section"
        style="order: 0"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="nestedSubcomponents.alignedSections.left"
        :mouseEvents="mouseEvents"
        :subcomponentClass="'side-subcomponent'"/>
      <!-- right -->
      <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.right"
        class="default-section right-section"
        style="order: 1"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="nestedSubcomponents.alignedSections.right"
        :mouseEvents="mouseEvents"
        :subcomponentClass="'side-subcomponent'"/>
      <!-- equal split sections -->
      <layer-section v-if="nestedSubcomponents.equalSplitSections"
        class="default-section equal-split-section"
        :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
        :nestedSubcomponents="nestedSubcomponents.equalSplitSections"
        :mouseEvents="mouseEvents"
        :subcomponentClass="'equal-split-subcomponent'"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import layerSection from './LayerSection.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
    };
  },
  components: {
    layerSection,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    nestedSubcomponents: Object,
    mouseEvents: Object,
  }
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
  .equal-split-section {
    width: 100%;
  }
</style>
