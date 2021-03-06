<template>
  <div>
    <div ref="componentPreview"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId"
      class="parent-component"
      :class="[ COMPONENT_PREVIEW_MARKER, SUBCOMPONENT_CURSOR_AUTO_CLASS,
        ...((component.componentPreviewStructure.baseSubcomponentProperties.customFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customFeatures.jsClasses) || []),
        (isImportedComponent ? 'imported-component' : STATIC_POSITION_CLASS) ]"
      @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseEnter()"
      @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseLeave()"
      @mousedown="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseDown()"
      @mouseup="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentMouseUp()"
      @click="mouseEvents[subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].subcomponentId].subcomponentClick()"
      :style="component.componentPreviewStructure.baseSubcomponentProperties.activeCssPseudoClass === CSS_PSEUDO_CLASSES.CLICK
        ? [
            [ component.componentPreviewStructure.baseSubcomponentProperties.inheritedCss || '' ],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.HOVER],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.CLICK],
          ]
        : [
            [ component.componentPreviewStructure.baseSubcomponentProperties.inheritedCss || '' ],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][CSS_PSEUDO_CLASSES.DEFAULT],
            component.componentPreviewStructure.baseSubcomponentProperties[component.componentPreviewStructure.baseSubcomponentProperties.tempCustomCssObjName || 'customCss'][component.componentPreviewStructure.baseSubcomponentProperties.activeCssPseudoClass],
          ]">
          <layers
            :classes="[...((component.componentPreviewStructure.baseSubcomponentProperties.customFeatures && component.componentPreviewStructure.baseSubcomponentProperties.customFeatures.jsClasses) || [])]"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :mouseEvents="mouseEvents"
            :layers="component.componentPreviewStructure.layers"
          />
    </div>
    <div ref="componentPreviewOverlay"
      v-if="isSubcomponentDisplayed(component.componentPreviewStructure.baseSubcomponentProperties)"
      :id="subcomponentAndOverlayElementIds[(component.subcomponentNames && component.subcomponentNames.base) || BASE_SUB_COMPONENT].overlayId"
      style="display: none"
      :style="[
        component.componentPreviewStructure.baseSubcomponentProperties.customCss[CSS_PSEUDO_CLASSES.DEFAULT],
        isImportedComponent ? {} : { height: '100% !important' }]"
      :class="[
        ...OVERLAY_DEFAULT_CLASSES,
        isImportedComponent ? 'imported-component' : STATIC_POSITION_CLASS,
        isImportedComponent ? '' : 'subcomponent-overlay-with-no-border-property-but-with-height']">
    </div>
  </div>    
</template>

<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../consts/subcomponentCursorClasses.enum';
import { CORE_SUBCOMPONENTS_NAMES } from '../../../../consts/coreSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../interfaces/workshopComponent';
import { STATIC_POSITION_CLASS } from '../../../../consts/sharedClasses';
import SubcomponentDisplayUtils from './utils/subcomponentDisplayUtils';
import layers from './layers/Layers.vue';

interface Consts {
  SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  STATIC_POSITION_CLASS: string;
  COMPONENT_PREVIEW_MARKER: string;
  BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES;
  CSS_PSEUDO_CLASSES: typeof CSS_PSEUDO_CLASSES;
  isSubcomponentDisplayed: (nestedSubcomponent: SubcomponentProperties) => boolean;
}

export default {
  setup(): Consts {
    return {
      SUBCOMPONENT_CURSOR_AUTO_CLASS: SUBCOMPONENT_CURSOR_CLASSES.AUTO,
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      STATIC_POSITION_CLASS: STATIC_POSITION_CLASS,
      BASE_SUB_COMPONENT: CORE_SUBCOMPONENTS_NAMES.BASE,
      COMPONENT_PREVIEW_MARKER,
      CSS_PSEUDO_CLASSES,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
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
  .parent-component {
    overflow: hidden;
  }
  .imported-component {
    position: relative;
    transform: translateY(-50%);
  }
</style>
<style lang="css">
  .subcomponent-overlay {
    /* the following color is partially transparent and uses the background color to set its own color */
    border-color: rgb(64 197 255 / 0%) !important;
    box-shadow: unset !important;
    position: absolute !important;
    top: 0px;
    width: 100%;
    z-index: 1;
  }
  .subcomponent-overlay-default {
    background-color: rgb(64 197 255 / 43%) !important;
    pointer-events: none;
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
  .sub-overlay {
    position: absolute;
    top: 0px;
  }
  .subcomponent-cursor-auto {
    cursor: auto;
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
