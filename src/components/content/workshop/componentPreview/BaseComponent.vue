<template>
  <div>
    <div ref="componentPreview"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId"
      class="parent-component"
      :class="[ SUBCOMPONENT_CURSOR_AUTO_CLASS,
        ...((component.componentPreviewStructure.baseCss.customFeatures && component.componentPreviewStructure.baseCss.customFeatures.jsClasses) || []),
        (isImportedComponent ? 'imported-component' : STATIC_POSITION_CLASS) ]"
      @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseEnter()"
      @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseLeave()"
      @mousedown="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseDown()"
      @mouseup="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseUp()"
      :style="component.componentPreviewStructure.baseCss.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
        ? [
            [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
            component.componentPreviewStructure.baseCss.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseCss.customCss[CSS_PSEUDO_CLASSES.HOVER],
            component.componentPreviewStructure.baseCss.customCss[CSS_PSEUDO_CLASSES.CLICK],
          ]
        : [
            [ component.componentPreviewStructure.baseCss.inheritedCss ? component.componentPreviewStructure.baseCss.inheritedCss.css: '' ],
            component.componentPreviewStructure.baseCss.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseCss.customCss[component.componentPreviewStructure.baseCss.activeCssPseudoClass],
          ]">
          <layers
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :mouseEvents="mouseEvents"
            :layers="component.componentPreviewStructure.layers"
          />
    </div>
    <div ref="componentPreviewOverlay"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].overlayId"
      style="display: none" :style="[component.componentPreviewStructure.baseCss.customCss[CSS_PSEUDO_CLASSES.DEFAULT], [isImportedComponent ? {} : { height: '100% !important' }]]"
      class="subcomponent-overlay-with-no-border-property-but-with-height"
      :class="[OVERLAY_DEFAULT_CLASS, (isImportedComponent ? 'imported-component' : STATIC_POSITION_CLASS)]">
    </div>
  </div>    
</template>

<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES;
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  STATIC_POSITION_CLASS: string;
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
      CSS_PSEUDO_CLASSES,
    };
  },
  components: {
    layers,
  },
  props: {
    component: Object,
    mouseEvents: Object,
    isImportedComponent: Boolean,
    subcomponentAndOverlayElementIds: Object,
  },
};
</script>

<style lang="css" scoped>
  .imported-component {
    position: relative;
    transform: translateY(-50%);
  }
  .parent-component {
    overflow: hidden;
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