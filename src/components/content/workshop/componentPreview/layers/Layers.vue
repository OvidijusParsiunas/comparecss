<template>
  <div class="layers" :class="COMPONENT_PREVIEW_MARKER">
    <div v-for="layer in layers" :key="layer" class="layer" :class="COMPONENT_PREVIEW_MARKER">
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].subcomponentId"
        :style="layer.subcomponentProperties[layer.subcomponentProperties.tempCustomCssObjName || 'customCss'][DEFAULT_CSS_PSEUDO_CLASS]"
        :class="COMPONENT_PREVIEW_MARKER"
        @mouseenter="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseLeave()"
        @mousedown="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseDown()"
        @mouseup="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentMouseUp()"
        @click="subcomponentAndOverlayElementIds[layer.name] && mouseEvents[subcomponentAndOverlayElementIds[layer.name].subcomponentId].subcomponentClick()">
          <layer-sections
            v-if="layer.sections"
            :class="COMPONENT_PREVIEW_MARKER"
            :classes="classes"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :sections="layer.sections"
            :mouseEvents="mouseEvents"/>
      </div>
      <div v-if="isSubcomponentDisplayed(layer.subcomponentProperties)"
        :id="subcomponentAndOverlayElementIds[layer.name] && subcomponentAndOverlayElementIds[layer.name].overlayId"
        style="display: none" :style="layer.subcomponentProperties.customCss[DEFAULT_CSS_PSEUDO_CLASS]"
        :class="[...OVERLAY_DEFAULT_CLASSES]"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';
import { SubcomponentProperties } from '../../../../../interfaces/workshopComponent';
import SubcomponentDisplayUtils from '../utils/subcomponentDisplayUtils';
import layerSections from './LayerSections.vue';

interface Consts {
  COMPONENT_PREVIEW_MARKER: string;
  OVERLAY_DEFAULT_CLASSES: SUBCOMPONENT_OVERLAY_CLASSES[];
  DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES;
  isSubcomponentDisplayed: (nestedSubcomponent: SubcomponentProperties) => boolean;
}

export default {
  setup(): Consts {
    return {
      COMPONENT_PREVIEW_MARKER,
      OVERLAY_DEFAULT_CLASSES: [SUBCOMPONENT_OVERLAY_CLASSES.BASE, SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT],
      DEFAULT_CSS_PSEUDO_CLASS: CSS_PSEUDO_CLASSES.DEFAULT,
      isSubcomponentDisplayed: SubcomponentDisplayUtils.isSubcomponentDisplayed,
    };
  },
  components: {
    layerSections,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    mouseEvents: Object,
    layers: Object,
    classes: Array,
  }
}
</script>

<style lang="css" scoped>
  .layers {
    height: 100%;
  }
  .layer {
    position: relative;
    height: 100%;
  }
</style>
