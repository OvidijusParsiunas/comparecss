<template>
  <div>
    <div ref="componentPreview"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].subcomponentId"
      class="base-component grid-item-position"
      :class="[ SUBCOMPONENT_CURSOR_AUTO_CLASS,
        ...((component.componentPreviewStructure.baseCss.customFeatures && component.componentPreviewStructure.baseCss.customFeatures.jsClasses) || []),
        (positionClass || STATIC_POSITION_CLASS) ]"
      @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseEnter()"
      @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseLeave()"
      @mousedown="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseDown()"
      @mouseup="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].subcomponentId].subcomponentMouseUp()"
      :style="component.componentPreviewStructure.baseCss.activeCustomCssMode === SUB_COMPONENT_CSS_MODES.CLICK
        ? [
            [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
            component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
            component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.HOVER],
            component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.CLICK],
          ]
        : [
            [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
            component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT],
            component.componentPreviewStructure.baseCss.customCss[component.componentPreviewStructure.baseCss.activeCustomCssMode],
          ]">
          <layers
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :mouseEvents="mouseEvents"
            :layers="component.componentPreviewStructure.layers"
          />
    </div>
    <div ref="componentPreviewOverlay"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || SUB_COMPONENTS.BASE].overlayId"
      style="display: none" :style="[component.componentPreviewStructure.baseCss.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], [positionClass ? {} : { height: '100% !important' }]]"
      class="subcomponent-overlay-with-no-border-property-but-with-height"
      :class="[OVERLAY_DEFAULT_CLASS, (positionClass || STATIC_POSITION_CLASS)]">
    </div>
  </div>    
</template>

<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../../../../consts/subcomponentModes.enum';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  SUB_COMPONENT_CSS_MODES;
  SUB_COMPONENTS;
}

// move this file to a directory
export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      SUB_COMPONENT_CSS_MODES,
      SUB_COMPONENTS,
    };
  },
  components: {
    layers,
  },
  props: {
    component: Object,
    mouseEvents: Object,
    positionClass: String,
    subcomponentAndOverlayElementIds: Object,
  },
};
</script>

<style lang="css" scoped>
  /* WORK2: Redundant css */
  .static-position {
    top: 0px !important;
    left: 0px !important;
    bottom: 0px !important;
    right: 0px !important;
  }
  .nested-component {
    position: relative;
    transform: translateY(-50%);
  }
  .component-preview-container-default {
    position: relative;
    height: 50%;
  }
  .component-preview-container-modal {
    position: relative;
    height: 106%;
    top: -2.6%;
    left: -30vw;
    width: 100vw;
  }
  .component-preview-centered {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .component-preview-centered-horizontally {
    left: 50%;
    transform: translateX(-50%);
  }
  .component-preview-centered-vertically {
    top: 50%;
    transform: translateY(-50%);
  }
  /* WORK2: change name */
  .base-component {
    overflow: hidden;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .grid-item {
    background: none !important;
  }
  .margin-marker {
    background-color: rgb(225 225 225) !important;
    z-index: 2;
  }
  .grid-item-position {
    position: relative;
  }
  #margin-assistance-left {
    border-radius: 5px 2px 2px 5px;
    width: 10px;
    height: 100%;
    float: right;
    border-right: 1px solid #b9b9b9
  }
  #margin-assistance-top {
    border-radius: 5px 5px 2px 2px;
    width: 100%;
    height: 10px;
    bottom: 0;
    position: absolute;
    border-bottom: 1px solid #b9b9b9;
  }
  #margin-assistance-right {
    border-radius: 2px 5px 5px 2px;
    width: 10px;
    height: 100%;
    border-left: 1px solid #b9b9b9;
  }
  #margin-assistance-bottom {
    border-radius: 2px 2px 5px 5px;
    width: 100%;
    height: 10px;
    position: absolute;
    border-top: 1px solid #b9b9b9;
  }
  .left-slide-fade-enter-active,
  .left-slide-fade-leave-active,
  .top-slide-fade-enter-active,
  .top-slide-fade-leave-active,
  .right-slide-fade-enter-active,
  .right-slide-fade-leave-active,
  .bottom-slide-fade-enter-active,
  .bottom-slide-fade-leave-active {
    transition: all 0.4s ease-out;
  }
  .left-slide-fade-enter-from,
  .left-slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
  .top-slide-fade-enter-from,
  .top-slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  .right-slide-fade-enter-from,
  .right-slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .bottom-slide-fade-enter-from,
  .bottom-slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
<style lang="css">
  .subcomponent-overlay-default {
    background-color: rgb(64 197 255 / 43%) !important;
    /* the following color is partially transparent and uses the background color to set its own color */
    border-color: rgb(64 197 255 / 0%) !important;
    position: absolute !important;
    top: 0px;
    width: 100%;
    pointer-events: none;
    z-index: 1;
  }
  .subcomponent-overlay-remove {
    background-color: rgb(255 29 29 / 43%) !important;
  }
  .subcomponent-overlay-add {
    background-color: rgb(8 235 31 / 43%) !important;
  }
  .subcomponent-overlay-with-no-border-property-but-with-height {
    border-color: rgb(64 197 255 / 0%) !important;
    border-top-width: 0px !important;
    border-bottom-width: 0px !important;
    height: 100%;
  }
  .subcomponent-cursor-auto {
    cursor: auto;
  }
  .subcomponent-cursor-default {
    cursor: default !important;
  }
  .subcomponent-cursor-select-mode {
    cursor: pointer !important;
  }

  @keyframes displayRipple {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(4);
    }
  }

  @keyframes fadeRipple {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
