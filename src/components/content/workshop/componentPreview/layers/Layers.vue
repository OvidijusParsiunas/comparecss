<template>
  <div class="layers">
    <div v-for="layer in layers" :key="layer" class="layer">
      <div :id="subcomponentAndOverlayElementIds[layer.subcomponentType] && subcomponentAndOverlayElementIds[layer.subcomponentType].subcomponentId"
        :style="layer.customCss[CSS_PSEUDO_CLASSES.DEFAULT]"
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
        style="display: none" :style="layer.customCss[CSS_PSEUDO_CLASSES.DEFAULT]"
        :class="OVERLAY_DEFAULT_CLASS"></div>
    </div>
  </div>
</template>
                    
<script lang="ts">
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import layerSections from './LayerSections.vue';

interface Consts {
  OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES;
  CSS_PSEUDO_CLASSES;
}

export default {
  setup(): Consts {
    return {
      OVERLAY_DEFAULT_CLASS: SUBCOMPONENT_OVERLAY_CLASSES.DEFAULT,
      CSS_PSEUDO_CLASSES,
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
