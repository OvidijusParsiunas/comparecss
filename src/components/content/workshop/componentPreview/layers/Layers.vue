<template>
  <div class="layers">
    <div v-for="layer in layers" :key="layer" class="layer">
      <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId"
        :style="layer.customCss[SUB_COMPONENT_CSS_MODES.DEFAULT]"
        @mouseenter="subcomponentAndOverlayElementIds[layer.subcomponentType] && mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseEnter()"
        @mouseleave="subcomponentAndOverlayElementIds[layer.subcomponentType] && mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseLeave()"
        @mousedown="subcomponentAndOverlayElementIds[layer.subcomponentType] && mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseDown()"
        @mouseup="subcomponentAndOverlayElementIds[layer.subcomponentType] && mouseEvents[subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId].subcomponentMouseUp()">
          <layer-sections
            v-if="layer.sections"
            :subcomponentAndOverlayElementIds="subcomponentAndOverlayElementIds"
            :sections="layer.sections"
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
import { SUB_COMPONENT_CSS_MODES } from '../../../../../consts/subcomponentCssModes.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import layerSections from './LayerSections.vue';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  SUB_COMPONENT_CSS_MODES;
  SUB_COMPONENTS;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      SUB_COMPONENT_CSS_MODES,
      SUB_COMPONENTS,
    };
  },
  components: {
    layerSections,
  },
  props: {
    subcomponentAndOverlayElementIds: Object,
    mouseEvents: Object,
    layers: Object,
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
