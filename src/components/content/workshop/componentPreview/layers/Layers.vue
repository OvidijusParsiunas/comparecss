<template>
  <div class="layers">
    <div v-for="layer in layers" :key="layer" class="parent-layer">
      <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId"
        :style="[layer.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT], { pointerEvents: isShallowSubcomponents ? 'none': 'auto' }]"
        @mouseenter="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseLeave()"
        @mousedown="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseDown()"
        @mouseup="mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseUp()">
          <nested-inner-html-text
            v-if="layer.subcomponents && layer.subcomponents[PSEUDO_COMPONENTS.TEXT]"
            :innerHTML="layer.subcomponents[PSEUDO_COMPONENTS.TEXT]"/>
          <auxiliary-right-side-elements
            v-if="layer.subcomponents && layer.subcomponents[SUB_COMPONENTS.CLOSE] !== undefined"
            :subcomponent="layer.subcomponents[SUB_COMPONENTS.CLOSE]"
            :elementIds="subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE]"
            :mouseEvents="mouseEvents[subcomponentAndOverlayElementIds[SUB_COMPONENTS.CLOSE].subcomponentId]"/>
          <layer-sections
            v-if="layer.nestedSubcomponents"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :nestedSubcomponents="layer.nestedSubcomponents"
            :mouseEvents="mouseEvents"/>
      </div>
      <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].overlayId"
        style="display: none" :style="layer.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
        :class="OVERLAY_DEFAULT_CLASS"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { PSEUDO_COMPONENTS } from '../../../../../consts/pseudoComponents.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import auxiliaryRightSideElements from '../AuxiliaryRightSideElements.vue';
import nestedInnerHtmlText from '../nestedInnerHTMLText.vue';
import layerSections from './LayerSections.vue';

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
    auxiliaryRightSideElements,
    nestedInnerHtmlText,
    layerSections,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    mouseEvents: Object,
    layers: Object,
    isShallowSubcomponents: Boolean,
  }
}
</script>

<style lang="css" scoped>
  .layers {
    height: 100%;
  }
  .parent-layer {
    position: relative;
    height: 100%;
  }
</style>
