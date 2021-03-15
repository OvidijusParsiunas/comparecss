<template>
  <div class="right-side-element-parent-container">
    <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.center"
      class="center-section"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="nestedSubcomponents.alignedSections.center"
      :mouseEvents="mouseEvents"
      :subcomponentClass="'center-subcomponent'"/>
  <div class="right-side-element-parent" :class="SUBCOMPONENT_CURSOR_DEFAULT_CLASS" type="button" style="height: 100%; display: flex">
    <!-- left -->
    <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.left"
      class="general-section"
      style="order: 0"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="nestedSubcomponents.alignedSections.left"
      :mouseEvents="mouseEvents"
      :subcomponentClass="'side-subcomponent'"/>

    <!-- right -->
    <layer-section v-if="nestedSubcomponents.alignedSections && nestedSubcomponents.alignedSections.right"
      class="general-section"
      style="order: 1; margin-left: auto"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="nestedSubcomponents.alignedSections.right"
      :mouseEvents="mouseEvents"
      :subcomponentClass="'side-subcomponent'"/>

    <!-- equal split sections -->
    <layer-section v-if="nestedSubcomponents.equalSplitSections"
      class="general-section"
      style="width: 100%"
      :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
      :nestedSubcomponents="nestedSubcomponents.equalSplitSections"
      :mouseEvents="mouseEvents"
      :subcomponentClass="'equal-split-subcomponent'"/>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import layerSection from './LayerSection.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_DEFAULT_CLASS: string;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  PSEUDO_COMPONENTS;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_DEFAULT_CLASS: SUBCOMPONENT_CURSOR_CLASSES.DEFAULT,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
      PSEUDO_COMPONENTS,
      SUB_COMPONENTS,
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
  /* this will need to be inherited css */
  .close-button {
    position: relative;
    overflow: hidden;
  }
  .right-side-element-parent-container {
    position: relative;
    height: 100%;
  }
  .right-side-element-parent {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: max-content;
    min-width: 100%;
    text-align: right;
  }
  .right-side-element {
    position: absolute;
    transform: translateY(-50%);
    top: 50% !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  #close-button-parent:focus {
    outline: none;
  }
  #close-button-icon {
    display: table;
    pointer-events: none;
    margin-left: auto;
    margin-right: auto;
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
  .general-section {
    display: flex; height: 100%;
  }
</style>
